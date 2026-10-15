// src/components/CountdownNavbar.jsx
// Countdown ditampilkan sebagai navigation bar di bagian atas.
//
// Layout:
//   Desktop (md+) : [ nama ]      [ hitungan waktu ]      [ statistik ]
//                   kolom tengah dikunci tepat di tengah layar
//   Mobile        : [ nama ]                       [ hitungan waktu ]

import { useElapsed } from "../hooks/useElapsed";
import { Heart, CalendarHeart, Sparkles, Hourglass } from "lucide-react";

const pad = (n) => String(n).padStart(2, "0");

// Ukuran angka dipakai bersama oleh TimeUnit & Separator supaya titik dua
// selalu sejajar dengan angka di semua ukuran layar.
// Jarak kiri-kanan navbar. Sengaja pakai inline style: reset `* { padding: 0 }`
// di index.css berada di luar @layer, sehingga menimpa semua utility px-*/mx-*.
const NAV_PAD_X = "clamp(1.5rem, 5vw, 6rem)";

const NUM_SIZE = "text-[length:clamp(1rem,2.2vw,1.4rem)]";

function TimeUnit({ value, label }) {
  return (
    <div className="flex min-w-9 flex-col items-center gap-1">
      <span
        className={`${NUM_SIZE} font-body font-bold leading-none tabular-nums text-white`}
      >
        {pad(value)}
      </span>
      <span className="font-body text-[0.625rem] font-semibold uppercase leading-none tracking-widest text-white/45">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className={`${NUM_SIZE} font-body font-bold leading-none text-white/25`}
    >
      :
    </span>
  );
}

function Stat({ icon: Icon, iconClass, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-white/55">
      <Icon size={13} strokeWidth={2} className={`shrink-0 ${iconClass}`} aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}

export default function CountdownNavbar({ startDate, names }) {
  const { isPast, years, days, hours, minutes, seconds, totalDays, nextAnnivDays } =
    useElapsed(startDate);

  return (
    <nav
      className="glass-nav relative z-50 flex h-[var(--navbar-h)] shrink-0 items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6"
      style={{ paddingInline: NAV_PAD_X }}
      aria-label="Navbar — hitungan waktu bersama"
    >
      {/* Kiri: nama pasangan */}
      <div className="flex min-w-0 items-center gap-2 font-display">
        <Heart
          size={14}
          className="shrink-0 text-pink-400"
          fill="currentColor"
          aria-hidden="true"
        />
        <span className="truncate text-[length:clamp(0.8rem,1.3vw,0.95rem)] font-semibold italic text-white/85">
          {names[0].split(" ")[0]}
          <span className="text-pink-400" style={{ marginInline: "0.25rem" }}>&amp;</span>
          {names[1].split(" ")[0]}
        </span>
      </div>

      {/* Tengah: hitungan waktu (label "Bersama/Menuju" menggantung di kiri
          supaya angka tetap tepat di tengah layar) */}
      <div className="relative flex shrink-0 items-start gap-2 md:gap-3">
        <span className="absolute right-full top-1/2 hidden -translate-y-1/2 items-center gap-1.5 whitespace-nowrap font-body text-xs font-medium text-white/50 lg:flex"
          style={{ marginRight: "1rem" }}
        >
          <Hourglass size={13} strokeWidth={2} className="text-purple-300" aria-hidden="true" />
          {isPast ? "Bersama" : "Menuju"}
        </span>

        {isPast && (
          <>
            <TimeUnit value={years} label="Thn" />
            <Separator />
          </>
        )}
        <TimeUnit value={days} label="Hari" />
        <Separator />
        <TimeUnit value={hours} label="Jam" />
        <Separator />
        <TimeUnit value={minutes} label="Min" />
        <Separator />
        <TimeUnit value={seconds} label="Det" />
      </div>

      {/* Kanan: total hari + anniversary (ikon rata di satu kolom) */}
      <div className="hidden flex-col items-start gap-1 justify-self-end font-body text-xs md:flex">
        <Stat icon={CalendarHeart} iconClass="text-blue-400">
          Total{" "}
          <span className="font-semibold text-blue-400">
            {totalDays.toLocaleString("id-ID")}
          </span>{" "}
          hari
        </Stat>
        {isPast && (
          <Stat icon={Sparkles} iconClass="text-pink-400">
            Anniversary{" "}
            <span className="font-semibold text-pink-400">{nextAnnivDays}</span> hari lagi
          </Stat>
        )}
      </div>
    </nav>
  );
}