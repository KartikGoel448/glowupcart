import { Link } from "@tanstack/react-router";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/format";
import { toast } from "sonner";

const fallbackFor = (p: Product) =>
  `https://picsum.photos/seed/${encodeURIComponent(p.id + p.name)}/800/1000`;

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        preload={false}
        className="block relative aspect-[4/5] overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = fallbackFor(product);
            }
          }}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-brand uppercase font-semibold bg-background text-foreground">
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(product.id);
            toast.success(`${product.name} added`);
          }}
          className="absolute bottom-3 left-3 right-3 py-2.5 bg-background text-foreground text-[11px] tracking-brand uppercase font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
        >
          Quick add
        </button>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] tracking-brand uppercase text-muted-foreground">{product.brand}</p>
          <Link to="/products/$id" params={{ id: product.id }} preload={false}>
            <h3 className="text-sm font-medium mt-1 hover:underline underline-offset-4 line-clamp-1">{product.name}</h3>
          </Link>
        </div>
        <div className="text-right whitespace-nowrap">
          <p className="text-sm font-semibold">{inr(product.price)}</p>
          {product.oldPrice && (
            <p className="text-[11px] line-through text-muted-foreground">{inr(product.oldPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
