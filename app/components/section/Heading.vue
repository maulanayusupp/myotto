<script setup lang="ts">
/**
 * Reusable section heading: mono kicker + display title + optional subtitle.
 * `align` centers on request; `light` is unused (site is dark-only) but kept for
 * forward flexibility.
 */
withDefaults(
  defineProps<{ kicker?: string; title: string; subtitle?: string; align?: 'left' | 'center' }>(),
  { align: 'left' },
)
</script>

<template>
  <header class="heading" :class="`heading--${align}`" data-reveal>
    <span v-if="kicker" class="kicker">{{ kicker }}</span>
    <h2 class="heading__title">{{ title }}</h2>
    <p v-if="subtitle" class="heading__sub">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  margin-bottom: $space-8;
  max-width: 46rem;

  &--center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__sub {
    font-size: $fs-lg;
    color: var(--c-text-muted);
    max-width: 42rem;
  }
}
</style>
