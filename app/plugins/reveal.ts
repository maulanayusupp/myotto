/**
 * Scroll-reveal: elements with `data-reveal` fade/slide in when they enter the
 * viewport. The hidden state is gated by the `.reveal-ready` class (set by an
 * inline head script) and CSS in base/_layout.scss.
 *
 * We observe on BOTH `app:mounted` (fires on the initial client mount / hard
 * load) and `page:finish` (fires on client-side navigations). Hooking only
 * page:finish previously left directly-loaded pages blank because that hook
 * doesn't fire on the first render. SSR-safe (guards window).
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  const root = document.documentElement

  // No IntersectionObserver → drop the gate so everything is simply visible.
  if (!('IntersectionObserver' in window)) {
    root.classList.remove('reveal-ready')
    return
  }

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

  const observe = () => {
    root.classList.add('reveal-ready')
    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((el) => observer.observe(el))
  }

  const kick = () => requestAnimationFrame(observe)

  nuxtApp.hook('app:mounted', kick)
  nuxtApp.hook('page:finish', kick)
})
