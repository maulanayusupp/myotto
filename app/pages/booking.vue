<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { useCatalog } from '~/composables/useCatalog'
import { pickLocale } from '~/utils/i18n-helpers'
import { buildWhatsAppUrl, buildBookingMessage } from '~/utils/whatsapp'
import { CONTACT, SITE } from '~/config/site'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const route = useRoute()
const { allServices } = useCatalog()
const lc = computed(() => locale.value as LocaleCode)

// Localized service options; value is the slug, label the localized name.
const serviceOptions = computed(() =>
  allServices.value.map((s) => ({ slug: s.slug, name: pickLocale(s.name, lc.value) })),
)

// Bookable time slots (workshop opens through 20:00 → last slot 19:00).
const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const form = reactive({
  service: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  vehicle: '',
  notes: '',
})
const submitted = ref(false)
const minDate = ref('') // set client-side so the min is always "today"

onMounted(() => {
  minDate.value = new Date().toISOString().slice(0, 10)
  // Pre-select a service from ?service=<slug> after hydration (the query isn't
  // available when prerendering static HTML, so we read it on the client).
  const q = route.query.service
  if (typeof q === 'string' && q) form.service = q
})

const nameError = computed(() => submitted.value && !form.name.trim())
const serviceError = computed(() => submitted.value && !form.service)

function submit() {
  submitted.value = true
  if (!form.name.trim() || !form.service) return

  const serviceName =
    serviceOptions.value.find((s) => s.slug === form.service)?.name || form.service

  const message = buildBookingMessage({
    name: form.name,
    phone: form.phone,
    vehicle: form.vehicle,
    service: serviceName,
    date: form.date,
    time: form.time,
    notes: form.notes,
    locale: lc.value,
  })
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener')
}

const mapsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`,
)

const localePath = useLocalePath()
useSeoMetaTags({ title: t('booking.title'), description: t('booking.pageDesc') })
useBreadcrumbJsonLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.booking'), path: localePath('/booking') },
])
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="kicker">{{ t('booking.kicker') }}</span>
        <h1 class="page-hero__title">{{ t('booking.title') }}</h1>
        <p class="page-hero__sub">{{ t('booking.subtitle') }}</p>
      </div>
      <div class="checker-strip" />
    </section>

    <section class="section container">
      <div class="bk">
        <form class="bk__form" @submit.prevent="submit">
          <div class="field-row">
            <label class="field">
              <span class="field__label">{{ t('booking.service') }} *</span>
              <select v-model="form.service" class="field__input" :class="{ 'is-error': serviceError }">
                <option value="" disabled>{{ t('booking.servicePh') }}</option>
                <option v-for="s in serviceOptions" :key="s.slug" :value="s.slug">{{ s.name }}</option>
              </select>
              <span v-if="serviceError" class="field__error">{{ t('booking.required') }}</span>
            </label>
          </div>

          <div class="field-row">
            <label class="field">
              <span class="field__label">{{ t('booking.date') }}</span>
              <input v-model="form.date" type="date" class="field__input" :min="minDate" />
            </label>
            <label class="field">
              <span class="field__label">{{ t('booking.time') }}</span>
              <select v-model="form.time" class="field__input">
                <option value="" disabled>{{ t('booking.timePh') }}</option>
                <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
              </select>
            </label>
          </div>

          <label class="field">
            <span class="field__label">{{ t('booking.name') }} *</span>
            <input v-model="form.name" type="text" class="field__input" :class="{ 'is-error': nameError }" :placeholder="t('booking.namePh')" />
            <span v-if="nameError" class="field__error">{{ t('booking.required') }}</span>
          </label>

          <div class="field-row">
            <label class="field">
              <span class="field__label">{{ t('booking.phone') }}</span>
              <input v-model="form.phone" type="tel" class="field__input" :placeholder="t('booking.phonePh')" />
            </label>
            <label class="field">
              <span class="field__label">{{ t('booking.vehicle') }}</span>
              <input v-model="form.vehicle" type="text" class="field__input" :placeholder="t('booking.vehiclePh')" />
            </label>
          </div>

          <label class="field">
            <span class="field__label">{{ t('booking.notes') }}</span>
            <textarea v-model="form.notes" class="field__input field__input--area" rows="3" :placeholder="t('booking.notesPh')" />
          </label>

          <Button type="submit" variant="primary" size="lg" block icon="whatsapp">{{ t('booking.submit') }}</Button>
        </form>

        <aside class="bk__info">
          <h2 class="bk__info-title">{{ t('booking.infoTitle') }}</h2>
          <ul class="bk__meta">
            <li><Icon name="map" :size="18" /><span>{{ CONTACT.address.line }}, {{ CONTACT.address.area }}, {{ CONTACT.address.city }}</span></li>
            <li><Icon name="phone" :size="18" /><a :href="CONTACT.whatsapp" target="_blank" rel="noopener noreferrer">{{ CONTACT.phoneDisplay }}</a></li>
            <li><Icon name="star" :size="18" /><span>{{ SITE.rating.value.toString().replace('.', ',') }} · {{ SITE.rating.count }} {{ t('common.reviews') }}</span></li>
            <li><Icon name="flag" :size="18" /><span>{{ t('booking.hours') }}</span></li>
          </ul>
          <Button variant="ghost" :href="mapsUrl" icon="map" block>{{ t('common.getDirections') }}</Button>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  padding-block: $space-10 $space-8;
  background:
    radial-gradient(60% 100% at 30% 0%, rgba($yellow-400, 0.1), transparent 60%),
    var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  &__title { margin-block: $space-3 $space-4; }
  &__sub { max-width: 52ch; font-size: $fs-lg; }
}

.bk {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;
  @include up(lg) { grid-template-columns: 1.5fr 1fr; align-items: start; }
}

.bk__form {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  padding: $space-6;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
}

.bk__info {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-6;
  background: var(--c-surface-2);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
  @include up(lg) { position: sticky; top: calc($header-height + #{$space-4}); }

  &-title { font-size: 1.4rem; }
}

.bk__meta {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  li { display: flex; align-items: flex-start; gap: $space-3; font-size: $fs-sm; color: var(--c-text-muted); }
  svg { color: var(--c-yellow); flex-shrink: 0; margin-top: 2px; }
  a:hover { color: var(--c-yellow); }
}

// Shared form field styles (mirrors checkout.vue).
.field {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  border: none;

  &__label { @include spec-label; color: var(--c-text-muted); }

  &__input {
    padding: 0.8rem 1rem;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: $radius-sm;
    color: var(--c-text-strong);
    transition: border-color $dur-fast $ease-soft;

    &::placeholder { color: var(--c-text-faint); }
    &:focus { outline: none; border-color: var(--c-yellow); }
    &.is-error { border-color: var(--c-error); }
    &--area { resize: vertical; font-family: $font-body; }
  }

  // Style native date/select controls for the dark theme.
  select.field__input { appearance: none; cursor: pointer; }
  input[type='date'].field__input { color-scheme: dark; }

  &__error { font-size: $fs-xs; color: var(--c-error); }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  @include up(sm) { grid-template-columns: 1fr 1fr; }
}
</style>
