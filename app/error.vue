<script setup lang="ts">
import type { NuxtError } from '#app'
import BrandLogo from '~/components/BrandLogo.vue'
import Button from '~/components/ui/Button.vue'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="err">
    <div class="err__inner container--narrow">
      <BrandLogo :height="40" />
      <p class="err__code mono">{{ error?.statusCode || 404 }}</p>
      <h1 class="err__title">{{ t('error.title') }}</h1>
      <p class="err__sub">{{ t('error.subtitle') }}</p>
      <Button variant="primary" :to="localePath('/')" icon="flag" @click="clearError({ redirect: localePath('/') })">
        {{ t('error.home') }}
      </Button>
    </div>
    <div class="checker-strip err__strip" />
  </div>
</template>

<style scoped lang="scss">
.err {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(60% 60% at 50% 0%, rgba($yellow-400, 0.08), transparent 70%),
    var(--c-bg);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $space-4;
  }

  &__code {
    font-size: fluid(4rem, 8rem);
    font-weight: $fw-bold;
    color: var(--c-yellow);
    line-height: 1;
  }

  &__title { font-size: fluid(1.8rem, 2.6rem); }
  &__sub { max-width: 40ch; }
  &__strip { position: fixed; bottom: 0; left: 0; }
}
</style>
