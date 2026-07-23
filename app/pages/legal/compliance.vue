<script setup lang="ts">
import { computed } from 'vue'
import LegalDoc from '~/components/legal/Doc.vue'
import { CONTACT, SITE, SOCIALS } from '~/config/site'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const updated = '23 Juli 2026'

useSeoMetaTags({
  title: t('legal.compliance'),
  description: isEn.value
    ? `Business identity, evidence sources & compliance for ${SITE.name}.`
    : `Identitas usaha, sumber data & kepatuhan ${SITE.name}.`,
})
</script>

<template>
  <LegalDoc :title="t('legal.compliance')" :updated="updated">
    <template v-if="!isEn">
      <p>Halaman ini merangkum identitas usaha, sumber data, dan komitmen kepatuhan situs <strong>{{ SITE.legalName }}</strong>.</p>

      <h2>Identitas usaha</h2>
      <ul>
        <li><strong>Nama:</strong> {{ SITE.fullName }} ({{ SITE.legalName }})</li>
        <li><strong>Alamat:</strong> {{ CONTACT.address.line }}, {{ CONTACT.address.area }}, {{ CONTACT.address.district }}, {{ CONTACT.address.city }}, {{ CONTACT.address.province }} {{ CONTACT.address.postalCode }}</li>
        <li><strong>WhatsApp:</strong> {{ CONTACT.phoneDisplay }}</li>
        <li><strong>Instagram:</strong> <a :href="SOCIALS.instagram">@myottobengkelmotor</a></li>
        <li><strong>Toko:</strong> <a :href="SOCIALS.shopee">Shopee MYOTTO</a></li>
      </ul>

      <h2>Sumber data (evidence)</h2>
      <p>Semua informasi bisnis di situs ini bersumber dari kanal resmi MYOTTO yang tersedia untuk publik, per <strong>23 Juli 2026</strong>:</p>
      <ul>
        <li>Profil Instagram @myottobengkelmotor (bio, layanan, foto);</li>
        <li>Google Business Profile "Myotto Motorcycle Workshop" (alamat, rating 4,7 dari 111 ulasan, jam buka);</li>
        <li>Toko Shopee MYOTTO (produk & harga yang tercantum).</li>
      </ul>
      <p><strong>Kami tidak mengarang data.</strong> Harga yang belum terverifikasi ditandai "Cek harga" dan dikonfirmasi via WhatsApp.</p>

      <h2>Pelindungan data pribadi</h2>
      <p>Situs mematuhi UU PDP No. 27/2022. Rincian ada di <a href="/legal/privacy">Kebijakan Privasi</a>. Tidak ada pembayaran online; tidak ada data kartu/keuangan yang dikumpulkan.</p>

      <h2>Merek pihak ketiga</h2>
      <p>Nama merek yang disebut (KYB, Pirelli, Maxxis, Motul, Proper, Shell, Yamalube, dll.) adalah milik pemiliknya masing-masing, disebut untuk identifikasi produk.</p>

      <h2>Laporan & koreksi</h2>
      <p>Menemukan informasi yang perlu dikoreksi? Hubungi <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a> dan akan kami perbaiki.</p>
    </template>

    <template v-else>
      <p>This page summarizes the business identity, data sources, and compliance commitments of the <strong>{{ SITE.legalName }}</strong> website.</p>

      <h2>Business identity</h2>
      <ul>
        <li><strong>Name:</strong> {{ SITE.fullName }} ({{ SITE.legalName }})</li>
        <li><strong>Address:</strong> {{ CONTACT.address.line }}, {{ CONTACT.address.area }}, {{ CONTACT.address.district }}, {{ CONTACT.address.city }}, {{ CONTACT.address.province }} {{ CONTACT.address.postalCode }}</li>
        <li><strong>WhatsApp:</strong> {{ CONTACT.phoneDisplay }}</li>
        <li><strong>Instagram:</strong> <a :href="SOCIALS.instagram">@myottobengkelmotor</a></li>
        <li><strong>Store:</strong> <a :href="SOCIALS.shopee">Shopee MYOTTO</a></li>
      </ul>

      <h2>Data sources (evidence)</h2>
      <p>All business information on this site is sourced from MYOTTO's publicly available official channels, as of <strong>23 July 2026</strong>:</p>
      <ul>
        <li>The Instagram profile @myottobengkelmotor (bio, services, photos);</li>
        <li>The Google Business Profile "Myotto Motorcycle Workshop" (address, 4.7 rating from 111 reviews, hours);</li>
        <li>The MYOTTO Shopee store (listed products & prices).</li>
      </ul>
      <p><strong>We do not fabricate data.</strong> Unverified prices are marked "Ask price" and confirmed via WhatsApp.</p>

      <h2>Personal data protection</h2>
      <p>The site complies with Indonesia's UU PDP No. 27/2022. Details are in the <a href="/en/legal/privacy">Privacy Policy</a>. There are no online payments; no card/financial data is collected.</p>

      <h2>Third-party brands</h2>
      <p>Brand names mentioned (KYB, Pirelli, Maxxis, Motul, Proper, Shell, Yamalube, etc.) belong to their respective owners and are used to identify products.</p>

      <h2>Reports & corrections</h2>
      <p>Found information that needs correcting? Contact <a :href="CONTACT.whatsapp">{{ CONTACT.phoneDisplay }}</a> and we'll fix it.</p>
    </template>
  </LegalDoc>
</template>
