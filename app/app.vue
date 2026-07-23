<script setup lang="ts">
import { SITE } from '~/config/site'

// Global <html lang> follows the active locale; title template applied app-wide.
const { locale } = useI18n()
useHead({
  htmlAttrs: { lang: locale },
  titleTemplate: (title) => (title ? title : `${SITE.name} — ${SITE.tagline}`),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
