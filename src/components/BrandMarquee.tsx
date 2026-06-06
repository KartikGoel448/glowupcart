const brands = [
  "APPLE", "SAMSUNG", "NIKE", "ADIDAS", "SONY", "DELL", "HP", "LENOVO",
  "ASUS", "ZARA", "H&M", "LEVI'S", "PUMA", "BOSE", "JBL", "XIAOMI",
  "ONEPLUS", "REALME", "MICROSOFT", "LOGITECH", "CANON", "GOOGLE",
];

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-border bg-foreground text-cream overflow-hidden">
      <div className="py-6 relative">
        <div className="flex gap-16 whitespace-nowrap animate-marquee will-change-transform">
          {row.map((b, i) => (
            <span
              key={i}
              className="font-serif italic text-3xl md:text-4xl tracking-wide opacity-80 hover:opacity-100 transition"
            >
              {b}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-foreground to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-foreground to-transparent" />
      </div>
    </section>
  );
}
