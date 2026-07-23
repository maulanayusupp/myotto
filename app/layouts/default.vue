<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import CartDrawer from '~/components/cart/Drawer.vue'
</script>

<template>
  <div class="app-shell">
    <a href="#main" class="skip-link">Skip to content</a>
    <Header />
    <main id="main" class="app-main">
      <slot />
    </main>
    <Footer />
    <CartDrawer />
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.app-main { flex: 1; }

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  z-index: $z-toast;
  padding: $space-3 $space-4;
  background: var(--c-yellow);
  color: #0a0a0b;
  font-weight: $fw-semibold;
  &:focus { left: $space-4; top: $space-4; }
}
</style>
