/**
 * Scroll-reveal: elements with `data-reveal` fade/slide in when they enter the
 * viewport. The hidden state is gated by `.reveal-ready` (set by an inline head
 * script) + CSS in base/_layout.scss, so content is always visible without JS.
 *
 * Reliability: instead of depending on page hooks + rAF timing (which race with
 * the `out-in` page transition on client-side navigation and left new pages
 * blank), we watch the DOM with a MutationObserver and register every
 * `[data-reveal]` element with an IntersectionObserver the moment it is
 * inserted. This covers initial load, client navigation and async content alike.
 * SSR-safe (guards window).
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const root = document.documentElement

  // No IntersectionObserver → drop the gate so everything is simply visible.
  if (!('IntersectionObserver' in window)) {
    root.classList.remove('reveal-ready')
    return
  }

  root.classList.add('reveal-ready')

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -5% 0px' },
  )

  const scan = () =>
    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((el) => io.observe(el))

  // Debounce re-scans to one per frame (the DOM mutates in bursts).
  let scheduled = false
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      scan()
    })
  }

  // React to any nodes added during hydration, navigation or async rendering.
  const mo = new MutationObserver(schedule)
  mo.observe(document.body, { childList: true, subtree: true })

  // Register whatever is already present on first mount.
  schedule()
})
