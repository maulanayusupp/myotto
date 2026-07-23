<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { CONTACT, SITE } from '~/config/site'

const { t } = useI18n()
const mapsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`,
)
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="visit" data-reveal>
        <div class="visit__info">
          <span class="kicker">{{ t('visit.kicker') }}</span>
          <h2 class="visit__title">{{ t('visit.title') }}</h2>
          <p class="visit__body">{{ CONTACT.address.line }}<br />{{ CONTACT.address.area }}, {{ CONTACT.address.city }} {{ CONTACT.address.postalCode }}</p>

          <ul class="visit__meta">
            <li><Icon name="phone" :size="18" /><a :href="CONTACT.whatsapp" target="_blank" rel="noopener noreferrer">{{ CONTACT.phoneDisplay }}</a></li>
            <li><Icon name="star" :size="18" />{{ SITE.rating.value.toString().replace('.', ',') }} · {{ SITE.rating.count }} {{ t('common.reviews') }}</li>
          </ul>

          <div class="visit__actions">
            <Button variant="primary" :href="mapsUrl" icon="map">{{ t('common.getDirections') }}</Button>
            <Button variant="ghost" :href="CONTACT.whatsapp" icon="whatsapp">{{ t('common.chatWhatsapp') }}</Button>
          </div>
        </div>

        <div class="visit__map" aria-hidden="true">
          <div class="visit__grid-lines" />
          <span class="visit__pin"><Icon name="map" :size="30" /></span>
          <span class="visit__area mono">ANTAPANI · BANDUNG</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.visit {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid var(--c-border);
  border-radius: $radius-xl;
  overflow: hidden;
  background: var(--c-surface);
  @include up(lg) { grid-template-columns: 1fr 1fr; }

  &__info { padding: $space-8 $space-6; display: flex; flex-direction: column; gap: $space-4; }
  &__title { font-size: fluid(2rem, 3rem); }
  &__body { color: var(--c-text-muted); }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    li { display: flex; align-items: center; gap: $space-3; color: var(--c-text); }
    svg { color: var(--c-yellow); }
    a:hover { color: var(--c-yellow); }
  }

  &__actions { display: flex; flex-wrap: wrap; gap: $space-3; margin-top: $space-2; }

  &__map {
    position: relative;
    min-height: 280px;
    display: grid;
    place-items: center;
    background:
      radial-gradient(60% 60% at 50% 40%, rgba($red-500, 0.18), transparent 70%),
      var(--c-surface-2);
    overflow: hidden;
  }

  &__grid-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--c-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--c-border) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.4;
    mask-image: radial-gradient(70% 70% at 50% 50%, #000, transparent);
  }

  &__pin {
    position: relative;
    display: grid;
    place-items: center;
    width: 66px;
    height: 66px;
    color: #0a0a0b;
    background: var(--c-yellow);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: $shadow-md;
    svg { transform: rotate(45deg); }
  }

  &__area {
    position: absolute;
    bottom: $space-5;
    @include spec-label;
    color: var(--c-text-muted);
  }
}
</style>
