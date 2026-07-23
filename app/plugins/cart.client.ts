import type { CartLine } from '~/composables/useCart'

/** Persist the cart to localStorage and restore it on load (client-only). */
export default defineNuxtPlugin(() => {
  const items = useState<CartLine[]>('cart', () => [])
  const KEY = 'myotto_cart'

  const saved = localStorage.getItem(KEY)
  if (saved) {
    try {
      items.value = JSON.parse(saved)
    } catch {
      /* ignore malformed cart */
    }
  }

  watch(items, (v) => localStorage.setItem(KEY, JSON.stringify(v)), {
    deep: true,
  })
})
