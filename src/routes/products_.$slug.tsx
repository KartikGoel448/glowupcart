import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogQueryOptions, getProductBySlug } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products_/$slug")({
  loader: async ({ context, params }) => {
    const list = await context.queryClient.ensureQueryData(catalogQueryOptions);
    const product = getProductBySlug(list, params.slug);
    if (!product) throw notFound();
    return { name: product.name, description: product.description, image: product.image };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} — GlowCart` },
            { name: "description", content: loaderData.description.slice(0, 155) },
            { property: "og:title", content: `${loaderData.name} — GlowCart` },
            { property: "og:description", content: loaderData.description.slice(0, 155) },
            { property: "og:type", content: "product" },
            { name: "twitter:card", content: "summary_large_image" },
          ],
        }
      : { meta: [{ title: "Unavailable — GlowCart" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/products" search={{ category: "all", brand: undefined }} className="inline-block mt-4 text-primary font-semibold">← Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm mt-2">We couldn't load this product. Please try again.</p>
        <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground">Retry</button>
      </div>
    );
  },
  component: ProductDetail,
});

const swatchHex: Record<string, string> = {
  black: "#1a1a1a", onyx: "#1a1a1a", charcoal: "#36393d", graphite: "#4a4a4a",
  white: "#f5f5f2", "off white": "#f1ece1", cream: "#f1ece1", ivory: "#f3efe6",
  silver: "#c9ccd1", grey: "#9a9a9a", gray: "#9a9a9a", titanium: "#8d8b87",
  navy: "#1f2a44", indigo: "#3b4b7a", blue: "#3f6fd8", sky: "#7aa6d6",
  sage: "#a3b18a", forest: "#2d4a3a", green: "#3f7d52", olive: "#6b7250",
  red: "#c0392b", clay: "#b86a4b", beige: "#ddd0b8", sand: "#d8c8a9",
  pink: "#e6a5b8", purple: "#7c5cbf", gold: "#c9a227", "mid wash": "#6f8db3",
};
const hexFor = (name: string) => swatchHex[name.trim().toLowerCase()] ?? "#b9b4ab";

const sampleReviews = [
  { name: "Ananya P.", rating: 5, date: "2 weeks ago", text: "Exactly as described. Quality is unreal for the price." },
  { name: "Vikram J.", rating: 5, date: "1 month ago", text: "Shipped in 2 days. Packaging was super premium. Definitely buying again." },
  { name: "Sneha R.", rating: 4, date: "1 month ago", text: "Loved it overall — only wish there were more colour options at launch." },
];

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: products } = useSuspenseQuery(catalogQueryOptions);
  const product = getProductBySlug(products, slug)!;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const sizes = product.sizes.length ? product.sizes : ["One size"];
  const colors = product.colors.length ? product.colors : ["Standard"];
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[0]);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const selectedColourImage = product.imageVariants.find(
    (image) => image.colour?.trim().toLowerCase() === color.trim().toLowerCase(),
  );
  const displayedImage = selectedColourImage?.url ?? product.images[0];

  useEffect(() => {
    setColor(colors[0]);
    setSize(sizes[0]);
    setActive(0);
    setQty(1);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" search={{ category: "all", brand: undefined }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        <div>
          <div
            className="rounded-3xl overflow-hidden bg-secondary aspect-square shadow-card cursor-zoom-in"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={displayedImage}
              alt={`${product.name} — ${color} — view ${active + 1}`}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = `https://picsum.photos/seed/${encodeURIComponent(product.slug)}/1200/1200`;
                }
              }}
              style={{
                transform: zoom ? "scale(1.9)" : "scale(1)",
                transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
              }}
              className="h-full w-full object-cover transition-transform duration-200"
            />
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                   onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={active === i}
                  className={
                    "aspect-square overflow-hidden rounded-xl bg-secondary border-2 transition " +
                    (active === i ? "border-foreground" : "border-transparent hover:border-foreground/40")
                  }
                >
                  <img src={src} alt={`${product.name} gallery view ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={"h-4 w-4 " + (i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground/30")} />
              ))}
              <span className="font-semibold ml-1">{product.rating.toFixed(1)}</span>
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

          {/* Colors */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] tracking-brand uppercase font-semibold">Colour</p>
              <p className="text-xs text-muted-foreground">{color}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => {
                    setColor(c);
                    const matchingImage = product.imageVariants.findIndex(
                      (image) => image.colour?.trim().toLowerCase() === c.trim().toLowerCase(),
                    );
                    if (matchingImage >= 0) setActive(matchingImage);
                  }}
                  aria-label={c}
                  aria-pressed={color === c}
                  className={
                    "h-9 w-9 rounded-full border-2 transition " +
                    (color === c ? "border-foreground scale-110 ring-2 ring-offset-2 ring-foreground/20" : "border-border hover:border-foreground/50")
                  }
                  style={{ backgroundColor: hexFor(c) }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] tracking-brand uppercase font-semibold">
                {product.category === "clothes" ? "Size" : product.category === "mobiles" || product.category === "tablets" ? "Storage" : product.category === "laptops" ? "Configuration" : "Option"}
              </p>
              <span className="text-[11px] tracking-brand uppercase text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={
                    "px-4 py-2 text-xs font-semibold border transition rounded-md " +
                    (size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
                add(product.slug, qty);
                toast.success(`Added ${qty} × ${product.name} (${color}, ${size})`);
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

      {/* Reviews */}
      <section className="mt-20 border-t border-border pt-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-brand uppercase text-muted-foreground">Reviews</p>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">What buyers say</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={"h-4 w-4 " + (i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground/30")} />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating.toFixed(1)} / 5</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {sampleReviews.map((r) => (
            <article key={r.name} className="border border-border p-6 bg-card">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={"h-3.5 w-3.5 " + (i < r.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30")} />
                ))}
              </div>
              <p className="font-serif text-base leading-snug">"{r.text}"</p>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-[11px] tracking-brand uppercase text-muted-foreground">{r.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
