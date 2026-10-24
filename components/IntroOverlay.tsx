"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type IntroOverlayProps = {
  entered: boolean;
  compact?: boolean;
  onEnter: () => void;
  onViewArtworks: () => void;
};

export default function IntroOverlay({ entered, compact = false, onEnter, onViewArtworks }: IntroOverlayProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from("[data-intro-reveal]", {
        yPercent: 115,
        opacity: 0,
        duration: 1.25,
        stagger: 0.11,
        delay: 0.35,
        ease: "expo.out",
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} className={`intro-overlay ${entered ? "is-entered" : ""} ${compact ? "is-compact" : ""}`} aria-hidden={entered}>
      <div className="intro-kicker clip-line"><span data-intro-reveal>Independent artist · Moscow</span></div>
      <div className="intro-title" aria-label="Ekaterina Sokolova">
        <div className="clip-line"><span data-intro-reveal>Ekaterina</span></div>
        <div className="clip-line title-indent"><span data-intro-reveal>Sokolova</span></div>
      </div>
      <div className="intro-footer">
        <div className="intro-subtitle clip-line"><span data-intro-reveal>Art Gallery</span></div>
        <div className="intro-actions" data-intro-reveal>
          <button className="primary-action" onClick={onEnter} tabIndex={entered ? -1 : 0}>
            <span>Enter the gallery</span><i aria-hidden="true">↗</i>
          </button>
          <button className="text-action" onClick={onViewArtworks} tabIndex={entered ? -1 : 0}>View artworks</button>
        </div>
      </div>
      <div className="intro-index" data-intro-reveal aria-hidden="true">EST. — 2026</div>
      <button className="skip-intro" onClick={onEnter} tabIndex={entered ? -1 : 0}>Skip intro</button>
    </section>
  );
}
