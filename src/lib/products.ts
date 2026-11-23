import "server-only";
import { cache } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { ensureDb } from "@/db/bootstrap";
import { automationLogs, products } from "@/db/schema";
import type {
  AdminProduct,
  AutomationLog,
  PublicProduct,
  RenderMode,
} from "./types";

type Row = typeof products.$inferSelect;

function toPublic(row: Row): PublicProduct {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    puffs: row.puffs,
    priceArs: row.priceArs,
    flavors: row.flavors,
    imageUrl: row.imageUrl,
    renderMode: (row.renderMode === "texture" && row.imageUrl
      ? "texture"
      : "color") as RenderMode,
  };
}

/** Active products only (public catalog). Memoized per request. */
export const getActiveProducts = cache(async (): Promise<PublicProduct[]> => {
  try {
    await ensureDb();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.active, true))
      .orderBy(asc(products.priceArs), asc(products.createdAt));
    return rows.map(toPublic);
  } catch (error) {
    console.error("[products] could not load catalog", error);
    return [];
  }
});

export async function getAllProducts(): Promise<AdminProduct[]> {
  await ensureDb();
  const rows = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt), asc(products.priceArs));
  return rows.map((row) => ({
    ...toPublic(row),
    active: row.active,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function getRecentLogs(limit = 20): Promise<AutomationLog[]> {
  await ensureDb();
  const rows = await db
    .select()
    .from(automationLogs)
    .orderBy(desc(automationLogs.createdAt))
    .limit(limit);
  return rows.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    productLabel: r.productLabel,
    status: r.status,
    detail: r.detail,
  }));
}
