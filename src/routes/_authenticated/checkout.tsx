import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — GlowCart" },
    { name: "description", content: "Complete your GlowCart order securely." },
    { property: "og:title", content: "Checkout — GlowCart" },
    { property: "og:description", content: "Complete your GlowCart order securely." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { user } = useAuth();
  const { detailedLines, subtotal, discount, total, clear } = useCart();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState({ fullName: "", line1: "", city: "", state: "", postalCode: "", phone: "" });
  const shipping = subtotal >= 2000 ? 0 : 99;
  const grandTotal = Math.round(total + shipping);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!user || detailedLines.length === 0) return;
    setBusy(true);
    const { data: order, error: orderError } = await supabase.from("orders").insert({ user_id: user.id, status: "pending", total_amount: grandTotal, shipping_address: address }).select("id").single();
    if (orderError || !order) {
      toast.error("We couldn't create your order. Please try again.");
      setBusy(false);
      return;
    }
    const { error: itemError } = await supabase.from("order_items").insert(detailedLines.map(({ product, qty }) => ({ order_id: order.id, product_id: product.id, quantity: qty, price_at_purchase: product.price, selected_size: null, selected_color: null })));
    if (itemError) {
      toast.error("We couldn't save your order items. Please try again.");
      setBusy(false);
      return;
    }
    clear();
    toast.success("Order placed successfully!");
    navigate({ to: "/orders", replace: true });
  }

  if (detailedLines.length === 0) return <div className="mx-auto max-w-3xl px-4 py-24 text-center"><h1 className="text-3xl font-extrabold">Your cart is empty</h1><Link to="/products" search={{ category: "all", brand: undefined }} className="mt-6 inline-flex rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background">Continue shopping</Link></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-xs uppercase tracking-brand text-muted-foreground">Secure checkout</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Shipping details</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={placeOrder} className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            {([ ["fullName", "Full name"], ["phone", "Phone number"], ["line1", "Address"], ["city", "City"], ["state", "State"], ["postalCode", "PIN code"] ] as const).map(([key, label]) => (
              <label key={key} className={key === "line1" ? "sm:col-span-2 text-sm font-semibold" : "text-sm font-semibold"}>{label}<input required value={address[key]} onChange={(e) => setAddress((current) => ({ ...current, [key]: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
            ))}
          </div>
          <button disabled={busy} className="mt-7 w-full rounded-xl bg-gradient-hero px-6 py-3 font-bold text-primary-foreground shadow-pop disabled:opacity-60">{busy ? "Placing order…" : `Place order · ${inr(grandTotal)}`}</button>
        </form>
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-bold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">{detailedLines.map(({ product, qty, lineTotal }) => <div key={product.id} className="flex justify-between gap-3"><span className="min-w-0 truncate">{product.name} × {qty}</span><span className="font-semibold">{inr(lineTotal)}</span></div>)}</div>
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(subtotal)}</span></div>{discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>−{inr(discount)}</span></div>}<div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping ? inr(shipping) : "Free"}</span></div><div className="flex justify-between pt-2 text-base font-extrabold"><span>Total</span><span>{inr(grandTotal)}</span></div></div>
        </aside>
      </div>
    </div>
  );
}