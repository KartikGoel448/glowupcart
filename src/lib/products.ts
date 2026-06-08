export type Category = "clothes" | "mobiles" | "tablets" | "laptops" | "accessories" | "college";

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

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=90`;

export const categories: { id: Category; label: string; emoji: string; blurb: string }[] = [
  { id: "clothes", label: "Clothes", emoji: "👕", blurb: "Streetwear & essentials" },
  { id: "mobiles", label: "Mobiles", emoji: "📱", blurb: "Flagship smartphones" },
  { id: "tablets", label: "Tablets", emoji: "📲", blurb: "Powerful & portable" },
  { id: "laptops", label: "Laptops", emoji: "💻", blurb: "Study & create" },
  { id: "accessories", label: "Accessories", emoji: "🎧", blurb: "Sound & style" },
  { id: "college", label: "College Essentials", emoji: "🎓", blurb: "Hostel-ready kit" },
];

export const products: Product[] = [
  // CLOTHES
  { id: "p1", name: "Oversized Graphic Tee", brand: "H&M", price: 1499, oldPrice: 2299, category: "clothes", image: u("photo-1521572163474-6864f9cf17ab"), rating: 4.6, description: "Heavyweight cotton oversized tee with bold print.", tag: "Bestseller" },
  { id: "p2", name: "Slim Denim Jacket", brand: "Levi's", price: 5999, category: "clothes", image: u("photo-1551537482-f2075a1d41f2"), rating: 4.8, description: "Vintage-wash denim jacket, true-to-size fit." },
  { id: "p3", name: "Tech Fleece Hoodie", brand: "Nike", price: 4499, oldPrice: 5999, category: "clothes", image: u("photo-1556821840-3a63f95609a7"), rating: 4.5, description: "Soft brushed fleece hoodie for everyday wear." },
  { id: "p4", name: "Linen Summer Shirt", brand: "Zara", price: 2799, category: "clothes", image: u("photo-1596755094514-f87e34085b2c"), rating: 4.4, description: "Breathable linen for warm days." },
  { id: "p17", name: "Essential Joggers", brand: "Adidas", price: 2999, category: "clothes", image: u("photo-1552902865-b72c031ac5ea"), rating: 4.5, description: "Tapered fleece joggers for all-day wear." },
  { id: "p18", name: "Puffer Vest", brand: "Uniqlo", price: 3999, oldPrice: 4999, category: "clothes", image: u("photo-1544966503-7cc5ac882d5f"), rating: 4.6, description: "Ultralight insulated vest for layering." },
  { id: "p19", name: "Classic Polo", brand: "Puma", price: 1999, category: "clothes", image: u("photo-1586790170083-2f9ceadc732d"), rating: 4.3, description: "Pique cotton polo with modern fit." },
  { id: "p20", name: "Cargo Wide Pants", brand: "Bershka", price: 2599, category: "clothes", image: u("photo-1624378439575-d8705ad7ae80"), rating: 4.4, description: "Utility cargo with a relaxed silhouette." },
  { id: "p30", name: "Crewneck Sweatshirt", brand: "Champion", price: 2299, oldPrice: 2999, category: "clothes", image: u("photo-1576566588028-4147f3842f27"), rating: 4.5, description: "Heavyweight fleece crewneck — perfect for layering.", tag: "Sale" },
  { id: "p31", name: "Pleated Mini Skirt", brand: "Mango", price: 1899, category: "clothes", image: u("photo-1583496661160-fb5886a13d44"), rating: 4.4, description: "Soft-pleat A-line skirt with elastic waist." },
  { id: "p32", name: "Cropped Trucker Jacket", brand: "Tommy Hilfiger", price: 4499, category: "clothes", image: u("photo-1591047139756-eaa1cff1c1e6"), rating: 4.5, description: "Mid-wash cropped trucker with chest pockets." },

  // MOBILES
  { id: "p5", name: "iPhone 15 Pro", brand: "Apple", price: 134900, oldPrice: 144900, category: "mobiles", image: u("photo-1695048133142-1a20484d2569"), rating: 4.9, description: "Titanium build, A17 Pro chip, 6.1\" ProMotion display.", tag: "New" },
  { id: "p6", name: "Galaxy S24 Ultra", brand: "Samsung", price: 129999, category: "mobiles", image: u("photo-1610945265064-0e34e5519bbf"), rating: 4.8, description: "200MP camera, Snapdragon 8 Gen 3, S Pen." },
  { id: "p7", name: "Pixel 8 Pro", brand: "Google", price: 106999, category: "mobiles", image: u("photo-1696446700082-2b22862c4d2c"), rating: 4.7, description: "Tensor G3 with the best computational photography." },
  { id: "p21", name: "OnePlus 12", brand: "OnePlus", price: 64999, oldPrice: 69999, category: "mobiles", image: u("photo-1511707171634-5f897ff02aa9"), rating: 4.6, description: "Hasselblad cameras, 100W fast charging.", tag: "Sale" },
  { id: "p22", name: "Redmi Note 13 Pro+", brand: "Xiaomi", price: 31999, category: "mobiles", image: u("photo-1574944985070-8f3ebc6b79d2"), rating: 4.4, description: "200MP camera, AMOLED 120Hz display." },
  { id: "p23", name: "Realme GT 5 Pro", brand: "Realme", price: 49999, category: "mobiles", image: u("photo-1592899677977-9c10ca588bbd"), rating: 4.5, description: "Snapdragon 8 Gen 3 flagship killer." },
  { id: "p33", name: "Nothing Phone (2)", brand: "Nothing", price: 44999, oldPrice: 49999, category: "mobiles", image: u("photo-1685531935389-cc1edb1c8e02"), rating: 4.6, description: "Glyph interface, Snapdragon 8+ Gen 1.", tag: "Hot" },

  // TABLETS
  { id: "p8", name: "iPad Air M2", brand: "Apple", price: 59900, oldPrice: 64900, category: "tablets", image: u("photo-1561154464-82e9adf32764"), rating: 4.8, description: "11\" Liquid Retina with Apple Pencil Pro support.", tag: "Student pick" },
  { id: "p9", name: "Galaxy Tab S9 FE", brand: "Samsung", price: 36999, category: "tablets", image: u("photo-1542751110-97427bbecf20"), rating: 4.5, description: "10.9\" LCD, S Pen included, water resistant." },
  { id: "p24", name: "Surface Pro 9", brand: "Microsoft", price: 109999, category: "tablets", image: u("photo-1623126908029-58cb08a2b272"), rating: 4.6, description: "2-in-1 tablet with detachable keyboard." },
  { id: "p25", name: "MatePad 11.5", brand: "Huawei", price: 27999, category: "tablets", image: u("photo-1632634571273-e35eb2543d33"), rating: 4.3, description: "120Hz display with M-Pencil bundled." },
  { id: "p34", name: "iPad mini 6", brand: "Apple", price: 49900, category: "tablets", image: u("photo-1544244015-0df4b3ffc6b0"), rating: 4.7, description: "8.3\" Liquid Retina, A15 Bionic — pocketable power." },

  // LAPTOPS
  { id: "p10", name: "MacBook Air 13 M3", brand: "Apple", price: 114900, oldPrice: 124900, category: "laptops", image: u("photo-1541807084-5c52b6b3adef"), rating: 4.9, description: "Featherlight laptop with 18-hour battery.", tag: "Hot" },
  { id: "p11", name: "ROG Zephyrus G14", brand: "ASUS", price: 149990, category: "laptops", image: u("photo-1603302576837-37561b2e2302"), rating: 4.8, description: "Creator-grade display & GPU performance." },
  { id: "p12", name: "Yoga 7i 2-in-1", brand: "Lenovo", price: 79990, category: "laptops", image: u("photo-1588872657578-7efd1f1555ed"), rating: 4.5, description: "2-in-1 convertible with touch & pen input." },
  { id: "p26", name: "XPS 13 Plus", brand: "Dell", price: 119990, category: "laptops", image: u("photo-1496181133206-80ce9b88a853"), rating: 4.6, description: "InfinityEdge OLED, 12th-gen Intel Core." },
  { id: "p27", name: "Pavilion Aero 13", brand: "HP", price: 74999, oldPrice: 84999, category: "laptops", image: u("photo-1611186871348-b1ce696e52c9"), rating: 4.4, description: "Sub-1kg with Ryzen 7 and 16GB RAM.", tag: "Sale" },
  { id: "p35", name: "MacBook Pro 14 M3 Pro", brand: "Apple", price: 199900, category: "laptops", image: u("photo-1517336714731-489689fd1ca8"), rating: 4.9, description: "Liquid Retina XDR, M3 Pro performance." },

  // ACCESSORIES
  { id: "p13", name: "AirPods Pro 2", brand: "Apple", price: 24900, oldPrice: 29900, category: "accessories", image: u("photo-1606220945770-b5b6c2c55bf1"), rating: 4.8, description: "Active noise cancelling earbuds, 30h battery." },
  { id: "p14", name: "WH-1000XM5", brand: "Sony", price: 29990, category: "accessories", image: u("photo-1583394838336-acd977736f90"), rating: 4.9, description: "Industry-leading noise cancelling headphones." },
  { id: "p15", name: "QC Ultra Headphones", brand: "Bose", price: 36900, category: "accessories", image: u("photo-1545127398-14699f92334b"), rating: 4.7, description: "Immersive spatial audio with QuietComfort tech." },
  { id: "p16", name: "MX Master 3S", brand: "Logitech", price: 9495, category: "accessories", image: u("photo-1527864550417-7fd91fc51a46"), rating: 4.8, description: "Pro-grade wireless mouse for creators." },
  { id: "p28", name: "Flip 6 Speaker", brand: "JBL", price: 11999, category: "accessories", image: u("photo-1608043152269-423dbba4e7e1"), rating: 4.5, description: "Portable waterproof Bluetooth speaker." },
  { id: "p29", name: "Charge Pad Trio", brand: "Anker", price: 4999, category: "accessories", image: u("photo-1633265486064-086b219458ec"), rating: 4.3, description: "3-in-1 wireless charging pad." },
  { id: "p36", name: "Apple Watch Series 9", brand: "Apple", price: 45900, oldPrice: 49900, category: "accessories", image: u("photo-1551816230-ef5deaed4a26"), rating: 4.8, description: "Always-on Retina, double-tap gesture.", tag: "Sale" },
  { id: "p37", name: "Mechanical Keyboard K2", brand: "Keychron", price: 8499, category: "accessories", image: u("photo-1587829741301-dc798b83add3"), rating: 4.7, description: "Hot-swappable 75% wireless mechanical." },

  // COLLEGE
  { id: "c1", name: "Memory Foam Pillow Set", brand: "Sleepyhead", price: 1799, oldPrice: 2499, category: "college", image: u("photo-1592789705501-f9ae4287c4cf"), rating: 4.6, description: "Pack of 2 cooling-gel pillows for hostel beds.", tag: "Hostel pick" },
  { id: "c2", name: "Mini Electric Kettle 0.6L", brand: "Pigeon", price: 899, category: "college", image: u("photo-1594631252845-29fc4cc8cde9"), rating: 4.5, description: "Compact kettle — perfect for instant noodles." },
  { id: "c3", name: "Study Desk Lamp", brand: "Philips", price: 1299, category: "college", image: u("photo-1565374790085-37dcd99c0a8c"), rating: 4.7, description: "LED dimmable lamp with USB charging port." },
  { id: "c4", name: "Stackable Storage Bins", brand: "Ikea", price: 1499, category: "college", image: u("photo-1558997519-83ea9252edf8"), rating: 4.4, description: "Set of 3 collapsible hostel storage boxes." },
  { id: "c5", name: "Laptop Backpack 25L", brand: "American Tourister", price: 1999, oldPrice: 2999, category: "college", image: u("photo-1553062407-98eeb64c6a62"), rating: 4.6, description: "Water-resistant backpack with USB charging port.", tag: "Sale" },
  { id: "c6", name: "Insulated Water Bottle 1L", brand: "Milton", price: 599, category: "college", image: u("photo-1602143407151-7111542de6e8"), rating: 4.5, description: "24h cold / 12h hot stainless bottle." },
  { id: "c7", name: "Foldable Cloth Hangers x10", brand: "Kuber", price: 349, category: "college", image: u("photo-1558997519-83ea9252edf8"), rating: 4.2, description: "Space-saving anti-skid hangers for hostel wardrobes." },
  { id: "c8", name: "Bluetooth Study Earphones", brand: "boAt", price: 1199, category: "college", image: u("photo-1590658268037-6bf12165a8df"), rating: 4.3, description: "40h battery, perfect for online lectures." },
  { id: "c9", name: "Bedsheet + Pillow Combo", brand: "Bombay Dyeing", price: 1299, category: "college", image: u("photo-1505693416388-ac5ce068fe85"), rating: 4.4, description: "Single bed cotton set sized for hostel mattresses." },
  { id: "c10", name: "Mini Iron Travel", brand: "Bajaj", price: 749, category: "college", image: u("photo-1604719312566-8912e9227c6a"), rating: 4.2, description: "Compact dry iron, fits in any drawer." },
  { id: "c11", name: "Extension Board 4-Socket", brand: "Goldmedal", price: 549, category: "college", image: u("photo-1558002038-1055907df827"), rating: 4.6, description: "Surge-protected board with 2m cord." },
  { id: "c12", name: "Notebook Bundle (6)", brand: "Classmate", price: 449, category: "college", image: u("photo-1517842645767-c639042777db"), rating: 4.7, description: "200-page ruled notebooks — semester-ready." },
  { id: "c13", name: "Foldable Study Table", brand: "Solimo", price: 2499, oldPrice: 3299, category: "college", image: u("photo-1518455027359-f3f8164ba6bd"), rating: 4.4, description: "Compact bed desk for laptops & books.", tag: "Sale" },
  { id: "c14", name: "Tower Fan Slim", brand: "Havells", price: 3499, category: "college", image: u("photo-1593959898902-cbaad3ec19a3"), rating: 4.3, description: "Quiet 3-speed tower fan for small rooms." },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (c: Category | "all") =>
  c === "all" ? products : products.filter((p) => p.category === c);
