<script setup lang="ts">
import Button from '~/components/ui/Button.vue'

/**
 * Shared shell for legal/compliance pages: title, last-updated date, and slotted
 * body content. Keeps the three legal pages visually consistent.
 */
defineProps<{ title: string; updated: string }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="doc container--narrow">
    <header class="doc__head">
      <h1 class="doc__title">{{ title }}</h1>
      <p class="doc__updated mono">{{ t('legal.updated') }}: {{ updated }}</p>
    </header>

    <div class="doc__body">
      <slot />
    </div>

    <Button variant="ghost" size="sm" :to="localePath('/')" icon="arrow">{{ t('legal.backHome') }}</Button>
  </div>
</template>

<style scoped lang="scss">
.doc {
  padding-block: $space-10 $space-12;

  &__head { margin-bottom: $space-8; padding-bottom: $space-5; border-bottom: 1px solid var(--c-border); }
  &__title { margin-bottom: $space-3; }
  &__updated { @include spec-label; color: var(--c-text-faint); }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-5;
    margin-bottom: $space-8;

    :deep(h2) { font-size: 1.4rem; margin-top: $space-4; color: var(--c-yellow); }
    :deep(h3) { font-size: 1.15rem; }
    :deep(p) { color: var(--c-text-muted); line-height: 1.7; }
    :deep(ul) { display: flex; flex-direction: column; gap: $space-2; padding-left: $space-5; }
    :deep(li) { color: var(--c-text-muted); list-style: disc; line-height: 1.6; }
    :deep(a) { color: var(--c-yellow); text-decoration: underline; }
    :deep(strong) { color: var(--c-text-strong); }
  }
}
</style>
