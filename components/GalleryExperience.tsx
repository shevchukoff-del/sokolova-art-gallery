"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import artworksJson from "@/data/artworks.json";
import type { ArtworkData } from "@/lib/types";
import IntroOverlay from "./IntroOverlay";
import ArtworkDetails from "./ArtworkDetails";
import MobileGallery from "./MobileGallery";

const artworks = artworksJson as ArtworkData[];
const GalleryScene = dynamic(() => import("./GalleryScene"), { ssr: false });

export default function GalleryExperience() {
  const [entered, setEntered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(() => window.matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const selected = artworks.find((artwork) => artwork.id === selectedId) ?? null;

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsCompact(compact.matches);
      setReducedMotion(motion.matches);
    };
    sync();
    compact.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      compact.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  const enterGallery = () => {
    setEntered(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: 180, behavior: reducedMotion ? "auto" : "smooth" }));
  };

  const viewArtworks = () => {
    setEntered(true);
    if (isCompact) {
      window.requestAnimationFrame(() => document.getElementById("works")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }));
    } else {
      setSelectedId(artworks[0].id);
    }
  };

  if (isCompact) {
    return (
      <>
        <IntroOverlay entered={entered} onEnter={enterGallery} onViewArtworks={viewArtworks} compact />
        <MobileGallery artworks={artworks} onSelect={setSelectedId} />
        <ArtworkDetails artwork={selected} onClose={() => setSelectedId(null)} />
      </>
    );
  }

  return (
    <main className="experience-shell">
      <GalleryScene
        artworks={artworks}
        entered={entered}
        selectedId={selectedId}
        reducedMotion={reducedMotion}
        onSelect={setSelectedId}
      />
      <IntroOverlay entered={entered} onEnter={enterGallery} onViewArtworks={viewArtworks} />
      <div className={`gallery-chrome ${entered ? "is-visible" : ""}`}>
        <header className="topbar">
          <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Sokolova Art
          </button>
          <span className="exhibition-label">Digital exhibition · 01</span>
          <span className="progress-copy">Scroll to move</span>
        </header>
        <nav className="artwork-rail" aria-label="Artwork index">
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              className={selectedId === artwork.id ? "is-active" : ""}
              onClick={() => setSelectedId(artwork.id)}
              aria-label={`View ${artwork.title}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </nav>
        <div className="scroll-cue" aria-hidden="true">
          <span>Explore</span>
          <i />
        </div>
      </div>
      <ArtworkDetails artwork={selected} onClose={() => setSelectedId(null)} />
      <div className="scroll-track" aria-hidden="true" />
    </main>
  );
}
