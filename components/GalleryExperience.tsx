"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import artworksJson from "@/data/artworks.json";
import type { ArtworkData } from "@/lib/types";
import { isGalleryRouteArtwork, orderArtworksByGalleryRoute } from "@/lib/artworkOrder";
import IntroOverlay from "./IntroOverlay";
import ArtworkDetails from "./ArtworkDetails";
import MobileGallery from "./MobileGallery";
import SiteHeader from "./SiteHeader";
import ArrowIcon from "./ArrowIcon";

const artworks = artworksJson as ArtworkData[];
const orderedArtworks = orderArtworksByGalleryRoute(artworks);
const routeArtworks = orderedArtworks.filter(isGalleryRouteArtwork);
const GalleryScene = dynamic(() => import("./GalleryScene"), { ssr: false });

export default function GalleryExperience({ onReady }: { onReady: () => void }) {
  const [entered, setEntered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [pendingDetailsId, setPendingDetailsId] = useState<string | null>(null);
  const [mobileNavigationDirection, setMobileNavigationDirection] = useState<-1 | 0 | 1>(0);
  const [isCompact, setIsCompact] = useState(() => window.matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const selected = artworks.find((artwork) => artwork.id === selectedId) ?? null;
  const detailsArtwork = artworks.find((artwork) => artwork.id === detailsId) ?? null;
  const markSceneReady = useCallback(() => onReady(), [onReady]);

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

  useEffect(() => {
    if (isCompact) onReady();
  }, [isCompact, onReady]);

  const navigateArtwork = useCallback((direction: -1 | 1) => {
    if (pendingDetailsId) return;
    if (isCompact) setMobileNavigationDirection(direction);
    const currentId = detailsId ?? selectedId;
    const navigationArtworks = isCompact ? orderedArtworks : routeArtworks;
    const currentIndex = navigationArtworks.findIndex((artwork) => artwork.id === currentId);
    const nextIndex = currentIndex < 0
      ? 0
      : (currentIndex + direction + navigationArtworks.length) % navigationArtworks.length;
    const nextId = navigationArtworks[nextIndex].id;
    setSelectedId(nextId);
    if (detailsId) {
      if (isCompact || reducedMotion) {
        setDetailsId(nextId);
      } else {
        setPendingDetailsId(nextId);
      }
    }
  }, [detailsId, isCompact, pendingDetailsId, reducedMotion, selectedId]);

  const handleFocusSettled = useCallback((id: string) => {
    if (pendingDetailsId === id) {
      setDetailsId(id);
      setPendingDetailsId(null);
    }
  }, [pendingDetailsId]);

  useEffect(() => {
    if (!selectedId && !detailsId) return;
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigateArtwork(-1);
      if (event.key === "ArrowRight") navigateArtwork(1);
      if (event.key === "Escape" && !detailsId) setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [detailsId, navigateArtwork, selectedId]);

  const enterGallery = () => {
    setEntered(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: 180, behavior: reducedMotion ? "auto" : "smooth" }));
  };

  const selectArtwork = (id: string | null) => {
    if (!id) {
      setSelectedId(null);
      setDetailsId(null);
      setPendingDetailsId(null);
      return;
    }
    if (id === selectedId) {
      setDetailsId(id);
      return;
    }
    setSelectedId(id);
    setDetailsId(null);
    setPendingDetailsId(null);
  };

  const exitGallery = () => {
    setSelectedId(null);
    setDetailsId(null);
    setPendingDetailsId(null);
    setEntered(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (isCompact) {
    return (
      <>
        <MobileGallery
          artworks={artworks}
          reducedMotion={reducedMotion}
          onSelect={(id) => {
            setMobileNavigationDirection(0);
            setDetailsId(id);
          }}
        />
        <ArtworkDetails
          artwork={detailsArtwork}
          isTransitioning={false}
          navigationDirection={mobileNavigationDirection}
          position={detailsArtwork ? orderedArtworks.findIndex((artwork) => artwork.id === detailsArtwork.id) + 1 : undefined}
          total={orderedArtworks.length}
          onClose={() => setDetailsId(null)}
          onPrevious={() => navigateArtwork(-1)}
          onNext={() => navigateArtwork(1)}
        />
      </>
    );
  }

  return (
    <main className="experience-shell">
      <SiteHeader
        current="gallery"
        meta={entered ? "Листайте для движения" : undefined}
        variant="gallery"
        onHome={exitGallery}
      />
      <GalleryScene
        artworks={artworks}
        entered={entered}
        selectedId={selectedId}
        reducedMotion={reducedMotion}
        onSelect={selectArtwork}
        onFocusSettled={handleFocusSettled}
        onReady={markSceneReady}
      />
      <IntroOverlay entered={entered} onEnter={enterGallery} />
      <div className={`gallery-chrome ${entered ? "is-visible" : ""}`}>
        <nav className="artwork-rail" aria-label="Список работ">
          {routeArtworks.map((artwork, index) => (
            <button
              key={artwork.id}
              className={selectedId === artwork.id ? "is-active" : ""}
              onClick={() => selectArtwork(artwork.id)}
              aria-label={`Открыть работу «${artwork.title}»`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </nav>
        <Link className="gallery-catalog-link" href="/works/">
          <span>Каталог работ</span><i aria-hidden="true"><ArrowIcon /></i>
        </Link>
      </div>
      {selected && (
        <section className={`focus-caption ${detailsArtwork ? "is-muted" : ""}`} aria-live="polite">
          <span className="focus-index">{String(routeArtworks.findIndex((artwork) => artwork.id === selected.id) + 1).padStart(2, "0")}</span>
          <div className="focus-title">
            <small>Работа {routeArtworks.findIndex((artwork) => artwork.id === selected.id) + 1} из {routeArtworks.length}</small>
            <strong>{selected.title}</strong>
          </div>
          <div className="focus-navigation" aria-label="Переключение работ">
            <button onClick={() => navigateArtwork(-1)} aria-label="Предыдущая работа"><ArrowIcon direction="left" /></button>
            <button onClick={() => navigateArtwork(1)}><span>Следующая</span><i aria-hidden="true"><ArrowIcon direction="right" /></i></button>
          </div>
          <button className="focus-details" onClick={() => setDetailsId(selected.id)}><span>Подробнее</span><i aria-hidden="true"><ArrowIcon /></i></button>
          <button className="focus-close" onClick={() => selectArtwork(null)} aria-label="Вернуться к обзору галереи">×</button>
        </section>
      )}
      <ArtworkDetails
        artwork={detailsArtwork}
        isTransitioning={Boolean(pendingDetailsId)}
        position={detailsArtwork ? routeArtworks.findIndex((artwork) => artwork.id === detailsArtwork.id) + 1 : undefined}
        total={routeArtworks.length}
        onClose={() => {
          setDetailsId(null);
          setPendingDetailsId(null);
        }}
        onPrevious={() => navigateArtwork(-1)}
        onNext={() => navigateArtwork(1)}
      />
      <div className="scroll-track" aria-hidden="true" />
    </main>
  );
}
