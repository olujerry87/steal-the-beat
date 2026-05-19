# Steal the Beat by Blayke

Premium Nigerian dance culture streetwear e-commerce store.

## Stack
- **Next.js 15** App Router (server + client components)
- **Tailwind CSS** with custom B&W design system
- **Framer Motion 11** — site-wide layered parallax reveal + micro-animations
- **Zustand** (persist) — cart state
- **WooCommerce REST API** (`@woocommerce/woocommerce-rest-api`) — server-only via `serverExternalPackages`

## Design System
- **Palette**: Strictly Black (`#000`) & White (`#FFF`). `brand-offwhite: #f5f5f5`, `brand-lgray: #e5e5e5`, `brand-gray: #888`
- **Fonts**: `Great Vibes` cursive (`font-cursive`) for brand name + section titles ONLY; `Inter` (`font-body`) for all other text
- **Buttons**: `.btn-primary` (white on black, dark-section), `.btn-ghost` (outline on dark), `.btn-dark` (black on white, light-section)
- **Labels**: `.section-label` — 10px uppercase tracked text

## Site-wide Layered Parallax
Every section is wrapped in `<ParallaxSection>`:
- Outer div: `height: scrollHeight` (200–270vh) — provides scroll space
- Inner div: `sticky top-0 h-screen overflow-hidden` — viewport-locked content
- `useScroll + useTransform` (Framer Motion) fades opacity 1→0 as the section scrolls past
- Mount guard (`useState(false)` + `useEffect`) prevents SSR hydration mismatch

## Home Page Structure
```
ParallaxSection (200vh, black)  → HeroClient (dynamic ssr:false)
ParallaxSection (270vh, offwhite) → Shop grid (8 products from WooCommerce)
ParallaxSection (220vh, black)  → TheLab (8 IG-style posts, horizontal scroll)
ReviewsSection (normal scroll, offwhite) → 5 Google Reviews
FAQSection (normal scroll, black) → 6 items accordion
```

## Key Files
- `src/components/ParallaxSection.tsx` — sticky parallax layer wrapper (client)
- `src/components/Hero.tsx` — hero content with dance GIF placeholder
- `src/components/HeroClient.tsx` — dynamic import wrapper (ssr: false)
- `src/components/TheLab.tsx` — Instagram-style horizontal scroll feed
- `src/components/ReviewsSection.tsx` — 5-star Google Reviews grid
- `src/components/FAQSection.tsx` — accordion with AnimatePresence
- `src/components/Navbar.tsx` — transparent → solid on scroll, Great Vibes logo
- `src/components/ProductCard.tsx` — B&W card with hover cart CTA, `dark?` prop
- `src/components/CartDrawer.tsx` — white slide-in drawer
- `src/lib/woocommerce.ts` — WooCommerce client + mock data fallback (ENOTFOUND expected in dev)

## WooCommerce
- Store URL placeholder: `your-woocommerce-store.com` (set real URL in env)
- ENOTFOUND errors in dev are expected — mock data fallback provides 8 products in 3 categories
- Images use `picsum.photos/seed/[name]/w/h` as placeholders

## Dev Notes
- `next.config.ts`: `images.unoptimized: true`, `serverExternalPackages: ["@woocommerce/woocommerce-rest-api"]`
- HeroClient uses `ssr: false` to prevent Framer Motion hydration mismatch
- ParallaxSection uses mount guard for same reason
- Duplicate key dev warnings from React StrictMode / Next.js head internals — non-critical
