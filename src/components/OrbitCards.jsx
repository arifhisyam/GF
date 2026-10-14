// src/components/OrbitCards.jsx
// ============================================================
// Rectangular Memory Cards — Larger, tightly arranged, curved flank
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

// Subtle crescent curve offsets so cards naturally flank the photo
const CURVE_OFFSETS = [
  { x: 4, rot: -1.5 },
  { x: 14, rot: -0.7 },
  { x: 20, rot: 0 },
  { x: 14, rot: 0.7 },
  { x: 4, rot: 1.5 },
];

export default function OrbitCards({ cards, onCardClick }) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleClick = (card, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    onCardClick(card, ox, oy);
  };

  const handleKeyDown = (card, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      onCardClick(card, ox, oy);
    }
  };

  return (
    <div
      className="flex flex-col gap-2.5 sm:gap-3 py-2 w-full max-w-[320px] sm:max-w-[340px]"
      aria-label="Daftar kartu kenangan"
    >
      {cards.map((card, i) => {
        const isHovered = hoveredId === card.id;
        const curve = CURVE_OFFSETS[i % CURVE_OFFSETS.length];

        const tx = isHovered ? curve.x + 18 : curve.x;
        const rot = isHovered ? 0 : curve.rot;
        const scale = isHovered ? 1.04 : 1;

        return (
          <button
            key={card.id}
            onClick={(e) => handleClick(card, e)}
            onKeyDown={(e) => handleKeyDown(card, e)}
            onMouseEnter={() => setHoveredId(card.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative w-full text-left rounded-2xl px-3.5 py-3 flex items-center gap-3.5 transition-all duration-250 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            style={{
              transform: `translateX(${tx}px) rotate(${rot}deg) scale(${scale})`,
              transformOrigin: "center left",
              background: isHovered
                ? `linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(20,20,45,0.9) 100%)`
                : `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(10,12,30,0.8) 100%)`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1.5px solid ${isHovered ? card.color : "rgba(255,255,255,0.14)"}`,
              boxShadow: isHovered
                ? `0 12px 30px -5px ${card.color}50, 0 0 15px ${card.color}35, inset 0 1px 0 rgba(255,255,255,0.2)`
                : `0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
              zIndex: isHovered ? 40 : 20 - i,
            }}
            aria-label={`${card.title}: ${card.teaser}`}
          >
            {/* Left Accent Bar Indicator */}
            <div
              className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-250"
              style={{
                background: card.color,
                boxShadow: isHovered ? `0 0 10px ${card.color}` : "none",
                opacity: isHovered ? 1 : 0.6,
              }}
              aria-hidden="true"
            />

            {/* Left Icon Badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-250"
              style={{
                width: 44,
                height: 44,
                background: isHovered
                  ? `linear-gradient(135deg, ${card.color}45, ${card.color}20)`
                  : `linear-gradient(135deg, ${card.color}25, ${card.color}10)`,
                border: `1.5px solid ${isHovered ? card.color : card.color + "60"}`,
                boxShadow: isHovered ? `0 4px 12px ${card.color}40` : "none",
              }}
              aria-hidden="true"
            >
              <LucideIcon name={card.icon} size={20} color={card.color} />
            </div>

            {/* Content: Title & Teaser */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h3
                  className="text-white font-bold tracking-tight truncate leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                  }}
                >
                  {card.title}
                </h3>
              </div>

              <p
                className="truncate leading-normal transition-colors duration-250"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                }}
              >
                {card.teaser}
              </p>
            </div>

            {/* Right Chevron Action Icon */}
            <div
              className="flex-shrink-0 text-white/30 group-hover:text-white/80 transition-all transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
