import type { ReactNode } from "react";
import { getActiveProducts } from "@/lib/products";
import { AgeGate } from "@/components/AgeGate";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingCart } from "@/components/FloatingCart";
import { Header } from "@/components/Header";
import { ProductsProvider } from "@/components/ProductsProvider";
import { SkyBackground } from "@/components/SkyBackground";

// Prices/products change from the admin: always render fresh data.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const products = await getActiveProducts();
  return (
    <ProductsProvider products={products}>
      <div className="site-root relative">
        <SkyBackground />
        <Header />
        <main>{children}</main>
        <CartDrawer />
        <FloatingCart />
      </div>
      <AgeGate />
    </ProductsProvider>
  );
}
