<script setup lang="ts">
import { computed } from 'vue'

/**
 * ID/EN toggle. Uses the i18n switchLocalePath helper so the current route is
 * preserved when switching languages.
 */
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map((l) => ({
    code: l.code,
    label: l.code.toUpperCase(),
    to: switchLocalePath(l.code as 'id' | 'en'),
  })),
)
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <NuxtLink
      v-for="opt in options"
      :key="opt.code"
      :to="opt.to"
      class="lang__opt"
      :class="{ 'is-active': locale === opt.code }"
    >
      {{ opt.label }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.lang {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--c-border);
  border-radius: $radius-pill;
  background: var(--c-surface-2);

  &__opt {
    @include spec-label;
    padding: 0.3rem 0.6rem;
    border-radius: $radius-pill;
    color: var(--c-text-faint);
    transition: color $dur-fast $ease-soft, background $dur-fast $ease-soft;

    &:hover { color: var(--c-text); }

    &.is-active {
      color: #0a0a0b;
      background: var(--c-yellow);
    }
  }
}
</style>
