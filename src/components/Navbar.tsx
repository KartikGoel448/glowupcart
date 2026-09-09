import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { catalogQueryOptions } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { displayName, useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Navbar() {
  const { itemCount } = useCart();
  const { data: catalog } = useQuery(catalogQueryOptions);
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
      }
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return (catalog ?? [])
      .filter((p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term) || p.category.toLowerCase().includes(term))
      .slice(0, 8);
  }, [q, catalog]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("We couldn't sign you out. Please try again.");
      return;
    }
    setAccountOpen(false);
    setOpen(false);
    navigate({ to: "/login", search: { redirect: undefined, mode: undefined }, replace: true });
  }

  function openAccount() {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: undefined, mode: undefined } });
      return;
    }
    setAccountOpen(true);
  }

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="bg-foreground text-background text-[11px] tracking-brand font-medium text-center py-2 px-4">
        STUDENT DISCOUNT — USE CODE STUDENT15 FOR 15% OFF{" "}
        <ArrowRight className="inline h-3 w-3 ml-1 -mt-0.5" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
          <Link to="/products" search={{ category: "all", brand: undefined }} className="hover:opacity-60 transition" activeProps={{ className: "underline underline-offset-4" }}>Shop</Link>
          <Link to="/products" search={{ category: "clothes", brand: undefined }} className="hover:opacity-60 transition">Clothes</Link>
          <Link to="/products" search={{ category: "laptops", brand: undefined }} className="hover:opacity-60 transition">Tech</Link>
          <Link to="/about" className="hover:opacity-60 transition">About</Link>
        </nav>

        <button className="md:hidden justify-self-start p-2 -ml-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="justify-self-center text-xl md:text-2xl font-black tracking-brand uppercase">GlowCart</Link>

        <div className="justify-self-end flex items-center gap-4 text-[13px]">
          <button onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-1.5 hover:opacity-60" aria-label="Search">
            <Search className="h-4 w-4" /><span className="hidden lg:inline">Search</span>
          </button>
          <button onClick={openAccount} className="hidden md:inline-flex items-center gap-1.5 hover:opacity-60" aria-label="Account">
            <User className="h-4 w-4" /><span className="hidden lg:inline">{loading ? "Account" : user ? displayName(user) : "Sign in"}</span>
          </button>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5 hover:opacity-60">
            <ShoppingBag className="h-4 w-4" /><span className="hidden sm:inline">Cart</span>
            {mounted && itemCount > 0 && <span className="ml-0.5 inline-grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] font-bold">{itemCount}</span>}
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
              <Link key={l.label} to="/products" search={{ category: l.category, brand: undefined }} onClick={() => setOpen(false)} className="py-1">{l.label}</Link>
            ))}
            <Link to="/about" onClick={() => setOpen(false)} className="py-1">About</Link>
            <button onClick={() => { setOpen(false); openAccount(); }} className="text-left py-1">{user ? `Account · ${displayName(user)}` : "Sign in"}</button>
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="mx-auto mt-24 max-w-2xl bg-card border border-border rounded-2xl shadow-pop overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, categories…" className="flex-1 py-4 bg-transparent outline-none text-sm" />
              <button onClick={() => setSearchOpen(false)} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close search"><X className="h-4 w-4" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {q.trim() === "" ? <div className="p-6 text-sm text-muted-foreground">Try "iPhone", "Nike", "laptop" or "hostel"…</div> : results.length === 0 ? <div className="p-6 text-sm text-muted-foreground">No matches for "{q}".</div> : (
                <ul className="divide-y divide-border">
                  {results.map((p) => (
                    <li key={p.slug}><button onClick={() => { setSearchOpen(false); setQ(""); navigate({ to: "/products/$slug", params: { slug: p.slug } }); }} className="w-full flex items-center gap-3 p-3 hover:bg-secondary text-left">
                      <img src={p.image} alt={p.name} className="h-12 w-12 object-cover rounded-md bg-secondary" />
                      <div className="flex-1 min-w-0"><p className="text-[10px] uppercase tracking-brand text-muted-foreground">{p.brand} · {p.category}</p><p className="text-sm font-medium truncate">{p.name}</p></div>
                      <span className="text-sm font-semibold">{inr(p.price)}</span>
                    </button></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {accountOpen && user && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm grid place-items-center p-4" onClick={() => setAccountOpen(false)}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-pop p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div><p className="text-xs uppercase tracking-brand text-muted-foreground">Your account</p><h2 className="mt-1 text-lg font-bold">{displayName(user)}</h2><p className="text-sm text-muted-foreground">{user.email}</p></div>
              <button onClick={() => setAccountOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close account menu"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-2">
              <Link to="/account" onClick={() => setAccountOpen(false)} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-secondary">Account</Link>
              <Link to="/orders" onClick={() => setAccountOpen(false)} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-secondary">Orders</Link>
              <button onClick={signOut} className="rounded-xl border border-border px-4 py-3 text-left text-sm font-semibold hover:bg-secondary">Sign out</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}