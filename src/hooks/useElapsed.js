// src/hooks/useElapsed.js
// ============================================================
// Hook untuk menghitung waktu yang telah berlalu sejak startDate
// ============================================================

import { useState, useEffect } from "react";

// ─── Pure calculation function ───────────────────────────────────────────────
/**
 * Hitung breakdown waktu dari startDate ke now.
 * Semua perhitungan mengacu pada anniversary tanggal jadian (28 Maret)
 * dan benar di tahun kabisat.
 *
 * @param {Date} start - tanggal mulai (sudah dalam UTC)
 * @param {Date} now   - waktu sekarang
 * @returns {{ isPast: boolean, years, days, hours, minutes, seconds, totalDays, nextAnnivDays }}
 *
 * Contoh uji (buka console):
 *   calcElapsed(new Date("2025-03-28T03:29:00Z"), new Date("2026-03-28T03:29:00Z"))
 *   // => { isPast: true, years: 1, days: 0, hours: 0, minutes: 0, seconds: 0 }
 *
 *   calcElapsed(new Date("2025-03-28T03:29:00Z"), new Date("2026-10-14T12:39:58Z"))
 *   // => { isPast: true, years: 1, days: 200, hours: 9, minutes: 10, seconds: 58 }
 *
 *   calcElapsed(new Date("2027-01-01T00:00:00Z"), new Date("2026-10-14T12:00:00Z"))
 *   // => { isPast: false, years: 0, days: 78, hours: 12, minutes: 0, seconds: 0 }
 */
export function calcElapsed(start, now) {
  const diff = now - start; // ms
  const isPast = diff >= 0;
  const absDiff = Math.abs(diff);
  const totalSeconds = Math.floor(absDiff / 1000);

  // Hitung tahun penuh berdasarkan anniversary (bukan 365 hari sederhana)
  let startLocal = new Date(start);
  let nowLocal = new Date(now);

  let years = 0;
  if (isPast) {
    // Hitung berapa kali anniversary sudah terlewat
    let anniv = new Date(startLocal);
    anniv.setUTCFullYear(startLocal.getUTCFullYear() + 1);
    while (anniv <= nowLocal) {
      years++;
      anniv = new Date(startLocal);
      anniv.setUTCFullYear(startLocal.getUTCFullYear() + years + 1);
    }

    // Sisa hari setelah tahun penuh
    let lastAnniv = new Date(startLocal);
    lastAnniv.setUTCFullYear(startLocal.getUTCFullYear() + years);
    const remainingMs = nowLocal - lastAnniv;
    const remainingSec = Math.floor(remainingMs / 1000);

    const days = Math.floor(remainingSec / 86400);
    const hours = Math.floor((remainingSec % 86400) / 3600);
    const minutes = Math.floor((remainingSec % 3600) / 60);
    const seconds = remainingSec % 60;

    // Next anniversary
    let nextAnniv = new Date(startLocal);
    nextAnniv.setUTCFullYear(startLocal.getUTCFullYear() + years + 1);
    const nextAnnivDays = Math.ceil((nextAnniv - nowLocal) / 86400000);

    const totalDays = Math.floor(absDiff / 86400000);

    return { isPast, years, days, hours, minutes, seconds, totalDays, nextAnnivDays };
  } else {
    // Hitung mundur
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const days = Math.floor(totalSeconds / 86400);
    const totalDays = days;
    return { isPast, years: 0, days, hours, minutes, seconds, totalDays, nextAnnivDays: days };
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useElapsed(startDateStr) {
  const start = new Date(startDateStr); // ISO string dengan offset → UTC

  const [elapsed, setElapsed] = useState(() => calcElapsed(start, new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(calcElapsed(start, new Date()));
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateStr]);

  return elapsed;
}
