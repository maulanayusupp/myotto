// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE } from './app/config/site'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@vueuse/nuxt'],

  // Centralized global stylesheet (no inline CSS anywhere in the app).
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-inject design tokens (variables, functions, mixins, breakpoints)
          // into every SCSS block so components never re-import them manually.
          additionalData: '@use "~/assets/scss/abstracts" as *;\n',
        },
      },
    },
  },

  // SEO-friendly head defaults; per-page meta is set via useSeoMetaTags().
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#0a0a0b' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: SITE.legalName },
      ],
      script: [
        {
          // Enable the scroll-reveal hidden state before first paint (avoids a
          // content flash). If JS is disabled the class is never added, so all
          // [data-reveal] content stays fully visible — safe for crawlers.
          innerHTML: "document.documentElement.classList.add('reveal-ready')",
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'myotto_lang',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.ts' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.ts' },
    ],
    // v9 resolves langDir relative to <rootDir>/i18n
    langDir: 'locales',
    bundle: { optimizeTranslationDirective: false },
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE.url,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
    },
  },
})
