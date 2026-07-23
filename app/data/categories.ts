import type { Category } from '~/types/catalog'

/**
 * Product categories. Derived from MYOTTO's own posts & Instagram Story
 * highlights (oli, ban, suspensi/kaki-kaki, performa/bore-up, pengereman,
 * variasi) and the bio's service list. No assumed categories.
 */
export const categories: Category[] = [
  {
    slug: 'oli',
    name: { id: 'Oli & Pelumas', en: 'Oil & Lubricants' },
    tagline: { id: 'Performa mesin harian', en: 'Everyday engine performance' },
    icon: 'oil',
  },
  {
    slug: 'ban',
    name: { id: 'Ban', en: 'Tires' },
    tagline: { id: 'Grip untuk jalan & lintasan', en: 'Grip for street & track' },
    icon: 'tire',
  },
  {
    slug: 'kaki-kaki',
    name: { id: 'Kaki-kaki & Suspensi', en: 'Suspension & Chassis' },
    tagline: { id: 'Handling lebih stabil', en: 'More stable handling' },
    icon: 'suspension',
  },
  {
    slug: 'performa',
    name: { id: 'Performa & CVT', en: 'Performance & CVT' },
    tagline: { id: 'Upgrade tenaga & akselerasi', en: 'Power & acceleration upgrades' },
    icon: 'piston',
  },
  {
    slug: 'pengereman',
    name: { id: 'Pengereman', en: 'Braking' },
    tagline: { id: 'Pakem dan aman', en: 'Sharp and safe' },
    icon: 'brake',
  },
  {
    slug: 'variasi',
    name: { id: 'Variasi & Aksesoris', en: 'Styling & Accessories' },
    tagline: { id: 'Tampil beda di jalan', en: 'Stand out on the road' },
    icon: 'bolt',
  },
]
