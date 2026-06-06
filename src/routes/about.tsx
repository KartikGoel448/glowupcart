import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GlowCart" },
      { name: "description", content: "Essentials & elevated everyday. The GlowCart story." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-20">
      <p className="text-[11px] tracking-brand uppercase text-muted-foreground">About</p>
      <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight">
        Essentials, made to last.
      </h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          GlowCart is a curated storefront for the things you reach for every day —
          well-made clothes, dependable tech, and accessories with intent.
          We work with small studios and trusted brands to keep the catalogue tight
          and the quality honest.
        </p>
        <p>
          Students get 15% off, always. Apply <span className="font-bold text-foreground">STUDENT15</span> at
          checkout — no verification, no expiry. Because building good study habits
          shouldn't cost extra.
        </p>
      </div>
      <Link
        to="/products"
        search={{ category: "all" }}
        className="mt-10 inline-block text-[11px] tracking-brand uppercase font-semibold border-b border-foreground pb-1"
      >
        Browse the shop →
      </Link>
    </div>
  );
}
