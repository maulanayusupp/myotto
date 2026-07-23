<script setup lang="ts">
import { computed } from 'vue'
import BrandLogo from '~/components/BrandLogo.vue'
import Icon from '~/components/ui/Icon.vue'
import { SITE, CONTACT, SOCIALS } from '~/config/site'

const { t } = useI18n()
const localePath = useLocalePath()
const year = 2026 // build-time constant; bump on redeploy (Date.now is avoided)

const explore = computed(() => [
  { to: localePath('/services'), label: t('nav.services') },
  { to: localePath('/shop'), label: t('nav.shop') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const legal = computed(() => [
  { to: localePath('/legal/privacy'), label: t('legal.privacy') },
  { to: localePath('/legal/terms'), label: t('legal.terms') },
  { to: localePath('/legal/compliance'), label: t('legal.compliance') },
])

const socials = [
  { href: SOCIALS.instagram, icon: 'instagram', label: 'Instagram' },
  { href: SOCIALS.threads, icon: 'threads', label: 'Threads' },
  { href: SOCIALS.shopee, icon: 'shop', label: 'Shopee' },
  { href: SOCIALS.whatsapp, icon: 'whatsapp', label: 'WhatsApp' },
]
</script>

<template>
  <footer class="ft">
    <div class="checker-strip" />
    <div class="ft__main container">
      <div class="ft__brand">
        <BrandLogo :height="34" />
        <p class="ft__tagline">{{ t('footer.tagline') }}</p>
        <div class="ft__socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            :aria-label="s.label"
            class="ft__social"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon :name="s.icon" :size="20" />
          </a>
        </div>
      </div>

      <nav class="ft__col" aria-label="Explore">
        <h5 class="ft__col-title">{{ t('footer.explore') }}</h5>
        <NuxtLink v-for="l in explore" :key="l.to" :to="l.to" class="ft__link">{{ l.label }}</NuxtLink>
      </nav>

      <nav class="ft__col" aria-label="Legal">
        <h5 class="ft__col-title">{{ t('footer.legal') }}</h5>
        <NuxtLink v-for="l in legal" :key="l.to" :to="l.to" class="ft__link">{{ l.label }}</NuxtLink>
      </nav>

      <div class="ft__col">
        <h5 class="ft__col-title">{{ t('footer.contact') }}</h5>
        <address class="ft__contact">
          <span>{{ CONTACT.address.line }}</span>
          <span>{{ CONTACT.address.area }}, {{ CONTACT.address.city }}</span>
          <a :href="CONTACT.whatsapp" class="ft__link" target="_blank" rel="noopener noreferrer">
            {{ CONTACT.phoneDisplay }}
          </a>
        </address>
      </div>
    </div>

    <div class="ft__bottom container">
      <p>© {{ year }} {{ SITE.legalName }}. {{ t('footer.rights') }}</p>
      <p class="ft__evidence">{{ t('footer.evidence') }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.ft {
  background: var(--c-surface);
  border-top: 1px solid var(--c-border);
  margin-top: $space-12;

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;
    padding-block: $space-10 $space-8;
    @include up(md) { grid-template-columns: 1.6fr 1fr 1fr 1.4fr; gap: $space-6; }
  }

  &__tagline {
    margin-top: $space-4;
    max-width: 28ch;
    font-size: $fs-sm;
  }

  &__socials { display: flex; gap: $space-2; margin-top: $space-5; }

  &__social {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--c-border);
    border-radius: $radius-sm;
    color: var(--c-text-muted);
    transition: all $dur-fast $ease-soft;
    &:hover { color: #0a0a0b; background: var(--c-yellow); border-color: var(--c-yellow); }
  }

  &__col { display: flex; flex-direction: column; gap: $space-3; }

  &__col-title {
    @include spec-label;
    color: var(--c-yellow);
    margin-bottom: $space-1;
  }

  &__link {
    font-size: $fs-sm;
    color: var(--c-text-muted);
    transition: color $dur-fast $ease-soft;
    &:hover { color: var(--c-yellow); }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    font-style: normal;
    font-size: $fs-sm;
    color: var(--c-text-muted);
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding-block: $space-5;
    border-top: 1px solid var(--c-border);
    font-size: $fs-xs;
    color: var(--c-text-faint);
    @include up(md) { flex-direction: row; justify-content: space-between; }
  }

  &__evidence { font-family: $font-mono; }
}
</style>
