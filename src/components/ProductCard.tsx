import { Link } from "@tanstack/react-router";
import { Star, Plus } from "lucide-react";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-pop transition-all duration-300 hover:-translate-y-1">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      {product.tag && (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gradient-hero text-primary-foreground shadow-soft">
          {product.tag}
        </span>
      )}
      <button
        onClick={() => {
          add(product.id);
          toast.success(`${product.name} added to cart`);
        }}
        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur hover:bg-primary hover:text-primary-foreground grid place-items-center shadow-soft transition"
        aria-label="Add to cart"
      >
        <Plus className="h-4 w-4" />
      </button>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <Link to="/products/$id" params={{ id: product.id }} className="block mt-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-1 hover:text-primary transition">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-current text-sun" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-xs line-through text-muted-foreground">${product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
