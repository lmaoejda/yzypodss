"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { ensureDb } from "@/db/bootstrap";
import { products } from "@/db/schema";
import {
  createSession,
  destroySession,
  requireAdmin,
  verifyCredentials,
} from "@/lib/auth";
import { deleteStoredImage, runImageAutomation } from "@/lib/image-pipeline";

export type ActionResult = { ok: boolean; message: string };

type ImportedProduct = {
  brand: string;
  model: string;
  puffs: number;
  priceArs: number;
  flavors: string[];
  line: number;
};

function parseProductImport(text: string):
  | { products: ImportedProduct[]; error: null }
  | { products: null; error: string } {
  if (text.length > 100_000) {
    return { products: null, error: "El archivo supera el límite de 100 KB." };
  }

  const rows = text
    .split(/\r?\n/)
    .map((raw, index) => ({ raw: raw.trim(), line: index + 1 }))
    .filter(({ raw }) => raw && !raw.startsWith("#"));

  if (rows.length === 0) {
    return { products: null, error: "El archivo no contiene productos." };
  }
  if (rows.length > 50) {
    return { products: null, error: "Podés importar hasta 50 productos por archivo." };
  }

  const imported: ImportedProduct[] = [];
  const seen = new Set<string>();
  const errors: string[] = [];

  for (const { raw, line } of rows) {
    const fields = raw.split("|").map((field) => field.trim());
    if (fields.length !== 5) {
      errors.push(`Línea ${line}: deben ser 5 campos separados por |.`);
      continue;
    }

    const [rawBrand, rawModel, rawPuffs, rawPrice, rawFlavors] = fields;
    const brand = rawBrand.toUpperCase();
    const model = rawModel.toUpperCase();
    const puffs = Number(rawPuffs.replace(/\D/g, ""));
    const priceArs = Number(rawPrice.replace(/\D/g, ""));
    const flavors = Array.from(
      new Set(rawFlavors.split(",").map((flavor) => flavor.trim()).filter(Boolean)),
    );

    if (!brand || brand.length > 40) errors.push(`Línea ${line}: marca obligatoria (máximo 40 caracteres).`);
    if (!model || model.length > 40) errors.push(`Línea ${line}: modelo obligatorio (máximo 40 caracteres).`);
    if (!Number.isSafeInteger(puffs) || puffs < 1 || puffs > 2_147_483_647) {
      errors.push(`Línea ${line}: puffs debe ser un entero mayor a 0.`);
    }
    if (!Number.isSafeInteger(priceArs) || priceArs < 1 || priceArs > 100_000_000) {
      errors.push(`Línea ${line}: precio debe ser un entero entre 1 y 100.000.000.`);
    }
    if (flavors.length === 0 || flavors.length > 20 || flavors.some((flavor) => flavor.length > 80)) {
      errors.push(`Línea ${line}: indicá entre 1 y 20 sabores (máximo 80 caracteres cada uno).`);
    }

    const key = `${brand.toLocaleLowerCase("es-AR")}|${model.toLocaleLowerCase("es-AR")}`;
    if (seen.has(key)) errors.push(`Línea ${line}: marca y modelo repetidos en el archivo.`);
    seen.add(key);

    imported.push({ brand, model, puffs, priceArs, flavors, line });
  }

  if (errors.length > 0) {
    const displayedErrors = errors.slice(0, 8).join(" ");
    const remaining = errors.length - 8;
    return {
      products: null,
      error: `${displayedErrors}${remaining > 0 ? ` Y ${remaining} error(es) más.` : ""}`,
    };
  }

  return { products: imported, error: null };
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function loginAction(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!verifyCredentials(email, password)) {
    await new Promise((r) => setTimeout(r, 700)); // slow down brute force
    return { error: "Email o contraseña incorrectos." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function createProductAction(
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  await ensureDb();

  const brand = String(formData.get("brand") ?? "").trim().toUpperCase();
  const model = String(formData.get("model") ?? "").trim().toUpperCase();
  const puffs = Number(String(formData.get("puffs") ?? "").replace(/\D/g, ""));
  const price = Number(String(formData.get("price") ?? "").replace(/\D/g, ""));
  const flavors = Array.from(
    new Set(
      formData
        .getAll("flavors")
        .map((f) => String(f).trim())
        .filter(Boolean),
    ),
  ).slice(0, 20);

  if (!brand || brand.length > 40) return { ok: false, message: "Completá la marca." };
  if (!model || model.length > 40) return { ok: false, message: "Completá el modelo." };
  if (!Number.isInteger(puffs) || puffs < 1) {
    return { ok: false, message: "Los puffs tienen que ser un número mayor a 0." };
  }
  if (!Number.isInteger(price) || price < 1) {
    return { ok: false, message: "El precio tiene que ser un número mayor a 0." };
  }
  if (flavors.length === 0) {
    return { ok: false, message: "Agregá al menos un sabor (Enter para sumar)." };
  }

  const [created] = await db
    .insert(products)
    .values({
      brand,
      model,
      puffs,
      priceArs: price,
      flavors,
      renderMode: "color",
      active: true,
    })
    .returning({ id: products.id });

  // Automatic pipeline: image search -> download -> store -> 3D texture.
  const result = await runImageAutomation({ id: created.id, brand, model });
  refresh();

  if (result.status === "image_found") {
    return {
      ok: true,
      message: `✅ ${brand} ${model} publicado con imagen y modelo 3D automático.`,
    };
  }
  return {
    ok: true,
    message: `✅ ${brand} ${model} publicado con modelo 3D del color del sabor. (${result.detail})`,
  };
}

export async function importProductsAction(text: string): Promise<ActionResult> {
  await requireAdmin();
  await ensureDb();

  const parsed = parseProductImport(text);
  if (!parsed.products) return { ok: false, message: parsed.error };

  const existingRows = await db.select({ brand: products.brand, model: products.model }).from(products);
  const existing = new Set(
    existingRows.map(
      ({ brand, model }) =>
        `${brand.toLocaleLowerCase("es-AR")}|${model.toLocaleLowerCase("es-AR")}`,
    ),
  );
  const duplicates = parsed.products.filter((item) =>
    existing.has(`${item.brand.toLocaleLowerCase("es-AR")}|${item.model.toLocaleLowerCase("es-AR")}`),
  );
  if (duplicates.length > 0) {
    const names = duplicates
      .slice(0, 5)
      .map((item) => `${item.brand} ${item.model} (línea ${item.line})`)
      .join(", ");
    const remaining = duplicates.length - 5;
    return {
      ok: false,
      message: `Ya existen: ${names}${remaining > 0 ? ` y ${remaining} más` : ""}. No se importó ningún producto.`,
    };
  }

  await db.insert(products).values(
    parsed.products.map(({ brand, model, puffs, priceArs, flavors }) => ({
      brand,
      model,
      puffs,
      priceArs,
      flavors,
      renderMode: "color",
      active: true,
    })),
  );
  refresh();

  return {
    ok: true,
    message: `${parsed.products.length} producto(s) agregados y publicados. El modelo 3D de color se genera automáticamente; podés buscar una imagen desde la tabla de productos.`,
  };
}

export async function updatePriceAction(
  id: string,
  price: number,
): Promise<ActionResult> {
  await requireAdmin();
  if (!Number.isInteger(price) || price < 1 || price > 100_000_000) {
    return { ok: false, message: "Precio inválido." };
  }
  await db.update(products).set({ priceArs: price }).where(eq(products.id, id));
  refresh();
  return { ok: true, message: "Precio actualizado." };
}

export async function toggleActiveAction(
  id: string,
  active: boolean,
): Promise<ActionResult> {
  await requireAdmin();
  await db.update(products).set({ active }).where(eq(products.id, id));
  refresh();
  return { ok: true, message: active ? "Producto activo." : "Producto sin stock." };
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const [row] = await db
    .select({ imageUrl: products.imageUrl })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  await db.delete(products).where(eq(products.id, id));
  await deleteStoredImage(row?.imageUrl ?? null);
  refresh();
  return { ok: true, message: "Producto eliminado." };
}

export async function retryImageAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!row) return { ok: false, message: "Producto no encontrado." };
  const result = await runImageAutomation({
    id: row.id,
    brand: row.brand,
    model: row.model,
  });
  refresh();
  return {
    ok: result.status === "image_found",
    message:
      result.status === "image_found"
        ? "Imagen encontrada y aplicada al modelo 3D."
        : `Sin imagen: ${result.detail}`,
  };
}
