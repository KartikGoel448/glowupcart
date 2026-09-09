import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [
    { title: "My Orders — GlowCart" },
    { name: "description", content: "Track your GlowCart orders and purchases." },
    { property: "og:title", content: "My Orders — GlowCart" },
    { property: "og:description", content: "Track your GlowCart orders and purchases." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: OrdersPage,
});

function OrdersPage() {
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, status, total_amount, shipping_address, created_at, order_items(id, quantity, price_at_purchase, selected_size, selected_color, products(name, slug))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (ordersQuery.isPending) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-muted-foreground">Loading your orders…</div>;
  if (ordersQuery.isError) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-muted-foreground">We couldn't load your orders. Please try again.</div>;
  const orders = ordersQuery.data ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <p className="text-xs uppercase tracking-brand text-muted-foreground">Account</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Your orders</h1>
      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
          <Package className="mx-auto h-8 w-8 text-muted-foreground" />
          <h2 className="mt-4 font-bold">No orders yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your completed purchases will appear here.</p>
          <Link to="/products" search={{ category: "all", brand: undefined }} className="mt-5 inline-flex rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background">Browse products</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                <div><p className="text-xs text-muted-foreground">Order placed {new Date(order.created_at).toLocaleDateString("en-IN")}</p><p className="mt-1 font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8).toUpperCase()}</p></div>
                <div className="text-right"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold capitalize">{order.status}</span><p className="mt-2 font-extrabold">{inr(Number(order.total_amount))}</p></div>
              </div>
              <div className="mt-4 space-y-3">
                {order.order_items.map((item) => {
                  const product = Array.isArray(item.products) ? item.products[0] : item.products;
                  return <div key={item.id} className="flex items-center justify-between gap-4 text-sm"><div><p className="font-semibold">{product?.name ?? "Product"}</p><p className="text-xs text-muted-foreground">Qty {item.quantity}{item.selected_size ? ` · ${item.selected_size}` : ""}{item.selected_color ? ` · ${item.selected_color}` : ""}</p></div><span className="font-semibold">{inr(Number(item.price_at_purchase) * item.quantity)}</span></div>;
                })}
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5" /> Purchased items can be reviewed after delivery.</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}