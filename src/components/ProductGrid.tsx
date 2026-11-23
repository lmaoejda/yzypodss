import type { PublicProduct } from "@/lib/types";
import { AnimatedHeading } from "./AnimatedHeading";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: PublicProduct[] }) {
  return (
    <section id="catalogo" className="scroll-mt-16 px-3 py-8 sm:px-4 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end gap-x-4 gap-y-1">
          <AnimatedHeading className="slash-cut bg-black px-3 pb-1 pt-2 font-display text-4xl uppercase leading-none text-white sm:text-6xl">
            Catálogo
          </AnimatedHeading>
          <p className="catalog-kicker bg-white/90 px-2 py-1 text-xs font-extrabold uppercase sm:text-sm">Precios en pesos · Pedí por WhatsApp</p>
        </div>

        {products.length === 0 ? (
          <p className="catalog-empty border-4 border-black bg-white p-5 text-center font-display text-2xl uppercase sm:p-6 sm:text-3xl">
            Estamos reponiendo stock. Escribinos por WhatsApp.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
