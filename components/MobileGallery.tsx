"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
import type { ArtworkData } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import { artwearItems } from "@/data/artwear";
import SiteHeader from "./SiteHeader";
import ArrowIcon from "./ArrowIcon";
import MobileFooter from "./MobileFooter";

const featuredArtworkIds = ["zebra", "vera", "nice-pinky-ass", "etyud", "flamingo"] as const;

const artwearCollections = [
  {
    id: "tshirts",
    title: "Футболки",
    items: artwearItems.map((item) => ({ title: item.title, type: "Авторский принт", image: item.modelImage, href: `/artwear/#${item.id}` })),
  },
  {
    id: "scarves",
    title: "Платки",
    items: [
      { title: "Средиземноморье", type: "Шёлковый платок", image: "/artwear/home/scarves/harbor-draped.jpg", href: "/artwear/#collection-title" },
      { title: "Тигр", type: "Шёлковый платок", image: "/artwear/home/scarves/tiger.jpg", href: "/artwear/#collection-title" },
      { title: "Москва", type: "Шёлковый платок", image: "/artwear/home/scarves/moscow-night.jpg", href: "/artwear/#collection-title" },
      { title: "Красные рыбы", type: "Шёлковый платок", image: "/artwear/home/scarves/red-fish.jpg", href: "/artwear/#collection-title" },
      { title: "Фламинго", type: "Шёлковый платок", image: "/artwear/home/scarves/flamingo.jpg", href: "/artwear/#collection-title" },
    ],
  },
  {
    id: "bags",
    title: "Сумки",
    items: [
      { title: "Зебра", type: "Сумка-тоут", image: "/artwear/home/bags/zebra-tote.jpg", href: "/artwear/#collection-title" },
      { title: "Девочка", type: "Сумка-тоут", image: "/artwear/home/bags/girl-tote.jpg", href: "/artwear/#collection-title" },
      { title: "Средиземноморье", type: "Сумка-тоут", image: "/artwear/home/bags/harbor-bag.jpg", href: "/artwear/#collection-title" },
      { title: "Тигр", type: "Авторская сумка", image: "/artwear/home/bags/tiger-bag.jpg", href: "/artwear/#collection-title" },
      { title: "Ночная Москва", type: "Авторская сумка", image: "/artwear/home/bags/night-city-bag.jpg", href: "/artwear/#collection-title" },
      { title: "Средиземноморье · комплект", type: "Сумка и косметичка", image: "/artwear/home/bags/harbor-set.jpg", href: "/artwear/#collection-title" },
    ],
  },
  {
    id: "wearable-art",
    title: "Авторская роспись одежды",
    kicker: "Wearable Art",
    items: [
      { title: "Цирк · вид спереди", type: "Ручная роспись", image: "/artwear/home/wearable-art/circus-front.jpg", href: "/artwear/#collection-title" },
      { title: "Цирк · вид сзади", type: "Ручная роспись", image: "/artwear/home/wearable-art/circus-back.jpg", href: "/artwear/#collection-title" },
      { title: "Москва · вид сзади", type: "Ручная роспись", image: "/artwear/home/wearable-art/moscow-back.jpg", href: "/artwear/#collection-title" },
    ],
  },
] as const;

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
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroRoot = useRef<HTMLElement | null>(null);
  const quoteRoot = useRef<HTMLElement | null>(null);
  const heroVideo = useRef<HTMLVideoElement | null>(null);
  const wasHeroVisible = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeHeroSlide = heroSlides[activeHeroIndex] ?? heroSlides[0];
  const featuredArtworks = featuredArtworkIds.flatMap((id) => {
    const artwork = artworks.find((item) => item.id === id);
    return artwork ? [artwork] : [];
  });

  const updateArtwearProgress = useCallback((event: UIEvent<HTMLDivElement>) => {
    const rail = event.currentTarget;
    const distance = rail.scrollWidth - rail.clientWidth;
    const progress = distance > 0 ? rail.scrollLeft / distance : 0;
    const indicator = rail.nextElementSibling?.querySelector<HTMLElement>("i");
    if (indicator) indicator.style.transform = `translate3d(${(progress * 257).toFixed(2)}%, 0, 0)`;
  }, []);

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
    const resetHero = () => {
      setActiveHeroIndex(0);
      setIsHeroPaused(false);
    };
    const resetHeroAtTop = () => {
      if (!window.location.hash || window.location.hash === "#top") resetHero();
    };
    const root = heroRoot.current;
    const observer = root ? new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      if (isVisible && !wasHeroVisible.current) resetHero();
      wasHeroVisible.current = isVisible;
    }, { threshold: [0] }) : null;

    resetHeroAtTop();
    if (root) observer?.observe(root);
    window.addEventListener("pageshow", resetHero);
    window.addEventListener("hashchange", resetHeroAtTop);
    return () => {
      observer?.disconnect();
      window.removeEventListener("pageshow", resetHero);
      window.removeEventListener("hashchange", resetHeroAtTop);
    };
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

  useEffect(() => {
    const root = quoteRoot.current;
    if (!root) return;
    const lead = root.querySelector<HTMLElement>("blockquote span");
    const accent = root.querySelector<HTMLElement>("blockquote i");
    const cite = root.querySelector<HTMLElement>("cite");
    if (!lead || !accent || !cite) return;

    const applyProgress = (progress: number, citeProgress: number) => {
      const shift = ((1 - progress) * 56).toFixed(2);
      const opacity = (0.1 + progress * 0.9).toFixed(3);
      lead.style.transform = `translate3d(-${shift}px, 0, 0)`;
      accent.style.transform = `translate3d(${shift}px, 0, 0)`;
      lead.style.opacity = opacity;
      accent.style.opacity = opacity;
      cite.style.transform = `translate3d(0, ${((1 - citeProgress) * 10).toFixed(2)}px, 0)`;
      cite.style.opacity = citeProgress.toFixed(3);
    };

    if (reducedMotion) {
      applyProgress(1, 1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const top = root.getBoundingClientRect().top;
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.34;
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end)));
      const citeProgress = Math.min(1, Math.max(0, (progress - 0.58) / 0.3));
      applyProgress(progress, citeProgress);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reducedMotion]);

  return (
    <main id="top" className="mobile-gallery">
      <SiteHeader current="gallery" variant="gallery" />
      <section ref={heroRoot} className="mobile-artist-hero" aria-labelledby="mobile-artist-title">
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
          <p className="mobile-artist-kicker">Современный российский художник</p>
          <h1 id="mobile-artist-title" className="display-title"><span>Екатерина</span><i>Соколова</i></h1>
          <p>Живопись между реализмом и мистикой</p>
          <div className="mobile-artist-actions">
            <a className="mobile-artist-cta" href="#works"><span>Смотреть работы</span><ArrowIcon /></a>
            <a className="mobile-artist-contact" href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
          </div>
        </div>
        <div className="mobile-artist-meta" aria-live="polite">
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
        </div>
      </section>
      <section ref={quoteRoot} id="works" className="mobile-gallery-interlude" aria-labelledby="mobile-gallery-quote">
        <blockquote id="mobile-gallery-quote">
          <span>Работа для меня — один из способов</span>
          <i>общения с миром, размышления о нём.</i>
        </blockquote>
        <cite>— Екатерина Соколова</cite>
      </section>
      <section className="mobile-works" aria-labelledby="mobile-featured-title">
        <header className="mobile-section-title">
          <h2 id="mobile-featured-title"><span>Избранные</span> <i>работы</i></h2>
        </header>
        <div className="mobile-work-list">
        {featuredArtworks.map((artwork, index) => (
          <article className="mobile-work" key={artwork.id}>
            <button
              className="mobile-placeholder"
              style={artwork.image ? undefined : {
                aspectRatio: `${artwork.widthCm ?? 1} / ${artwork.heightCm ?? 1}`,
                background: `linear-gradient(145deg, ${artwork.palette.join(", ")})`,
              }}
              onClick={() => onSelect(artwork.id)}
              aria-label={`Открыть информацию о работе «${artwork.title}»`}
            >
              {artwork.image && <img src={assetPath(artwork.image)} alt="" loading="lazy" />}
              {!artwork.image && <span>Изображение · {String(index + 1).padStart(2, "0")}</span>}
            </button>
            <div className="mobile-work-caption">
              <span><b>{artwork.title}</b><small>{artwork.medium}</small></span>
              {artwork.widthCm && artwork.heightCm && <span>{artwork.widthCm} × {artwork.heightCm} см</span>}
            </div>
            <button className="mobile-work-open" type="button" onClick={() => onSelect(artwork.id)}>
              <span>Узнать о работе</span><ArrowIcon />
            </button>
          </article>
        ))}
        </div>
        <Link className="mobile-section-link" href="/works/"><span>Смотреть весь каталог</span><ArrowIcon /></Link>
      </section>

      <section id="artwear" className="mobile-home-section mobile-artwear-preview" aria-labelledby="mobile-artwear-title">
        <header className="mobile-home-heading">
          <p>Artwear / Изделия</p>
          <h2 id="mobile-artwear-title">Картины <i>вне холста</i></h2>
          <span>Одежда, платки и сумки, созданные по мотивам работ Екатерины Соколовой.</span>
        </header>
        <div className="mobile-artwear-collections">
          {artwearCollections.map((collection) => (
            <section className="mobile-artwear-collection" aria-labelledby={`artwear-${collection.id}`} key={collection.id}>
              <div className="mobile-artwear-collection-heading">
                <div>
                  {"kicker" in collection && <small>{collection.kicker}</small>}
                  <h3 id={`artwear-${collection.id}`}>{collection.title}</h3>
                </div>
                <Link href="/artwear/#collection-title">Смотреть все <ArrowIcon /></Link>
              </div>
              <div className="mobile-artwear-rail" tabIndex={0} aria-label={`${collection.title}: листайте горизонтально`} onScroll={updateArtwearProgress}>
                {collection.items.map((item) => (
                  <figure key={item.image}>
                    <Link href={item.href} aria-label={`${item.title} — перейти к изделию`}>
                      <div className="mobile-artwear-image">
                        <img src={assetPath(item.image)} alt={`${collection.title} Sokolova Art — ${item.title}`} loading="lazy" />
                      </div>
                      <figcaption><b>{item.title}</b><small>{item.type}</small></figcaption>
                    </Link>
                  </figure>
                ))}
              </div>
              <div className="mobile-artwear-progress" aria-hidden="true"><i /></div>
            </section>
          ))}
        </div>
        <Link className="mobile-section-link" href="/artwear/"><span>Смотреть Artwear / Изделия</span><ArrowIcon /></Link>
      </section>

      <section className="mobile-home-section mobile-interiors-preview" aria-labelledby="mobile-interiors-title">
        <figure>
          <img src={assetPath("/interiors/relief-artist-seated.jpg")} alt="Екатерина Соколова рядом с авторской росписью интерьера" loading="lazy" />
        </figure>
        <div>
          <p>Интерьерные проекты</p>
          <h2 id="mobile-interiors-title">Пространство <i>как холст</i></h2>
          <span>Авторская роспись стен и архитектурных поверхностей — от индивидуального эскиза до реализации на объекте.</span>
          <div className="mobile-interiors-actions">
            <Link href="/interiors/"><span>Смотреть проекты</span><ArrowIcon /></Link>
            <a href="mailto:katja.sokolova@gmail.com?subject=%D0%98%D0%BD%D1%82%D0%B5%D1%80%D1%8C%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82">Обсудить проект</a>
          </div>
        </div>
      </section>

      <section id="about-preview" className="mobile-home-section mobile-about-preview" aria-labelledby="mobile-about-title">
        <header className="mobile-about-copy">
          <p>Об авторе</p>
          <h2 id="mobile-about-title"><span>Между реальностью</span><i>и внутренним образом</i></h2>
        </header>
        <figure>
          <img src={assetPath("/press/artist-portrait-restored.jpg")} alt="Портрет художницы Екатерины Соколовой" loading="lazy" />
          <figcaption>Екатерина Соколова · Москва</figcaption>
        </figure>
        <div className="mobile-about-note">
          <p>Екатерина Соколова — современный российский художник. В её живописи город, природа и повседневные наблюдения превращаются в эмоциональные, почти мифологические образы.</p>
          <Link className="mobile-section-link" href="/about/"><span>Познакомиться с автором</span><ArrowIcon /></Link>
        </div>
      </section>

      <section className="mobile-home-section mobile-press-preview" aria-labelledby="mobile-press-title">
        <header className="mobile-home-heading">
          <p>Публичная история</p>
          <h2 id="mobile-press-title">Выставки <i>и публикации</i></h2>
        </header>
        <article className="mobile-press-feature">
          <img src={assetPath("/press/green-fish.jpg")} alt="Картина Екатерины Соколовой «Зелёные рыбки»" loading="lazy" />
          <div><small>2008 · Аукцион «Совком»</small><h3>Картина, ставшая частью публичной истории художницы</h3><p>«Зелёные рыбки» вошли в аукционный каталог современного искусства вместе с другой работой Екатерины Соколовой.</p></div>
        </article>
        <article className="mobile-press-note">
          <small>2014 · The Art Newspaper Russia</small>
          <h3>О карьере, выставках и аукционной истории Екатерины Соколовой</h3>
        </article>
        <Link className="mobile-section-link" href="/press/"><span>Все выставки и публикации</span><ArrowIcon /></Link>
      </section>

      <section className="mobile-home-contact" aria-labelledby="mobile-contact-title">
        <p>Sokolova Art · Москва</p>
        <h2 id="mobile-contact-title">Искусство может стать частью <i>вашей коллекции, вещи или пространства.</i></h2>
        <span>Приобрести картину, заказать изделие или обсудить интерьерный проект.</span>
        <a href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
      </section>
      <MobileFooter />
    </main>
  );
}
