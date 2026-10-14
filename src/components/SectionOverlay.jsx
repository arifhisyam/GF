// src/components/SectionOverlay.jsx
// ============================================================
// Full-screen overlay in dark cosmic theme matching template
// ============================================================

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircleHeart,
  Sunrise,
  Music2,
  CloudSun,
  Sparkles,
  Heart,
} from "lucide-react";

const ICON_MAP = {
  MessageCircleHeart,
  Sunrise,
  Music2,
  CloudSun,
  Sparkles,
  Heart,
};

function LucideIcon({ name, size = 36, color = "currentColor" }) {
  const Icon = ICON_MAP[name] ?? Heart;
  return <Icon size={size} color={color} strokeWidth={1.7} aria-hidden="true" />;
}

export default function SectionOverlay({ card, originX, originY, onClose }) {
  const closeRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (card) {
      const id = setTimeout(() => closeRef.current?.focus(), 80);
      return () => clearTimeout(id);
    }
  }, [card]);

  // Trap focus & Escape key
  useEffect(() => {
    if (!card) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = overlayRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [card, onClose]);

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          ref={overlayRef}
          key={card.id}
          role="dialog"
          aria-modal="true"
          aria-label={card.title}
          className="section-overlay-enter fixed inset-0 overlay-scroll flex items-center justify-center p-4 md:p-8"
          style={{
            zIndex: 100,
            background:
              "radial-gradient(circle at var(--origin-x, 50%) var(--origin-y, 50%), rgba(30, 27, 75, 0.95) 0%, rgba(4, 4, 16, 0.98) 75%)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            "--origin-x": `${originX}%`,
            "--origin-y": `${originY}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Tutup dialog (Esc)"
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>

          {/* Envelope letter modal */}
          <div
            className="relative max-w-lg w-full rounded-3xl p-8 md:p-10 flex flex-col items-center text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
              border: `1.5px solid ${card.color}60`,
              boxShadow: `0 25px 60px -10px rgba(0,0,0,0.8), 0 0 50px ${card.color}35`,
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Top decorative accent glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
              style={{
                background: card.color,
                filter: "blur(60px)",
                opacity: 0.35,
              }}
              aria-hidden="true"
            />

            {/* Icon seal stamp */}
            <div
              className="relative mb-5 flex items-center justify-center rounded-2xl"
              style={{
                width: 76,
                height: 76,
                background: `linear-gradient(135deg, ${card.color}35, ${card.color}15)`,
                border: `2px solid ${card.color}80`,
                boxShadow: `0 8px 24px ${card.color}40`,
              }}
              aria-hidden="true"
            >
              <LucideIcon name={card.icon} size={36} color={card.color} />
            </div>

            {/* Card title */}
            <h2
              className="text-white font-bold mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 3.2vw, 1.85rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {card.title}
            </h2>

            {/* Accent divider line */}
            <div
              className="w-14 h-1 rounded-full mb-5"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
              }}
              aria-hidden="true"
            />

            {/* Letter content */}
            <p
              className="text-white/85 leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              }}
            >
              {card.content}
            </p>

            {/* Back button */}
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full font-semibold text-white transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                background: `linear-gradient(135deg, ${card.color}, #3b82f6)`,
                boxShadow: `0 8px 25px ${card.color}50`,
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
              }}
            >
              ← Kembali
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
