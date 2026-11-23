import "server-only";
import { and, eq, gt } from "drizzle-orm";
import sharp from "sharp";
import { db } from "@/db";
import { ensureDb } from "@/db/bootstrap";
import {
  automationLogs,
  imageSearchCache,
  productImages,
  products,
} from "@/db/schema";
import type { AutomationStatus } from "./types";

/**
 * Automatic image pipeline (runs server-side only):
 *  1. builds queries "{brand} {model} vape"
 *  2. asks SerpApi (Google Images) - max 2 retries, 15s timeout per request
 *  3. validates candidates (https, image content-type, >= 400px)
 *  4. downloads + normalizes the image and stores it in Postgres, served from
 *     /api/images/<id> (same origin -> no CORS problems for Three.js)
 *  5. any failure ends in a "color" fallback: the product is still published.
 */

const SEARCH_TIMEOUT_MS = 15_000;
const DOWNLOAD_TIMEOUT_MS = 12_000;
const MAX_RETRIES = 2;
const MIN_SIDE = 400;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_CANDIDATES = 8;
const CACHE_DAYS = 30;

export type PipelineResult = {
  status: AutomationStatus;
  imageUrl: string | null;
  detail: string;
};

type ProductRef = { id: string; brand: string; model: string };

class ApiError extends Error {}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) {
    return true;
  }
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) {
    const [a, b] = h.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  return h.includes(":");
}

function isSafeHttps(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && !isPrivateHost(u.hostname);
  } catch {
    return false;
  }
}

async function searchImages(query: string): Promise<string[]> {
  const key = process.env.SERPAPI_KEY;
  if (!key) throw new ApiError("SERPAPI_KEY no configurada");
  if (process.env.SIMULATE_IMAGE_API_FAILURE === "1") {
    throw new ApiError("Fallo simulado de la API (SIMULATE_IMAGE_API_FAILURE=1)");
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_images");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", key);
  url.searchParams.set("safe", "active");
  url.searchParams.set("hl", "es");

  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS),
        cache: "no-store",
      });
      const json = (await res.json().catch(() => null)) as {
        error?: string;
        images_results?: {
          original?: string;
          original_width?: number;
          original_height?: number;
        }[];
      } | null;

      if (json?.error && /hasn't returned any results/i.test(json.error)) {
        return [];
      }
      if (!res.ok || !json || json.error) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }

      const results = json.images_results ?? [];
      return results
        .filter(
          (r) =>
            r.original &&
            (r.original_width ?? MIN_SIDE) >= MIN_SIDE &&
            (r.original_height ?? MIN_SIDE) >= MIN_SIDE,
        )
        .map((r) => r.original as string)
        .filter(isSafeHttps);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) await sleep(600 * (attempt + 1));
    }
  }
  throw new ApiError(
    lastError instanceof Error ? lastError.message : "Error desconocido de API",
  );
}

async function downloadAndValidate(
  url: string,
): Promise<{ data: Buffer; contentType: string } | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; YeezyPodsBot/1.0)" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    if (res.url && !isSafeHttps(res.url)) return null;
    const type = (res.headers.get("content-type") || "").toLowerCase();
    if (!type.startsWith("image/") || type.includes("svg")) return null;
    const length = Number(res.headers.get("content-length") || 0);
    if (length > MAX_BYTES) return null;

    const raw = Buffer.from(await res.arrayBuffer());
    if (raw.length === 0 || raw.length > MAX_BYTES) return null;

    const meta = await sharp(raw).metadata();
    if (!meta.width || !meta.height) return null;
    if (meta.width < MIN_SIDE || meta.height < MIN_SIDE) return null;

    // Normalize: max 900px, white background, JPEG -> small & WebGL friendly.
    const data = await sharp(raw)
      .rotate()
      .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    return { data, contentType: "image/jpeg" };
  } catch {
    return null;
  }
}

async function cachedImage(query: string): Promise<string | null> {
  const since = new Date(Date.now() - CACHE_DAYS * 86_400_000);
  const [hit] = await db
    .select()
    .from(imageSearchCache)
    .where(and(eq(imageSearchCache.query, query), gt(imageSearchCache.createdAt, since)))
    .limit(1);
  if (!hit) return null;
  const id = hit.imageUrl.split("/").pop();
  if (!id) return null;
  const [img] = await db
    .select({ id: productImages.id })
    .from(productImages)
    .where(eq(productImages.id, id))
    .limit(1);
  return img ? hit.imageUrl : null;
}

async function findImage(ref: ProductRef): Promise<PipelineResult> {
  const queries = [
    `${ref.brand} ${ref.model} vape`,
    `${ref.brand} ${ref.model} disposable vape`,
  ];

  let apiFailure: string | null = null;

  for (const query of queries) {
    const cached = await cachedImage(query);
    if (cached) {
      return { status: "image_found", imageUrl: cached, detail: `Cache: "${query}"` };
    }

    let candidates: string[];
    try {
      candidates = await searchImages(query);
    } catch (error) {
      apiFailure = error instanceof Error ? error.message : "Error de API";
      break; // API is down: do not hammer it with the next query
    }

    for (const candidate of candidates.slice(0, MAX_CANDIDATES)) {
      const img = await downloadAndValidate(candidate);
      if (!img) continue;
      const [stored] = await db
        .insert(productImages)
        .values({ data: img.data, contentType: img.contentType, sourceUrl: candidate })
        .returning({ id: productImages.id });
      const imageUrl = `/api/images/${stored.id}`;
      await db
        .insert(imageSearchCache)
        .values({ query, imageUrl })
        .onConflictDoUpdate({
          target: imageSearchCache.query,
          set: { imageUrl, createdAt: new Date() },
        });
      return { status: "image_found", imageUrl, detail: `Query: "${query}"` };
    }
  }

  if (apiFailure) {
    return {
      status: "api_error",
      imageUrl: null,
      detail: `${apiFailure}. Publicado con modelo de color.`,
    };
  }
  return {
    status: "color_fallback",
    imageUrl: null,
    detail: "Sin imágenes válidas (https, imagen, >=400px). Publicado con modelo de color.",
  };
}

function imageIdFromUrl(url: string | null): string | null {
  if (!url || !url.startsWith("/api/images/")) return null;
  return url.split("/").pop() ?? null;
}

/**
 * Runs the whole automation for a product, updates the product row and writes
 * the automation log. Never throws: any failure becomes a color fallback.
 */
export async function runImageAutomation(ref: ProductRef): Promise<PipelineResult> {
  await ensureDb();
  let result: PipelineResult;
  try {
    result = await findImage(ref);
  } catch (error) {
    result = {
      status: "api_error",
      imageUrl: null,
      detail: `${error instanceof Error ? error.message : "Error inesperado"}. Publicado con modelo de color.`,
    };
  }

  try {
    const [current] = await db
      .select({ imageUrl: products.imageUrl })
      .from(products)
      .where(eq(products.id, ref.id))
      .limit(1);

    if (result.imageUrl) {
      await db
        .update(products)
        .set({ imageUrl: result.imageUrl, renderMode: "texture" })
        .where(eq(products.id, ref.id));
    } else if (!current?.imageUrl) {
      await db
        .update(products)
        .set({ imageUrl: null, renderMode: "color" })
        .where(eq(products.id, ref.id));
    }

    await db.insert(automationLogs).values({
      productId: ref.id,
      productLabel: `${ref.brand} ${ref.model}`,
      status: result.status,
      detail: result.detail,
    });
  } catch (error) {
    console.error("[image-pipeline] could not persist result", error);
  }
  return result;
}

/** Deletes the stored image for a product (used on product delete). */
export async function deleteStoredImage(imageUrl: string | null): Promise<void> {
  const id = imageIdFromUrl(imageUrl);
  if (!id) return;
  await db.delete(imageSearchCache).where(eq(imageSearchCache.imageUrl, imageUrl as string));
  await db.delete(productImages).where(eq(productImages.id, id));
}
