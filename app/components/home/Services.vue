<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/section/Heading.vue'
import ServiceCard from '~/components/service/Card.vue'
import Button from '~/components/ui/Button.vue'
import { useCatalog } from '~/composables/useCatalog'

const { t } = useI18n()
const localePath = useLocalePath()
const { allServices } = useCatalog()

// Home shows a compact selection; full detail lives on /services.
const preview = computed(() => allServices.value.slice(0, 6))
</script>

<template>
  <section class="section container">
    <SectionHeading :kicker="t('services.kicker')" :title="t('services.title')" :subtitle="t('services.subtitle')" />
    <div class="svc-grid">
      <ServiceCard v-for="s in preview" :key="s.slug" :service="s" compact />
    </div>
    <div class="svc-more">
      <Button variant="outline-yellow" :to="localePath('/services')" icon-right="arrow">
        {{ t('common.viewAll') }}
      </Button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.svc-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  @include up(sm) { grid-template-columns: repeat(2, 1fr); }
  @include up(lg) { grid-template-columns: repeat(3, 1fr); }
}
.svc-more { margin-top: $space-8; display: flex; justify-content: center; }
</style>
