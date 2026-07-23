<script setup lang="ts">
import { computed } from 'vue'
import LegalDoc from '~/components/legal/Doc.vue'
import { CONTACT, SITE } from '~/config/site'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const updated = '23 Juli 2026'

useSeoMetaTags({
  title: t('legal.privacy'),
  description: isEn.value
    ? `How ${SITE.name} handles your data.`
    : `Bagaimana ${SITE.name} menangani data Anda.`,
})
</script>

<template>
  <LegalDoc :title="t('legal.privacy')" :updated="updated">
    <!-- ID -->
    <template v-if="!isEn">
      <p>Kebijakan ini menjelaskan bagaimana <strong>{{ SITE.legalName }}</strong> ("kami") mengumpulkan dan menggunakan data saat Anda memakai situs ini. Kami menghormati privasi Anda dan mematuhi UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>

      <h2>Data yang kami kumpulkan</h2>
      <p>Situs ini <strong>tidak memiliki akun pengguna dan tidak memproses pembayaran online</strong>. Keranjang belanja Anda disimpan secara lokal di peramban Anda (localStorage). Data pribadi hanya Anda kirim saat menekan "Kirim Pesanan via WhatsApp":</p>
      <ul>
        <li>Nama, nomor WhatsApp, dan tipe motor yang Anda isi;</li>
        <li>Isi pesanan (produk/layanan) dan catatan tambahan;</li>
        <li>Alamat pengiriman (hanya jika Anda memilih metode kirim).</li>
      </ul>

      <h2>Cara penggunaan</h2>
      <p>Data tersebut diteruskan langsung ke WhatsApp kami hanya untuk memproses dan mengonfirmasi pesanan Anda. Kami tidak menjual data Anda kepada pihak ketiga.</p>

      <h2>Penyimpanan lokal & cookie</h2>
      <p>Kami menyimpan preferensi bahasa (cookie) dan isi keranjang (localStorage) di perangkat Anda. Anda dapat menghapusnya kapan saja lewat pengaturan peramban.</p>

      <h2>Hak Anda</h2>
      <p>Sesuai UU PDP, Anda berhak mengakses, memperbaiki, atau meminta penghapusan data yang telah Anda kirimkan. Hubungi kami di <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a>.</p>

      <h2>Perubahan</h2>
      <p>Kebijakan ini dapat diperbarui sewaktu-waktu. Tanggal pembaruan tercantum di atas.</p>
    </template>

    <!-- EN -->
    <template v-else>
      <p>This policy explains how <strong>{{ SITE.legalName }}</strong> ("we") collects and uses data when you use this website. We respect your privacy and comply with Indonesia's Personal Data Protection Law (UU PDP No. 27/2022).</p>

      <h2>Data we collect</h2>
      <p>This site has <strong>no user accounts and processes no online payments</strong>. Your cart is stored locally in your browser (localStorage). Personal data is only sent when you tap "Send Order via WhatsApp":</p>
      <ul>
        <li>The name, WhatsApp number and motorcycle type you enter;</li>
        <li>Your order contents (products/services) and any notes;</li>
        <li>A shipping address (only if you choose the ship method).</li>
      </ul>

      <h2>How we use it</h2>
      <p>This data is forwarded directly to our WhatsApp solely to process and confirm your order. We do not sell your data to third parties.</p>

      <h2>Local storage & cookies</h2>
      <p>We store your language preference (cookie) and cart contents (localStorage) on your device. You can clear these any time from your browser settings.</p>

      <h2>Your rights</h2>
      <p>Under UU PDP you may access, correct, or request deletion of the data you have sent. Contact us at <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a>.</p>

      <h2>Changes</h2>
      <p>This policy may be updated from time to time. The update date is shown above.</p>
    </template>
  </LegalDoc>
</template>
