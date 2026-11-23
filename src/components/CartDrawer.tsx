"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatARS } from "@/lib/format";
import { buildOrderMessage, whatsappLink, type OrderLine } from "@/lib/whatsapp";
import { CloseIcon, TrashIcon, WhatsAppIcon } from "./icons";
import { useProducts } from "./ProductsProvider";

export function CartDrawer() {
  const products = useProducts();
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const name = useCart((s) => s.name);
  const zone = useCart((s) => s.zone);
  const setName = useCart((s) => s.setName);
  const setZone = useCart((s) => s.setZone);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  const lines = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ item, product }] : [];
  });
  const total = lines.reduce((a, l) => a + l.product.priceArs * l.item.quantity, 0);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const checkout = () => {
    const orderLines: OrderLine[] = lines.map(({ item, product }) => ({
      name: `${product.brand} ${product.model}`,
      flavor: item.flavor,
      quantity: item.quantity,
      unitPrice: product.priceArs,
    }));
    const url = whatsappLink(buildOrderMessage(orderLines, { name, zone }));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrito"
            className="cart-panel absolute right-0 top-0 flex h-[100dvh] w-full max-w-md flex-col border-l-4 border-black bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b-4 border-black bg-black px-4 py-3 text-white">
              <h2 className="title-reveal slash-cut font-display text-3xl uppercase leading-none">Tu pedido</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar carrito" className="p-2 hover:text-red-500">
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {lines.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-3xl uppercase">Carrito vacío</p>
                  <p className="cart-muted mt-2 text-sm font-bold text-neutral-600">Elegí un pod y un sabor para empezar.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-5 bg-black px-5 py-3 font-display text-xl uppercase text-white hover:bg-red-600"
                  >
                    Ver catálogo
                  </button>
                </div>
              ) : (
                <ul className="divide-y-2 divide-black/10">
                  {lines.map(({ item, product }) => (
                    <li key={`${item.productId}|${item.flavor}`} className="cart-item py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-display text-2xl uppercase leading-none">
                            {product.brand} {product.model}
                          </p>
                          <p className="mt-1 text-sm font-extrabold text-red-600">{item.flavor}</p>
                        </div>
                        <p className="shrink-0 font-display text-2xl leading-none">
                          {formatARS(product.priceArs * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="cart-quantity flex items-center border-2 border-black">
                          <button
                            aria-label="Restar uno"
                            onClick={() => setQuantity(item.productId, item.flavor, item.quantity - 1)}
                            className="h-9 w-9 text-xl font-black hover:bg-black hover:text-white"
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-lg font-black">{item.quantity}</span>
                          <button
                            aria-label="Sumar uno"
                            onClick={() => setQuantity(item.productId, item.flavor, item.quantity + 1)}
                            className="h-9 w-9 text-xl font-black hover:bg-black hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.productId, item.flavor)}
                          className="cart-muted flex min-h-11 items-center gap-1 text-xs font-black uppercase text-neutral-600 hover:text-red-600"
                        >
                          <TrashIcon /> Quitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <div className="cart-summary border-t-4 border-black bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    aria-label="Tu nombre"
                    autoComplete="name"
                    className="cart-input min-w-0 border-2 border-black px-3 py-2.5 text-base font-bold outline-none focus:border-red-600"
                  />
                  <input
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    placeholder="Zona de envío"
                    aria-label="Zona de envío"
                    className="cart-input min-w-0 border-2 border-black px-3 py-2.5 text-base font-bold outline-none focus:border-red-600"
                  />
                </div>
                <div className="my-3 flex items-end justify-between">
                  <span className="font-display text-2xl uppercase">Total</span>
                  <span className="font-display text-5xl leading-none">{formatARS(total)}</span>
                </div>
                <button
                  onClick={checkout}
                  className="flex w-full items-center justify-center gap-2 bg-red-600 px-3 py-4 font-display text-xl uppercase leading-tight tracking-wide text-white transition hover:bg-black sm:text-2xl"
                >
                  <WhatsAppIcon className="h-6 w-6 shrink-0" />
                  Finalizar pedido por WhatsApp
                </button>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
