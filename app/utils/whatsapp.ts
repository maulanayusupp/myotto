import { CONTACT, SITE } from '~/config/site'
import { formatIDR } from '~/utils/format'
import type { CartLine } from '~/composables/useCart'
import type { LocaleCode } from '~/utils/i18n-helpers'

/**
 * Build a WhatsApp "click to chat" URL with a pre-filled message.
 * Evidence: the number/deep-link come from MYOTTO's own IG bio (wa.me link).
 */
export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message)
  const number = CONTACT.phoneE164.replace('+', '')
  return `https://wa.me/${number}?text=${text}`
}

export interface CheckoutInfo {
  name: string
  phone: string
  vehicle: string
  fulfillment: 'pickup' | 'ship'
  address?: string
  notes?: string
  subtotal: number
  hasQuoteItems: boolean
  locale: LocaleCode
}

/** Build a full, itemized order message from the cart for WhatsApp checkout. */
export function buildCheckoutMessage(
  items: CartLine[],
  info: CheckoutInfo,
): string {
  const en = info.locale === 'en'
  const L: string[] = []
  L.push(en ? `*New order — ${SITE.name}*` : `*Pesanan baru — ${SITE.name}*`)
  L.push('')
  items.forEach((i) => {
    const price = i.isQuote
      ? en
        ? '(price TBC)'
        : '(harga dikonfirmasi)'
      : formatIDR(i.unitPrice * i.qty)
    L.push(`• ${i.qty}× ${i.brand} ${i.name} — ${price}`)
  })
  L.push('')
  L.push(`${en ? 'Subtotal (priced items)' : 'Subtotal (item berharga)'}: ${formatIDR(info.subtotal)}`)
  if (info.hasQuoteItems) {
    L.push(
      en
        ? '_Some items need a price confirmation from the team._'
        : '_Beberapa item perlu konfirmasi harga dari tim._',
    )
  }
  L.push('')
  L.push(`${en ? 'Name' : 'Nama'}: ${info.name}`)
  if (info.phone) L.push(`${en ? 'Phone' : 'Telepon'}: ${info.phone}`)
  if (info.vehicle) L.push(`${en ? 'Motorcycle' : 'Motor'}: ${info.vehicle}`)
  const ful =
    info.fulfillment === 'ship'
      ? en
        ? 'Ship / courier'
        : 'Kirim / kurir'
      : en
        ? 'Pickup at workshop'
        : 'Ambil di bengkel'
  L.push(`${en ? 'Fulfillment' : 'Pengambilan'}: ${ful}`)
  if (info.fulfillment === 'ship' && info.address) {
    L.push(`${en ? 'Address' : 'Alamat'}: ${info.address}`)
  }
  if (info.notes) L.push(`${en ? 'Notes' : 'Catatan'}: ${info.notes}`)
  L.push('')
  L.push(
    en
      ? 'Please confirm availability & total. Thanks! 🏁'
      : 'Mohon konfirmasi ketersediaan & total. Terima kasih! 🏁',
  )
  return L.join('\n')
}

export interface BookingInfo {
  name: string
  phone: string
  vehicle: string
  service: string // already-localized service name
  date: string
  time: string
  notes?: string
  locale: LocaleCode
}

/** Build a service-booking message for WhatsApp. */
export function buildBookingMessage(info: BookingInfo): string {
  const en = info.locale === 'en'
  const L: string[] = []
  L.push(en ? `*Service booking — ${SITE.name}*` : `*Booking servis — ${SITE.name}*`)
  L.push('')
  L.push(`${en ? 'Service' : 'Layanan'}: ${info.service}`)
  if (info.date) L.push(`${en ? 'Date' : 'Tanggal'}: ${info.date}`)
  if (info.time) L.push(`${en ? 'Time' : 'Jam'}: ${info.time}`)
  L.push('')
  L.push(`${en ? 'Name' : 'Nama'}: ${info.name}`)
  if (info.phone) L.push(`${en ? 'Phone' : 'Telepon'}: ${info.phone}`)
  if (info.vehicle) L.push(`${en ? 'Motorcycle' : 'Motor'}: ${info.vehicle}`)
  if (info.notes) L.push(`${en ? 'Notes' : 'Catatan'}: ${info.notes}`)
  L.push('')
  L.push(
    en
      ? 'Please confirm the slot availability. Thanks! 🏁'
      : 'Mohon konfirmasi ketersediaan slot. Terima kasih! 🏁',
  )
  return L.join('\n')
}

/** Default enquiry message, localized by the caller. */
export function enquiryMessage(subject?: string): Record<LocaleCode, string> {
  return {
    id: subject
      ? `Halo MYOTTO, saya mau tanya tentang "${subject}". Apakah tersedia?`
      : 'Halo MYOTTO, saya mau tanya soal layanan/produk. Terima kasih!',
    en: subject
      ? `Hi MYOTTO, I'd like to ask about "${subject}". Is it available?`
      : "Hi MYOTTO, I'd like to ask about your services/products. Thanks!",
  }
}
