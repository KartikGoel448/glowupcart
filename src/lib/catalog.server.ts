import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Product, Category } from "./catalog";

export async function fetchCatalog(): Promise<Product[]> {
  const supabase = createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );

  const [{ data: rows, error }, { data: imgs, error: imgErr }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, slug, name, brand, category, subcategory, price, compare_at_price, description, sizes, colors, stock_quantity, rating, tag",
      )
      .order("created_at", { ascending: true }),
    supabase
      .from("product_images")
      .select("product_id, image_url, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  if (error) throw error;
  if (imgErr) throw imgErr;

  const byProduct = new Map<string, string[]>();
  for (const i of imgs ?? []) {
    const list = byProduct.get(i.product_id) ?? [];
    list.push(i.image_url);
    byProduct.set(i.product_id, list);
  }

  return (rows ?? []).map((r) => {
    const images = byProduct.get(r.id) ?? [];
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      brand: r.brand,
      category: r.category as Category,
      subcategory: r.subcategory ?? null,
      price: Number(r.price),
      oldPrice: r.compare_at_price != null ? Number(r.compare_at_price) : undefined,
      description: r.description ?? "",
      sizes: r.sizes ?? [],
      colors: r.colors ?? [],
      stock: r.stock_quantity ?? 0,
      rating: Number(r.rating ?? 4.5),
      tag: r.tag ?? undefined,
      image: images[0] ?? `/products/${r.slug}.jpg`,
      images: images.length ? images : [`/products/${r.slug}.jpg`],
    } satisfies Product;
  });
}
