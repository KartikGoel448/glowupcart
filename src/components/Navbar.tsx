import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="bg-foreground text-background text-[11px] tracking-brand font-medium text-center py-2 px-4">
        STUDENT DISCOUNT — USE CODE STUDENT15 FOR 15% OFF{" "}
        <ArrowRight className="inline h-3 w-3 ml-1 -mt-0.5" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
          <Link to="/products" search={{ category: "all" }} className="hover:opacity-60 transition" activeProps={{ className: "underline underline-offset-4" }}>
            Shop
          </Link>
          <Link to="/products" search={{ category: "clothes" }} className="hover:opacity-60 transition">Clothes</Link>
          <Link to="/products" search={{ category: "laptops" }} className="hover:opacity-60 transition">Tech</Link>
          <Link to="/about" className="hover:opacity-60 transition">About</Link>
        </nav>

        <button
          className="md:hidden justify-self-start p-2 -ml-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="justify-self-center text-xl md:text-2xl font-black tracking-brand uppercase">
          GlowCart
        </Link>

        <div className="justify-self-end flex items-center gap-4 text-[13px]">
          <button className="hidden md:inline-flex items-center gap-1.5 hover:opacity-60" aria-label="Search">
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
          </button>
          <button className="hidden md:inline-flex items-center gap-1.5 hover:opacity-60" aria-label="Account">
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">Account</span>
          </button>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5 hover:opacity-60">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {mounted && itemCount > 0 && (
              <span className="ml-0.5 inline-grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-5 py-4 flex flex-col gap-3 text-sm font-medium">
            {[
              { label: "Shop", category: "all" as const },
              { label: "Clothes", category: "clothes" as const },
              { label: "Mobiles", category: "mobiles" as const },
              { label: "Tablets", category: "tablets" as const },
              { label: "Laptops", category: "laptops" as const },
              { label: "Accessories", category: "accessories" as const },
              { label: "College Essentials", category: "college" as const },
            ].map((l) => (
              <Link
                key={l.label}
                to="/products"
                search={{ category: l.category }}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/about" onClick={() => setOpen(false)} className="py-1">About</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
