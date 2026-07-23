<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/components/ui/Icon.vue'
import CTA from '~/components/home/CTA.vue'
import { SITE } from '~/config/site'
import { formatCompact } from '~/utils/format'

const { t } = useI18n()

const values = computed(() => [
  { icon: 'wrench', title: t('about.v1Title'), desc: t('about.v1Desc') },
  { icon: 'piston', title: t('about.v2Title'), desc: t('about.v2Desc') },
  { icon: 'check', title: t('about.v3Title'), desc: t('about.v3Desc') },
  { icon: 'star', title: t('about.v4Title'), desc: t('about.v4Desc') },
])

const stats = [
  { value: SITE.rating.value.toString().replace('.', ','), label: 'trust.ratingLabel' },
  { value: SITE.rating.count.toString(), label: 'trust.reviewsLabel' },
  { value: formatCompact(14000), label: 'trust.followersLabel' },
  { value: '6+', label: 'trust.partsLabel' },
]

const localePath = useLocalePath()
useSeoMetaTags({ title: t('about.title'), description: t('about.pageDesc') })
useBreadcrumbJsonLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.about'), path: localePath('/about') },
])
</script>

<template>
  <div>
    <section class="about-hero">
      <div class="container about-hero__inner">
        <span class="kicker">{{ t('about.kicker') }}</span>
        <h1 class="about-hero__title">{{ t('about.title') }}</h1>
        <p class="about-hero__lead">{{ t('about.lead') }}</p>
      </div>
      <div class="checker-strip" />
    </section>

    <section class="section container">
      <div class="stats">
        <div v-for="(s, i) in stats" :key="i" class="stats__item" data-reveal>
          <span class="stats__value">{{ s.value }}</span>
          <span class="stats__label">{{ t(s.label) }}</span>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="story" data-reveal>
        <h2 class="story__title">{{ t('about.storyTitle') }}</h2>
        <p class="story__body">{{ t('about.storyBody') }}</p>
      </div>
    </section>

    <section class="section container">
      <h2 class="values__title">{{ t('about.valuesTitle') }}</h2>
      <div class="values">
        <article v-for="(v, i) in values" :key="i" class="value" data-reveal>
          <span class="value__icon"><Icon :name="v.icon" :size="24" /></span>
          <h3 class="value__title">{{ v.title }}</h3>
          <p class="value__desc">{{ v.desc }}</p>
        </article>
      </div>
    </section>

    <CTA />
  </div>
</template>

<style scoped lang="scss">
.about-hero {
  position: relative;
  padding-block: $space-12 $space-10;
  background:
    radial-gradient(70% 100% at 30% 0%, rgba($yellow-400, 0.1), transparent 60%),
    var(--c-surface);
  border-bottom: 1px solid var(--c-border);

  &__inner { max-width: 60ch; }
  &__title { margin-block: $space-3 $space-4; }
  &__lead { font-size: fluid(1.1rem, 1.35rem); color: var(--c-text-muted); }
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-4;
  @include up(md) { grid-template-columns: repeat(4, 1fr); }

  &__item {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding: $space-5;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: $radius-lg;
    text-align: center;
    align-items: center;
  }

  &__value { font-family: $font-display; font-weight: $fw-bold; font-size: 2.6rem; color: var(--c-yellow); line-height: 1; }
  &__label { @include spec-label; color: var(--c-text-faint); }
}

.story {
  max-width: 60ch;
  margin-inline: auto;
  text-align: center;
  &__title { margin-bottom: $space-4; }
  &__body { font-size: fluid(1.1rem, 1.3rem); }
}

.values__title { margin-bottom: $space-6; text-align: center; }
.values {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  @include up(sm) { grid-template-columns: repeat(2, 1fr); }
  @include up(lg) { grid-template-columns: repeat(4, 1fr); }
}

.value {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;

  &__icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    color: var(--c-yellow);
    background: rgba($yellow-400, 0.1);
    border-radius: $radius-md;
  }
  &__title { font-size: 1.2rem; }
  &__desc { font-size: $fs-sm; }
}
</style>
