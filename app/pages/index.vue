<script setup lang="ts">
import Hero from '~/components/home/Hero.vue'
import Marquee from '~/components/home/Marquee.vue'
import Categories from '~/components/home/Categories.vue'
import Popular from '~/components/home/Popular.vue'
import Services from '~/components/home/Services.vue'
import Process from '~/components/home/Process.vue'
import Gallery from '~/components/home/Gallery.vue'
import Visit from '~/components/home/Visit.vue'
import CTA from '~/components/home/CTA.vue'
import { SITE } from '~/config/site'

const { t } = useI18n()

useSeoMetaTags({
  title: SITE.name,
  description: t('hero.subtitle'),
})
useLocalBusinessJsonLd()
</script>

<template>
  <div>
    <Hero />
    <Marquee />
    <Categories />
    <Popular />
    <Services />
    <Process />
    <Gallery />
    <Visit />
    <CTA />
  </div>
</template>
