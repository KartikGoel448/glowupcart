import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — GlowCart` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/products" search={{ category: "all" }} className="inline-block mt-4 text-primary font-semibold">← Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground">Retry</button>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" search={{ category: "all" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden bg-secondary aspect-square shadow-card">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-sun" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">· 240+ reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold">{inr(product.price)}</span>
            {product.oldPrice && <span className="text-lg line-through text-muted-foreground">{inr(product.oldPrice)}</span>}
            {product.oldPrice && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-accent-foreground">
                Save {inr(product.oldPrice - product.price)}
              </span>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-soft border border-border text-sm">
            🎓 Students: use <span className="font-bold text-primary">STUDENT15</span> at checkout for 15% off.
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-secondary">−</button>
              <span className="px-4 font-semibold w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-secondary">+</button>
            </div>
            <button
              onClick={() => {
                add(product.id, qty);
                toast.success(`Added ${qty} × ${product.name}`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-pop hover:opacity-95"
            >
              <ShoppingBag className="h-5 w-5" /> Add to cart
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
            {[
              { icon: Truck, label: "Free shipping" },
              { icon: RefreshCw, label: "30-day returns" },
              { icon: ShieldCheck, label: "2-yr warranty" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-3">
                <f.icon className="h-4 w-4 mx-auto text-primary" />
                <p className="mt-1 font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
