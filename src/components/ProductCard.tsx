"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatARS, formatNumber } from "@/lib/format";
import type { PublicProduct } from "@/lib/types";
import { PodViewport } from "./pod/PodViewport";
import { CartIcon, SearchIcon } from "./icons";
import { ProductDetailDialog } from "./ProductDetailDialog";

export function ProductCard({ product, index }: { product: PublicProduct; index: number }) {
  const [flavor, setFlavor] = useState(product.flavors[0] ?? "");
  const [added, setAdded] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const detailTriggerRef = useRef<HTMLButtonElement>(null);
  const add = useCart((s) => s.add);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const activeFlavor = product.flavors.includes(flavor) ? flavor : (product.flavors[0] ?? "");

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    detailTriggerRef.current?.focus();
  }, []);

  const onAdd = () => {
    add(product.id, activeFlavor, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 2) * 0.08 }}
      className="product-card flex min-w-0 flex-col border-2 border-black/15 bg-white shadow-[4px_4px_0_#111]"
    >
      <div className="product-image relative h-44 overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 sm:h-64 lg:h-72">
        <PodViewport
          imageUrl={product.renderMode === "texture" ? product.imageUrl : null}
          flavor={activeFlavor}
          brand={product.brand}
          model={product.model}
          puffs={product.puffs}
          paused={detailOpen}
        />
        <span className="pointer-events-none absolute right-3 top-3 bg-black px-2 py-1 text-[10px] font-black uppercase text-white">
          {formatNumber(product.puffs)} puff
        </span>
        {/* soft floor shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-1/2 h-4 w-28 -translate-x-1/2 rounded-full bg-black/25 blur-md"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-2.5 sm:gap-3 sm:p-4">
        <div>
          <h3 className="product-title line-clamp-2 min-h-10 text-xs font-black leading-snug sm:text-sm">
            Pod descartable {product.brand} {product.model} {formatNumber(product.puffs)} puffs
          </h3>
          {product.renderMode === "texture" ? (
            <p className="product-caption mt-1 text-[10px] font-bold uppercase text-neutral-500 sm:text-[11px]">* Imagen referencial</p>
          ) : null}
        </div>

        {product.flavors.length > 0 ? (
          <div>
            <p className="product-caption mb-1.5 text-[10px] font-black uppercase sm:text-xs">Elegí tu sabor</p>
            <div className="flavor-scroll -mx-1 flex flex-nowrap gap-1 overflow-x-auto px-1 pb-1" role="group" aria-label="Sabores">
              {product.flavors.map((f) => {
                const selected = f === activeFlavor;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFlavor(f)}
                    className={`product-flavor min-h-9 shrink-0 border border-black px-2 py-1.5 text-left text-[10px] font-extrabold uppercase leading-tight transition ${
                      selected ? "bg-red-600 text-white" : "bg-white text-black hover:bg-neutral-200"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-1">
          <p className="product-price text-lg font-black leading-none tracking-tight sm:text-2xl">
            {formatARS(product.priceArs)}
          </p>
          <div className="mt-3 flex items-center gap-2 sm:mt-4">
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Agregar ${product.brand} ${product.model} al carrito`}
              className={`flex h-11 w-11 items-center justify-center border border-black transition active:scale-[0.96] sm:h-12 sm:w-12 ${
                added ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-600 hover:text-white"
              }`}
            >
              {added ? "✓" : <CartIcon className="h-5 w-5" />}
            </button>
            <button
              ref={detailTriggerRef}
              type="button"
              onClick={() => setDetailOpen(true)}
              aria-label={`Ver ${product.brand} ${product.model} en detalle`}
              className="product-detail-trigger flex h-11 w-11 items-center justify-center gap-2 border border-black bg-white text-black transition hover:bg-black hover:text-white sm:h-12 sm:w-auto sm:px-3"
            >
              <SearchIcon />
              <span className="hidden text-xs font-black uppercase sm:inline">Detalle</span>
            </button>
            <span className="product-added-label min-w-0 text-xs font-black uppercase text-red-600" aria-live="polite">
              {added ? "Agregado" : ""}
            </span>
          </div>
        </div>
      </div>
      <ProductDetailDialog
        product={product}
        flavor={activeFlavor}
        added={added}
        open={detailOpen}
        onClose={closeDetail}
        onFlavorChange={setFlavor}
        onAdd={onAdd}
      />
    </motion.article>
  );
}
