<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/components/ui/Icon.vue'

/**
 * Polymorphic button/link. Renders <NuxtLink> for internal `to`, <a> for
 * external `href`, otherwise a <button>. Visual variants live in
 * assets/scss/components/_button.scss (no inline CSS).
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'red' | 'ghost' | 'outline-yellow'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    block?: boolean
    icon?: string
    iconRight?: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  props.size !== 'md' && `btn--${props.size}`,
  props.block && 'btn--block',
])

const tag = computed(() => (props.to ? 'NuxtLink' : props.href ? 'a' : 'button'))
const external = computed(() =>
  props.href ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :to="to"
    v-bind="external"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
  >
    <Icon v-if="icon" :name="icon" :size="18" class="btn__icon" />
    <span><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" :size="18" class="btn__icon" />
  </component>
</template>
