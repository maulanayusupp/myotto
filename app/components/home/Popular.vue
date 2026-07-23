<script setup lang="ts">
import SectionHeading from '~/components/section/Heading.vue'
import ProductCard from '~/components/product/Card.vue'
import Button from '~/components/ui/Button.vue'
import { useCatalog } from '~/composables/useCatalog'

const { t } = useI18n()
const localePath = useLocalePath()
const { popularProducts } = useCatalog()
</script>

<template>
  <section class="section container">
    <div class="pop__head">
      <SectionHeading :kicker="t('common.viewAll')" :title="t('shop.title')" />
      <Button variant="ghost" size="sm" :to="localePath('/shop')" icon-right="arrow" class="pop__link">
        {{ t('common.viewAll') }}
      </Button>
    </div>
    <div class="pop-grid">
      <ProductCard v-for="p in popularProducts" :key="p.slug" :product="p" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.pop {
  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: $space-4;
    :deep(.heading) { margin-bottom: $space-6; }
  }
  &__link { flex-shrink: 0; margin-bottom: $space-6; }
}

.pop-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-4;
  @include up(md) { grid-template-columns: repeat(3, 1fr); }
  @include up(lg) { grid-template-columns: repeat(4, 1fr); }
}
</style>
