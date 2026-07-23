<script setup lang="ts">
import { computed } from 'vue'

/**
 * Lightweight inline-SVG icon set. Keeps the bundle free of an icon library and
 * lets icons inherit `currentColor`. Add new glyphs to the `paths` map.
 * Stroke-based unless the glyph markup sets its own fill.
 */
const props = withDefaults(
  defineProps<{ name: string; size?: number | string }>(),
  { size: 24 },
)

// Each entry is the inner markup of a 24×24 viewBox.
const paths: Record<string, string> = {
  // Catalog / service glyphs
  oil: '<path d="M4 20h11a4 4 0 0 0 4-4v-3h-4l-2-3H8v3H4z"/><path d="M8 13V7h5l2 3"/><path d="M13 4h3"/>',
  tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  suspension: '<path d="M12 2v4M12 18v4"/><path d="M9 6h6M9 18h6"/><path d="M10 6c0 2 4 2 4 4s-4 2-4 4 4 2 4 4"/>',
  piston: '<rect x="8" y="2" width="8" height="9" rx="1"/><path d="M12 11v5"/><rect x="7" y="16" width="10" height="6" rx="1"/>',
  brake: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
  bolt: '<path d="m13 2-9 12h7l-2 8 9-12h-7z"/>',
  wrench: '<path d="M15 5a4 4 0 0 0-5 5L3 17l4 4 7-7a4 4 0 0 0 5-5l-3 3-3-1-1-3z"/>',
  sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  spray: '<path d="M9 8h8v13H9z"/><path d="M9 8V4h4v4"/><path d="M17 6h2M17 10h2M20 4v2M20 8v2"/>',
  // UI glyphs
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 12.5A2 2 0 0 0 9.5 17H18a2 2 0 0 0 2-1.6L22 7H6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z" fill="currentColor" stroke="none"/>',
  map: '<path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z"/><path d="M9 3v16M15 5v16"/>',
  phone: '<path d="M6 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
  threads: '<path d="M12 3c5 0 8 3 8 9s-3 9-8 9-8-3-8-9 3-9 8-9z"/><path d="M9 13c0-2 1.5-3 3.2-3s3.3 1 3.3 3-1.4 3-3 3c-2.4 0-2.6-3 .5-3.6"/>',
  shop: '<path d="M4 7h16l-1 13H5z"/><path d="M8 7a4 4 0 0 1 8 0"/>',
  flag: '<path d="M5 3v18"/><path d="M5 4h13l-2 4 2 4H5z" fill="currentColor" stroke="none"/>',
}

const inner = computed(() => paths[props.name] ?? '')
const dim = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)
</script>

<template>
  <svg
    class="icon"
    :width="dim"
    :height="dim"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="inner"
  />
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
