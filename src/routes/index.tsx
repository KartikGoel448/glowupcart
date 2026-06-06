import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlowCart — Bright finds for everyday life" },
      { name: "description", content: "Shop clothes, mobiles, tablets, laptops & accessories. Students save 15% with STUDENT15." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.tag).slice(0, 8);
  const trending = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
        <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-gradient-hero opacity-30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-20 h-[24rem] w-[24rem] rounded-full bg-gradient-sunset opacity-25 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-background/80 backdrop-blur border border-border shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New drops every week
            </span>
            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Bright finds.
              <br />
              <span className="text-gradient">Brighter you.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Fashion, phones, laptops & more — handpicked for taste and value.
              Students enjoy 15% off everything with <span className="font-bold text-foreground">STUDENT15</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                search={{ category: "all" }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-pop hover:opacity-95 transition"
              >
                Shop now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                search={{ category: "laptops" }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background font-semibold hover:bg-secondary transition"
              >
                Explore laptops
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: ShieldCheck, label: "2-year warranty" },
                { icon: GraduationCap, label: "Student perks" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="mx-auto h-10 w-10 rounded-xl bg-background border border-border grid place-items-center shadow-card">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={products[4].image} alt="" className="rounded-3xl aspect-[3/4] object-cover shadow-pop" />
              <div className="space-y-4 pt-10">
                <img src={products[9].image} alt="" className="rounded-3xl aspect-square object-cover shadow-card" />
                <img src={products[12].image} alt="" className="rounded-3xl aspect-square object-cover shadow-card" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-pop max-w-[14rem]">
              <p className="text-xs text-muted-foreground">Student deal</p>
              <p className="font-bold text-lg">15% off everything</p>
              <p className="text-xs mt-1 text-primary font-semibold">Code: STUDENT15</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by category</h2>
            <p className="text-muted-foreground mt-1">Pick your vibe.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id }}
              className="group relative overflow-hidden rounded-2xl p-6 bg-card border border-border shadow-card hover:shadow-pop hover:-translate-y-1 transition-all"
            >
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-gradient-hero opacity-10 group-hover:opacity-30 transition" />
              <div className="text-4xl">{c.emoji}</div>
              <h3 className="mt-4 font-bold">{c.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Browse <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* STUDENT BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 text-primary-foreground shadow-pop">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-sun/40 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold">
                <GraduationCap className="h-4 w-4" /> Students
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">15% off your whole cart.</h2>
              <p className="mt-2 text-primary-foreground/85 max-w-xl">
                Apply the code at checkout. Works on everything — phones, laptops, fits, you name it.
              </p>
            </div>
            <div className="bg-background text-foreground rounded-2xl px-6 py-4 shadow-soft text-center">
              <p className="text-xs text-muted-foreground">Promo code</p>
              <p className="text-2xl font-extrabold tracking-widest text-gradient">STUDENT15</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured deals</h2>
          <Link to="/products" search={{ category: "all" }} className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Trending now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
