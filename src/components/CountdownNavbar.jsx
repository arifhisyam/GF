// src/components/CountdownNavbar.jsx
// Countdown displayed as a top navigation bar

import { useElapsed } from "../hooks/useElapsed";
import { Heart, CalendarHeart, Sparkles, Hourglass } from "lucide-react";

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="tabular-nums font-bold text-white leading-none"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "clamp(1rem, 2.2vw, 1.45rem)",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="uppercase tracking-widest text-white/40"
        style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
  );
}

function Dot() {
  return (
    <span className="text-white/25 font-bold self-start pt-1" style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)" }}>
      :
    </span>
  );
}

export default function CountdownNavbar({ startDate, names }) {
  const { isPast, years, days, hours, minutes, seconds, totalDays, nextAnnivDays } =
    useElapsed(startDate);

  return (
    <nav
      className="glass-nav flex-shrink-0 px-4 md:px-8 gap-4"
      style={{
        height: "var(--navbar-h)",
        zIndex: 50,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}
      aria-label="Navbar — hitungan waktu bersama"
    >
      {/* Left: couple names */}
      <div
        className="flex items-center gap-2 flex-shrink-0 min-w-0"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <Heart
          size={14}
          className="text-pink-400 flex-shrink-0"
          fill="currentColor"
          aria-hidden="true"
        />
        <span
          className="text-white/80 font-bold truncate"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)", fontStyle: "italic", fontWeight: 600 }}
        >
          {names[0].split(" ")[0]}
          <span className="text-pink-400 mx-1">&amp;</span>
          {names[1].split(" ")[0]}
        </span>
      </div>

      {/* Center: time units */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
        <span
          className="hidden sm:flex items-center text-white/45 mr-1"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 500,
            gap: 5,
          }}
        >
          <Hourglass size={13} strokeWidth={2} className="text-purple-300" aria-hidden="true" />
          {isPast ? "Bersama" : "Menuju"}
        </span>
        {isPast && (
          <>
            <TimeUnit value={years} label="Thn" />
            <Dot />
          </>
        )}
        <TimeUnit value={days} label="Hari" />
        <Dot />
        <TimeUnit value={hours} label="Jam" />
        <Dot />
        <TimeUnit value={minutes} label="Min" />
        <Dot />
        <TimeUnit value={seconds} label="Det" />
      </div>

      {/* Right: total days + anniversary info */}
      <div
        className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0"
        style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", justifySelf: "end" }}
      >
        <span className="text-white/55" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <CalendarHeart size={13} strokeWidth={2} className="text-blue-400" aria-hidden="true" />
          <span>
            Total{" "}
            <span className="text-blue-400 font-semibold">
              {totalDays.toLocaleString("id-ID")}
            </span>{" "}
            hari
          </span>
        </span>
        {isPast && (
          <span className="text-white/40" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Sparkles size={13} strokeWidth={2} className="text-pink-400" aria-hidden="true" />
            <span>
              Anniversary{" "}
              <span className="text-pink-400 font-semibold">{nextAnnivDays}</span> hari lagi
            </span>
          </span>
        )}
      </div>
    </nav>
  );
}
