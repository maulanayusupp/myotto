<script setup lang="ts">
import { computed } from 'vue'
import LegalDoc from '~/components/legal/Doc.vue'
import { CONTACT, SITE } from '~/config/site'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const updated = '23 Juli 2026'

useSeoMetaTags({
  title: t('legal.terms'),
  description: isEn.value
    ? `Terms for using the ${SITE.name} website & ordering.`
    : `Ketentuan penggunaan situs & pemesanan ${SITE.name}.`,
})
</script>

<template>
  <LegalDoc :title="t('legal.terms')" :updated="updated">
    <template v-if="!isEn">
      <p>Dengan menggunakan situs <strong>{{ SITE.legalName }}</strong>, Anda menyetujui ketentuan berikut.</p>

      <h2>Produk & layanan</h2>
      <p>Kami berupaya menampilkan informasi seakurat mungkin. Ketersediaan stok, spesifikasi, dan estimasi pengerjaan dapat berubah dan dikonfirmasi saat Anda memesan.</p>

      <h2>Harga</h2>
      <p>Harga yang tercantum dalam Rupiah. Untuk item dan layanan tanpa harga tetap, harga <strong>dikonfirmasi via WhatsApp</strong> — kami tidak menampilkan harga yang tidak dapat kami pastikan. Harga paket promo dapat berubah sewaktu-waktu.</p>

      <h2>Pemesanan</h2>
      <p>Situs ini tidak memproses pembayaran online. Pesanan diteruskan ke WhatsApp kami untuk konfirmasi ketersediaan, total akhir, serta metode pembayaran dan pengambilan/pengiriman.</p>

      <h2>Garansi pengerjaan</h2>
      <p>Garansi jasa dan spare part mengikuti kebijakan bengkel dan/atau garansi resmi merek terkait, yang diinformasikan saat pengerjaan.</p>

      <h2>Kekayaan intelektual</h2>
      <p>Merek dagang pihak ketiga (mis. KYB, Pirelli, Maxxis, Motul) adalah milik pemiliknya masing-masing dan disebut hanya untuk keperluan identifikasi produk.</p>

      <h2>Kontak</h2>
      <p>Pertanyaan tentang ketentuan ini: <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a>.</p>
    </template>

    <template v-else>
      <p>By using the <strong>{{ SITE.legalName }}</strong> website, you agree to the following terms.</p>

      <h2>Products & services</h2>
      <p>We strive to display accurate information. Stock availability, specifications and job estimates may change and are confirmed when you order.</p>

      <h2>Pricing</h2>
      <p>Prices are shown in Indonesian Rupiah. For items and services without a fixed price, the price is <strong>confirmed via WhatsApp</strong> — we do not display prices we cannot verify. Promo package prices may change at any time.</p>

      <h2>Ordering</h2>
      <p>This site does not process online payments. Orders are forwarded to our WhatsApp to confirm availability, the final total, and payment plus pickup/shipping method.</p>

      <h2>Workmanship warranty</h2>
      <p>Service and spare-part warranties follow the workshop's policy and/or the relevant brand's official warranty, communicated at the time of service.</p>

      <h2>Intellectual property</h2>
      <p>Third-party trademarks (e.g. KYB, Pirelli, Maxxis, Motul) belong to their respective owners and are referenced only to identify products.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a>.</p>
    </template>
  </LegalDoc>
</template>
