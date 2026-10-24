"use client";

import type { ArtworkData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";

export default function MobileGallery({ artworks, onSelect }: { artworks: ArtworkData[]; onSelect: (id: string) => void }) {
  return (
    <main className="mobile-gallery">
      <header className="mobile-header">
        <span>Sokolova Art</span>
        <small>Digital exhibition · 01</small>
      </header>
      <section className="mobile-statement">
        <p>Москва · Урбанизм · Цветы</p>
        <h1>Painting as a state of the soul.</h1>
        <p className="mobile-quote">«Мне нравится, когда в живописи сочетается реализм и некоторая мистика одновременно».</p>
      </section>
      <section id="works" className="mobile-works" aria-label="Selected artworks">
        <div className="mobile-section-title"><span>Selected works</span><span>{String(artworks.length).padStart(2, "0")}</span></div>
        {artworks.map((artwork, index) => (
          <article className="mobile-work" key={artwork.id}>
            <button
              className="mobile-placeholder"
              style={{
                aspectRatio: `${artwork.widthCm} / ${artwork.heightCm}`,
                background: artwork.image
                  ? `center / contain no-repeat url("${assetPath(artwork.image)}"), #e8e2d7`
                  : `linear-gradient(145deg, ${artwork.palette.join(", ")})`,
              }}
              onClick={() => onSelect(artwork.id)}
              aria-label={`Open details for ${artwork.title}`}
            >
              {!artwork.image && <span>Image slot · {String(index + 1).padStart(2, "0")}</span>}
            </button>
            <button className="mobile-work-caption" onClick={() => onSelect(artwork.id)}>
              <span><b>{artwork.title}</b><small>{artwork.titleEn}</small></span>
              <span>{artwork.widthCm} × {artwork.heightCm} cm</span>
            </button>
          </article>
        ))}
      </section>
      <footer className="mobile-footer">
        <p>Ekaterina Sokolova</p>
        <a href="mailto:katja.sokolova@gmail.com">Contact the artist ↗</a>
      </footer>
    </main>
  );
}
