/**
 * Scroll-reveal directive: elements with `data-reveal` fade/slide in when they
 * enter the viewport. CSS lives in base/_layout.scss. SSR-safe (guards window).
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  const observe = (root: ParentNode | Document = document) => {
    root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
      observer.observe(el)
    })
  }

  nuxtApp.hook('page:finish', () => {
    // Defer to next frame so freshly-rendered nodes exist.
    requestAnimationFrame(() => observe())
  })
})
