<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/section/Heading.vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCatalog } from '~/composables/useCatalog'
import { SITE, CONTACT } from '~/config/site'

const { t } = useI18n()
const { allReviews } = useCatalog()

const ratingText = computed(() => SITE.rating.value.toString().replace('.', ','))
// Gold star-fill width as a percentage of 5 (e.g. 4.7 → 94%).
const fillPct = computed(() => `${(SITE.rating.value / 5) * 100}%`)
const summary = computed(() =>
  t('reviews.ratingSummary', { count: SITE.rating.count }),
)
const googleUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`,
)
const stars = [0, 1, 2, 3, 4]
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        :kicker="t('reviews.kicker')"
        :title="t('reviews.title')"
        :subtitle="t('reviews.subtitle')"
        align="center"
      />

      <div class="rating" data-reveal>
        <div class="rating__score">
          <span class="rating__value">{{ ratingText }}</span>
          <span class="rating__out">{{ t('reviews.outOf') }}</span>
        </div>

        <div class="rating__meta">
          <div class="rating__stars" :aria-label="`${ratingText} / 5`">
            <div class="rating__stars-base">
              <Icon v-for="s in stars" :key="`b${s}`" name="star" :size="26" />
            </div>
            <div class="rating__stars-fill" :style="{ width: fillPct }">
              <Icon v-for="s in stars" :key="`f${s}`" name="star" :size="26" />
            </div>
          </div>
          <p class="rating__summary">{{ summary }}</p>
          <span class="rating__verified">
            <Icon name="check" :size="14" />{{ t('reviews.verified') }}
          </span>
        </div>

        <div class="rating__cta">
          <Button variant="outline-yellow" :href="googleUrl" icon-right="arrow">
            {{ t('reviews.readOnGoogle') }}
          </Button>
        </div>
      </div>

      <ul v-if="allReviews.length" class="reviews">
        <li v-for="(r, i) in allReviews" :key="i" class="review" data-reveal>
          <div class="review__stars">
            <Icon v-for="n in r.rating" :key="n" name="star" :size="15" />
          </div>
          <p class="review__text">“{{ r.text }}”</p>
          <div class="review__foot">
            <span class="review__author">{{ r.author }}</span>
            <span v-if="r.date" class="review__date mono">{{ r.date }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-5;
  text-align: center;
  padding: $space-8 $space-6;
  background:
    radial-gradient(70% 120% at 50% 0%, rgba($yellow-400, 0.1), transparent 60%),
    var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-xl;
  max-width: 720px;
  margin-inline: auto;

  @include up(md) {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    padding: $space-8;
  }

  &__score {
    display: flex;
    align-items: baseline;
    gap: $space-2;
    flex-shrink: 0;
  }

  &__value {
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: fluid(3.5rem, 5rem);
    line-height: 1;
    color: var(--c-yellow);
  }

  &__out { font-family: $font-mono; color: var(--c-text-faint); }

  &__meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-2;
    flex: 1;
    @include up(md) { align-items: flex-start; }
  }

  // Two-layer star bar: muted base + gold fill clipped to the rating width.
  &__stars {
    position: relative;
    display: inline-block;
    line-height: 0;
  }
  &__stars-base { display: flex; gap: 3px; color: var(--c-border-strong); }
  &__stars-fill {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 3px;
    overflow: hidden;
    white-space: nowrap;
    color: var(--c-yellow);
  }

  &__summary { color: var(--c-text-muted); font-size: $fs-sm; }

  &__verified {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    @include spec-label;
    color: var(--c-success);
    svg { color: var(--c-success); }
  }

  &__cta { flex-shrink: 0; }
}

.reviews {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  margin-top: $space-8;
  @include up(sm) { grid-template-columns: repeat(2, 1fr); }
  @include up(lg) { grid-template-columns: repeat(3, 1fr); }
}

.review {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;

  &__stars { display: flex; gap: 2px; color: var(--c-yellow); }
  &__text { color: var(--c-text); flex: 1; }
  &__foot { display: flex; align-items: center; justify-content: space-between; }
  &__author { font-weight: $fw-semibold; color: var(--c-text-strong); }
  &__date { font-size: $fs-xs; color: var(--c-text-faint); }
}
</style>
