"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import { formatARS } from "@/lib/format";
import { CartIcon } from "./icons";
import { useProducts } from "./ProductsProvider";
import { useMounted } from "./useMounted";

/** Always-visible floating cart button (mobile-first, bottom right). */
export function FloatingCart() {
  const mounted = useMounted();
  const products = useProducts();
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);

  let count = 0;
  let total = 0;
  for (const item of items) {
    const p = products.find((x) => x.id === item.productId);
    if (!p) continue;
    count += item.quantity;
    total += p.priceArs * item.quantity;
  }

  const [bumpKey, setBumpKey] = useState(0);
  const prev = useRef(count);
  useEffect(() => {
    if (count > prev.current) {
      const t = setTimeout(() => setBumpKey((k) => k + 1), 0);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  if (open) return null;
  const shown = mounted ? count : 0;

  return (
    <button
      key={bumpKey}
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrito (${shown} productos)`}
      className={`floating-cart fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 flex min-h-12 max-w-[calc(100vw-1.5rem)] items-center gap-2 border-2 border-white bg-red-600 py-2.5 pl-3 pr-3 font-display text-base uppercase text-white shadow-[4px_4px_0_#000] transition hover:bg-black sm:bottom-4 sm:right-4 sm:px-4 sm:py-3 sm:text-xl ${bumpKey ? "bump" : ""}`}
    >
      <CartIcon className="h-6 w-6" />
      {shown > 0 ? (
        <span>
          {shown} · {formatARS(total)}
        </span>
      ) : (
        <span>Carrito</span>
      )}
    </button>
  );
}
