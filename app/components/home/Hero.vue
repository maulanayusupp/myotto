<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { SITE } from '~/config/site'
import { formatCompact } from '~/utils/format'

const { t } = useI18n()
const localePath = useLocalePath()

const stats = [
  { value: SITE.rating.value.toString().replace('.', ','), label: 'hero.statRating' },
  { value: SITE.rating.count.toString(), label: 'hero.statReviews' },
  { value: formatCompact(14000), label: 'hero.statFollowers' },
]
</script>

<template>
  <section class="hero">
    <div class="hero__grid container">
      <div class="hero__content">
        <span class="kicker">{{ t('hero.kicker') }}</span>
        <h1 class="hero__title">
          <span class="hero__title-1">{{ t('hero.titleLine1') }}</span>
          <span class="hero__title-2">{{ t('hero.titleLine2') }}</span>
        </h1>
        <p class="hero__sub">{{ t('hero.subtitle') }}</p>

        <div class="hero__actions">
          <Button variant="primary" size="lg" :to="localePath('/shop')" icon="cart">
            {{ t('hero.ctaPrimary') }}
          </Button>
          <Button variant="ghost" size="lg" :to="localePath('/services')" icon-right="arrow">
            {{ t('hero.ctaSecondary') }}
          </Button>
        </div>

        <dl class="hero__stats">
          <div v-for="(s, i) in stats" :key="i" class="hero__stat">
            <dt class="hero__stat-value">
              <Icon v-if="i === 0" name="star" :size="20" class="hero__star" />{{ s.value }}
            </dt>
            <dd class="hero__stat-label">{{ t(s.label) }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero__disc">
          <Icon name="brake" :size="220" class="hero__disc-icon" />
        </div>
        <span class="hero__tag hero__tag--1">{{ SITE.tagline }}</span>
        <span class="hero__tag hero__tag--2 mono">BORE UP · DETAILING · REPAINT</span>
      </div>
    </div>
    <div class="checker-strip hero__strip" />
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(80% 60% at 85% 10%, rgba($red-500, 0.16), transparent 60%),
    radial-gradient(70% 60% at 10% 0%, rgba($yellow-400, 0.1), transparent 55%),
    var(--c-bg);

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;
    padding-block: $space-10 $space-12;
    @include up(lg) {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      padding-block: $space-12 $space-16;
    }
  }

  &__content { display: flex; flex-direction: column; gap: $space-5; }

  &__title {
    display: flex;
    flex-direction: column;
    font-size: fluid(2.75rem, 5.5rem);
    line-height: 0.92;
  }
  &__title-2 { color: var(--c-yellow); }

  &__sub {
    font-size: $fs-lg;
    max-width: 46ch;
    color: var(--c-text-muted);
  }

  &__actions { display: flex; flex-wrap: wrap; gap: $space-3; }

  &__stats {
    display: flex;
    gap: $space-8;
    margin-top: $space-4;
    padding-top: $space-5;
    border-top: 1px solid var(--c-border);
  }

  &__stat { display: flex; flex-direction: column; gap: 2px; }

  &__stat-value {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: 2rem;
    color: var(--c-text-strong);
  }
  &__star { color: var(--c-yellow); }

  &__stat-label { @include spec-label; color: var(--c-text-faint); }

  // Visual — a stylized brake-disc emblem with floating tags.
  &__visual {
    position: relative;
    display: none;
    aspect-ratio: 1;
    @include up(lg) { display: block; }
  }

  &__disc {
    position: absolute;
    inset: 8%;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background:
      conic-gradient(from 0deg, rgba($yellow-400, 0.14), transparent 25%, rgba($red-500, 0.14) 50%, transparent 75%, rgba($yellow-400, 0.14)),
      var(--c-surface);
    border: 1px solid var(--c-border-strong);
    box-shadow: inset 0 0 80px rgba(#000, 0.6), $shadow-lg;
    animation: spin 26s linear infinite;
  }

  &__disc-icon { color: var(--c-yellow); opacity: 0.9; }

  &__tag {
    position: absolute;
    padding: 0.5rem 0.9rem;
    background: var(--c-surface-2);
    border: 1px solid var(--c-border);
    border-radius: $radius-pill;
    font-family: $font-display;
    text-transform: uppercase;
    font-size: $fs-sm;
    letter-spacing: 0.06em;
    box-shadow: $shadow-md;

    &--1 { top: 12%; left: -4%; color: var(--c-yellow); border-color: rgba($yellow-400, 0.4); }
    &--2 { bottom: 14%; right: -6%; color: var(--c-text-muted); font-size: $fs-xs; }
  }

  &__strip { position: absolute; bottom: 0; left: 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hero__disc { animation: none; }
}
</style>
