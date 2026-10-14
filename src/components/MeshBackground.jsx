// src/components/MeshBackground.jsx
// ============================================================
// Dark Cosmic Gradient Mesh
// Dasar hampir hitam (#03030c) dengan "nebula" violet, indigo,
// magenta tipis & teal yang redup, ditambah bintang berkelip
// dan vignette supaya tepi layar tetap gelap.
// ============================================================

import { useMemo } from "react";

// Generator acak deterministik → posisi bintang selalu sama
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STAR_COUNT = 90;

export default function MeshBackground() {
  const stars = useMemo(() => {
    const rand = mulberry32(2026);
    return Array.from({ length: STAR_COUNT }, (_, i) => {
      const r = rand();
      return {
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: r > 0.92 ? 2.6 : r > 0.6 ? 1.7 : 1.1,
        o: 0.35 + rand() * 0.55,
        dur: 3 + rand() * 5,
        delay: rand() * 6,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="noise-overlay absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      style={{ backgroundColor: "#03030c" }}
    >
      {/* ── Layer 1: Gradient mesh (gelap, redup) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60vw 50vw at 12% 8%,  rgba(88, 28, 135, 0.60) 0%, transparent 70%),
            radial-gradient(ellipse 55vw 45vw at 92% 14%, rgba(131, 24, 112, 0.38) 0%, transparent 70%),
            radial-gradient(ellipse 70vw 55vw at 85% 88%, rgba(30, 58, 138, 0.58) 0%, transparent 70%),
            radial-gradient(ellipse 55vw 42vw at 14% 92%, rgba(14, 90, 120, 0.34) 0%, transparent 70%),
            radial-gradient(ellipse 50vw 45vw at 48% 48%, rgba(49, 46, 129, 0.40) 0%, transparent 72%),
            linear-gradient(160deg, #03030c 0%, #070520 52%, #04030f 100%)
          `,
        }}
      />

      {/* ── Layer 2: Blob bercahaya yang bergerak pelan ── */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          width: "46vw",
          height: "46vw",
          top: "30%",
          left: "18%",
          background: "radial-gradient(circle, #3730a3 0%, #1e1b4b 50%, transparent 72%)",
          filter: "blur(80px)",
          opacity: 0.55,
        }}
      />
      <div
        className="blob-2 absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          top: "6%",
          right: "6%",
          background: "radial-gradient(circle, #6d28d9 0%, #3b0764 50%, transparent 72%)",
          filter: "blur(85px)",
          opacity: 0.5,
        }}
      />
      <div
        className="blob-3 absolute rounded-full"
        style={{
          width: "32vw",
          height: "32vw",
          bottom: "-6%",
          left: "34%",
          background: "radial-gradient(circle, #be185d 0%, #581c87 50%, transparent 72%)",
          filter: "blur(80px)",
          opacity: 0.28,
        }}
      />

      {/* ── Layer 3: Bintang ── */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              "--o": s.o,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              boxShadow: s.size > 2 ? "0 0 6px 1px rgba(196, 181, 253, 0.7)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Layer 4: Vignette — menjaga tepi tetap gelap ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(2, 2, 10, 0.72) 100%)",
        }}
      />
    </div>
  );
}
