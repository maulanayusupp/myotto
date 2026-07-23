import type { Service } from '~/types/catalog'

/**
 * Workshop services.
 *
 * EVIDENCE RULE — service names come from MYOTTO's IG bio ("Variasi & Spare
 * part · Service · Bore up · Autodetailing · Painting") and a pinned pricing
 * post. Package prices below are read directly from that pinned post; confirm
 * with the workshop before launch as promos change. Jobs quoted after
 * inspection use `priceIDR: null`.
 *
 * Pinned-post evidence (service packages):
 *  - Paket Night Power (Shell) ......... Rp80.000
 *  - Paket RHM NIPX (Yamalube) ......... Rp135.000
 *  - Paket Motul Scooter LE ............ Rp145.000
 *  Each package includes: oli 0,8 L · jasa ganti oli · service CVT · service
 *  filter udara · service pengapian/busi · karbu cleaner.
 */
const SERVICE_PACKAGE_INCLUDES = [
  { id: 'Oli mesin 0,8 liter', en: '0.8 L engine oil' },
  { id: 'Jasa ganti oli', en: 'Oil change labour' },
  { id: 'Service CVT', en: 'CVT service' },
  { id: 'Service filter udara', en: 'Air filter service' },
  { id: 'Service pengapian / busi', en: 'Ignition / spark plug service' },
  { id: 'Karburator / throttle body cleaner', en: 'Carb / throttle body cleaner' },
]

export const services: Service[] = [
  {
    slug: 'paket-night-power',
    name: { id: 'Paket Servis — Shell (Night Power)', en: 'Service Package — Shell (Night Power)' },
    desc: {
      id: 'Servis lengkap matic dengan oli Shell Night Power XPro.',
      en: 'Complete scooter service with Shell Night Power XPro oil.',
    },
    priceIDR: 80000,
    icon: 'wrench',
    includes: SERVICE_PACKAGE_INCLUDES,
    source: 'instagram',
  },
  {
    slug: 'paket-rhm-nipx',
    name: { id: 'Paket Servis — Yamalube (RHM NIPX)', en: 'Service Package — Yamalube (RHM NIPX)' },
    desc: {
      id: 'Servis lengkap matic dengan oli Yamalube RHM NIPX.',
      en: 'Complete scooter service with Yamalube RHM NIPX oil.',
    },
    priceIDR: 135000,
    icon: 'wrench',
    includes: SERVICE_PACKAGE_INCLUDES,
    source: 'instagram',
  },
  {
    slug: 'paket-motul-le',
    name: { id: 'Paket Servis — Motul Scooter LE', en: 'Service Package — Motul Scooter LE' },
    desc: {
      id: 'Servis lengkap matic dengan oli Motul Scooter Power LE.',
      en: 'Complete scooter service with Motul Scooter Power LE oil.',
    },
    priceIDR: 145000,
    icon: 'wrench',
    includes: SERVICE_PACKAGE_INCLUDES,
    source: 'instagram',
  },
  {
    slug: 'bore-up',
    name: { id: 'Bore Up & Performa', en: 'Bore Up & Performance' },
    desc: {
      id: 'Naikkan cc dan korek harian/racing. Estimasi setelah cek kondisi motor.',
      en: 'Displacement increase & performance tuning. Estimated after inspection.',
    },
    priceIDR: null,
    icon: 'piston',
    source: 'instagram',
  },
  {
    slug: 'down-size',
    name: { id: 'Down Size (Turun Shock Depan)', en: 'Down Size (Lower Front Shock)' },
    desc: {
      id: 'Ubah tampilan lebih ceper. Mulai dari matic kecil (Mio/Scoopy/Beat).',
      en: 'Lower stance styling. Starting from small scooters (Mio/Scoopy/Beat).',
    },
    priceIDR: null,
    icon: 'suspension',
    source: 'instagram',
  },
  {
    slug: 'auto-detailing',
    name: { id: 'Auto Detailing', en: 'Auto Detailing' },
    desc: {
      id: 'Cuci detail, poles, dan proteksi cat biar motor kinclong lagi.',
      en: 'Detail wash, polish and paint protection to restore that shine.',
    },
    priceIDR: null,
    icon: 'sparkle',
    source: 'instagram',
  },
  {
    slug: 'painting',
    name: { id: 'Painting & Repaint', en: 'Painting & Repaint' },
    desc: {
      id: 'Repaint bodi & custom warna. Estimasi sesuai bidang & tingkat kesulitan.',
      en: 'Body repaint & custom colors. Quoted by area & complexity.',
    },
    priceIDR: null,
    icon: 'spray',
    source: 'instagram',
  },
  {
    slug: 'pasang-variasi',
    name: { id: 'Pasang Variasi & Spare Part', en: 'Parts & Accessory Fitting' },
    desc: {
      id: 'Pemasangan ban, kaki-kaki, CVT, pengereman & aksesoris.',
      en: 'Fitting tires, suspension, CVT, brakes & accessories.',
    },
    priceIDR: null,
    icon: 'bolt',
    source: 'instagram',
  },
]
