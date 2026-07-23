<script setup lang="ts">
import SectionHeading from '~/components/section/Heading.vue'
import Icon from '~/components/ui/Icon.vue'
import { SOCIALS } from '~/config/site'

const { t } = useI18n()

// Themed placeholder tiles (see /public/gallery). Replace with real feed photos.
const tiles = [
  { src: '/gallery/g1.jpg', alt: 'Workshop bay' },
  { src: '/gallery/g2.jpg', alt: 'CVT performance parts' },
  { src: '/gallery/g3.jpg', alt: 'Custom repaint' },
  { src: '/gallery/g4.jpg', alt: 'Tire fitting' },
  { src: '/gallery/g5.jpg', alt: 'Suspension upgrade' },
  { src: '/gallery/g6.jpg', alt: 'Detailing finish' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading :kicker="t('gallery.kicker')" :title="t('gallery.title')" :subtitle="t('gallery.subtitle')" />
      <div class="gal">
        <a
          v-for="(tile, i) in tiles"
          :key="i"
          :href="SOCIALS.instagram"
          class="gal__tile"
          :class="`gal__tile--${i + 1}`"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <img :src="tile.src" :alt="tile.alt" loading="lazy" />
          <span class="gal__overlay"><Icon name="instagram" :size="24" /></span>
        </a>
      </div>
      <p class="gal__note mono">{{ t('gallery.note') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-3;
  @include up(md) { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; }

  &__tile {
    position: relative;
    overflow: hidden;
    border-radius: $radius-md;
    border: 1px solid var(--c-border);
    aspect-ratio: 1;
    @include up(md) { aspect-ratio: auto; }

    img { width: 100%; height: 100%; object-fit: cover; transition: transform $dur-slow $ease-out; }
    &:hover img { transform: scale(1.06); }
    &:hover .gal__overlay { opacity: 1; }

    // Feature the 1st and 6th tiles across two cells on wide screens.
    @include up(md) {
      &--1 { grid-column: span 2; grid-row: span 2; }
      &--6 { grid-column: span 2; }
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: #fff;
    background: rgba($red-500, 0.55);
    opacity: 0;
    transition: opacity $dur-base $ease-soft;
  }

  &__note {
    margin-top: $space-4;
    font-size: $fs-xs;
    color: var(--c-text-faint);
    text-align: center;
  }
}
</style>
