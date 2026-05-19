# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## Steal the Beat by Blayke

A mobile-first headless e-commerce store for a Nigerian dance culture merch brand.

### Stack
- **Framework**: Next.js 15 (App Router)
- **Styles**: Tailwind CSS v3 + custom dark theme
- **Animations**: Framer Motion (parallax hero, staggered product reveals)
- **Cart**: Zustand with localStorage persistence
- **WooCommerce**: `@woocommerce/woocommerce-rest-api` in `src/lib/woocommerce.ts`

### Location
`artifacts/steal-the-beat/`

### Dev
Workflow: `Steal the Beat` — runs `next dev -p 3000`

### Environment Variables
Copy `artifacts/steal-the-beat/.env.local.example` to `artifacts/steal-the-beat/.env.local` and fill in:
- `NEXT_PUBLIC_WORDPRESS_URL` — WooCommerce site URL
- `WC_CONSUMER_KEY` — WooCommerce consumer key
- `WC_CONSUMER_SECRET` — WooCommerce consumer secret

### Pages
- `/` — Hero + new arrivals + category grid + brand story
- `/shop` — Full product grid with category filter
- `/shop/[slug]` — Product detail with size/color selection + add to cart
- `/cart` — Full cart page with quantity controls + order summary

### Portability
The project is fully self-contained in `artifacts/steal-the-beat/`. To run standalone:
```bash
cd artifacts/steal-the-beat
npm install
# add .env.local with WooCommerce credentials
npm run dev
```
