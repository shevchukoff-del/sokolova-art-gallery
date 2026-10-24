"use client";

import { useEffect } from "react";
import type { ArtworkData } from "@/lib/types";

export default function ArtworkDetails({ artwork, onClose }: { artwork: ArtworkData | null; onClose: () => void }) {
  useEffect(() => {
    if (!artwork) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [artwork, onClose]);

  return (
    <aside className={`artwork-details ${artwork ? "is-open" : ""}`} aria-hidden={!artwork} aria-live="polite">
      {artwork && (
        <>
          <button className="details-close" onClick={onClose} aria-label="Close artwork details">×</button>
          <div className="details-number">Selected work</div>
          <div>
            <p className="details-eyebrow">{artwork.titleEn}</p>
            <h2>{artwork.title}</h2>
          </div>
          <dl>
            {artwork.year && <><dt>Year</dt><dd>{artwork.year}</dd></>}
            <dt>Dimensions</dt><dd>{artwork.widthCm} × {artwork.heightCm} cm</dd>
            <dt>Medium</dt><dd>{artwork.medium}</dd>
            <dt>Status</dt><dd>{artwork.status === "available" ? artwork.price ?? "По запросу" : "В частной коллекции"}</dd>
          </dl>
          {!artwork.image && <p className="rights-note">Artwork image pending rights approval. The colour study shown in the room is a placeholder.</p>}
          <a className="inquiry-link" href={`mailto:katja.sokolova@gmail.com?subject=${encodeURIComponent(`Запрос о работе «${artwork.title}»`)}`}>
            <span>Request information</span><i>↗</i>
          </a>
        </>
      )}
    </aside>
  );
}
