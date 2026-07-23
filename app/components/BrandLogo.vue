<script setup lang="ts">
/**
 * MYOTTO wordmark. A checkered-flag chevron mark + "MYOTTO" wordmark, built as
 * inline SVG so it stays crisp and inherits brand colors. `variant` controls the
 * wordmark color for dark/light contexts.
 */
withDefaults(
  defineProps<{ variant?: 'default' | 'mono'; height?: number }>(),
  { variant: 'default', height: 30 },
)
</script>

<template>
  <span class="logo" :style="{ '--h': height + 'px' }" aria-label="MYOTTO">
    <svg class="logo__mark" viewBox="0 0 40 32" aria-hidden="true">
      <!-- checkered chevrons -->
      <path d="M4 4h9l-6 24H1z" fill="var(--c-yellow)" />
      <path d="M15 4h9l-6 24h-9z" fill="var(--c-white)" />
      <rect x="16" y="4" width="4.5" height="4" fill="#0a0a0b" />
      <rect x="11.5" y="12" width="4.5" height="4" fill="#0a0a0b" />
      <rect x="16" y="12" width="4.5" height="4" fill="var(--c-yellow)" opacity="0.0" />
      <rect x="14" y="20" width="4.5" height="4" fill="#0a0a0b" />
    </svg>
    <span class="logo__word" :class="`logo__word--${variant}`">
      MY<span class="logo__word-accent">OTTO</span>
    </span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: var(--h);
  line-height: 1;

  &__mark {
    height: 100%;
    width: auto;
    aspect-ratio: 40 / 32;
  }

  &__word {
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: calc(var(--h) * 0.74);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--c-white);

    &--mono { color: currentColor; }
  }

  &__word-accent { color: var(--c-yellow); }
  &__word--mono &-accent,
  &__word--mono .logo__word-accent { color: currentColor; }
}
</style>
