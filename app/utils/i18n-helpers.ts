import type { Bilingual } from '~/types/catalog'

export type LocaleCode = 'id' | 'en'

/** Pick the correct side of a bilingual value for the active locale. */
export function pickLocale(value: Bilingual, locale: LocaleCode): string {
  return value[locale] ?? value.id
}
