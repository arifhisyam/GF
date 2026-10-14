// src/components/OrbitCards.jsx
// ============================================================
// Kartu kenangan — tersusun setengah lingkaran mengelilingi foto
//   • layout="arc"   (desktop): kartu absolut di busur elips, menempel di tepi foto
//   • layout="stack" (mobile) : kartu bertumpuk di bawah foto dengan lengkung tipis
// ============================================================

import { useState } from "react";
import {
  MessageCircleHeart,
  Sunrise,
  Music2,
  CloudSun,
  Sparkles,
  Heart,
  ChevronRight,
} from "lucide-react";
import { CARD_W, CARD_H, ORIGIN, arcLayout, orbitPath } from "../layout";

const ICON_MAP = {
  MessageCircleHeart,
  Sunrise,
  Music2,
  CloudSun,
  Sparkles,
  Heart,
};

function LucideIcon({ name, size = 18, color = "currentColor" }) {
  const Icon = ICON_MAP[name] ?? Heart;
  return <Icon size={size} color={color} strokeWidth={2} aria-hidden="true" />;
}

// Offset tipis agar tumpukan di mobile ikut melengkung
const STACK_OFFSETS = [0, 8, 12, 8, 0];

export default function OrbitCards({ cards, onCardClick, layout = "arc" }) {
  const [hoveredId, setHoveredId] = useState(null);

  const openCard = (card, el) => {
    const rect = el.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    onCardClick(card, ox, oy);
  };

  const isArc = layout === "arc";
  const positions = isArc ? arcLayout(cards.length) : null;

  const renderCard = (card, i) => {
    const hovered = hoveredId === card.id;
    const pos = positions?.[i];

    let transform;
    if (isArc) {
      const tx = hovered ? pos.hoverX : 0;
      const ty = hovered ? pos.hoverY : 0;
      transform = `translate(${tx}px, ${ty}px) rotate(${hovered ? 0 : pos.rot}deg) scale(${hovered ? 1.04 : 1})`;
    } else {
      const base = STACK_OFFSETS[i % STACK_OFFSETS.length];
      transform = `translateX(${base + (hovered ? 8 : 0)}px) scale(${hovered ? 1.02 : 1})`;
    }

    const positionStyle = isArc
      ? {
          position: "absolute",
          left: ORIGIN.x + pos.x,
          top: ORIGIN.y + pos.y - CARD_H / 2,
          width: CARD_W,
          height: CARD_H,
        }
      : { position: "relative", width: "100%", minHeight: 76 };

    const iconBox = isArc ? 52 : 42;

    return (
      <button
        key={card.id}
        type="button"
        onClick={(e) => openCard(card, e.currentTarget)}
        onMouseEnter={() => setHoveredId(card.id)}
        onMouseLeave={() => setHoveredId(null)}
        onFocus={() => setHoveredId(card.id)}
        onBlur={() => setHoveredId(null)}
        className="memory-card group text-left flex items-center"
        aria-label={`${card.title}: ${card.teaser}`}
        style={{
          ...positionStyle,
          gap: isArc ? 14 : 12,
          padding: isArc ? "0 16px 0 38px" : "10px 14px 10px 16px",
          borderRadius: isArc ? 24 : 20,
          transform,
          transformOrigin: "center left",
          background: hovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(26,22,60,0.92) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(12,10,36,0.82) 100%)",
          backdropFilter: "blur(18px) saturate(1.3)",
          WebkitBackdropFilter: "blur(18px) saturate(1.3)",
          border: `1.5px solid ${hovered ? card.color : "rgba(255,255,255,0.14)"}`,
          boxShadow: hovered
            ? `0 16px 36px -8px ${card.color}55, 0 0 22px ${card.color}30, inset 0 1px 0 rgba(255,255,255,0.22)`
            : "0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)",
          zIndex: hovered ? 8 : 4, // selalu di bawah foto (z 10)
        }}
      >
        {/* Aksen warna di sisi kiri */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 18,
            bottom: 18,
            width: 3.5,
            borderRadius: "0 4px 4px 0",
            background: card.color,
            opacity: hovered ? 1 : 0.65,
            boxShadow: hovered ? `0 0 12px ${card.color}` : "none",
            transition: "opacity 250ms ease, box-shadow 250ms ease",
          }}
        />

        {/* Ikon */}
        <span
          aria-hidden="true"
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: iconBox,
            height: iconBox,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${card.color}${hovered ? "48" : "28"}, ${card.color}12)`,
            border: `1.5px solid ${hovered ? card.color : card.color + "60"}`,
            boxShadow: hovered ? `0 6px 16px ${card.color}45` : "none",
            transition: "all 250ms ease",
          }}
        >
          <LucideIcon name={card.icon} size={isArc ? 23 : 20} color={card.color} />
        </span>

        {/* Judul & teaser */}
        <span className="flex-1 min-w-0 flex flex-col" style={{ gap: 3 }}>
          <span
            className={isArc ? "clamp-2" : "clamp-2"}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: isArc ? "0.97rem" : "0.9rem",
              lineHeight: 1.2,
              letterSpacing: "-0.005em",
              color: "#fff",
            }}
          >
            {card.title}
          </span>
          <span
            className="clamp-2"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: isArc ? "0.76rem" : "0.72rem",
              lineHeight: 1.4,
              color: hovered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.62)",
              transition: "color 250ms ease",
            }}
          >
            {card.teaser}
          </span>
        </span>

        {/* Chevron */}
        <span
          aria-hidden="true"
          className="flex-shrink-0"
          style={{
            color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            transform: hovered ? "translateX(3px)" : "none",
            transition: "all 250ms ease",
          }}
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </span>
      </button>
    );
  };

  if (!isArc) {
    return (
      <div
        className="flex flex-col w-full"
        style={{ gap: 10, maxWidth: 340 }}
        aria-label="Daftar kartu kenangan"
      >
        {cards.map(renderCard)}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
      aria-label="Daftar kartu kenangan"
    >
      {/* Garis orbit putus-putus yang membungkus foto */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{ zIndex: 2 }}
      >
        <path
          d={orbitPath()}
          fill="none"
          stroke="rgba(196,181,253,0.38)"
          strokeWidth="1.4"
          strokeDasharray="1.5 8"
          strokeLinecap="round"
        />
      </svg>

      {/* Kartu — pointer events dikembalikan khusus untuk tombolnya */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        {cards.map((card, i) => (
          <div key={card.id} style={{ pointerEvents: "auto", display: "contents" }}>
            {renderCard(card, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
