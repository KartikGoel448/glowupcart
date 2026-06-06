export type Category = "clothes" | "mobiles" | "tablets" | "laptops" | "accessories";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: Category;
  image: string;
  rating: number;
  description: string;
  tag?: string;
}

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: { id: Category; label: string; emoji: string; blurb: string }[] = [
  { id: "clothes", label: "Clothes", emoji: "👕", blurb: "Streetwear & essentials" },
  { id: "mobiles", label: "Mobiles", emoji: "📱", blurb: "Latest smartphones" },
  { id: "tablets", label: "Tablets", emoji: "📲", blurb: "Powerful & portable" },
  { id: "laptops", label: "Laptops", emoji: "💻", blurb: "Study & create" },
  { id: "accessories", label: "Accessories", emoji: "🎧", blurb: "Sound & style" },
];

export const products: Product[] = [
  { id: "p1", name: "Oversized Graphic Tee", brand: "Urban Co.", price: 29, oldPrice: 45, category: "clothes", image: u("photo-1521572163474-6864f9cf17ab"), rating: 4.6, description: "Heavyweight cotton oversized tee with bold print.", tag: "Bestseller" },
  { id: "p2", name: "Denim Jacket Classic", brand: "Indigo Lab", price: 79, category: "clothes", image: u("photo-1551028719-00167b16eac5"), rating: 4.8, description: "Vintage-wash denim jacket, true-to-size fit." },
  { id: "p3", name: "Cozy Knit Hoodie", brand: "Loop", price: 59, oldPrice: 75, category: "clothes", image: u("photo-1556821840-3a63f95609a7"), rating: 4.5, description: "Soft brushed fleece hoodie for everyday wear." },
  { id: "p4", name: "Linen Summer Shirt", brand: "Coast", price: 49, category: "clothes", image: u("photo-1602810318383-e386cc2a3ccf"), rating: 4.4, description: "Breathable linen for warm days." },

  { id: "p5", name: "Aurora Pro 15", brand: "Nova", price: 899, oldPrice: 1099, category: "mobiles", image: u("photo-1511707171634-5f897ff02aa9"), rating: 4.9, description: "6.7\" OLED, triple camera, all-day battery.", tag: "New" },
  { id: "p6", name: "Pulse Lite 5G", brand: "Nova", price: 349, category: "mobiles", image: u("photo-1592750475338-74b7b21085ab"), rating: 4.3, description: "Snappy 5G performance under $400." },
  { id: "p7", name: "Orbit Fold", brand: "Helix", price: 1299, category: "mobiles", image: u("photo-1598327105666-5b89351aff97"), rating: 4.7, description: "Foldable display, pro-grade cameras." },

  { id: "p8", name: "Slate Tab 11", brand: "Aero", price: 499, oldPrice: 599, category: "tablets", image: u("photo-1561154464-82e9adf32764"), rating: 4.6, description: "11\" laminated display with pencil support.", tag: "Student pick" },
  { id: "p9", name: "Canvas Tab Mini", brand: "Aero", price: 299, category: "tablets", image: u("photo-1585789575207-9e7e4cca8d96"), rating: 4.4, description: "Compact tablet perfect for reading & notes." },

  { id: "p10", name: "AirBook 14", brand: "Lumen", price: 1199, oldPrice: 1399, category: "laptops", image: u("photo-1496181133206-80ce9b88a853"), rating: 4.9, description: "Featherlight laptop with 18-hour battery.", tag: "Hot" },
  { id: "p11", name: "Studio Pro 16", brand: "Lumen", price: 1899, category: "laptops", image: u("photo-1517336714731-489689fd1ca8"), rating: 4.8, description: "Creator-grade display & GPU performance." },
  { id: "p12", name: "Flex 13 Convertible", brand: "Vertex", price: 749, category: "laptops", image: u("photo-1588872657578-7efd1f1555ed"), rating: 4.5, description: "2-in-1 design with touch & pen input." },

  { id: "p13", name: "Wave Buds Pro", brand: "Sonik", price: 129, oldPrice: 169, category: "accessories", image: u("photo-1606220945770-b5b6c2c55bf1"), rating: 4.7, description: "Active noise cancelling earbuds, 30h battery." },
  { id: "p14", name: "Orbit Over-Ear", brand: "Sonik", price: 199, category: "accessories", image: u("photo-1583394838336-acd977736f90"), rating: 4.8, description: "Studio-grade wireless headphones." },
  { id: "p15", name: "Charge Pad Trio", brand: "Volt", price: 59, category: "accessories", image: u("photo-1583863788434-e58a36330cf0"), rating: 4.3, description: "3-in-1 wireless charging pad." },
  { id: "p16", name: "Daily Backpack", brand: "Trail", price: 79, category: "accessories", image: u("photo-1553062407-98eeb64c6a62"), rating: 4.6, description: "Water-resistant 22L laptop backpack." },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (c: Category | "all") =>
  c === "all" ? products : products.filter((p) => p.category === c);
