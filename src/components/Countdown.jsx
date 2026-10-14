// src/components/Countdown.jsx
// ============================================================
// Frosted-glass countdown panel showing time elapsed since startDate
// ============================================================

import { useElapsed } from "../hooks/useElapsed";

function TimeBox({ value, label }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="glass rounded-xl flex items-center justify-center tabular-nums"
        style={{
          minWidth: "clamp(48px, 8vw, 72px)",
          height: "clamp(52px, 9vw, 76px)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
          color: "var(--navy-deep)",
          letterSpacing: "-0.02em",
          padding: "0 8px",
        }}
      >
        {padded}
      </div>
      <span
        className="text-[#0A1A4F] opacity-60 uppercase tracking-widest"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.48rem, 1vw, 0.6rem)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ startDate }) {
  const {
    isPast,
    years,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    nextAnnivDays,
  } = useElapsed(startDate);

  return (
    <div
      className="glass rounded-2xl px-4 py-4 flex flex-col items-center gap-3"
      style={{ zIndex: 30, maxWidth: "min(90vw, 520px)" }}
      aria-label="Hitungan waktu bersama"
      role="region"
    >
      {/* Title */}
      <p
        className="text-[#0A1A4F] font-semibold text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
          letterSpacing: "0.01em",
        }}
      >
        {isPast ? "Sudah bersama selama" : "Menghitung hari menuju"}
      </p>

      {/* Time boxes */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {isPast && (
          <>
            <TimeBox value={years} label="Tahun" />
            <Divider />
          </>
        )}
        <TimeBox value={days} label="Hari" />
        <Divider />
        <TimeBox value={hours} label="Jam" />
        <Divider />
        <TimeBox value={minutes} label="Menit" />
        <Divider />
        <TimeBox value={seconds} label="Detik" />
      </div>

      {/* Sub-info row */}
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.6rem, 1.3vw, 0.72rem)",
          color: "var(--navy-deep)",
          opacity: 0.65,
        }}
      >
        {isPast && (
          <>
            <span>Total {totalDays.toLocaleString("id-ID")} hari bersama 💙</span>
            <span>Anniversary berikutnya: {nextAnnivDays} hari lagi ✨</span>
          </>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="text-[#0A1A4F] opacity-30 font-bold self-center"
      style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", paddingBottom: "18px" }}
    >
      :
    </span>
  );
}
