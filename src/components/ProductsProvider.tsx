"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PublicProduct } from "@/lib/types";

const Ctx = createContext<PublicProduct[]>([]);

export function ProductsProvider({
  products,
  children,
}: {
  products: PublicProduct[];
  children: ReactNode;
}) {
  return <Ctx.Provider value={products}>{children}</Ctx.Provider>;
}

export const useProducts = () => useContext(Ctx);
