"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ArrowIcon from "./ArrowIcon";

type IntroOverlayProps = {
  entered: boolean;
  compact?: boolean;
  onEnter: () => void;
};

export default function IntroOverlay({ entered, compact = false, onEnter }: IntroOverlayProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-revealed");
      return;
    }
    const context = gsap.context(() => {
      gsap.from("[data-intro-reveal]", {
        yPercent: 115,
        opacity: 0,
        duration: 1.25,
        stagger: 0.11,
        delay: 0.35,
        ease: "expo.out",
        onComplete: () => element.classList.add("is-revealed"),
      });
    }, element);
    return () => {
      context.revert();
      element.classList.remove("is-revealed");
    };
  }, []);

  return (
    <section ref={root} className={`intro-overlay ${entered ? "is-entered" : ""} ${compact ? "is-compact" : ""}`} aria-hidden={entered}>
      <div className="intro-identity">
        <div className="intro-kicker">
          <div className="clip-line"><span data-intro-reveal>Современная российская художница</span></div>
        </div>
        <div className="intro-title display-title" aria-label="Екатерина Соколова">
          <div className="clip-line"><span data-intro-reveal>Екатерина</span></div>
          <div className="clip-line title-indent intro-title-accent"><span data-intro-reveal>Соколова</span></div>
        </div>
      </div>
      <div className="intro-footer">
        <div className="intro-subtitle clip-line"><span data-intro-reveal>Живопись между реализмом и мистикой</span></div>
        <div className="intro-actions" data-intro-reveal>
          <button className="primary-action" onClick={onEnter} tabIndex={entered ? -1 : 0}>
            <span>Войти в галерею</span><i aria-hidden="true"><ArrowIcon /></i>
          </button>
          <Link className="text-action" href="/works/" tabIndex={entered ? -1 : 0}>Каталог работ</Link>
        </div>
      </div>
      <div className="intro-index" data-intro-reveal aria-hidden="true">EST. — 2026</div>
    </section>
  );
}
