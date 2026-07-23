<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/section/Heading.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCatalog } from '~/composables/useCatalog'
import { pickLocale } from '~/utils/i18n-helpers'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { allCategories } = useCatalog()
const lc = computed(() => locale.value as LocaleCode)
</script>

<template>
  <section class="section container">
    <SectionHeading :kicker="t('shop.kicker')" :title="t('shop.title')" :subtitle="t('shop.subtitle')" />
    <div class="cat-grid">
      <NuxtLink
        v-for="c in allCategories"
        :key="c.slug"
        :to="localePath({ path: '/shop', query: { c: c.slug } })"
        class="cat"
        data-reveal
      >
        <span class="cat__icon"><Icon :name="c.icon" :size="30" /></span>
        <span class="cat__body">
          <span class="cat__name">{{ pickLocale(c.name, lc) }}</span>
          <span class="cat__tag">{{ pickLocale(c.tagline, lc) }}</span>
        </span>
        <Icon name="arrow" :size="18" class="cat__arrow" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cat-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-3;
  @include up(sm) { grid-template-columns: repeat(2, 1fr); }
  @include up(lg) { grid-template-columns: repeat(3, 1fr); }
}

.cat {
  display: flex;
  align-items: center;
  gap: $space-4;
  padding: $space-4 $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
  transition: transform $dur-base $ease-out, border-color $dur-base $ease-soft, background $dur-base $ease-soft;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba($yellow-400, 0.5);
    .cat__arrow { transform: translateX(4px); color: var(--c-yellow); }
    .cat__icon { color: #0a0a0b; background: var(--c-yellow); }
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    color: var(--c-yellow);
    background: var(--c-surface-2);
    border-radius: $radius-md;
    transition: all $dur-base $ease-soft;
  }

  &__body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  &__name { font-family: $font-display; font-size: 1.25rem; text-transform: uppercase; color: var(--c-text-strong); line-height: 1; }
  &__tag { font-size: $fs-sm; color: var(--c-text-muted); }
  &__arrow { color: var(--c-text-faint); transition: transform $dur-base $ease-out, color $dur-base $ease-soft; }
}
</style>
