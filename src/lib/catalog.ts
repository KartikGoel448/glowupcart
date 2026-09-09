import { queryOptions } from "@tanstack/react-query";
import { getCatalog } from "./catalog.functions";

export type Category = "clothes" | "mobiles" | "tablets" | "laptops" | "accessories" | "college";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: string | null;
  price: number;
  oldPrice?: number;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  tag?: string;
  image: string;
  images: string[];
  imageVariants: { url: string; colour: string | null; sortOrder: number }[];
}

export const categories: { id: Category; label: string; emoji: string; blurb: string }[] = [
  { id: "clothes", label: "Clothes", emoji: "👕", blurb: "Streetwear & essentials" },
  { id: "mobiles", label: "Mobiles", emoji: "📱", blurb: "Flagship smartphones" },
  { id: "tablets", label: "Tablets", emoji: "📲", blurb: "Powerful & portable" },
  { id: "laptops", label: "Laptops", emoji: "💻", blurb: "Study & create" },
  { id: "accessories", label: "Accessories", emoji: "🎧", blurb: "Sound & style" },
  { id: "college", label: "College Essentials", emoji: "🎓", blurb: "Hostel-ready kit" },
];

export const catalogQueryOptions = queryOptions({
  queryKey: ["catalog"],
  queryFn: () => getCatalog(),
  staleTime: 5 * 60_000,
});

export const byCategory = (list: Product[], c: Category | "all") =>
  c === "all" ? list : list.filter((p) => p.category === c);

export const getProductBySlug = (list: Product[], slug: string) =>
  list.find((p) => p.slug === slug);
