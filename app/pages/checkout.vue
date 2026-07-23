<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCart } from '~/composables/useCart'
import { formatIDR } from '~/utils/format'
import { buildWhatsAppUrl, buildCheckoutMessage } from '~/utils/whatsapp'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const cart = useCart()
const lc = computed(() => locale.value as LocaleCode)

const form = reactive({
  name: '',
  phone: '',
  vehicle: '',
  fulfillment: 'pickup' as 'pickup' | 'ship',
  address: '',
  notes: '',
})
const submitted = ref(false)

const isEmpty = computed(() => cart.items.value.length === 0)
const nameError = computed(() => submitted.value && !form.name.trim())

function submit() {
  submitted.value = true
  if (!form.name.trim()) return

  const message = buildCheckoutMessage(cart.items.value, {
    name: form.name,
    phone: form.phone,
    vehicle: form.vehicle,
    fulfillment: form.fulfillment,
    address: form.address,
    notes: form.notes,
    subtotal: cart.subtotal.value,
    hasQuoteItems: cart.hasQuoteItems.value,
    locale: lc.value,
  })
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener')
}

useSeoMetaTags({
  title: t('checkout.title'),
  description: t('checkout.subtitle'),
})
</script>

<template>
  <div class="co container">
    <header class="co__head">
      <h1>{{ t('checkout.title') }}</h1>
      <p>{{ t('checkout.subtitle') }}</p>
    </header>

    <div v-if="isEmpty" class="co__empty">
      <Icon name="cart" :size="44" />
      <p>{{ t('checkout.emptyRedirect') }}</p>
      <Button variant="primary" :to="localePath('/shop')">{{ t('cart.emptyCta') }}</Button>
    </div>

    <div v-else class="co__grid">
      <form class="co__form" @submit.prevent="submit">
        <h2 class="co__section-title">{{ t('checkout.form') }}</h2>

        <label class="field">
          <span class="field__label">{{ t('checkout.name') }} *</span>
          <input v-model="form.name" type="text" class="field__input" :class="{ 'is-error': nameError }" :placeholder="t('checkout.namePh')" />
          <span v-if="nameError" class="field__error">{{ t('checkout.required') }}</span>
        </label>

        <div class="field-row">
          <label class="field">
            <span class="field__label">{{ t('checkout.phone') }}</span>
            <input v-model="form.phone" type="tel" class="field__input" :placeholder="t('checkout.phonePh')" />
          </label>
          <label class="field">
            <span class="field__label">{{ t('checkout.vehicle') }}</span>
            <input v-model="form.vehicle" type="text" class="field__input" :placeholder="t('checkout.vehiclePh')" />
          </label>
        </div>

        <fieldset class="field">
          <legend class="field__label">{{ t('checkout.fulfillment') }}</legend>
          <div class="segmented">
            <label class="segmented__opt" :class="{ 'is-active': form.fulfillment === 'pickup' }">
              <input v-model="form.fulfillment" type="radio" value="pickup" />
              <Icon name="flag" :size="16" />{{ t('checkout.pickup') }}
            </label>
            <label class="segmented__opt" :class="{ 'is-active': form.fulfillment === 'ship' }">
              <input v-model="form.fulfillment" type="radio" value="ship" />
              <Icon name="arrow" :size="16" />{{ t('checkout.ship') }}
            </label>
          </div>
        </fieldset>

        <label v-if="form.fulfillment === 'ship'" class="field">
          <span class="field__label">{{ t('checkout.address') }}</span>
          <textarea v-model="form.address" class="field__input field__input--area" rows="2" :placeholder="t('checkout.addressPh')" />
        </label>

        <label class="field">
          <span class="field__label">{{ t('checkout.notes') }}</span>
          <textarea v-model="form.notes" class="field__input field__input--area" rows="3" :placeholder="t('checkout.notesPh')" />
        </label>

        <Button type="submit" variant="primary" size="lg" block icon="whatsapp">{{ t('checkout.submit') }}</Button>
      </form>

      <aside class="co__summary">
        <h2 class="co__section-title">{{ t('checkout.summary') }}</h2>
        <ul class="co__items">
          <li v-for="line in cart.items.value" :key="line.key" class="co__item">
            <img :src="line.image" :alt="line.name" width="52" height="52" />
            <div class="co__item-info">
              <span class="co__item-name">{{ line.qty }}× {{ line.name }}</span>
              <span class="co__item-brand mono">{{ line.brand }}</span>
            </div>
            <span class="co__item-price">
              {{ line.isQuote ? t('common.priceOnRequest') : formatIDR(line.unitPrice * line.qty) }}
            </span>
          </li>
        </ul>
        <div class="co__total">
          <span>{{ t('cart.subtotal') }}</span>
          <strong>{{ formatIDR(cart.subtotal.value) }}</strong>
        </div>
        <p v-if="cart.hasQuoteItems.value" class="co__note mono">{{ t('cart.quoteNote') }}</p>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.co {
  padding-block: $space-8 $space-12;

  &__head { margin-bottom: $space-8; h1 { margin-bottom: $space-2; } p { max-width: 52ch; } }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    padding-block: $space-12;
    color: var(--c-text-faint);
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;
    @include up(lg) { grid-template-columns: 1.4fr 1fr; align-items: start; }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-5;
    padding: $space-6;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: $radius-lg;
  }

  &__section-title { font-size: 1.4rem; margin-bottom: $space-2; }

  &__summary {
    padding: $space-6;
    background: var(--c-surface-2);
    border: 1px solid var(--c-border);
    border-radius: $radius-lg;
    @include up(lg) { position: sticky; top: calc($header-height + #{$space-4}); }
  }

  &__items { display: flex; flex-direction: column; gap: $space-4; margin-bottom: $space-5; }

  &__item {
    display: grid;
    grid-template-columns: 52px 1fr auto;
    gap: $space-3;
    align-items: center;
    img { border-radius: $radius-sm; background: var(--c-red); object-fit: cover; }
  }

  &__item-info { display: flex; flex-direction: column; gap: 2px; }
  &__item-name { font-weight: $fw-medium; line-height: 1.2; color: var(--c-text-strong); }
  &__item-brand { font-size: $fs-xs; color: var(--c-text-faint); }
  &__item-price { font-family: $font-mono; font-size: $fs-sm; color: var(--c-text); }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $space-4;
    border-top: 1px solid var(--c-border);
    font-size: $fs-lg;
    strong { font-family: $font-mono; font-size: 1.4rem; color: var(--c-yellow); }
  }

  &__note { margin-top: $space-3; font-size: $fs-xs; color: var(--c-text-faint); }
}

.field {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  border: none;

  &__label { @include spec-label; color: var(--c-text-muted); }

  &__input {
    padding: 0.8rem 1rem;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: $radius-sm;
    color: var(--c-text-strong);
    transition: border-color $dur-fast $ease-soft;

    &::placeholder { color: var(--c-text-faint); }
    &:focus { outline: none; border-color: var(--c-yellow); }
    &.is-error { border-color: var(--c-error); }
    &--area { resize: vertical; font-family: $font-body; }
  }

  &__error { font-size: $fs-xs; color: var(--c-error); }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  @include up(sm) { grid-template-columns: 1fr 1fr; }
}

.segmented {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-2;

  &__opt {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-2;
    padding: 0.7rem;
    font-family: $font-display;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: $fs-sm;
    color: var(--c-text-muted);
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all $dur-fast $ease-soft;

    input { position: absolute; opacity: 0; pointer-events: none; }
    &.is-active { color: #0a0a0b; background: var(--c-yellow); border-color: var(--c-yellow); }
  }
}
</style>
