<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import ProductCard from '~/components/product/Card.vue'
import { useCatalog } from '~/composables/useCatalog'
import { useCart } from '~/composables/useCart'
import { pickLocale } from '~/utils/i18n-helpers'
import { formatIDR } from '~/utils/format'
import { buildWhatsAppUrl, enquiryMessage } from '~/utils/whatsapp'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { productBySlug, categoryBySlug, relatedProducts } = useCatalog()
const cart = useCart()
const lc = computed(() => locale.value as LocaleCode)

const product = computed(() => productBySlug(route.params.slug as string))

// 404 for unknown slugs.
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

const p = product.value!
const name = computed(() => pickLocale(p.name, lc.value))
const desc = computed(() => pickLocale(p.desc, lc.value))
const category = computed(() => categoryBySlug(p.category))
const isQuote = computed(() => p.priceIDR === null)
const priceLabel = computed(() =>
  isQuote.value ? t('common.priceOnRequest') : formatIDR(p.priceIDR as number),
)
const related = computed(() => relatedProducts(p))
const waUrl = computed(() => buildWhatsAppUrl(enquiryMessage(name.value)[lc.value]))

function addToCart() {
  cart.add({
    key: p.slug,
    slug: p.slug,
    name: name.value,
    image: p.image,
    brand: p.brand,
    unitPrice: p.priceIDR ?? 0,
    isQuote: isQuote.value,
  })
}

useSeoMetaTags({
  title: `${p.brand} ${name.value}`,
  description: desc.value,
  image: p.image, // 800×800 raster — renders in social previews
  imageWidth: 800,
  imageHeight: 800,
})
useBreadcrumbJsonLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.shop'), path: localePath('/shop') },
  { name: `${p.brand} ${name.value}`, path: localePath(`/shop/${p.slug}`) },
])
</script>

<template>
  <div class="pdp container">
    <nav class="pdp__crumbs" aria-label="Breadcrumb">
      <NuxtLink :to="localePath('/shop')">{{ t('nav.shop') }}</NuxtLink>
      <Icon name="chevron" :size="14" />
      <span>{{ name }}</span>
    </nav>

    <div class="pdp__main">
      <div class="pdp__media">
        <img :src="p.image" :alt="name" width="600" height="600" />
        <span v-if="p.popular" class="pdp__badge">Popular</span>
      </div>

      <div class="pdp__info">
        <span class="pdp__brand mono">{{ p.brand }}</span>
        <h1 class="pdp__name">{{ name }}</h1>
        <p class="pdp__price" :class="{ 'pdp__price--quote': isQuote }">{{ priceLabel }}</p>
        <p class="pdp__desc">{{ desc }}</p>

        <ul v-if="p.tags?.length" class="pdp__tags">
          <li v-for="tag in p.tags" :key="tag">{{ tag }}</li>
        </ul>

        <dl class="pdp__specs">
          <div><dt>{{ t('shop.brand') }}</dt><dd>{{ p.brand }}</dd></div>
          <div v-if="category"><dt>{{ t('shop.category') }}</dt><dd>{{ pickLocale(category.name, lc) }}</dd></div>
        </dl>

        <div class="pdp__actions">
          <Button variant="primary" size="lg" icon="cart" @click="addToCart">{{ t('common.addToCart') }}</Button>
          <Button variant="ghost" size="lg" :href="waUrl" icon="whatsapp">{{ t('common.orderWhatsapp') }}</Button>
        </div>

        <p v-if="isQuote" class="pdp__evidence mono">{{ t('shop.evidenceNote') }}</p>
      </div>
    </div>

    <section v-if="related.length" class="pdp__related">
      <h2 class="pdp__related-title">{{ t('shop.related') }}</h2>
      <div class="pdp__related-grid">
        <ProductCard v-for="rp in related" :key="rp.slug" :product="rp" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.pdp {
  padding-block: $space-6 $space-10;

  &__crumbs {
    display: flex;
    align-items: center;
    gap: $space-2;
    @include spec-label;
    color: var(--c-text-faint);
    margin-bottom: $space-6;
    a:hover { color: var(--c-yellow); }
    span { color: var(--c-text-muted); }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;
    @include up(md) { grid-template-columns: 1fr 1fr; gap: $space-8; align-items: start; }
  }

  &__media {
    position: relative;
    aspect-ratio: 1;
    border-radius: $radius-xl;
    overflow: hidden;
    background: var(--c-red);
    border: 1px solid var(--c-border);
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__badge {
    position: absolute;
    top: $space-4;
    left: $space-4;
    @include spec-label;
    padding: 0.3rem 0.6rem;
    background: var(--c-yellow);
    color: #0a0a0b;
    border-radius: $radius-sm;
  }

  &__info { display: flex; flex-direction: column; gap: $space-4; }
  &__brand { color: var(--c-text-faint); letter-spacing: 0.18em; text-transform: uppercase; }
  &__name { font-size: fluid(1.9rem, 2.8rem); }

  &__price {
    font-family: $font-mono;
    font-size: 1.8rem;
    font-weight: $fw-medium;
    color: var(--c-yellow);
    &--quote { font-size: 1.2rem; text-transform: uppercase; }
  }

  &__desc { font-size: $fs-lg; }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    li {
      @include spec-label;
      padding: 0.3rem 0.7rem;
      background: var(--c-surface-2);
      border: 1px solid var(--c-border);
      border-radius: $radius-pill;
      color: var(--c-text-muted);
    }
  }

  &__specs {
    display: flex;
    gap: $space-8;
    padding-block: $space-4;
    border-block: 1px solid var(--c-border);
    div { display: flex; flex-direction: column; gap: 2px; }
    dt { @include spec-label; color: var(--c-text-faint); }
    dd { font-weight: $fw-semibold; color: var(--c-text-strong); }
  }

  &__actions { display: flex; flex-wrap: wrap; gap: $space-3; }
  &__evidence { font-size: $fs-xs; color: var(--c-text-faint); }

  &__related { margin-top: $space-12; }
  &__related-title { margin-bottom: $space-6; }
  &__related-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    @include up(md) { grid-template-columns: repeat(4, 1fr); }
  }
}
</style>
