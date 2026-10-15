// src/components/MemoryPage.jsx
// ============================================================
// Halaman penuh untuk satu kartu kenangan.
// Setiap bab punya: tanggal, judul, cerita, dan kumpulan foto/chat.
// Setiap foto punya ruang kata-kata (`caption`) di bawahnya.
// Konten dari `pages` di content.js. Gaya di MemoryPage.css.
// ============================================================

import { useEffect, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import MeshBackground from "./MeshBackground";
import "./MemoryPage.css";

function PhotoCard({ slot, label, onOpen }) {
  const [failed, setFailed] = useState(false);
  const filled = slot.src && !failed;
  const hasCaption = Boolean(slot.caption);

  return (
    <figure className="mp-card">
      {filled ? (
        <button
          type="button"
          className="mp-frame mp-photo-btn"
          onClick={() => onOpen(slot)}
          aria-label={`Perbesar ${label}`}
        >
          <img src={slot.src} alt={slot.caption || label} loading="lazy" onError={() => setFailed(true)} />
        </button>
      ) : (
        <div className="mp-frame mp-empty">
          <b>{label}</b>
          <span>Tempel foto atau chat di sini</span>
        </div>
      )}
      <figcaption className={`mp-caption${hasCaption ? "" : " is-empty"}`}>
        {hasCaption ? slot.caption : "Tulis kata-kata di sini…"}
      </figcaption>
    </figure>
  );
}

export default function MemoryPage({ card, page, onBack }) {
  const color = card.color;
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setZoom((z) => {
        if (!z) onBack();
        return null;
      });
    };
    document.addEventListener("keydown", onKey);
    const prev = document.title;
    document.title = `${page.heading} · ${prev}`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.title = prev;
    };
  }, [onBack, page.heading]);

  const accentVars = {
    "--accent": color,
    "--accent-line": `${color}80`,
    "--accent-soft": `${color}12`,
  };

  return (
    <div className="mp" style={accentVars}>
      <MeshBackground />

      <div className="mp-bar">
        <button type="button" className="mp-back" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" /> Kembali
        </button>
      </div>

      <main className="mp-main">
        <header className="mp-hero">
          <p className="mp-kicker" style={{ color }}>{page.eyebrow}</p>
          <h1 className="mp-title">{page.heading}</h1>
          {page.intro && <p className="mp-intro">{page.intro}</p>}
        </header>

        {page.entries.map((e, i) => {
          // dukung format lama (`photo`) dan baru (`photos`)
          const photos = e.photos ?? (e.photo ? [{ src: e.photo, caption: "" }] : []);
          return (
            <section className="mp-chapter" key={i}>
              <div className="mp-ch-head">
                <span
                  className="mp-ch-num"
                  aria-hidden="true"
                  style={{ color, background: `${color}1f`, border: `1.5px solid ${color}70` }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="mp-ch-date">{e.date}</p>
                  <h2 className="mp-ch-title">{e.title}</h2>
                  <p className="mp-ch-text">{e.text}</p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="mp-grid">
                  {photos.map((slot, k) => (
                    <PhotoCard key={k} slot={slot} label={`Foto ${i + 1}.${k + 1}`} onOpen={setZoom} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {page.closing && (
          <p className="mp-closing">
            <Heart size={20} color={color} fill={color} aria-hidden="true" style={{ display: "block", margin: "0 auto 12px" }} />
            {page.closing}
          </p>
        )}
      </main>

      {zoom && (
        <div className="mp-zoom" role="dialog" aria-modal="true" onClick={() => setZoom(null)}>
          <img src={zoom.src} alt={zoom.caption || ""} />
          {zoom.caption && <p>{zoom.caption}</p>}
        </div>
      )}
    </div>
  );
}
