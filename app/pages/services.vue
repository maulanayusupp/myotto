<script setup lang="ts">
import ServiceCard from '~/components/service/Card.vue'
import CTA from '~/components/home/CTA.vue'
import { useCatalog } from '~/composables/useCatalog'

const { t } = useI18n()
const localePath = useLocalePath()
const { allServices } = useCatalog()

useSeoMetaTags({
  title: t('services.pageTitle'),
  description: t('services.pageDesc'),
})
useBreadcrumbJsonLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.services'), path: localePath('/services') },
])
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="kicker">{{ t('services.kicker') }}</span>
        <h1 class="page-hero__title">{{ t('services.title') }}</h1>
        <p class="page-hero__sub">{{ t('services.subtitle') }}</p>
      </div>
      <div class="checker-strip" />
    </section>

    <section class="section container">
      <div class="svc-grid">
        <ServiceCard v-for="s in allServices" :key="s.slug" :service="s" />
      </div>
    </section>

    <CTA />
  </div>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  padding-block: $space-10 $space-8;
  background:
    radial-gradient(60% 100% at 20% 0%, rgba($yellow-400, 0.1), transparent 60%),
    var(--c-surface);
  border-bottom: 1px solid var(--c-border);

  &__title { margin-block: $space-3 $space-4; }
  &__sub { max-width: 52ch; font-size: $fs-lg; }
}

.svc-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-5;
  @include up(sm) { grid-template-columns: repeat(2, 1fr); }
  @include up(lg) { grid-template-columns: repeat(3, 1fr); }
}
</style>
