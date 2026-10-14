// src/App.jsx
// ============================================================
// Layout: CountdownNavbar (top)
// Main: Photo on left (shifted towards middle), Cards taking center stage
// Background: Vibrant Dark Cosmic Gradient Mesh
// ============================================================

import { useRef, useState } from "react";
import MeshBackground from "./components/MeshBackground";
import NameBackdrop from "./components/NameBackdrop";
import Portrait from "./components/Portrait";
import OrbitCards from "./components/OrbitCards";
import CountdownNavbar from "./components/CountdownNavbar";
import SectionOverlay from "./components/SectionOverlay";
import { names, startDate, portrait, cards } from "./content";

export default function App() {
  const portraitRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [originX, setOriginX] = useState(50);
  const [originY, setOriginY] = useState(50);

  const handleCardClick = (card, ox, oy) => {
    setOriginX(ox);
    setOriginY(oy);
    setActiveCard(card);
  };

  const handleClose = () => setActiveCard(null);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-[#02030d] text-white select-none">
      {/* Screen-reader accessible names */}
      <span className="sr-only">{names.join(" & ")}</span>

      {/* Layer 1: Vibrant Cosmic Gradient Mesh Background */}
      <MeshBackground />

      {/* Layer 2: Decorative background names */}
      <NameBackdrop names={names} />

      {/* Layer 3: Top Navigation Bar Countdown */}
      <CountdownNavbar startDate={startDate} names={names} />

      {/* Layer 4: Main Stage (Centered around cards, photo shifted towards middle) */}
      <main className="relative flex-1 w-full overflow-hidden flex items-center justify-center px-4 sm:px-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-14 max-w-5xl mx-auto w-full my-auto">
          {/* Photo on the left, shifted towards the center */}
          <div className="relative flex-shrink-0">
            <Portrait src={portrait} names={names} portraitRef={portraitRef} />
          </div>

          {/* Cards taking center stage, larger and closely stacked */}
          <div className="relative flex-shrink-0 flex items-center">
            <OrbitCards cards={cards} onCardClick={handleCardClick} />
          </div>
        </div>
      </main>

      {/* Layer 5: Full-screen Memory Overlay */}
      <SectionOverlay
        card={activeCard}
        originX={originX}
        originY={originY}
        onClose={handleClose}
      />
    </div>
  );
}
