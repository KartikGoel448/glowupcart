import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Reviews } from "@/components/Reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlowCart — Essentials & elevated everyday" },
      { name: "description", content: "Clothes, mobiles, tablets, laptops & accessories. Students save 15% with STUDENT15." },
    ],
  }),
  component: Home,
});

const slides = [
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Summer drop",
    title: "SUMMER",
    titleAlt: "SALE",
    blurb: "Up to 50% off our favourite styles & colours for the season.",
  },
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "New arrivals",
    title: "TECH",
    titleAlt: "DROP",
    blurb: "Latest phones, tablets and laptops — built for the way you work.",
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Students",
    title: "STUDY",
    titleAlt: "MODE",
    blurb: "15% off everything with code STUDENT15. Built for the long term.",
  },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const featured = products.filter((p) => p.tag).slice(0, 4);
  const trending = products.slice(0, 8);
  const s = slides[slide];

  return (
    <div>
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] max-h-[820px] overflow-hidden">
          <img key={s.image} src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/15" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <h1 className="leading-[0.85] font-black tracking-tight">
              <span className="block text-cream hero-outline-text text-[18vw] md:text-[16vw] lg:text-[180px]">
                {s.title}
              </span>
              <span className="block text-cream text-[22vw] md:text-[20vw] lg:text-[220px] -mt-[3vw]">
                {s.titleAlt}
              </span>
            </h1>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
            <div className="flex items-center gap-3 text-[11px] tracking-brand">
              <button
                onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
                className="h-8 w-8 grid place-items-center border border-cream/60 hover:bg-cream hover:text-foreground transition"
                aria-label="Previous"
              ><ChevronLeft className="h-4 w-4" /></button>
              <span className="font-semibold">
                {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setSlide((slide + 1) % slides.length)}
                className="h-8 w-8 grid place-items-center border border-cream/60 hover:bg-cream hover:text-foreground transition"
                aria-label="Next"
              ><ChevronRight className="h-4 w-4" /></button>
            </div>
            <Link
              to="/products"
              search={{ category: "all" }}
              className="hidden md:inline-flex items-center gap-2 bg-cream text-foreground px-6 py-3 text-[11px] tracking-brand uppercase font-semibold hover:bg-foreground hover:text-cream transition"
            >
              Shop the drop <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-8 grid md:grid-cols-3 gap-6 items-start border-b border-border">
          <p className="text-[11px] tracking-brand uppercase text-muted-foreground">{s.eyebrow}</p>
          <h2 className="font-serif text-2xl md:text-3xl leading-snug md:col-span-1">{s.blurb}</h2>
          <div className="md:text-right">
            <Link
              to="/products"
              search={{ category: "all" }}
              className="inline-flex items-center gap-2 text-[11px] tracking-brand uppercase font-semibold border-b border-foreground pb-1 hover:opacity-60"
            >
              Explore collection <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="bg-foreground text-cream">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-20 md:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] tracking-brand uppercase opacity-60">01 — The Edit</p>
              <h2 className="font-serif italic text-5xl md:text-6xl mt-3">
                Curated <span className="text-gradient-gold">collections</span>
              </h2>
              <p className="mt-3 text-sm opacity-70 max-w-md">
                Six worlds, hand-picked. From everyday tech to hostel-ready essentials.
              </p>
            </div>
            <Link to="/products" search={{ category: "all" }} className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-brand uppercase font-semibold border-b border-cream/40 pb-1 hover:border-cream">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {categories.map((c, i) => {
              const sample = products.find((p) => p.category === c.id)!;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  search={{ category: c.id }}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-cream/10 hover:border-cream/30 transition"
                >
                  <img
                    src={sample.image}
                    alt={c.label}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-cream">
                    <span className="text-[10px] tracking-brand uppercase opacity-70">No. 0{i + 1}</span>
                    <span className="text-[10px] tracking-brand uppercase opacity-70">{c.blurb}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-cream">
                    <h3 className="font-serif italic text-3xl md:text-4xl leading-tight">
                      {c.label}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] tracking-brand uppercase opacity-80">Explore</span>
                      <span className="h-9 w-9 grid place-items-center border border-cream/60 group-hover:bg-cream group-hover:text-foreground transition">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-12 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-brand uppercase text-muted-foreground">02 — Featured</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-2">Editor's picks</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-24 bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-brand uppercase opacity-70">Student discount</p>
            <h2 className="font-serif text-5xl md:text-7xl mt-3 leading-[0.95]">
              Built for<br /> the long study.
            </h2>
            <p className="mt-6 max-w-md text-sm opacity-80 leading-relaxed">
              15% off everything, anytime. Apply <span className="font-bold">STUDENT15</span> at checkout —
              no verification, no expiry, no fuss.
            </p>
            <Link to="/products" search={{ category: "laptops" }} className="mt-8 inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 text-[11px] tracking-brand uppercase font-semibold hover:opacity-90">
              Shop study essentials <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80" alt="" className="h-full w-full object-cover" />
            <div className="absolute top-4 left-4 right-4 flex justify-between text-[11px] tracking-brand opacity-90">
              <span>STUDENT15</span>
              <span>15% OFF</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-brand uppercase text-muted-foreground">03 — Trending</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-2">New this week</h2>
          </div>
          <Link to="/products" search={{ category: "all" }} className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-brand uppercase font-semibold hover:opacity-60">
            Shop all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
