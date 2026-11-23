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
