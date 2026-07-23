import { computed } from 'vue'
import { products } from '~/data/products'
import { categories } from '~/data/categories'
import { services } from '~/data/services'
import { reviews } from '~/data/reviews'
import type { Product } from '~/types/catalog'

/**
 * Read-only accessors over the static catalog data. Centralizing lookups here
 * keeps pages/components thin and makes swapping to a real API a one-file change.
 */
export function useCatalog() {
  const allProducts = computed(() => products)
  const allCategories = computed(() => categories)
  const allServices = computed(() => services)
  const allReviews = computed(() => reviews)

  const popularProducts = computed(() => products.filter((p) => p.popular))

  const byCategory = (slug: string) =>
    products.filter((p) => p.category === slug)

  const productBySlug = (slug: string): Product | undefined =>
    products.find((p) => p.slug === slug)

  const categoryBySlug = (slug: string) =>
    categories.find((c) => c.slug === slug)

  const relatedProducts = (product: Product, limit = 4) =>
    products
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, limit)

  return {
    allProducts,
    allCategories,
    allServices,
    allReviews,
    popularProducts,
    byCategory,
    productBySlug,
    categoryBySlug,
    relatedProducts,
  }
}
