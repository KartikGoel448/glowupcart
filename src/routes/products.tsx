import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { byCategory, catalogQueryOptions, categories, type Category } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  category: z.enum(["all", "clothes", "mobiles", "tablets", "laptops", "accessories", "college"]).catch("all"),
  brand: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop — GlowCart" },
      { name: "description", content: "Browse clothes, mobiles, tablets, laptops and accessories." },
    ],
  }),
  validateSearch: searchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center text-muted-foreground">We couldn't load the catalogue. Please try again.</div>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-4 py-24 text-center">Nothing here.</div>,
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(catalogQueryOptions);
  const { category, brand } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const baseList = byCategory(products, category as Category | "all");
  const brandsInCategory = useMemo(() => {
    const set = new Set<string>(baseList.map((p) => p.brand));
    return Array.from(set).sort();
  }, [baseList]);

  let list = brand ? baseList.filter((p) => p.brand === brand) : baseList;
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

  const chips: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {category === "all" ? "All products" : categories.find((c) => c.id === category)?.label}
            {brand && <span className="text-muted-foreground font-medium"> · {brand}</span>}
          </h1>
          <p className="text-muted-foreground mt-1">{list.length} items</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.id, brand: undefined } })}
                className={
                  "px-4 py-2 rounded-full text-sm font-semibold border transition " +
                  (active
                    ? "bg-gradient-hero text-primary-foreground border-transparent shadow-soft"
                    : "bg-card border-border hover:border-primary")
                }
              >
                {c.label}
              </button>
            );
          })}
          <div className="ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        {brandsInCategory.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 -mt-2">
            <span className="text-[11px] tracking-brand uppercase text-muted-foreground mr-1">Brand</span>
            <button
              onClick={() => navigate({ search: { category, brand: undefined } })}
              className={
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition " +
                (!brand ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-foreground")
              }
            >
              All brands
            </button>
            {brandsInCategory.map((b) => {
              const active = brand === b;
              return (
                <button
                  key={b}
                  onClick={() => navigate({ search: { category, brand: b } })}
                  className={
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition " +
                    (active ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-foreground")
                  }
                >
                  {b}
                </button>
              );
            })}
          </div>
        )}

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products match this filter.{" "}
            <Link to="/products" search={{ category: "all", brand: undefined }} className="text-primary font-semibold">View all</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}

        {/* Reassurance footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          {products.length} curated products · Free shipping over ₹999 · 30-day returns
        </p>
      </div>
    </div>
  );
}
