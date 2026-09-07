# GlowCart 🛍️

A full-stack e-commerce web app — built as a personal project to practice real-world frontend + backend development, from product catalog to authenticated checkout.

**🔗 Live demo:** [glowupcart.lovable.app](https://glowupcart.lovable.app)

<!-- Add a screenshot or GIF here once your UI is final — this is the first thing anyone opening the repo will see -->
<!-- ![GlowCart homepage](./screenshot.png) -->

## About

GlowCart is a mock online store covering six categories — Clothes, Mobiles, Tablets, Laptops, Accessories, and College Essentials — built to go beyond a static frontend demo. Instead of hardcoded product data, it runs on a real Postgres backend with row-level security, real user authentication, and a genuine cart → order pipeline.

## Features

- 🗂️ **Product catalog** — 50+ products across 6 categories, each with brand/category filtering
- 🎨 **Product detail pages** — image gallery, colour and size selection, pricing, and reviews
- 🔍 **Live search** across the full catalog
- 🔐 **Authentication** — real email/password sign-up and login via Supabase Auth
- 🛒 **Cart & checkout** — persistent cart tied to the logged-in user, with an order pipeline (cart → order → order history)
- ⭐ **Reviews** — product ratings tied to verified purchases
- 🎓 **Student discount** — `STUDENT15` code applies 15% off at checkout

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TanStack Start + Router, TanStack Query |
| Styling | Tailwind CSS v4, shadcn/ui (Radix primitives) |
| Backend | Supabase (Postgres, Auth, Row Level Security) |
| Forms | React Hook Form |
| Tooling | Vite, TypeScript, ESLint, Prettier |

## Database schema

- `products` / `product_images` — catalog data, publicly readable
- `profiles` — one row per authenticated user
- `cart_items` — a user's in-progress cart, RLS-restricted to its owner
- `orders` / `order_items` — the order history, RLS-restricted to its owner
- `reviews` — public reads, writes restricted to verified buyers

All user-scoped tables use Postgres Row Level Security so a user can only ever read or write their own data.

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
bun install
# (or npm install / pnpm install)

# 3. Set up environment variables
cp .env.example .env
# then fill in your own Supabase project URL and publishable key

# 4. Run the database migrations
# (via the Supabase CLI, or paste the files in supabase/migrations into the Supabase SQL editor)

# 5. Start the dev server
bun run dev
```

The app will be running at `http://localhost:3000` (or whichever port Vite prints).

## Project structure

```
src/
├── components/       # Reusable UI components (ProductCard, Navbar, ui/ primitives)
├── lib/              # Catalog logic, cart context, Supabase client, formatting helpers
├── routes/           # Page routes (home, products, product detail, cart, login, etc.)
└── integrations/     # Supabase client + generated types
supabase/
└── migrations/       # SQL schema history
```

## Roadmap

- [ ] Finish authenticated checkout flow (shipping address → order confirmation)
- [ ] Order history page under the account section
- [ ] Brand filters within each category
- [ ] "Complete the Look" — AI-assisted outfit suggestions for clothing items

## Author

Built by **Kartik Goel** — https://www.linkedin.com/in/kartik-goel-9829a6314?utm_source=share_via&utm_content=profile&utm_medium=member_android
