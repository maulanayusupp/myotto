<script setup lang="ts">
import { computed, watch } from 'vue'
import Icon from '~/components/ui/Icon.vue'
import Button from '~/components/ui/Button.vue'
import { useCart } from '~/composables/useCart'
import { formatIDR } from '~/utils/format'

const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCart()

const isEmpty = computed(() => cart.items.value.length === 0)

// Lock body scroll while the drawer is open (client-only).
watch(
  () => cart.isOpen.value,
  (open) => {
    if (import.meta.client) {
      document.body.classList.toggle('no-scroll', open)
    }
  },
)

function goCheckout() {
  cart.close()
  navigateTo(localePath('/checkout'))
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cart.isOpen.value" class="cart-ov" @click="cart.close()" />
    </Transition>
    <Transition name="slide">
      <aside v-if="cart.isOpen.value" class="cart" role="dialog" aria-modal="true" :aria-label="t('cart.title')">
        <header class="cart__head">
          <h3 class="cart__title">{{ t('cart.title') }}</h3>
          <button class="cart__close" type="button" :aria-label="t('common.close')" @click="cart.close()">
            <Icon name="close" :size="22" />
          </button>
        </header>

        <div v-if="isEmpty" class="cart__empty">
          <Icon name="cart" :size="40" />
          <p>{{ t('cart.empty') }}</p>
          <Button variant="outline-yellow" size="sm" :to="localePath('/shop')" @click="cart.close()">
            {{ t('cart.emptyCta') }}
          </Button>
        </div>

        <template v-else>
          <ul class="cart__list">
            <li v-for="line in cart.items.value" :key="line.key" class="cart__item">
              <img :src="line.image" :alt="line.name" class="cart__thumb" width="64" height="64" />
              <div class="cart__info">
                <span class="cart__brand">{{ line.brand }}</span>
                <span class="cart__name">{{ line.name }}</span>
                <span class="cart__price">
                  {{ line.isQuote ? t('common.priceOnRequest') : formatIDR(line.unitPrice) }}
                </span>
              </div>
              <div class="cart__controls">
                <div class="cart__qty">
                  <button type="button" aria-label="-" @click="cart.setQty(line.key, line.qty - 1)">
                    <Icon name="minus" :size="14" />
                  </button>
                  <span>{{ line.qty }}</span>
                  <button type="button" aria-label="+" @click="cart.setQty(line.key, line.qty + 1)">
                    <Icon name="plus" :size="14" />
                  </button>
                </div>
                <button class="cart__remove" type="button" @click="cart.remove(line.key)">
                  {{ t('cart.remove') }}
                </button>
              </div>
            </li>
          </ul>

          <footer class="cart__foot">
            <div class="cart__row">
              <span>{{ t('cart.subtotal') }}</span>
              <strong class="cart__subtotal">{{ formatIDR(cart.subtotal.value) }}</strong>
            </div>
            <p v-if="cart.hasQuoteItems.value" class="cart__note">{{ t('cart.quoteNote') }}</p>
            <Button variant="primary" block icon-right="arrow" @click="goCheckout">
              {{ t('cart.checkout') }}
            </Button>
            <button class="cart__clear" type="button" @click="cart.clear()">{{ t('cart.clear') }}</button>
          </footer>
        </template>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.cart-ov {
  position: fixed;
  inset: 0;
  z-index: $z-overlay;
  background: rgba(#000, 0.6);
  backdrop-filter: blur(2px);
}

.cart {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-drawer;
  width: min(420px, 100vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border-left: 1px solid var(--c-border);
  box-shadow: $shadow-lg;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-4 $space-5;
    border-bottom: 1px solid var(--c-border);
  }

  &__close { color: var(--c-text-muted); &:hover { color: var(--c-yellow); } }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    color: var(--c-text-faint);
  }

  &__list {
    flex: 1;
    overflow-y: auto;
    padding: $space-4;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__item {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: $space-3;
    padding-bottom: $space-4;
    border-bottom: 1px solid var(--c-border);
  }

  &__thumb {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: $radius-sm;
    background: var(--c-red);
  }

  &__info { display: flex; flex-direction: column; gap: 2px; }
  &__brand { @include spec-label; color: var(--c-text-faint); }
  &__name { font-weight: $fw-semibold; color: var(--c-text-strong); line-height: 1.2; }
  &__price { font-family: $font-mono; font-size: $fs-sm; color: var(--c-yellow); }

  &__controls {
    grid-column: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: $space-2;
  }

  &__qty {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    border: 1px solid var(--c-border);
    border-radius: $radius-sm;
    padding: 2px;

    button {
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      color: var(--c-text);
      &:hover { color: var(--c-yellow); }
    }
    span { font-family: $font-mono; min-width: 1ch; text-align: center; }
  }

  &__remove {
    @include spec-label;
    color: var(--c-text-faint);
    &:hover { color: var(--c-red-bright); }
  }

  &__foot {
    padding: $space-5;
    border-top: 1px solid var(--c-border);
    display: flex;
    flex-direction: column;
    gap: $space-4;
    background: var(--c-surface-2);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $fs-lg;
  }

  &__subtotal { font-family: $font-mono; color: var(--c-yellow); font-size: 1.3rem; }
  &__note { font-size: $fs-xs; color: var(--c-text-faint); }

  &__clear {
    @include spec-label;
    align-self: center;
    color: var(--c-text-faint);
    &:hover { color: var(--c-red-bright); }
  }
}

.fade-enter-active,
.fade-leave-active { transition: opacity $dur-base $ease-soft; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform $dur-base $ease-out; }
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); }
</style>
