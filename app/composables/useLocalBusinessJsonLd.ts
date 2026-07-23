import { SITE, CONTACT, SOCIALS } from '~/config/site'

/**
 * Emit LocalBusiness (AutoRepair) structured data for rich results. All values
 * come from config/site.ts, which is itself evidence-sourced. Aggregate rating
 * reflects the business's public Google rating.
 */
export function useLocalBusinessJsonLd() {
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string) || SITE.url
  const a = CONTACT.address

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${base}/#business`,
    name: SITE.legalName,
    alternateName: SITE.fullName,
    slogan: SITE.tagline,
    url: base,
    telephone: CONTACT.phoneE164,
    image: `${base}/og-image.svg`,
    priceRange: 'Rp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.line}, ${a.area}`,
      addressLocality: a.city,
      addressRegion: a.province,
      postalCode: a.postalCode,
      addressCountry: 'ID',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
      bestRating: 5,
    },
    sameAs: [SOCIALS.instagram, SOCIALS.threads, SOCIALS.shopee],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      closes: SITE.closingTime,
    },
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
    ],
  })
}
