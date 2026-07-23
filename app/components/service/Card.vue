<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/components/ui/Icon.vue'
import { pickLocale } from '~/utils/i18n-helpers'
import { formatIDR } from '~/utils/format'
import { buildWhatsAppUrl, enquiryMessage } from '~/utils/whatsapp'
import type { Service, LocaleCode } from '~/types/catalog'

const props = withDefaults(
  defineProps<{ service: Service; compact?: boolean }>(),
  { compact: false },
)

const { t, locale } = useI18n()
const lc = computed(() => locale.value as LocaleCode)

const name = computed(() => pickLocale(props.service.name, lc.value))
const desc = computed(() => pickLocale(props.service.desc, lc.value))
const priceLabel = computed(() =>
  props.service.priceIDR === null
    ? t('services.estimateNote')
    : `${t('common.from')} ${formatIDR(props.service.priceIDR)}`,
)
const bookUrl = computed(() => buildWhatsAppUrl(enquiryMessage(name.value)[lc.value]))
</script>

<template>
  <article class="svc" :class="{ 'svc--compact': compact }" data-reveal>
    <div class="svc__top">
      <span class="svc__icon"><Icon :name="service.icon" :size="26" /></span>
      <span class="svc__price" :class="{ 'svc__price--est': service.priceIDR === null }">
        {{ priceLabel }}
      </span>
    </div>

    <h3 class="svc__name">{{ name }}</h3>
    <p class="svc__desc">{{ desc }}</p>

    <ul v-if="!compact && service.includes?.length" class="svc__includes">
      <li v-for="(inc, i) in service.includes" :key="i">
        <Icon name="check" :size="15" />{{ pickLocale(inc, lc) }}
      </li>
    </ul>

    <a v-if="!compact" :href="bookUrl" class="svc__cta" target="_blank" rel="noopener noreferrer">
      {{ t('services.bookCta') }} <Icon name="whatsapp" :size="16" />
    </a>
  </article>
</template>

<style scoped lang="scss">
.svc {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
  transition: transform $dur-base $ease-out, border-color $dur-base $ease-soft;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--c-yellow);
    transition: width $dur-base $ease-out;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--c-border-strong);
    &::before { width: 100%; }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    color: var(--c-yellow);
    background: rgba($yellow-400, 0.1);
    border: 1px solid rgba($yellow-400, 0.25);
    border-radius: $radius-md;
  }

  &__price {
    font-family: $font-mono;
    font-weight: $fw-medium;
    color: var(--c-text-strong);
    text-align: right;
    &--est { font-size: $fs-xs; color: var(--c-text-faint); text-transform: uppercase; max-width: 12ch; }
  }

  &__name { font-size: 1.3rem; }
  &__desc { font-size: $fs-sm; flex: 1; }

  &__includes {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    margin-top: $space-2;
    font-size: $fs-sm;
    color: var(--c-text-muted);

    li { display: flex; align-items: center; gap: $space-2; }
    svg { color: var(--c-yellow); flex-shrink: 0; }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    margin-top: $space-2;
    @include spec-label;
    color: var(--c-yellow);
    &:hover { color: var(--c-yellow-bright); gap: $space-3; }
  }

  &--compact { padding: $space-4; }
}
</style>
