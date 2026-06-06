import { Link } from "@tanstack/react-router";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gradient">Glow</span>Cart
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link to="/" className="px-3 py-2 rounded-lg hover:bg-secondary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/products" search={{ category: "all" }} className="px-3 py-2 rounded-lg hover:bg-secondary" activeProps={{ className: "text-primary" }}>Shop</Link>
          <Link to="/products" search={{ category: "clothes" }} className="px-3 py-2 rounded-lg hover:bg-secondary">Clothes</Link>
          <Link to="/products" search={{ category: "mobiles" }} className="px-3 py-2 rounded-lg hover:bg-secondary">Mobiles</Link>
          <Link to="/products" search={{ category: "laptops" }} className="px-3 py-2 rounded-lg hover:bg-secondary">Laptops</Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-sunset text-primary-foreground shadow-soft">
            🎓 STUDENT15 — 15% off
          </span>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition shadow-soft"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-semibold">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-foreground text-background text-[11px] font-bold grid place-items-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
