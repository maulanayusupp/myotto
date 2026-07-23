// Generates themed brand assets for the MYOTTO site.
// SVG sources are rasterized to JPG/PNG so social scrapers (WhatsApp, Instagram,
// Facebook, Twitter) that DON'T render SVG can show link previews.
// Run: node gen-assets.mjs <public-dir>
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = process.argv[2]
mkdirSync(join(OUT, 'products'), { recursive: true })
mkdirSync(join(OUT, 'gallery'), { recursive: true })

const YELLOW = '#FFD100'
const RED = '#E4002B'
const BLACK = '#0a0a0b'

const ICONS = {
  oil: '<path d="M4 20h11a4 4 0 0 0 4-4v-3h-4l-2-3H8v3H4z"/><path d="M8 13V7h5l2 3"/><path d="M13 4h3"/>',
  tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  suspension: '<path d="M12 2v4M12 18v4"/><path d="M9 6h6M9 18h6"/><path d="M10 6c0 2 4 2 4 4s-4 2-4 4 4 2 4 4"/>',
  piston: '<rect x="8" y="2" width="8" height="9" rx="1"/><path d="M12 11v5"/><rect x="7" y="16" width="10" height="6" rx="1"/>',
  brake: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
  bolt: '<path d="m13 2-9 12h7l-2 8 9-12h-7z"/>',
  wrench: '<path d="M15 5a4 4 0 0 0-5 5L3 17l4 4 7-7a4 4 0 0 0 5-5l-3 3-3-1-1-3z"/>',
  sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
}

const checkerPattern = (id, size = 40) => `
  <pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
    <rect width="${size}" height="${size}" fill="${BLACK}"/>
    <rect width="${size / 2}" height="${size / 2}" fill="${YELLOW}"/>
    <rect x="${size / 2}" y="${size / 2}" width="${size / 2}" height="${size / 2}" fill="${YELLOW}"/>
  </pattern>`

// Use a broad system-safe font stack: the raster renderer (librsvg via fontconfig)
// resolves a bold sans even without the web fonts installed.
const FONT = "'Arial Narrow', 'Oswald', 'Helvetica Neue', Arial, sans-serif"

function productSVG(icon, brand, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs><radialGradient id="bg" cx="50%" cy="38%" r="75%">
    <stop offset="0%" stop-color="#ff2d3f"/><stop offset="100%" stop-color="${RED}"/>
  </radialGradient></defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <text x="30" y="60" font-family="${FONT}" font-size="20" font-weight="700" fill="#ffffff" opacity="0.35" letter-spacing="2">MYOTTO</text>
  <g transform="translate(200 190) scale(6)" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <g transform="translate(-12 -12)">${ICONS[icon] || ICONS.bolt}</g></g>
  <text x="200" y="330" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="#ffffff" opacity="0.65" letter-spacing="3">${brand.toUpperCase()}</text>
  <text x="200" y="356" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#ffffff" opacity="0.9">${label}</text>
</svg>`
}

function gallerySVG(icon, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>${checkerPattern('ck', 48)}
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1c1c20"/><stop offset="100%" stop-color="#0a0a0b"/></linearGradient></defs>
  <rect width="600" height="600" fill="url(#g)"/>
  <rect width="600" height="18" y="582" fill="url(#ck)" opacity="0.85"/>
  <g stroke="${RED}" stroke-width="6" opacity="0.5"><line x1="-20" y1="120" x2="200" y2="120"/><line x1="-20" y1="150" x2="150" y2="150"/></g>
  <g transform="translate(300 280) scale(7)" fill="none" stroke="${YELLOW}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-12 -12)">${ICONS[icon] || ICONS.wrench}</g></g>
  <text x="40" y="540" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff" opacity="0.85" letter-spacing="1">${label}</text>
</svg>`
}

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${BLACK}"/>
  <path d="M14 14h14l-9 36H10z" fill="${YELLOW}"/>
  <path d="M30 14h14l-9 36H21z" fill="#ffffff"/>
  <rect x="31" y="14" width="7" height="6" fill="${BLACK}"/>
  <rect x="24" y="26" width="7" height="6" fill="${BLACK}"/>
  <rect x="28" y="38" width="7" height="6" fill="${BLACK}"/>
</svg>`

const OG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>${checkerPattern('ck2', 40)}
    <radialGradient id="og" cx="80%" cy="10%" r="90%"><stop offset="0%" stop-color="#26262c"/><stop offset="100%" stop-color="${BLACK}"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="1000" cy="150" r="360" fill="${RED}" opacity="0.14"/>
  <rect width="1200" height="26" y="604" fill="url(#ck2)"/>
  <g transform="translate(90 250)"><path d="M0 0h60l-38 150H-2z" fill="${YELLOW}"/><path d="M68 0h60l-38 150H30z" fill="#ffffff"/></g>
  <text x="250" y="300" font-family="${FONT}" font-size="130" font-weight="700" fill="#ffffff" letter-spacing="2">MY<tspan fill="${YELLOW}">OTTO</tspan></text>
  <text x="255" y="365" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#c7c7d0">Bengkel · Variasi · Performa Motor — Bandung</text>
  <text x="255" y="430" font-family="${FONT}" font-size="26" font-weight="700" fill="${YELLOW}" letter-spacing="6">BOY'S WILL BE BOYS</text>
</svg>`

const buf = (svg) => Buffer.from(svg)
const jpg = (svg, w, h) =>
  sharp(buf(svg), { density: 200 }).resize(w, h).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
const png = (svg, w, h) =>
  sharp(buf(svg), { density: 300 }).resize(w, h).png().toBuffer()

const products = [
  ['oli-scooter-power-le', 'oil', 'MYOTTO', 'Scooter Power LE 5W-40'],
  ['oli-motul-gear', 'oil', 'Motul', 'Scooter Gear Plus'],
  ['ban-maxxis-victra', 'tire', 'Maxxis', 'Victra ST'],
  ['ban-pirelli-diablo', 'tire', 'Pirelli', 'Diablo Rosso'],
  ['kaki-kyb-fork', 'suspension', 'KYB', 'Front Fork Set'],
  ['performa-proper-spring', 'piston', 'Proper', 'Racing CVT Spring'],
  ['performa-proper-fan', 'piston', 'Proper', 'Racing CVT Fan'],
  ['performa-proper-muffler', 'piston', 'Proper', 'Racing Muffler'],
  ['rem-myotto-hose', 'brake', 'MYOTTO', 'Brake Hose'],
  ['rem-motul-fluid', 'brake', 'Motul', 'Brake Fluid DOT 3'],
  ['variasi-proper-arm', 'bolt', 'Proper', 'CNC Stabilizer Arm'],
  ['variasi-groza-bolts', 'bolt', 'Groza', 'Colored Bolt Set'],
]
const gallery = [
  ['wrench', 'WORKSHOP'], ['piston', 'PERFORMANCE'], ['sparkle', 'REPAINT'],
  ['tire', 'TIRES'], ['suspension', 'SUSPENSION'], ['brake', 'DETAILING'],
]

async function main() {
  // Favicon stays SVG (browsers render it); add PNG variants for icons.
  writeFileSync(join(OUT, 'favicon.svg'), FAVICON)
  writeFileSync(join(OUT, 'apple-touch-icon.png'), await png(FAVICON, 180, 180))
  writeFileSync(join(OUT, 'favicon-32x32.png'), await png(FAVICON, 32, 32))
  writeFileSync(join(OUT, 'icon-512.png'), await png(FAVICON, 512, 512))

  // Raster OG card (critical for WhatsApp/IG/FB/Twitter previews).
  writeFileSync(join(OUT, 'og-image.jpg'), await jpg(OG, 1200, 630))

  for (const [file, icon, brand, label] of products) {
    writeFileSync(join(OUT, 'products', `${file}.jpg`), await jpg(productSVG(icon, brand, label), 800, 800))
  }
  for (let i = 0; i < gallery.length; i++) {
    const [icon, label] = gallery[i]
    writeFileSync(join(OUT, 'gallery', `g${i + 1}.jpg`), await jpg(gallerySVG(icon, label), 600, 600))
  }
  console.log('OK — raster + svg assets written to', OUT)
}
main().catch((e) => { console.error(e); process.exit(1) })
