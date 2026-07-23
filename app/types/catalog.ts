import type { LocaleCode } from '~/utils/i18n-helpers'

/** A short bilingual string. Catalog *content* is stored bilingually here;
 *  UI chrome strings live in i18n/locales/*.ts instead. */
export interface Bilingual {
  id: string
  en: string
}

export type EvidenceSource = 'shopee' | 'instagram' | 'google' | 'store'

export interface Category {
  slug: string
  name: Bilingual
  tagline: Bilingual
  /** Icon key resolved by components/ui/Icon.vue. */
  icon: string
}

export interface Product {
  slug: string
  category: string // Category.slug
  brand: string
  name: Bilingual
  desc: Bilingual
  /**
   * Price in IDR. `null` means "price on request" — we do NOT fabricate prices,
   * so items without a verified price are quoted via WhatsApp instead. The cart
   * treats null-price lines as quote items (excluded from subtotal).
   */
  priceIDR: number | null
  image: string
  /** Optional chips shown on the card (e.g. compatible models). */
  tags?: string[]
  popular?: boolean
  /** Evidence provenance so we never present assumptions as facts. */
  source: EvidenceSource
}

/** A workshop service (labour), optionally sold as a fixed-price package. */
export interface Service {
  slug: string
  name: Bilingual
  desc: Bilingual
  /** Fixed package price in IDR, or null for "estimate on inspection". */
  priceIDR: number | null
  icon: string
  includes?: Bilingual[]
  source: EvidenceSource
}

/** A customer review/testimonial. Only add VERIFIED reviews (with a real
 *  source); never fabricate. `text` is stored as originally written. */
export interface Review {
  author: string
  rating: number // 1..5
  text: string
  /** Human-readable date as published, e.g. "Jun 2026". Optional. */
  date?: string
  source: EvidenceSource
}

export type { LocaleCode }
