// ============================================================
// src/content.js — Ubah semua konten di sini saja
// ============================================================

export const names = ["Arif Hisyam Akbara", "Rahma Noviana"];

// Tanggal jadian dalam format ISO 8601 dengan offset WIB (+07:00)
export const startDate = "2025-03-28T10:29:00+07:00";

// Path foto potret (taruh di public/photos/portrait.jpg)
export const portrait = "/photos/portrait.jpg";

// Posisi busur kartu: "top" | "right" | "bottom"
export const arcSide = "right";

// ============================================================
// 5 Kartu Kenangan
// ============================================================
export const cards = [
  {
    id: 1,
    icon: "MessageCircleHeart",
    title: "Pertama Kali Dekat Lalu HTS",
    teaser: "Awal yang bukan awal, tapi terasa seperti segalanya.",
    color: "#818CF8",
    page: "/kenangan/1",
    content:
      "Di sinilah semuanya bermula — obrolan panjang yang tak terencana, tawa yang tiba-tiba terasa berbeda, dan perasaan aneh yang belum kita beri nama. Kita belum resmi, tapi hati kita sudah punya ceritanya sendiri.",
  },
  {
    id: 2,
    icon: "Sunrise",
    title: "Coming Soon",
    teaser: "Cerita indah berikutnya sedang ditulis.",
    color: "#60A5FA",
    // Jika `page` diisi, klik kartu membuka halaman baru (bukan popup).
    // Isi halamannya diatur di `pages` di bawah.
    page: "/kenangan/2",
    content:
      "Kisah ini masih dalam perjalanan. Setiap hari bersama menambah satu paragraf baru yang tidak ternilai.",
  },
  {
    id: 3,
    icon: "Music2",
    title: "Coming Soon",
    teaser: "Momen yang selalu terputar ulang di ingatan.",
    color: "#A78BFA",
    page: "/kenangan/3",
    content:
      "Ada lagu-lagu yang kini terasa berbeda karena mengingatkan pada momen tertentu bersamamu.",
  },
  {
    id: 4,
    icon: "CloudSun",
    title: "Coming Soon",
    teaser: "Dalam setiap cuaca, selalu nyaman bersamamu.",
    color: "#38BDF8",
    page: "/kenangan/4",
    content:
      "Entah cerah atau mendung, rasanya selalu hangat bila kita bersama. Kenyamanan yang tidak perlu kata-kata.",
  },
  {
    id: 5,
    icon: "Sparkles",
    title: "Coming Soon",
    teaser: "Bintang favorit kita di langit yang sama.",
    color: "#F472B6",
    page: "/kenangan/5",
    content:
      "Di bawah langit yang sama, kita menemukan satu sama lain. Dan sejak itu, langitnya terasa lebih indah.",
  },
];

// ============================================================
// Halaman khusus untuk kartu yang punya `page`
// Kunci = nilai `page` pada kartu. Tambah entri baru untuk halaman lain.
// Foto: taruh di public/photos/ lalu tulis "/photos/nama.jpg" (opsional)
// ============================================================
// Buat n slot foto kosong: [{ src: "", caption: "" }, ...]
const slots = (n) => Array.from({ length: n }, () => ({ src: "", caption: "" }));

export const pages = {
  "/kenangan/1": {
    eyebrow: "Kenangan #1",
    heading: "Pertama Kali Dekat Lalu HTS",
    intro: "Intro singkat (nanti diisi).",
    // Tiap `photos` = daftar slot foto / tempelan chat.
    // Isi `src` dengan path file (taruh di public/photos/kenangan1/), mis. "/photos/kenangan1/1-1.jpg"
    // Slot yang `src`-nya kosong tampil sebagai kotak "Tempel di sini". Total: 3 + 5 + 5 + 5 + 5 = 23 slot.
    entries: [
      { date: "Tanggal", title: "Awal kenal", text: "Tulis ceritamu di sini.", photos: slots(3) },
      { date: "Tanggal", title: "Obrolan yang tidak mau berhenti", text: "Tulis ceritamu di sini.", photos: slots(5) },
      { date: "Tanggal", title: "Mulai terasa beda", text: "Tulis ceritamu di sini.", photos: slots(5) },
      { date: "Tanggal", title: "Masa HTS", text: "Tulis ceritamu di sini.", photos: slots(5) },
      { date: "Tanggal", title: "Menuju 28 Maret 2025", text: "Tulis ceritamu di sini.", photos: slots(5) },
    ],
    closing: "",
  },
  "/kenangan/2": {
    eyebrow: "Kenangan #2",
    heading: "Judul Halaman Ini",
    intro: "Kalimat pembuka singkat untuk halaman ini. Ganti sesuai ceritamu.",
    entries: [
      {
        date: "Tanggal / Waktu",
        title: "Momen pertama",
        text: "Tulis ceritanya di sini. Bisa beberapa kalimat atau paragraf.",
        photo: "", // contoh: "/photos/momen-1.jpg"
      },
      {
        date: "Tanggal / Waktu",
        title: "Momen kedua",
        text: "Tambah, hapus, atau urutkan ulang entri sesuka hati.",
        photo: "",
      },
    ],
    closing: "Kalimat penutup (opsional).",
  },
  "/kenangan/3": {
    eyebrow: "Kenangan #3",
    heading: "Segera Hadir",
    intro: "Halaman ini masih dalam proses ditulis.",
    entries: [
      { date: "Tanggal", title: "Momen", text: "Tulis ceritamu di sini.", photo: "" },
    ],
    closing: "",
  },
  "/kenangan/4": {
    eyebrow: "Kenangan #4",
    heading: "Segera Hadir",
    intro: "Halaman ini masih dalam proses ditulis.",
    entries: [
      { date: "Tanggal", title: "Momen", text: "Tulis ceritamu di sini.", photo: "" },
    ],
    closing: "",
  },
  "/kenangan/5": {
    eyebrow: "Kenangan #5",
    heading: "Segera Hadir",
    intro: "Halaman ini masih dalam proses ditulis.",
    entries: [
      { date: "Tanggal", title: "Momen", text: "Tulis ceritamu di sini.", photo: "" },
    ],
    closing: "",
  },
};
