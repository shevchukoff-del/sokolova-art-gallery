"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ArtworkData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import SiteHeader from "./SiteHeader";
import ArrowIcon from "./ArrowIcon";

type GalleryFilter = "all" | "available" | "archive";

const filters: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "available", label: "В наличии" },
  { id: "archive", label: "Архив" },
];

const heroSlides = [
  {
    id: "red-fish-1-animated",
    title: "Red fish 1",
    video: "/hero/red-fish-1-animated.mp4",
    poster: "/hero/red-fish-1.webp",
    position: "50% 50%",
  },
  {
    id: "gostinitsa-ukraina",
    title: "Гостиница Украина",
    image: "/artworks/gostinitsa-ukraina.webp",
    position: "50% 48%",
  },
  {
    id: "nochnoy-klub",
    title: "Ночной клуб",
    image: "/hero/nochnoy-klub.webp",
    position: "50% 46%",
  },
  {
    id: "tigr",
    title: "Тигр",
    image: "/hero/tigr.webp",
    position: "50% 40%",
  },
  {
    id: "eyo-zovut-moskva",
    title: "Её зовут Москва",
    image: "/hero/eyo-zovut-moskva.webp",
    position: "50% 48%",
  },
] as const;

const heroIntervalMs = 6000;

type MobileGalleryProps = {
  artworks: ArtworkData[];
  reducedMotion: boolean;
  onSelect: (id: string) => void;
};

export default function MobileGallery({ artworks, reducedMotion, onSelect }: MobileGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroVideo = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeHeroSlide = heroSlides[activeHeroIndex] ?? heroSlides[0];
  const filteredArtworks = artworks.filter((artwork) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "available") return artwork.status === "available";
    return artwork.status === "sold";
  });

  const pauseHeroTemporarily = useCallback(() => {
    setIsHeroPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsHeroPaused(false), 8000);
  }, []);

  const moveHero = useCallback((direction: -1 | 1) => {
    setActiveHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
    pauseHeroTemporarily();
  }, [pauseHeroTemporarily]);

  const selectHero = useCallback((index: number) => {
    setActiveHeroIndex(index);
    pauseHeroTemporarily();
  }, [pauseHeroTemporarily]);

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const source = "image" in slide ? slide.image : slide.poster;
      const image = new Image();
      image.src = assetPath(source);
    });
  }, []);

  useEffect(() => {
    const video = heroVideo.current;
    if (!video) return;
    if (activeHeroIndex === 0 && !reducedMotion) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
  }, [activeHeroIndex, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isHeroPaused || activeHeroIndex === 0) return;
    const timeout = window.setTimeout(() => {
      if (!document.hidden) {
        setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
      }
    }, heroIntervalMs);
    return () => window.clearTimeout(timeout);
  }, [activeHeroIndex, isHeroPaused, reducedMotion]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <main className="mobile-gallery">
      <SiteHeader current="gallery" variant="gallery" />
      <section className="mobile-artist-hero" aria-labelledby="mobile-artist-title">
        <figure
          className="mobile-artist-work"
          aria-roledescription="карусель"
          aria-label="Пять работ Екатерины Соколовой"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
            pauseHeroTemporarily();
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const distance = event.changedTouches[0]?.clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(distance) > 36) {
              moveHero(distance < 0 ? 1 : -1);
            }
          }}
        >
          {heroSlides.map((slide, index) => (
            "video" in slide ? (
              <video
                ref={heroVideo}
                className={index === activeHeroIndex ? "is-active" : ""}
                src={assetPath(slide.video)}
                poster={assetPath(slide.poster)}
                muted
                playsInline
                preload="metadata"
                aria-label={`${slide.title}, анимированная работа Екатерины Соколовой`}
                aria-hidden={index !== activeHeroIndex}
                onEnded={() => setActiveHeroIndex(1)}
                style={{ objectPosition: slide.position }}
                key={slide.id}
              />
            ) : (
              <img
                className={index === activeHeroIndex ? "is-active" : ""}
                src={assetPath(slide.image)}
                alt={index === activeHeroIndex ? `${slide.title}, Екатерина Соколова` : ""}
                aria-hidden={index !== activeHeroIndex}
                loading="lazy"
                style={{ objectPosition: slide.position }}
                key={slide.id}
              />
            )
          ))}
          <span className="mobile-artist-shade" aria-hidden="true" />
        </figure>
        <div className="mobile-artist-identity">
          <p className="mobile-artist-kicker">Современная российская художница</p>
          <h1 id="mobile-artist-title" className="display-title"><span>Екатерина</span><i>Соколова</i></h1>
          <p>Живопись между реализмом и мистикой</p>
          <div className="mobile-artist-actions">
            <a className="mobile-artist-cta" href="#works"><span>Смотреть работы</span><ArrowIcon /></a>
            <a className="mobile-artist-contact" href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
          </div>
        </div>
        <div className="mobile-artist-meta" aria-live="polite">
          <span>{activeHeroSlide.title}</span>
          <div className="mobile-artist-progress">
            <div className="mobile-artist-progress-track" aria-hidden="true">
              {heroSlides.map((slide, index) => (
                <i className={index <= activeHeroIndex ? "is-active" : undefined} key={slide.id} />
              ))}
            </div>
            <input
              type="range"
              min="0"
              max={heroSlides.length - 1}
              step="1"
              value={activeHeroIndex}
              aria-label="Выбрать работу на первом экране"
              aria-valuetext={`${activeHeroSlide.title}, ${activeHeroIndex + 1} из ${heroSlides.length}`}
              onChange={(event) => selectHero(Number(event.currentTarget.value))}
              onPointerDown={pauseHeroTemporarily}
            />
          </div>
          <span>{String(activeHeroIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
        </div>
      </section>
      <section id="works" className="mobile-works" aria-label="Каталог работ">
        <div className="mobile-section-title"><span>Каталог работ</span><span>{String(filteredArtworks.length).padStart(2, "0")}</span></div>
        <div className="mobile-filters" role="group" aria-label="Фильтр работ">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter.id ? "is-active" : undefined}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              key={filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="mobile-work-list" aria-live="polite">
        {filteredArtworks.map((artwork, index) => (
          <article className={`mobile-work ${index % 2 === 1 ? "is-left" : "is-right"}`} key={artwork.id}>
            <button
              className="mobile-placeholder"
              style={{
                aspectRatio: artwork.imageAspectRatio ?? `${artwork.widthCm} / ${artwork.heightCm}`,
                background: artwork.image
                  ? `center / cover no-repeat url("${assetPath(artwork.image)}")`
                  : `linear-gradient(145deg, ${artwork.palette.join(", ")})`,
              }}
              onClick={() => onSelect(artwork.id)}
              aria-label={`Открыть информацию о работе «${artwork.title}»`}
            >
              {!artwork.image && <span>Изображение · {String(index + 1).padStart(2, "0")}</span>}
            </button>
            <button className="mobile-work-caption" onClick={() => onSelect(artwork.id)}>
              <span><b>{artwork.title}</b><small>{artwork.medium}</small><em>{artwork.status === "available" ? "В наличии" : "Архив"}</em></span>
              <span>{artwork.widthCm} × {artwork.heightCm} см</span>
            </button>
          </article>
        ))}
        </div>
      </section>
      <footer className="mobile-footer">
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com"><span>Связаться с художницей</span><ArrowIcon /></a>
      </footer>
    </main>
  );
}
