# TODO — MYOTTO Website

Feature backlog & next steps. Keep updated as work progresses (project rule #12).

## Assets (before launch)

- [ ] Replace themed SVG placeholders in `public/products/**` with **real product
      photos** (MYOTTO's signature red-backdrop studio style).
- [ ] Replace `public/gallery/**` placeholders with real workshop/feed photos.
- [ ] Export a **raster OG image** (`og-image.jpg` 1200×630) — some social
      platforms don't render SVG OG cards well. Update `useSeoMetaTags` default.
- [ ] Generate PNG/ICO favicon variants (`favicon.ico`, `apple-touch-icon.png`,
      192/512 maskable) and re-add the `<link>`s + manifest icons.
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

- [ ] Booking flow for services (date/time slot) in addition to WA enquiry.
- [ ] Reviews/testimonials section (pull verified Google reviews).
- [ ] `@nuxtjs/sitemap` + structured breadcrumb JSON-LD.
- [ ] Blog / tips section ("Boy's Will Be Boys" content) for SEO.
- [ ] Analytics + consent banner (aligns with the Privacy policy).
- [ ] Lighthouse/a11y pass; add `prefers-reduced-motion` audits for new motion.

## Infra

- [ ] Add a git remote and enable auto-deploy (Vercel/Netlify).
- [ ] Set `NUXT_PUBLIC_SITE_URL` in the deploy env; update robots sitemap host.
