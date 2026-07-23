# CLAUDE.md — MYOTTO Website

Guidance for working in this repository. **Keep this file in sync** whenever you
change rules, features, tech, content model, or i18n (guide rule #17).

## What this is

Official website + online store for **MYOTTO** (Myotto Motorcycle Workshop) — a
motorcycle variasi, spare-part, performance & service workshop in Antapani,
Bandung. Built with **Nuxt 4**. Bilingual **ID (default) / EN**. Designed for a
distinctive motorsport/garage identity, and structured so the shop can grow into
a full e-commerce experience.

## Golden rules (from the project brief)

1. **Nuxt latest (4.x)**, best practices, scalable & maintainable.
2. **Component-based.** Small, focused SFCs under `app/components/**`.
3. **Helpers & services** live in `app/utils/**` and `app/composables/**`.
4. **No inline CSS.** All styling is SCSS: centralized design system in
   `app/assets/scss/**` + component-scoped `<style lang="scss">`. Design tokens
   are auto-injected (see below), so never hardcode a hex value in a component —
   use `$tokens` / `var(--c-*)`.
5. **SEO everywhere.** Every page calls `useSeoMetaTags(...)`. Home & contact
   emit LocalBusiness JSON-LD (`useLocalBusinessJsonLd()`); shop, product,
   services, about & contact emit BreadcrumbList JSON-LD (`useBreadcrumbJsonLd()`).
   `@nuxtjs/sitemap` generates an i18n sitemap index (`/sitemap_index.xml`, in
   robots.txt) with hreflang + product image entries; `/checkout` is excluded.
6. **Favicon & social images are generated** by `scripts/gen-assets.mjs` (uses
   sharp). Outputs: `favicon.svg`, `apple-touch-icon.png`, `favicon-32x32.png`,
   `icon-512.png`, `og-image.jpg` (1200×630), and `products/*.jpg` + `gallery/*.jpg`.
   **OG/social images MUST be raster (JPG/PNG)** — WhatsApp, Instagram, Facebook
   and Twitter do NOT render SVG previews. Regenerate: `node scripts/gen-assets.mjs public`.
7. **Multilingual by default.** Add UI strings to BOTH `i18n/locales/id.ts` and
   `en.ts` (same keys). Catalog CONTENT is bilingual in `app/data/**` via the
   `Bilingual { id, en }` type. **When you add or change any static text,
   update both locales.**
8. **Evidence-based, no assumptions** (rule #16). Every business fact and price
   traces to a MYOTTO public source (see `app/config/site.ts` header + the
   Compliance page). **Never invent a price.** Unverified prices are `null` and
   shown as "Cek harga / Ask price" (confirmed via WhatsApp).
9. **Commit & push every change** (rule #11). Small, descriptive commits.
10. **TODO.md** tracks upcoming features (rule #12).
11. **Compliance pages** (`/legal/*`) must stay accurate; update them when the
    data model, data sources, or data handling changes (rule #17).
12. **Theme = the logo:** racing black `#0a0a0b` + yellow `#FFD100` + red
    `#E4002B`. Checkered-flag / speed motifs. Condensed display type (Oswald),
    Inter body, JetBrains Mono for "spec" accents.

## Commands

```bash
pnpm install      # use pnpm (npm has hoisting issues on this stack)
pnpm dev          # local dev server
pnpm build        # production build (also prerenders all routes)
pnpm generate     # static site generation
pnpm preview      # preview the built output
pnpm typecheck    # vue-tsc type check
```

## Architecture

```
app/
  config/site.ts            # SINGLE SOURCE of business data (evidence-sourced)
  types/catalog.ts          # Bilingual, Product, Service, Category types
  data/                     # catalog CONTENT (products, categories, services)
  composables/              # useCart, useCatalog, useSeoMetaTags, useLocalBusinessJsonLd
  utils/                    # format (IDR), whatsapp (order builder), i18n-helpers
  plugins/                  # cart.client (localStorage), reveal (scroll animations)
  components/
    layout/                 # Header, Footer
    home/                   # Hero, Marquee, Categories, Popular, Services, Process, Gallery, Visit, CTA
    ui/                     # Button, Icon (inline-SVG set)
    product/ service/ cart/ section/ legal/   # feature components
  pages/                    # index, services, shop/[index|slug], booking, checkout, about, contact, legal/*
  assets/scss/
    abstracts/              # tokens/functions/breakpoints/mixins (NO css output; auto-injected)
    base/                   # reset, root(CSS vars), typography, layout, utilities
    components/             # shared component classes (button)
    main.scss               # entry: pulls in base + components
i18n/locales/               # id.ts (default), en.ts — UI chrome strings
public/                     # favicon.svg, og-image.svg, products/*, gallery/*, manifest, robots
```

### SCSS token injection (important)

`nuxt.config.ts` injects `@use "~/assets/scss/abstracts" as *;` into every
component `<style lang="scss">` block and into `main.scss`. **But `@use`-d
partials do NOT inherit it** — any partial in the `main.scss` chain that uses
tokens must add its own `@use '../abstracts' as *;` at the top. Component SFCs
do not need to (injection covers them).

### E-commerce / cart

- `useCart()` is the single seam (SSR-safe `useState`, persisted to
  localStorage by `plugins/cart.client.ts`). A real backend/payment gateway
  plugs in here later.
- Checkout does not process payments — it builds an itemized **WhatsApp order
  message** (`utils/whatsapp.ts`) and opens wa.me. This matches how MYOTTO
  currently takes orders (IG bio WA link).
- **Quote items:** products with `priceIDR: null` are added as `isQuote` lines
  (excluded from subtotal, flagged in the WA message). This keeps us honest when
  a price isn't verified.
- **Service booking:** `/booking` builds a WhatsApp booking message
  (`buildBookingMessage`) with service/date/time. Service cards link to
  `/booking?service=<slug>` to pre-select (applied client-side in `onMounted`).

## Adding things

- **New product:** add to `app/data/products.ts` with a `Bilingual` name/desc, a
  category slug, `source`, and a real `priceIDR` ONLY if evidenced (else `null`).
  Add a placeholder image to `public/products/` (or a real photo).
- **New service:** `app/data/services.ts`.
- **New review:** `app/data/reviews.ts` — ONLY verified quotes (real author +
  source). Empty by default; the home Reviews section shows the verified Google
  aggregate rating regardless, and renders quote cards when the array is filled.
- **New page:** create under `app/pages/`, call `useSeoMetaTags`, add nav links
  in `components/layout/Header.vue` + `Footer.vue`, and add any new strings to
  BOTH locales.

## Deploy

Set `NUXT_PUBLIC_SITE_URL` to the production origin (drives canonical/OG URLs).
Target: static/SSR host (e.g. Vercel/Netlify). Update `SITE.url` fallback +
`public/robots.txt` sitemap host when the domain is known.
