<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '~/components/product/Card.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCatalog } from '~/composables/useCatalog'
import { pickLocale } from '~/utils/i18n-helpers'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { allProducts, allCategories } = useCatalog()
const lc = computed(() => locale.value as LocaleCode)

const active = computed(() => (route.query.c as string) || 'all')

const filtered = computed(() =>
  active.value === 'all'
    ? allProducts.value
    : allProducts.value.filter((p) => p.category === active.value),
)

function setCategory(slug: string) {
  router.push({ query: slug === 'all' ? {} : { c: slug } })
}

useSeoMetaTags({
  title: t('shop.pageTitle'),
  description: t('shop.pageDesc'),
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="kicker">{{ t('shop.kicker') }}</span>
        <h1 class="page-hero__title">{{ t('shop.title') }}</h1>
        <p class="page-hero__sub">{{ t('shop.subtitle') }}</p>
      </div>
      <div class="checker-strip" />
    </section>

    <section class="section container">
      <div class="filters" role="tablist" aria-label="Categories">
        <button
          class="filters__btn"
          :class="{ 'is-active': active === 'all' }"
          type="button"
          @click="setCategory('all')"
        >
          {{ t('shop.filterAll') }}
        </button>
        <button
          v-for="c in allCategories"
          :key="c.slug"
          class="filters__btn"
          :class="{ 'is-active': active === c.slug }"
          type="button"
          @click="setCategory(c.slug)"
        >
          <Icon :name="c.icon" :size="16" />{{ pickLocale(c.name, lc) }}
        </button>
      </div>

      <p class="shop__evidence mono">{{ t('shop.evidenceNote') }}</p>

      <div v-if="filtered.length" class="shop-grid">
        <ProductCard v-for="p in filtered" :key="p.slug" :product="p" />
      </div>
      <p v-else class="shop__empty">{{ t('shop.empty') }}</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  padding-block: $space-10 $space-8;
  background:
    radial-gradient(60% 100% at 80% 0%, rgba($red-500, 0.12), transparent 60%),
    var(--c-surface);
  border-bottom: 1px solid var(--c-border);

  &__title { margin-block: $space-3 $space-4; }
  &__sub { max-width: 52ch; font-size: $fs-lg; }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  margin-bottom: $space-4;

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: 0.55rem 1rem;
    font-family: $font-display;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: $fs-sm;
    color: var(--c-text-muted);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: $radius-pill;
    transition: all $dur-fast $ease-soft;

    &:hover { color: var(--c-text-strong); border-color: var(--c-border-strong); }
    &.is-active { color: #0a0a0b; background: var(--c-yellow); border-color: var(--c-yellow); }
  }
}

.shop__evidence { font-size: $fs-xs; color: var(--c-text-faint); margin-bottom: $space-6; }

.shop-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-4;
  @include up(md) { grid-template-columns: repeat(3, 1fr); }
  @include up(lg) { grid-template-columns: repeat(4, 1fr); }
}

.shop__empty { padding-block: $space-8; text-align: center; color: var(--c-text-faint); }
</style>
