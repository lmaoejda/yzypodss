"use client";

import { useState, useTransition } from "react";
import { formatARS, formatNumber } from "@/lib/format";
import { flavorColor } from "@/lib/flavors";
import type { AdminProduct } from "@/lib/types";
import {
  deleteProductAction,
  retryImageAction,
  toggleActiveAction,
  updatePriceAction,
} from "./actions";

function Row({ product }: { product: AdminProduct }) {
  const [price, setPrice] = useState(String(product.priceArs));
  const [note, setNote] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = Number(price) !== product.priceArs;

  function run(fn: () => Promise<{ ok: boolean; message: string }>) {
    startTransition(async () => {
      const res = await fn();
      setNote(res.message);
    });
  }

  const savePrice = () => {
    const value = Number(price.replace(/\D/g, ""));
    run(() => updatePriceAction(product.id, value));
  };

  return (
    <tr className={`border-t-2 border-black align-top ${product.active ? "" : "bg-neutral-200"}`}>
      <td className="p-3">
        <div className="flex items-center gap-3">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt="" className="h-12 w-12 border-2 border-black object-cover" />
          ) : (
            <span
              className="block h-12 w-12 border-2 border-black"
              style={{ background: flavorColor(product.flavors[0] ?? product.brand) }}
            />
          )}
          <div>
            <p className="font-display text-xl uppercase leading-none">
              {product.brand} {product.model}
            </p>
            <p className="text-xs font-bold text-neutral-600">
              {formatNumber(product.puffs)} puffs · {product.flavors.length} sabor(es)
            </p>
            <span
              className={`mt-1 inline-block px-1.5 py-0.5 text-[10px] font-black uppercase ${
                product.renderMode === "texture" ? "bg-black text-white" : "bg-red-600 text-white"
              }`}
            >
              3D: {product.renderMode === "texture" ? "con imagen" : "color"}
            </span>
          </div>
        </div>
        {note ? <p className="mt-2 text-xs font-bold text-neutral-700">{note}</p> : null}
      </td>
      <td className="p-3">
        <div className="flex items-center gap-1">
          <span className="font-black">$</span>
          <input
            aria-label={`Precio de ${product.brand} ${product.model}`}
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && dirty && savePrice()}
            className="w-24 border-2 border-black px-2 py-2 font-black outline-none focus:border-red-600"
          />
          <button
            onClick={savePrice}
            disabled={!dirty || pending}
            className="bg-black px-2 py-2 text-xs font-black uppercase text-white hover:bg-red-600 disabled:opacity-30"
          >
            OK
          </button>
        </div>
        <p className="mt-1 text-xs font-bold text-neutral-600">Actual: {formatARS(product.priceArs)}</p>
      </td>
      <td className="p-3">
        <button
          role="switch"
          aria-checked={product.active}
          aria-label="Activo"
          disabled={pending}
          onClick={() => run(() => toggleActiveAction(product.id, !product.active))}
          className={`relative h-8 w-14 border-2 border-black transition ${product.active ? "bg-red-600" : "bg-white"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 bg-black transition-all ${product.active ? "left-[30px]" : "left-0.5"}`}
          />
        </button>
        <p className="mt-1 text-[10px] font-black uppercase">{product.active ? "Activo" : "Sin stock"}</p>
      </td>
      <td className="p-3">
        <div className="flex flex-col gap-2">
          <button
            disabled={pending}
            onClick={() => run(() => retryImageAction(product.id))}
            className="border-2 border-black px-2 py-1.5 text-xs font-black uppercase hover:bg-black hover:text-white disabled:opacity-50"
          >
            {pending ? "Procesando…" : "Buscar imagen"}
          </button>
          <button
            disabled={pending}
            onClick={() => {
              if (window.confirm(`¿Eliminar ${product.brand} ${product.model}?`)) {
                run(() => deleteProductAction(product.id));
              }
            }}
            className="bg-red-600 px-2 py-1.5 text-xs font-black uppercase text-white hover:bg-black disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

export function ProductsTable({ products }: { products: AdminProduct[] }) {
  return (
    <section className="border-4 border-black bg-white">
      <h2 className="p-4 font-display text-3xl uppercase">Productos ({products.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-black text-xs uppercase text-white">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <Row key={p.id} product={p} />
            ))}
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center font-bold text-neutral-600">
                  Todavía no hay productos.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
