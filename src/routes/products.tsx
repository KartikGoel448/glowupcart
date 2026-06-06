import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { byCategory, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  category: z.enum(["all", "clothes", "mobiles", "tablets", "laptops", "accessories", "college"]).catch("all"),
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop — GlowCart" },
      { name: "description", content: "Browse clothes, mobiles, tablets, laptops and accessories." },
    ],
  }),
  validateSearch: searchSchema,
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  let list = byCategory(category as Category | "all");
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
          </h1>
          <p className="text-muted-foreground mt-1">{list.length} items</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.id } })}
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

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products yet. <Link to="/products" search={{ category: "all" }} className="text-primary font-semibold">View all</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
