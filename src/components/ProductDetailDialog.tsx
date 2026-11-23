"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { formatARS, formatNumber } from "@/lib/format";
import type { PublicProduct } from "@/lib/types";
import { CloseIcon, CartIcon } from "./icons";
import { PodViewport } from "./pod/PodViewport";

type Props = {
  product: PublicProduct;
  flavor: string;
  added: boolean;
  open: boolean;
  onClose: () => void;
  onFlavorChange: (flavor: string) => void;
  onAdd: () => void;
};

export function ProductDetailDialog({
  product,
  flavor,
  added,
  open,
  onClose,
  onFlavorChange,
  onAdd,
}: Props) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.querySelector<HTMLButtonElement>(".product-detail-close")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="product-detail-overlay"
          className="product-detail-overlay fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            className="product-detail-dialog relative grid max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl grid-cols-1 overflow-y-auto border-4 border-black bg-white shadow-[8px_8px_0_#e10600] sm:max-h-[calc(100dvh-3rem)] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="product-detail-image relative min-h-[42dvh] bg-gradient-to-b from-neutral-100 to-white sm:min-h-[min(74dvh,620px)]">
              <PodViewport
                imageUrl={product.renderMode === "texture" ? product.imageUrl : null}
                flavor={flavor}
                brand={product.brand}
                model={product.model}
                puffs={product.puffs}
                detail
              />
              <span className="absolute bottom-3 left-3 bg-black/85 px-3 py-2 text-xs font-extrabold uppercase text-white">
                Arrastrá para girar
              </span>
              <button
                type="button"
                className="product-detail-close absolute right-3 top-3 flex h-11 w-11 items-center justify-center border-2 border-white bg-black text-white transition hover:bg-red-600"
                aria-label="Cerrar detalle del producto"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-5 p-4 sm:p-7">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-red-600">Detalle del producto</p>
                <h2 id="product-detail-title" className="mt-2 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
                  {product.brand} <span className="text-red-600">{product.model}</span>
                </h2>
                <p className="product-detail-muted mt-3 text-sm font-bold">
                  Modelo 3D interactivo · {formatNumber(product.puffs)} puffs
                </p>
              </div>

              {product.flavors.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-black uppercase">Elegí tu sabor</p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={item === flavor}
                        onClick={() => onFlavorChange(item)}
                        className={`product-detail-flavor min-h-11 border-2 border-black px-3 py-2 text-left text-xs font-extrabold uppercase transition ${
                          item === flavor ? "bg-red-600 text-white" : "bg-white text-black hover:bg-neutral-200"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-auto border-t-2 border-black/15 pt-4">
                <p className="font-display text-4xl leading-none">{formatARS(product.priceArs)}</p>
                <button
                  type="button"
                  onClick={onAdd}
                  className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 px-4 py-3 font-display text-xl uppercase text-white transition ${
                    added ? "bg-red-600" : "bg-black hover:bg-red-600"
                  }`}
                >
                  {added ? "Agregado" : "Agregar al carrito"}
                  {!added ? <CartIcon /> : null}
                </button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
