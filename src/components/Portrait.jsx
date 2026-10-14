// src/components/Portrait.jsx
// Foto potret rasio 9:16. Ukuran diatur lewat prop `size` ({ width, height } atau { height, aspectRatio })

import { useState } from "react";

export default function Portrait({ src, names, portraitRef, size }) {
  const [hasError, setHasError] = useState(false);
  const altText = `Foto ${names.join(" dan ")}`;

  return (
    <div
      ref={portraitRef}
      className="relative flex-shrink-0"
      style={{ ...size }}
    >
      {/* Outer ambient glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          inset: -22,
          borderRadius: 48,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(129,140,248,0.34) 0%, rgba(168,85,247,0.18) 50%, transparent 78%)",
          filter: "blur(26px)",
        }}
      />

      {/* Frame: rasio 9:16, sudut membulat, ring gradasi tipis */}
      <div
        className="relative w-full h-full"
        style={{
          zIndex: 10, // foto menimpa kartu
          borderRadius: 28,
          padding: 1.5,
          background:
            "linear-gradient(160deg, rgba(196,181,253,0.55) 0%, rgba(255,255,255,0.10) 40%, rgba(96,165,250,0.35) 100%)",
          boxShadow:
            "0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(129, 140, 248, 0.22)",
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: 26.5, background: "rgba(10, 10, 26, 0.7)" }}
        >
          {!hasError ? (
            <img
              src={src}
              alt={altText}
              loading="eager"
              fetchPriority="high"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          ) : (
            <FallbackSilhouette names={names} />
          )}

          {/* Pantulan kaca halus di atas foto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function FallbackSilhouette({ names }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-end pb-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, #0c1461 0%, #1e1065 35%, #3b0764 70%, #040410 100%)",
      }}
    >
      {/* Decorative background glow inside placeholder */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Silhouette shapes */}
      <div className="flex flex-col items-center gap-3 opacity-30 mb-6 relative z-10">
        <div className="rounded-full bg-white" style={{ width: 68, height: 68 }} />
        <div className="rounded-t-full bg-white" style={{ width: 104, height: 84 }} />
      </div>

      <div className="text-center px-4 relative z-10">
        <p
          className="text-white/80 text-xs font-medium leading-relaxed mb-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Taruh foto di:
        </p>
        <span className="text-indigo-300 font-mono text-[11px] bg-white/10 px-2.5 py-1 rounded-md border border-white/10 inline-block">
          public/photos/portrait.jpg
        </span>
      </div>
    </div>
  );
}
