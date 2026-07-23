<script setup lang="ts">
/**
 * Brand marquee — an infinite scrolling ribbon of the brands MYOTTO carries
 * (all seen in their posts) plus service keywords. Pure CSS animation.
 */
const items = [
  'KYB', 'PIRELLI', 'MAXXIS', 'MOTUL', 'PROPER RACING', 'SHELL', 'YAMALUBE',
  'BORE UP', 'AUTO DETAILING', 'REPAINT', 'CVT', 'VARIASI',
]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(it, i) in [...items, ...items]" :key="i" class="marquee__item">
        {{ it }}<span class="marquee__dot">◆</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--c-border);
  background: var(--c-surface);
  padding-block: $space-3;

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 32s linear infinite;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: $space-4;
    padding-inline: $space-4;
    font-family: $font-display;
    font-weight: $fw-semibold;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--c-text-muted);
    white-space: nowrap;
  }

  &__dot { color: var(--c-yellow); font-size: 0.6rem; }

  &:hover .marquee__track { animation-play-state: paused; }
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
