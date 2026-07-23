/**
 * Single source of truth for business & site metadata.
 *
 * EVIDENCE NOTE — every value here is sourced from MYOTTO's own public channels
 * (Instagram @myottobengkelmotor, Shopee) and their Google Business Profile as
 * captured on 2026-07-23. Do NOT add unverified/assumed data. When a fact
 * changes, update it here AND in the i18n locale files + compliance pages.
 *
 * Sources:
 *  - Instagram bio (@myottobengkelmotor, "MYOTTO VARIASI MOTOR", 14K followers,
 *    2,191 posts): «"Boys, will be boys" — All about motor cycle · Variasi &
 *    Spare part · Service · Bore up · Autodetailing · Painting». Shopee link
 *    id.shp.ee/PnNpNu1; Threads @myottobengkelmotor.
 *  - Google Business Profile: "Myotto Motorcycle Workshop", category shown as
 *    "Auto care products store in Bandung, West Java", 4.7★ (111 reviews),
 *    address & phone below, closes 20:00.
 *  - Instagram post ("Sepakat Alamat"): «MYOTTO BENGKEL MOTOR, Ruko bumi mas
 *    kencana Jl. AH. Nasution No.928 C Cikadut Antapani wetan - Kota bandung.
 *    Wa: 085224498836».
 *  - Shopee product evidence: "Scooter Power LE 5w40 1 Liter" Rp180.000.
 */

export const SITE = {
  name: 'MYOTTO',
  fullName: 'MYOTTO Variasi Motor',
  legalName: 'Myotto Motorcycle Workshop',
  tagline: "Boy's Will Be Boys",
  // Default deployment URL (no trailing slash — paths are appended directly).
  // Overridden in production via NUXT_PUBLIC_SITE_URL (→ runtimeConfig.public.siteUrl).
  url: 'https://myotto-pi.vercel.app',
  rating: { value: 4.7, count: 111, source: 'Google' },
  // Google Business Profile: "Open · Closes 8.00 pm".
  closingTime: '20:00',
} as const

export const CONTACT = {
  // WhatsApp admin printed in the IG bio (wa.me/6285224498836) and repeated in
  // the "Sepakat Alamat" post (085224498836).
  phoneDisplay: '0852-2449-8836',
  phoneE164: '+6285224498836',
  // Google Business Profile lists this number — kept for reference.
  phoneAltDisplay: '0812-2499-8818',
  whatsapp: 'https://wa.me/6285224498836',
  address: {
    line: 'Ruko Bumi Mas Kencana, Jl. A. H. Nasution No. 928 C',
    area: 'Cikadut, Ujung Berung',
    district: 'Antapani Wetan, Kec. Antapani',
    city: 'Kota Bandung',
    province: 'Jawa Barat',
    postalCode: '40194',
    country: 'Indonesia',
    // Google Maps place query (name + area) — no fabricated coordinates.
    mapsQuery: 'Myotto+Motorcycle+Workshop+Jl+AH+Nasution+928+Bandung',
  },
} as const

export const SOCIALS = {
  instagram: 'https://www.instagram.com/myottobengkelmotor/',
  threads: 'https://www.threads.net/@myottobengkelmotor',
  shopee: 'https://id.shp.ee/PnNpNu1',
  // "myOTTO" app is listed on Google Play (per search result). Link kept generic
  // to the store search until the exact package id is confirmed.
  whatsapp: 'https://wa.me/6285224498836',
} as const

export type SiteConfig = typeof SITE
