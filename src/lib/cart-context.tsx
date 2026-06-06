import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export interface CartLine {
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

const STUDENT_CODE = "STUDENT15";
const STUDENT_RATE = 0.15;

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
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
        const product = products.find((p) => p.id === l.productId);
        if (!product) return null;
        return { product, qty: l.qty, lineTotal: product.price * l.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];

    const subtotal = detailedLines.reduce((s, l) => s + l.lineTotal, 0);
    const discount = promo === STUDENT_CODE ? +(subtotal * STUDENT_RATE).toFixed(2) : 0;
    const total = +(subtotal - discount).toFixed(2);
    const itemCount = lines.reduce((s, l) => s + l.qty, 0);

    const applyPromo = (code: string) => {
      const c = code.trim().toUpperCase();
      if (c === STUDENT_CODE) {
        setPromo(c);
        return { ok: true, message: "Student discount applied — 15% off!" };
      }
      return { ok: false, message: "Invalid code. Try STUDENT15 for 15% off." };
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
  }, [lines, promo]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
