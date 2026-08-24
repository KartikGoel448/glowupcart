import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, Tag, X, CheckCircle2 } from "lucide-react";
import { useCart, PROMO_CODES } from "@/lib/cart-context";
import { inr } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — GlowCart" },
      { name: "description", content: "Review your cart and apply your student discount." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailedLines, setQty, remove, subtotal, discount, total, promo, applyPromo, clearPromo, clear } = useCart();
  const [code, setCode] = useState("");

  if (detailedLines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-hero grid place-items-center text-primary-foreground shadow-pop">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Time to find something bright.</p>
        <Link
          to="/products"
          search={{ category: "all" }}
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-pop"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 2000 ? 0 : 99;
  const grandTotal = Math.round(total + shipping);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Your cart</h1>

      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {detailedLines.map(({ product, qty, lineTotal }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border shadow-card">
              <Link to="/products/$slug" params={{ slug: product.slug }} className="shrink-0">
                <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover bg-secondary" />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                <Link to="/products/$slug" params={{ slug: product.slug }}>
                  <h3 className="font-semibold truncate hover:text-primary">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => setQty(product.slug, qty - 1)} className="px-2 py-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm font-semibold">{qty}</span>
                    <button onClick={() => setQty(product.slug, qty + 1)} className="px-2 py-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => { remove(product.slug); toast(`Removed ${product.name}`); }} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{inr(lineTotal)}</p>
                <p className="text-xs text-muted-foreground">{inr(product.price)} each</p>
              </div>
            </div>
          ))}
          <button onClick={() => { clear(); toast("Cart cleared"); }} className="text-sm text-muted-foreground hover:text-destructive">
            Clear cart
          </button>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
            <h2 className="font-bold text-lg">Order summary</h2>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{inr(subtotal)}</span>
              </div>
              {discount > 0 && promo && (
                <div className="flex justify-between text-primary">
                  <span>{promo} — {PROMO_CODES[promo]?.label}</span>
                  <span className="font-semibold">−{inr(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? "Free" : inr(shipping)}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-xl">{inr(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-5">
              {promo ? (
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-gradient-soft border border-primary/30">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {promo} applied
                  </span>
                  <button onClick={() => { clearPromo(); toast("Promo removed"); }} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const r = applyPromo(code);
                    if (r.ok) { toast.success(r.message); setCode(""); }
                    else toast.error(r.message);
                  }}
                  className="flex gap-2"
                >
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90">
                    Apply
                  </button>
                </form>
              )}
              <div className="mt-4 space-y-1.5">
                <p className="text-[11px] tracking-brand uppercase text-muted-foreground font-semibold">Available coupons</p>
                {Object.entries(PROMO_CODES).map(([c, p]) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCode(c)}
                    className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg border border-dashed border-border hover:border-foreground bg-background/50 text-xs transition"
                  >
                    <span className="font-bold tracking-brand">{c}</span>
                    <span className="text-muted-foreground">{p.label}{p.min ? ` · min ${inr(p.min)}` : ""}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => toast.success("Demo checkout — order placed! 🎉")}
              className="mt-5 w-full px-6 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-bold shadow-pop hover:opacity-95"
            >
              Checkout
            </button>
            <p className="text-[11px] text-center text-muted-foreground mt-3">
              {subtotal < 2000 ? `Add ${inr(2000 - subtotal)} more for free shipping` : "You unlocked free shipping 🎉"}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
