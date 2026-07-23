# TODO — MYOTTO Website

Feature backlog & next steps. Keep updated as work progresses (project rule #12).

## Assets (before launch)

- [ ] Replace themed **raster placeholders** in `public/products/**` (JPG 800×800)
      with **real product photos** (MYOTTO's red-backdrop studio style). Regenerate
      via `node scripts/gen-assets.mjs public` after editing the source.
- [ ] Replace `public/gallery/**` placeholders with real workshop/feed photos.
- [x] Raster OG image `og-image.jpg` (1200×630, 34KB) — renders on WhatsApp/IG/FB/Twitter.
- [x] PNG favicon variants (`apple-touch-icon.png` 180, `favicon-32x32.png`,
      `icon-512.png` maskable) + `<link>`s + manifest icons.
- [ ] Provide a real logo file from MYOTTO if available (current wordmark is a
      faithful SVG recreation of the checkered-flag mark).

## Content / evidence

- [ ] Confirm the **primary phone**: IG bio WA is 0852-2449-8836; Google lists
      0812-2499-8818. Set the correct one in `app/config/site.ts`.
- [ ] Verify current **service package prices** (promos change) and expand the
      catalog with real SKUs + verified prices from the Shopee store.
- [ ] Confirm exact **opening hours per day** (Google shows "closes 20:00").
- [ ] Confirm the **myOTTO Google Play** app package id and link it.

## E-commerce (next phase)

- [ ] Real backend/API for products + stock (swap `app/data/**` behind
      `useCatalog`). Keep the composable interface stable.
- [ ] Online payment (e.g. a gateway / HitPay) + order persistence; keep the
      WhatsApp flow as a fallback.
- [ ] Product variants (size/color) & per-variant pricing/stock.
- [ ] Search + sorting + pagination on the shop.
- [ ] Customer accounts, order history, wishlist.
- [ ] Shipping-rate calculation & delivery tracking.

## Features / polish

- [x] Booking flow for services (date/time slot) via `/booking` → WhatsApp;
      service cards pre-select via `?service=<slug>`.
- [x] Reviews section — verified Google rating showcase (4.7★ / 111) with a
      "read on Google" CTA. Individual quotes are seeded empty in
      `app/data/reviews.ts` (evidence rule); add verified ones and cards render.
- [x] `@nuxtjs/sitemap` (i18n sitemap index + hreflang + image entries) &
      breadcrumb JSON-LD on shop/product/services/about/contact.
- [ ] Blog / tips section ("Boy's Will Be Boys" content) for SEO.
- [ ] Analytics + consent banner (aligns with the Privacy policy).
- [ ] Lighthouse/a11y pass; add `prefers-reduced-motion` audits for new motion.

## Infra

- [ ] Add a git remote and enable auto-deploy (Vercel/Netlify).
- [ ] Set `NUXT_PUBLIC_SITE_URL` in the deploy env; update robots sitemap host.
