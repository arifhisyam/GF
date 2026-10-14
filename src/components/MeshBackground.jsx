// src/components/MeshBackground.jsx
// ============================================================
// Dark Cosmic Gradient Mesh — Vibrant Blue, Purple, and Magenta
// Exactly matching the reference template
// ============================================================

export default function MeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="noise-overlay fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      style={{ backgroundColor: "#02030d" }}
    >
      {/* ── Layer 1: Vibrant Cosmic Gradient Mesh ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            /* Neon Magenta / Hot Pink in top-right corner */
            radial-gradient(circle 50vw at 95% 15%, #d946ef 0%, #a21caf 40%, transparent 75%),
            /* Electric Cyan accent leaking in near top */
            radial-gradient(circle 35vw at 78% 6%, #38bdf8 0%, #0284c7 35%, transparent 65%),
            /* Intense Royal Violet spine stretching diagonally */
            radial-gradient(ellipse 70vw 55vw at 72% 42%, #7c3aed 0%, #4f46e5 45%, transparent 75%),
            /* Brilliant Electric Blue glowing band */
            radial-gradient(ellipse 75vw 55vw at 50% 60%, #0055ff 0%, #1e40af 50%, transparent 80%),
            /* Deep Blue ambient foundation */
            radial-gradient(ellipse 60vw 50vw at 28% 78%, #0369a1 0%, #0c1c4d 50%, transparent 75%),
            /* Deep Dark Navy base */
            linear-gradient(135deg, #02030a 0%, #04081c 45%, #08031a 100%)
          `,
        }}
      />

      {/* ── Layer 2: Moving Ambient Luminous Blobs (GPU-friendly) ── */}
      {/* Blob 1: Electric Blue luminous surge */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          top: "25%",
          left: "22%",
          background:
            "radial-gradient(circle, #2563eb 0%, #1d4ed8 45%, transparent 75%)",
          filter: "blur(70px)",
          opacity: 0.75,
        }}
      />

      {/* Blob 2: Royal Violet glow */}
      <div
        className="blob-2 absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          top: "12%",
          right: "8%",
          background:
            "radial-gradient(circle, #8b5cf6 0%, #6d28d9 45%, transparent 75%)",
          filter: "blur(75px)",
          opacity: 0.8,
        }}
      />

      {/* Blob 3: Hot Neon Magenta glow in upper-right */}
      <div
        className="blob-3 absolute rounded-full"
        style={{
          width: "42vw",
          height: "42vw",
          top: "-5%",
          right: "-5%",
          background:
            "radial-gradient(circle, #f43f5e 0%, #d946ef 50%, transparent 75%)",
          filter: "blur(65px)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}
