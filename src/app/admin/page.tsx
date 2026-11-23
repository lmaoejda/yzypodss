import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllProducts, getRecentLogs } from "@/lib/products";
import { logoutAction } from "./actions";
import { NewProductForm } from "./NewProductForm";
import { ProductsTable } from "./ProductsTable";
import { LogsList } from "./LogsList";

export const dynamic = "force-dynamic";
// The automatic image pipeline can take a while (search + download + retries).
export const maxDuration = 60;

export default async function AdminPage() {
  await requireAdmin();
  const [items, logs] = await Promise.all([getAllProducts(), getRecentLogs(20)]);
  const hasKey = Boolean(process.env.SERPAPI_KEY);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="YEEZY PODS" width={48} height={48} className="rounded-full" />
          <h1 className="title-reveal font-display text-3xl uppercase leading-none">Panel de productos</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase hover:bg-black hover:text-white">
            Ver tienda
          </Link>
          <form action={logoutAction}>
            <button className="bg-black px-3 py-2 text-xs font-black uppercase text-white hover:bg-red-600">
              Salir
            </button>
          </form>
        </div>
      </header>

      {!hasKey ? (
        <p className="border-2 border-black bg-yellow-300 p-3 text-sm font-bold">
          ⚠️ SERPAPI_KEY no está configurada: los productos nuevos se publican con el modelo 3D del color del sabor
          (sin buscar imagen).
        </p>
      ) : null}

      <NewProductForm />
      <ProductsTable products={items} />
      <LogsList logs={logs} />
    </main>
  );
}
