"use client";

import { useEffect, useRef } from "react";
import type { ArtworkData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import ArrowIcon from "./ArrowIcon";

type ArtworkDetailsProps = {
  artwork: ArtworkData | null;
  isTransitioning: boolean;
  position?: number;
  total?: number;
  navigationDirection?: -1 | 0 | 1;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function ArtworkDetails({ artwork, isTransitioning, position, total, navigationDirection = 0, onClose, onPrevious, onNext }: ArtworkDetailsProps) {
  const isOpen = Boolean(artwork);
  const touchStart = useRef<{ x: number; time: number } | null>(null);

  useEffect(() => {
    if (!artwork) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [artwork, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollPosition = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      rootOverflow: root.style.overflow,
      overscrollBehavior: root.style.overscrollBehavior,
    };
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    return () => {
      body.style.overflow = previous.overflow;
      root.style.overflow = previous.rootOverflow;
      root.style.overscrollBehavior = previous.overscrollBehavior;
      window.scrollTo(0, scrollPosition);
    };
  }, [isOpen]);

  return (
    <aside className={`artwork-details ${artwork ? "is-open" : ""} ${isTransitioning ? "is-transitioning" : ""}`} aria-hidden={!artwork} aria-live="polite" aria-busy={isTransitioning}>
      {artwork && (
        <>
          <div className="details-desktop">
            <button className="details-close" onClick={onClose} aria-label="Закрыть информацию о работе">×</button>
            <div className="details-number">О работе</div>
            <div className="details-heading">
              <p className="details-eyebrow">Екатерина Соколова</p>
              <h2>{artwork.title}</h2>
            </div>
            <ArtworkFacts artwork={artwork} />
            {!artwork.image && <p className="rights-note">Изображение работы ожидает подтверждения прав. В экспозиции временно показан цветовой эскиз.</p>}
            <InquiryLink artwork={artwork} />
            <DetailsNavigation isTransitioning={isTransitioning} onPrevious={onPrevious} onNext={onNext} />
          </div>

          <div className={`details-mobile-viewer ${navigationDirection === 1 ? "is-next" : navigationDirection === -1 ? "is-previous" : ""}`}>
            <header className="details-viewer-header">
              <button type="button" onClick={onClose} aria-label="Закрыть просмотр работы">×</button>
            </header>
            <figure
              className="details-mobile-artwork"
              key={`artwork-${artwork.id}`}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                if (touch) touchStart.current = { x: touch.clientX, time: Date.now() };
              }}
              onTouchEnd={(event) => {
                const start = touchStart.current;
                const touch = event.changedTouches[0];
                touchStart.current = null;
                if (!start || !touch) return;
                const distance = touch.clientX - start.x;
                const velocity = Math.abs(distance) / Math.max(Date.now() - start.time, 1);
                if (Math.abs(distance) < 52 && velocity < 0.32) return;
                if (distance < 0) onNext();
                else onPrevious();
              }}
            >
              {artwork.image ? (
                <img src={assetPath(artwork.image)} alt={artwork.title} />
              ) : (
                <div className="details-mobile-placeholder" style={{ background: `linear-gradient(145deg, ${artwork.palette.join(", ")})` }} />
              )}
            </figure>
            <div className="details-viewer-actions">
              <button type="button" onClick={onPrevious} disabled={isTransitioning} aria-label="Предыдущая работа"><ArrowIcon direction="left" /></button>
              <button type="button" onClick={onNext} disabled={isTransitioning} aria-label="Следующая работа"><ArrowIcon direction="right" /></button>
            </div>
            <section className="details-mobile-content" aria-label={`Информация о работе «${artwork.title}»`} key={`content-${artwork.id}`}>
              <div className="details-viewer-title">
                <p>Екатерина Соколова</p>
                <h2>{artwork.title}</h2>
              </div>
              <MobileArtworkSummary artwork={artwork} />
              {!artwork.image && <p className="rights-note">Изображение работы ожидает подтверждения прав. В экспозиции временно показан цветовой эскиз.</p>}
              <InquiryLink artwork={artwork} />
            </section>
          </div>
        </>
      )}
    </aside>
  );
}

function MobileArtworkSummary({ artwork }: { artwork: ArtworkData }) {
  return (
    <div className="details-mobile-summary">
      <p>
        <span>{artwork.medium}</span>
        {artwork.widthCm && artwork.heightCm && <span>{artwork.widthCm} × {artwork.heightCm} см</span>}
        {artwork.year && <span>{artwork.year}</span>}
      </p>
      <p>
        <span>{artwork.status === "available" ? "Доступна" : "В частной коллекции"}</span>
        {artwork.status === "available" && <strong>{artwork.price ?? "Цена по запросу"}</strong>}
      </p>
    </div>
  );
}

function ArtworkFacts({ artwork }: { artwork: ArtworkData }) {
  return (
    <dl>
      {artwork.year && <><dt>Год</dt><dd>{artwork.year}</dd></>}
      <dt>Размер</dt><dd>{artwork.widthCm && artwork.heightCm ? `${artwork.widthCm} × ${artwork.heightCm} см` : "Уточняется"}</dd>
      <dt>Материал</dt><dd>{artwork.medium}</dd>
      <dt>Статус</dt><dd>{artwork.status === "available" ? "Доступна" : "В частной коллекции"}</dd>
      {artwork.status === "available" && <><dt>Цена</dt><dd>{artwork.price ?? "По запросу"}</dd></>}
    </dl>
  );
}

function InquiryLink({ artwork }: { artwork: ArtworkData }) {
  return (
    <a className="inquiry-link" href={`mailto:katja.sokolova@gmail.com?subject=${encodeURIComponent(`Запрос о работе «${artwork.title}»`)}`}>
      <span>Связаться</span><i><ArrowIcon /></i>
    </a>
  );
}

function DetailsNavigation({ isTransitioning, onPrevious, onNext }: Pick<ArtworkDetailsProps, "isTransitioning" | "onPrevious" | "onNext">) {
  return (
    <nav className="details-navigation" aria-label="Переключение работ">
      <button onClick={onPrevious} disabled={isTransitioning}><ArrowIcon direction="left" /> Предыдущая</button>
      <button onClick={onNext} disabled={isTransitioning}>Следующая <ArrowIcon direction="right" /></button>
    </nav>
  );
}
