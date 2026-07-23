import { SITE } from '~/config/site'

export interface Crumb {
  /** Visible label. */
  name: string
  /** Root-relative path (already locale-prefixed by the caller via localePath). */
  path: string
}

/**
 * Emit BreadcrumbList structured data for rich results. Pass the trail from the
 * home page down to the current page (home is prepended automatically). URLs are
 * absolutised against the configured site URL.
 */
export function useBreadcrumbJsonLd(crumbs: Crumb[]) {
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string) || SITE.url

  const items = crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${base}${c.path}`,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
}
