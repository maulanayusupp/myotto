<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'
import { buildWhatsAppUrl, enquiryMessage } from '~/utils/whatsapp'
import type { LocaleCode } from '~/types/catalog'

const { t, locale } = useI18n()
const waUrl = computed(() =>
  buildWhatsAppUrl(enquiryMessage()[locale.value as LocaleCode]),
)
</script>

<template>
  <section class="cta">
    <div class="cta__inner container" data-reveal>
      <h2 class="cta__title">{{ t('cta.title') }}</h2>
      <p class="cta__sub">{{ t('cta.subtitle') }}</p>
      <Button variant="red" size="lg" :href="waUrl" icon="whatsapp">{{ t('cta.button') }}</Button>
    </div>
    <div class="checker-strip" />
  </section>
</template>

<style scoped lang="scss">
.cta {
  margin-top: $space-12;
  background:
    radial-gradient(70% 120% at 50% 0%, rgba($yellow-400, 0.12), transparent 60%),
    var(--c-surface);
  border-top: 1px solid var(--c-border);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $space-4;
    padding-block: $space-12;
  }

  &__title { font-size: fluid(2rem, 3.5rem); max-width: 20ch; }
  &__sub { max-width: 48ch; font-size: $fs-lg; }
}
</style>
