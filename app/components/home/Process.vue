<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/section/Heading.vue'

const { t } = useI18n()

const steps = computed(() => [
  { n: '01', title: t('process.s1Title'), desc: t('process.s1Desc') },
  { n: '02', title: t('process.s2Title'), desc: t('process.s2Desc') },
  { n: '03', title: t('process.s3Title'), desc: t('process.s3Desc') },
])
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading :kicker="t('process.kicker')" :title="t('process.title')" align="center" />
      <ol class="steps">
        <li v-for="s in steps" :key="s.n" class="step" data-reveal>
          <span class="step__n mono">{{ s.n }}</span>
          <h3 class="step__title">{{ s.title }}</h3>
          <p class="step__desc">{{ s.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-5;
  counter-reset: step;
  @include up(md) { grid-template-columns: repeat(3, 1fr); }
}

.step {
  position: relative;
  padding: $space-6 $space-5;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: $radius-lg;
  text-align: center;
  overflow: hidden;

  &__n {
    display: inline-block;
    font-size: 2.5rem;
    font-weight: $fw-bold;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--c-yellow);
    margin-bottom: $space-3;
  }

  &__title { margin-bottom: $space-2; }
  &__desc { font-size: $fs-sm; }
}
</style>
