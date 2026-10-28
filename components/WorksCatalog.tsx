"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArtworkData, ArtworkStatus } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import { orderArtworksByGalleryRoute } from "@/lib/artworkOrder";
import ArtworkDetails from "./ArtworkDetails";
import SiteHeader from "./SiteHeader";
import ArrowIcon from "./ArrowIcon";
import MobileFooter from "./MobileFooter";

type CatalogFilter = "all" | ArtworkStatus;

const filters: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "Все работы" },
  { id: "available", label: "В наличии" },
  { id: "sold", label: "Архив" },
];

export default function WorksCatalog({ artworks }: { artworks: ArtworkData[] }) {
  const orderedArtworks = useMemo(() => orderArtworksByGalleryRoute(artworks), [artworks]);
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<-1 | 0 | 1>(0);
  const visibleArtworks = useMemo(
    () => filter === "all" ? orderedArtworks : orderedArtworks.filter((artwork) => artwork.status === filter),
    [filter, orderedArtworks],
  );
  const selectedArtwork = orderedArtworks.find((artwork) => artwork.id === selectedId) ?? null;

  const navigateArtwork = (direction: -1 | 1) => {
    if (!visibleArtworks.length) return;
    setNavigationDirection(direction);
    const currentIndex = visibleArtworks.findIndex((artwork) => artwork.id === selectedId);
    const nextIndex = currentIndex < 0
      ? 0
      : (currentIndex + direction + visibleArtworks.length) % visibleArtworks.length;
    setSelectedId(visibleArtworks[nextIndex].id);
  };

  return (
    <main id="top" className="works-page">
      <SiteHeader current="works" variant="works" meta={`${artworks.length} работ`} />

      <header className="works-hero">
        <h1 className="display-title"><span>Каталог</span><i>работ</i></h1>
        <div>
          <p>Москва, урбанизм, цветы — авторская живопись в действующей коллекции и архиве.</p>
          <Link href="/"><span>Пройти по 3D-галерее</span><i aria-hidden="true"><ArrowIcon /></i></Link>
        </div>
      </header>

      <section className="works-catalog" aria-label="Каталог работ">
        <div className="works-catalog-bar">
          <div className="works-filters" aria-label="Фильтр работ">
            {filters.map((item) => {
              const count = item.id === "all" ? orderedArtworks.length : orderedArtworks.filter((artwork) => artwork.status === item.id).length;
              return (
                <button
                  key={item.id}
                  className={filter === item.id ? "is-active" : ""}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  <span>{item.label}</span><small>{String(count).padStart(2, "0")}</small>
                </button>
              );
            })}
          </div>
        </div>

        <div className="works-grid">
          {visibleArtworks.map((artwork, index) => (
            <article className="works-card" key={artwork.id}>
              <button type="button" onClick={() => { setNavigationDirection(0); setSelectedId(artwork.id); }} aria-label={`Открыть информацию о работе «${artwork.title}»`}>
                <figure>
                  {artwork.image && <img src={assetPath(artwork.image)} alt={artwork.title} loading={index < 2 ? "eager" : "lazy"} />}
                </figure>
                <div className="works-card-copy">
                  <div>
                    <h3>{artwork.title}</h3>
                    <p>
                      {artwork.year ? `${artwork.year} · ` : ""}
                      {artwork.widthCm && artwork.heightCm ? `${artwork.widthCm} × ${artwork.heightCm} см` : "Размер уточняется"}
                      <span>{artwork.status === "available" ? "В наличии" : "Архив"}</span>
                    </p>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="works-footer">
        <p>Sokolova Art</p>
        <Link href="/">В 3D-галерею</Link>
        <a href="mailto:katja.sokolova@gmail.com">Связаться</a>
      </footer>
      <MobileFooter className="works-mobile-footer" />

      <ArtworkDetails
        artwork={selectedArtwork}
        isTransitioning={false}
        position={selectedArtwork ? visibleArtworks.findIndex((artwork) => artwork.id === selectedArtwork.id) + 1 : undefined}
        total={visibleArtworks.length}
        navigationDirection={navigationDirection}
        onClose={() => setSelectedId(null)}
        onPrevious={() => navigateArtwork(-1)}
        onNext={() => navigateArtwork(1)}
      />
    </main>
  );
}
