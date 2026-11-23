import { getActiveProducts } from "@/lib/products";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InfoBlock } from "@/components/InfoBlock";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingBanner } from "@/components/ShippingBanner";

export default async function HomePage() {
  const products = await getActiveProducts();
  const minPrice = products.length ? Math.min(...products.map((p) => p.priceArs)) : null;

  return (
    <>
      <Hero minPrice={minPrice} />
      <ShippingBanner />
      <ProductGrid products={products} />
      <InfoBlock />
      <Footer />
    </>
  );
}
