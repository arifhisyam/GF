// src/layout.js
// ============================================================
// Geometri "panggung" desktop — semua angka dalam piksel desain.
// Foto berada di titik (0,0); kartu tersusun di busur setengah
// lingkaran (elips) yang konsentris dengan foto, sehingga
// mengelilingi sisi kanan foto dan menempel di tepinya.
// Seluruh panggung di-scale otomatis agar muat di layar.
// ============================================================

// Ukuran foto (rasio 9:16)
export const PHOTO_W = 250;
export const PHOTO_H = 444;

// Ukuran kartu — lebih besar dari sebelumnya
export const CARD_W = 340;
export const CARD_H = 104;

// Parameter busur
const ARC_RX = 112; // seberapa jauh busur menonjol dari pusat foto (< setengah lebar foto → kartu menempel/menimpa tepi foto)
const ARC_RY = 305; // tinggi busur (cukup tinggi agar kartu atas/bawah melengkung ke sisi foto)
const STEP = 130; // jarak vertikal antar kartu

// Ukuran panggung & posisi pusat foto di dalamnya
export const STAGE_W = 615;
export const STAGE_H = 640;
export const ORIGIN = { x: 137, y: 320 };

const HOVER_SHIFT = 14;

/**
 * Posisi tiap kartu pada busur.
 * x,y = titik tengah-kiri kartu relatif terhadap pusat foto.
 */
export function arcLayout(count) {
  const mid = (count - 1) / 2;
  const span = Math.max(mid * STEP, 1);

  return Array.from({ length: count }, (_, i) => {
    const y = (i - mid) * STEP;
    const x = ARC_RX * Math.sqrt(Math.max(0, 1 - (y / ARC_RY) ** 2));

    // Arah "keluar" (normal elips) untuk efek hover
    const nx = x / ARC_RX ** 2;
    const ny = y / ARC_RY ** 2;
    const len = Math.hypot(nx, ny) || 1;

    return {
      x,
      y,
      rot: -(y / span) * 2.2, // miring tipis mengikuti lengkung
      hoverX: (nx / len) * HOVER_SHIFT,
      hoverY: (ny / len) * HOVER_SHIFT,
    };
  });
}

/**
 * Titik tengah horizontal gugus kartu (rata-rata pusat tiap kartu), dalam
 * koordinat panggung. Dipakai agar KARTU berada di tengah layar dan foto
 * bergeser ke kiri.
 */
export function cardsCenterX(count = 5) {
  const pos = arcLayout(count);
  const sum = pos.reduce((acc, p) => acc + ORIGIN.x + p.x + CARD_W / 2, 0);
  return sum / count;
}

/** Path SVG garis orbit (elips putus-putus) di koordinat panggung. */
export function orbitPath() {
  const yEnd = 292;
  const xEnd = ARC_RX * Math.sqrt(1 - (yEnd / ARC_RY) ** 2);
  const { x: ox, y: oy } = ORIGIN;
  return `M ${ox + xEnd} ${oy - yEnd} A ${ARC_RX} ${ARC_RY} 0 0 1 ${ox + xEnd} ${oy + yEnd}`;
}
