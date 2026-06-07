import { Star } from "lucide-react";

const reviews = [
  { name: "Aarav S.", role: "Student, IIT Bombay", rating: 5, text: "Got my MacBook with STUDENT15 — saved a fortune. Shipping was lightning quick and packaging felt premium." },
  { name: "Priya M.", role: "Designer, Bengaluru", rating: 5, text: "The fit on the Levi's denim was perfect. GlowCart's curation is genuinely chef's kiss." },
  { name: "Rohan K.", role: "Hosteller, Delhi University", rating: 4, text: "The college essentials bundle was a lifesaver when I moved in. Everything I needed, one order." },
  { name: "Ishita R.", role: "Photographer, Mumbai", rating: 5, text: "Sony XM5 at the best price I could find anywhere. The whole checkout took two minutes." },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 lg:px-8 py-20 border-t border-border">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-brand uppercase text-muted-foreground">04 — Reviews</p>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">Loved by 50,000+ shoppers</h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
            ))}
          </div>
          <span className="text-sm font-semibold">4.9 / 5</span>
          <span className="text-xs text-muted-foreground">· 12,438 reviews</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {reviews.map((r) => (
          <article key={r.name} className="border border-border p-6 bg-card flex flex-col">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    "h-4 w-4 " +
                    (i < r.rating ? "fill-foreground text-foreground" : "text-muted-foreground/30")
                  }
                />
              ))}
            </div>
            <p className="font-serif text-lg leading-snug flex-1">"{r.text}"</p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-[11px] tracking-brand uppercase text-muted-foreground mt-0.5">{r.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
