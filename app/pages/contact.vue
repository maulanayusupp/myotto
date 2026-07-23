<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import { CONTACT, SOCIALS, SITE } from '~/config/site'

const { t } = useI18n()

const mapsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.mapsQuery}`,
)

const socials = [
  { href: SOCIALS.instagram, icon: 'instagram', label: 'Instagram' },
  { href: SOCIALS.threads, icon: 'threads', label: 'Threads' },
  { href: SOCIALS.shopee, icon: 'shop', label: 'Shopee' },
]

const localePath = useLocalePath()
useSeoMetaTags({ title: t('contact.title'), description: t('contact.pageDesc') })
useLocalBusinessJsonLd()
useBreadcrumbJsonLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.contact'), path: localePath('/contact') },
])
</script>

<template>
  <div>
    <section class="contact-hero">
      <div class="container">
        <span class="kicker">{{ t('contact.kicker') }}</span>
        <h1 class="contact-hero__title">{{ t('contact.title') }}</h1>
        <p class="contact-hero__sub">{{ t('contact.subtitle') }}</p>
      </div>
      <div class="checker-strip" />
    </section>

    <section class="section container">
      <div class="contact-grid">
        <div class="contact-info">
          <article class="info-card" data-reveal>
            <span class="info-card__icon"><Icon name="map" :size="22" /></span>
            <div>
              <h3 class="info-card__title">{{ t('contact.addressLabel') }}</h3>
              <p>{{ CONTACT.address.line }}, {{ CONTACT.address.area }},<br />{{ CONTACT.address.district }}, {{ CONTACT.address.city }}, {{ CONTACT.address.province }} {{ CONTACT.address.postalCode }}</p>
              <Button variant="ghost" size="sm" :href="mapsUrl" icon-right="arrow">{{ t('contact.mapCta') }}</Button>
            </div>
          </article>

          <article class="info-card" data-reveal>
            <span class="info-card__icon"><Icon name="phone" :size="22" /></span>
            <div>
              <h3 class="info-card__title">{{ t('contact.phoneLabel') }}</h3>
              <p><a :href="CONTACT.whatsapp" target="_blank" rel="noopener noreferrer">{{ CONTACT.phoneDisplay }}</a></p>
              <p class="info-card__note mono">{{ t('contact.formNote') }}</p>
            </div>
          </article>

          <article class="info-card" data-reveal>
            <span class="info-card__icon"><Icon name="star" :size="22" /></span>
            <div>
              <h3 class="info-card__title">{{ t('contact.hoursLabel') }}</h3>
              <p>{{ t('contact.hoursValue') }}</p>
              <p>{{ SITE.rating.value.toString().replace('.', ',') }} ★ · {{ SITE.rating.count }} {{ t('common.reviews') }} (Google)</p>
            </div>
          </article>

          <article class="info-card" data-reveal>
            <span class="info-card__icon"><Icon name="instagram" :size="22" /></span>
            <div>
              <h3 class="info-card__title">{{ t('contact.followLabel') }}</h3>
              <div class="socials">
                <a v-for="s in socials" :key="s.label" :href="s.href" class="socials__link" target="_blank" rel="noopener noreferrer">
                  <Icon :name="s.icon" :size="18" />{{ s.label }}
                </a>
              </div>
            </div>
          </article>
        </div>

        <div class="contact-cta" data-reveal>
          <div class="contact-cta__map" aria-hidden="true">
            <div class="contact-cta__lines" />
            <span class="contact-cta__pin"><Icon name="map" :size="28" /></span>
          </div>
          <div class="contact-cta__body">
            <h3>{{ SITE.fullName }}</h3>
            <p>{{ t('contact.subtitle') }}</p>
            <Button variant="primary" block size="lg" :href="CONTACT.whatsapp" icon="whatsapp">{{ t('common.chatWhatsapp') }}</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact-hero {
  position: relative;
  padding-block: $space-10 $space-8;
  background:
    radial-gradient(60% 100% at 70% 0%, rgba($red-500, 0.12), transparent 60%),
    var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  &__title { margin-block: $space-3 $space-4; }
  &__sub { max-width: 50ch; font-size: $fs-lg; }
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;
  @include up(lg) { grid-template-columns: 1.3fr 1fr; align-items: start; }
}

.contact-info { display: grid; grid-template-columns: 1fr; gap: $space-4; @include up(sm) { grid-template-columns: 1fr 1fr; } }

.info-card {
  display: flex;
  gap: $space-4;
  padding: $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;

  &__icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    color: var(--c-yellow);
    background: rgba($yellow-400, 0.1);
    border-radius: $radius-md;
  }

  &__title { font-family: $font-display; text-transform: uppercase; font-size: 1.1rem; margin-bottom: $space-2; color: var(--c-text-strong); }
  p { font-size: $fs-sm; margin-bottom: $space-2; a:hover { color: var(--c-yellow); } }
  &__note { color: var(--c-text-faint); font-size: $fs-xs !important; }
}

.socials { display: flex; flex-direction: column; gap: $space-2; }
.socials__link { display: inline-flex; align-items: center; gap: $space-2; font-size: $fs-sm; color: var(--c-text-muted); &:hover { color: var(--c-yellow); } }

.contact-cta {
  border: 1px solid var(--c-border);
  border-radius: $radius-xl;
  overflow: hidden;
  background: var(--c-surface);
  @include up(lg) { position: sticky; top: calc($header-height + #{$space-4}); }

  &__map {
    position: relative;
    height: 180px;
    display: grid;
    place-items: center;
    background: radial-gradient(60% 60% at 50% 45%, rgba($yellow-400, 0.16), transparent 70%), var(--c-surface-2);
    overflow: hidden;
  }

  &__lines {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--c-border) 1px, transparent 1px), linear-gradient(90deg, var(--c-border) 1px, transparent 1px);
    background-size: 36px 36px;
    opacity: 0.4;
    mask-image: radial-gradient(70% 70% at 50% 50%, #000, transparent);
  }

  &__pin {
    position: relative;
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    color: #0a0a0b;
    background: var(--c-yellow);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: $shadow-md;
    svg { transform: rotate(45deg); }
  }

  &__body { padding: $space-6; display: flex; flex-direction: column; gap: $space-3; h3 { font-size: 1.5rem; } p { font-size: $fs-sm; } }
}
</style>
