<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BrandLogo from '~/components/BrandLogo.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCart } from '~/composables/useCart'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const cart = useCart()

const open = ref(false)
const scrolled = ref(false)

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/services'), label: t('nav.services') },
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

// Close the mobile menu on navigation.
watch(() => route.fullPath, () => (open.value = false))

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 8
  }, { passive: true })
}
</script>

<template>
  <header class="hdr" :class="{ 'is-scrolled': scrolled }">
    <div class="hdr__bar container">
      <NuxtLink :to="localePath('/')" class="hdr__logo" aria-label="MYOTTO home">
        <BrandLogo :height="30" />
      </NuxtLink>

      <nav class="hdr__nav" aria-label="Primary">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="hdr__link"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>

      <div class="hdr__actions">
        <LanguageSwitcher class="hdr__lang" />

        <button
          class="hdr__cart"
          type="button"
          :aria-label="t('cart.title')"
          @click="cart.open()"
        >
          <Icon name="cart" :size="22" />
          <span v-if="cart.count.value > 0" class="hdr__cart-badge">{{ cart.count.value }}</span>
        </button>

        <NuxtLink :to="localePath('/shop')" class="btn btn--primary btn--sm hdr__order">
          {{ t('nav.order') }}
        </NuxtLink>

        <button
          class="hdr__burger"
          type="button"
          :aria-expanded="open"
          :aria-label="t('nav.home')"
          @click="open = !open"
        >
          <Icon :name="open ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <div class="checker-strip hdr__strip" />

    <Transition name="drawer">
      <nav v-if="open" class="hdr__mobile" aria-label="Mobile">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="hdr__mobile-link"
        >
          {{ l.label }}
        </NuxtLink>
        <div class="hdr__mobile-foot">
          <LanguageSwitcher />
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.hdr {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: rgba($black, 0.72);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: background $dur-base $ease-soft, border-color $dur-base $ease-soft;

  &.is-scrolled {
    background: rgba($ink-950, 0.92);
    border-bottom-color: var(--c-border);
  }

  &__bar {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
  }

  &__nav {
    display: none;
    gap: $space-5;
    @include up(lg) { display: flex; }
  }

  &__link {
    @include spec-label;
    color: var(--c-text-muted);
    padding: 0.4rem 0;
    position: relative;
    transition: color $dur-fast $ease-soft;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 2px;
      width: 0;
      background: var(--c-yellow);
      transition: width $dur-base $ease-out;
    }

    &:hover { color: var(--c-text-strong); }
    &.router-link-active {
      color: var(--c-yellow);
      &::after { width: 100%; }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__lang { display: none; @include up(md) { display: inline-flex; } }

  &__cart {
    position: relative;
    display: inline-flex;
    color: var(--c-text);
    padding: 6px;
    transition: color $dur-fast $ease-soft;
    &:hover { color: var(--c-yellow); }
  }

  &__cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    display: grid;
    place-items: center;
    font-family: $font-mono;
    font-size: 11px;
    font-weight: $fw-medium;
    color: #0a0a0b;
    background: var(--c-red);
    color: #fff;
    border-radius: $radius-pill;
  }

  &__order { display: none; @include up(md) { display: inline-flex; } }

  &__burger {
    display: inline-flex;
    color: var(--c-text-strong);
    @include up(lg) { display: none; }
  }

  &__strip { opacity: 0.85; }

  &__mobile {
    display: flex;
    flex-direction: column;
    padding: $space-4;
    gap: $space-1;
    background: var(--c-surface);
    border-bottom: 1px solid var(--c-border);
    @include up(lg) { display: none; }
  }

  &__mobile-link {
    font-family: $font-display;
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: $space-3 $space-2;
    color: var(--c-text);
    border-bottom: 1px solid var(--c-border);
    &.router-link-active { color: var(--c-yellow); }
  }

  &__mobile-foot { padding-top: $space-3; }
}

.drawer-enter-active,
.drawer-leave-active { transition: opacity $dur-base $ease-out, transform $dur-base $ease-out; }
.drawer-enter-from,
.drawer-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
