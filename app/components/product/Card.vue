<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/components/ui/Icon.vue'
import { useCart } from '~/composables/useCart'
import { pickLocale } from '~/utils/i18n-helpers'
import { formatIDR } from '~/utils/format'
import type { Product, LocaleCode } from '~/types/catalog'

const props = defineProps<{ product: Product }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const cart = useCart()

const lc = computed(() => locale.value as LocaleCode)
const name = computed(() => pickLocale(props.product.name, lc.value))
const desc = computed(() => pickLocale(props.product.desc, lc.value))
const isQuote = computed(() => props.product.priceIDR === null)
const priceLabel = computed(() =>
  isQuote.value ? t('common.priceOnRequest') : formatIDR(props.product.priceIDR as number),
)

function addToCart() {
  cart.add({
    key: props.product.slug,
    slug: props.product.slug,
    name: name.value,
    image: props.product.image,
    brand: props.product.brand,
    unitPrice: props.product.priceIDR ?? 0,
    isQuote: isQuote.value,
  })
}
</script>

<template>
  <article class="card" data-reveal>
    <NuxtLink :to="localePath(`/shop/${product.slug}`)" class="card__media">
      <img :src="product.image" :alt="name" loading="lazy" width="400" height="400" />
      <span v-if="product.popular" class="card__badge">Popular</span>
    </NuxtLink>

    <div class="card__body">
      <span class="card__brand">{{ product.brand }}</span>
      <h3 class="card__name">
        <NuxtLink :to="localePath(`/shop/${product.slug}`)">{{ name }}</NuxtLink>
      </h3>
      <p class="card__desc">{{ desc }}</p>

      <div class="card__foot">
        <span class="card__price" :class="{ 'card__price--quote': isQuote }">
          {{ priceLabel }}
        </span>
        <button class="card__add" type="button" :aria-label="t('common.addToCart')" @click="addToCart">
          <Icon name="plus" :size="18" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
  overflow: hidden;
  transition: transform $dur-base $ease-out, border-color $dur-base $ease-soft,
    box-shadow $dur-base $ease-out;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--c-border-strong);
    box-shadow: $shadow-md;
    .card__media img { transform: scale(1.05); }
  }

  &__media {
    position: relative;
    display: block;
    aspect-ratio: 1;
    background: var(--c-red);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $dur-slow $ease-out;
    }
  }

  &__badge {
    position: absolute;
    top: $space-3;
    left: $space-3;
    @include spec-label;
    padding: 0.25rem 0.5rem;
    background: var(--c-yellow);
    color: #0a0a0b;
    border-radius: $radius-sm;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-4;
    flex: 1;
  }

  &__brand {
    @include spec-label;
    color: var(--c-text-faint);
  }

  &__name {
    font-size: 1.15rem;
    line-height: 1.1;
    a:hover { color: var(--c-yellow); }
  }

  &__desc {
    font-size: $fs-sm;
    color: var(--c-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    margin-top: $space-2;
  }

  &__price {
    font-family: $font-mono;
    font-weight: $fw-medium;
    font-size: 1.05rem;
    color: var(--c-text-strong);

    &--quote {
      font-size: $fs-sm;
      color: var(--c-yellow);
      text-transform: uppercase;
    }
  }

  &__add {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    color: #0a0a0b;
    background: var(--c-yellow);
    border-radius: $radius-sm;
    transition: transform $dur-fast $ease-out, box-shadow $dur-base $ease-out;
    &:hover { transform: translateY(-2px); box-shadow: $shadow-yellow; }
    &:active { transform: translateY(0); }
    &:focus-visible { @include focus-ring($red-500); }
  }
}
</style>
