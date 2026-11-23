"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { productId: string; flavor: string; quantity: number };

type CartState = {
  items: CartItem[];
  open: boolean;
  name: string;
  zone: string;
  add: (productId: string, flavor: string, quantity?: number) => void;
  setQuantity: (productId: string, flavor: string, quantity: number) => void;
  remove: (productId: string, flavor: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  setName: (name: string) => void;
  setZone: (zone: string) => void;
};

const same = (a: CartItem, productId: string, flavor: string) =>
  a.productId === productId && a.flavor === flavor;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      name: "",
      zone: "",
      add: (productId, flavor, quantity = 1) =>
        set((s) => {
          const exists = s.items.some((i) => same(i, productId, flavor));
          return {
            items: exists
              ? s.items.map((i) =>
                  same(i, productId, flavor)
                    ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
                    : i,
                )
              : [...s.items, { productId, flavor, quantity }],
          };
        }),
      setQuantity: (productId, flavor, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => !same(i, productId, flavor))
              : s.items.map((i) =>
                  same(i, productId, flavor)
                    ? { ...i, quantity: Math.min(99, quantity) }
                    : i,
                ),
        })),
      remove: (productId, flavor) =>
        set((s) => ({ items: s.items.filter((i) => !same(i, productId, flavor)) })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
      setName: (name) => set({ name }),
      setZone: (zone) => set({ zone }),
    }),
    {
      name: "yeezy_cart_v1",
      partialize: (s) => ({ items: s.items, name: s.name, zone: s.zone }),
    },
  ),
);
