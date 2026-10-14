// src/components/NameBackdrop.jsx
// Decorative large names in background — dark theme version

export default function NameBackdrop({ names }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Ampersand */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(6rem, 18vw, 18rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          letterSpacing: "-0.04em",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          userSelect: "none",
        }}
      >
        &amp;
      </span>
      {/* Name 1 */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 8vw, 8rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          userSelect: "none",
        }}
      >
        {names[0]}
      </span>
      {/* Name 2 */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 8vw, 8rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translateX(-50%)",
          userSelect: "none",
        }}
      >
        {names[1]}
      </span>
    </div>
  );
}
