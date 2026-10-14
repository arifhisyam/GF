// src/App.jsx
// ============================================================
// Layout: CountdownNavbar (atas)
// Main  : Foto di kiri, kartu kenangan tersusun setengah lingkaran
//         mengelilingi foto (desktop) / bertumpuk di bawah foto (mobile)
// Latar : Dark Cosmic Gradient Mesh
// ============================================================

import { useEffect, useRef, useState } from "react";
import MeshBackground from "./components/MeshBackground";
import NameBackdrop from "./components/NameBackdrop";
import Portrait from "./components/Portrait";
import OrbitCards from "./components/OrbitCards";
import CountdownNavbar from "./components/CountdownNavbar";
import SectionOverlay from "./components/SectionOverlay";
import { names, startDate, portrait, cards } from "./content";
import { PHOTO_W, PHOTO_H, STAGE_W, STAGE_H, ORIGIN, cardsCenterX } from "./layout";

const CARDS_CX = cardsCenterX(cards.length);

const MAX_SCALE = 1.4;
const MIN_SCALE = 0.45;

// Hitung skala agar panggung desktop selalu muat di area <main>
function useFitScale(ref) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      // Gugus kartu berada di tengah layar → sisi kiri panggung (foto) harus muat di setengah lebar
      const halfW = el.clientWidth / 2 - 16;
      const h = el.clientHeight - 24;
      const widest = Math.max(CARDS_CX, STAGE_W - CARDS_CX);
      const s = Math.min(halfW / widest, h / STAGE_H, MAX_SCALE);
      setScale(Math.max(MIN_SCALE, s));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return scale;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function App() {
  const portraitRef = useRef(null);
  const mainRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [originX, setOriginX] = useState(50);
  const [originY, setOriginY] = useState(50);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const scale = useFitScale(mainRef);

  const handleCardClick = (card, ox, oy) => {
    setOriginX(ox);
    setOriginY(oy);
    setActiveCard(card);
  };

  const handleClose = () => setActiveCard(null);

  return (
    // `isolate` membuat stacking context sendiri → mesh (-z-10) tampil
    // di atas warna dasar & tidak lagi tertutup background hitam.
    <div className="relative isolate w-full h-screen overflow-hidden flex flex-col text-white select-none">
      <span className="sr-only">{names.join(" & ")}</span>

      {/* Layer 1: Dark Cosmic Gradient Mesh */}
      <MeshBackground />

      {/* Layer 2: Nama besar dekoratif */}
      <NameBackdrop names={names} />

      {/* Layer 3: Navbar countdown */}
      <CountdownNavbar startDate={startDate} names={names} />

      {/* Layer 4: Panggung utama */}
      <main
        ref={mainRef}
        className="relative z-10 flex-1 w-full flex flex-col overflow-y-auto overflow-x-hidden px-4"
      >
        {isDesktop ? (
          // Desktop: foto + kartu setengah lingkaran dalam satu panggung ter-scale
          <div
            className="relative flex-shrink-0 my-auto"
            style={{
              width: STAGE_W * scale,
              height: STAGE_H * scale,
              // pusat gugus kartu = pusat layar = pusat countdown navbar
              marginLeft: `calc(50% - ${CARDS_CX * scale}px)`,
            }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: STAGE_W,
                height: STAGE_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <div
                className="absolute"
                style={{
                  left: ORIGIN.x - PHOTO_W / 2,
                  top: ORIGIN.y - PHOTO_H / 2,
                }}
              >
                <Portrait
                  src={portrait}
                  names={names}
                  portraitRef={portraitRef}
                  size={{ width: PHOTO_W, height: PHOTO_H }}
                />
              </div>
              <OrbitCards cards={cards} onCardClick={handleCardClick} layout="arc" />
            </div>
          </div>
        ) : (
          // Mobile: foto di atas, kartu menempel & bertumpuk di bawahnya
          <div className="flex flex-col items-center my-auto py-4 w-full">
            <Portrait
              src={portrait}
              names={names}
              portraitRef={portraitRef}
              size={{ height: "clamp(210px, 36dvh, 340px)", aspectRatio: "9 / 16" }}
            />
            <div className="w-full flex justify-center" style={{ marginTop: -22, zIndex: 20 }}>
              <OrbitCards cards={cards} onCardClick={handleCardClick} layout="stack" />
            </div>
          </div>
        )}
      </main>

      {/* Layer 5: Overlay kenangan layar penuh */}
      <SectionOverlay
        card={activeCard}
        originX={originX}
        originY={originY}
        onClose={handleClose}
      />
    </div>
  );
}
