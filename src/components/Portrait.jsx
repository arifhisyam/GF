// src/components/Portrait.jsx
// Foto potret rasio 9:16 persegi panjang dengan sudut membulat modern

import { useState } from "react";

export default function Portrait({ src, names, portraitRef }) {
  const [hasError, setHasError] = useState(false);
  const altText = `Foto ${names.join(" dan ")}`;

  return (
    <div ref={portraitRef} className="relative flex-shrink-0" style={{ zIndex: 10 }}>
      {/* Outer ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
          filter: "blur(22px)",
        }}
      />

      {/* Frame container: Rasio 9:16 persegi panjang */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          height: "clamp(280px, calc(100dvh - 130px), 580px)",
          aspectRatio: "9 / 16",
          border: "1.5px solid rgba(255, 255, 255, 0.16)",
          boxShadow:
            "0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
          background: "rgba(10, 10, 26, 0.6)",
        }}
      >
        {!hasError ? (
          <img
            src={src}
            alt={altText}
            loading="eager"
            fetchPriority="high"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <FallbackSilhouette names={names} />
        )}

        {/* Subtle glass reflection highlight on the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)",
          }}
        />
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
