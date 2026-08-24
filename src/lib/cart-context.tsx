import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { catalogQueryOptions, type Product } from "./catalog";

export interface CartLine {
  /** product slug */
  productId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  promo: string | null;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  detailedLines: { product: Product; qty: number; lineTotal: number }[];
}

export const PROMO_CODES: Record<string, { rate: number; label: string; min?: number }> = {
  STUDENT15: { rate: 0.15, label: "15% off — Students" },
  NEWUSER10: { rate: 0.10, label: "10% off — First order" },
  FESTIVE20: { rate: 0.20, label: "20% off — Festive sale", min: 5000 },
  COLLEGE25: { rate: 0.25, label: "25% off — College kit", min: 2500 },
};

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: catalog } = useQuery(catalogQueryOptions);
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cart:lines") || "[]");
    } catch {
      return [];
    }
  });
  const [promo, setPromo] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("cart:promo");
  });

  useEffect(() => {
    localStorage.setItem("cart:lines", JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    if (promo) localStorage.setItem("cart:promo", promo);
    else localStorage.removeItem("cart:promo");
  }, [promo]);

  const value = useMemo<CartState>(() => {
    const products = catalog ?? [];
    const add = (productId: string, qty = 1) =>
      setLines((prev) => {
        const found = prev.find((l) => l.productId === productId);
        if (found) return prev.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { productId, qty }];
      });
    const remove = (productId: string) =>
      setLines((prev) => prev.filter((l) => l.productId !== productId));
    const setQty = (productId: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.productId !== productId)
          : prev.map((l) => (l.productId === productId ? { ...l, qty } : l)),
      );
    const clear = () => setLines([]);

    const detailedLines = lines
      .map((l) => {
        const product = products.find((p) => p.slug === l.productId);
        if (!product) return null;
        return { product, qty: l.qty, lineTotal: product.price * l.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];

    const subtotal = detailedLines.reduce((s, l) => s + l.lineTotal, 0);
    const activePromo = promo && PROMO_CODES[promo] ? PROMO_CODES[promo] : null;
    const discount = activePromo && subtotal >= (activePromo.min ?? 0)
      ? +(subtotal * activePromo.rate).toFixed(2)
      : 0;
    const total = +(subtotal - discount).toFixed(2);
    const itemCount = lines.reduce((s, l) => s + l.qty, 0);

    const applyPromo = (code: string) => {
      const c = code.trim().toUpperCase();
      const p = PROMO_CODES[c];
      if (!p) return { ok: false, message: "Invalid code. Try STUDENT15, NEWUSER10, FESTIVE20 or COLLEGE25." };
      if (p.min && subtotal < p.min) {
        return { ok: false, message: `Add ${`₹${(p.min - subtotal).toLocaleString("en-IN")}`} more to use ${c}.` };
      }
      setPromo(c);
      return { ok: true, message: `${c} applied — ${p.label}!` };
    };
    const clearPromo = () => setPromo(null);

    return {
      lines,
      add,
      remove,
      setQty,
      clear,
      promo,
      applyPromo,
      clearPromo,
      subtotal,
      discount,
      total,
      itemCount,
      detailedLines,
    };
  }, [lines, promo, catalog]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
