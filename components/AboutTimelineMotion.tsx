"use client";

import { useEffect } from "react";

export default function AboutTimelineMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-about-timeline]");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 700px)");
    const milestones = Array.from(root.querySelectorAll<HTMLElement>(".about-milestone"));
    const quote = document.querySelector<HTMLElement>("[data-quote-reveal]");
    let frame = 0;
    let quoteObserver: IntersectionObserver | null = null;

    const reset = () => {
      for (const milestone of milestones) {
        const dot = milestone.querySelector<HTMLElement>(".about-milestone-track i");
        if (dot) dot.style.cssText = "";
      }
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches || !compactViewport.matches) {
        reset();
        return;
      }

      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.92;

      for (const milestone of milestones) {
        const track = milestone.querySelector<HTMLElement>(".about-milestone-track");
        const dot = track?.querySelector<HTMLElement>("i");
        if (!track || !dot) continue;

        const targetPercent = Number.parseFloat(getComputedStyle(milestone).getPropertyValue("--milestone-progress"));
        const travel = track.clientWidth * (targetPercent / 100);
        const movementRange = Math.max(viewportHeight * 0.3, travel * 1.8);
        const rawProgress = Math.min(1, Math.max(0, (start - milestone.getBoundingClientRect().top) / movementRange));
        const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
        const translateX = travel * progress - dot.offsetWidth / 2;
        const opacity = 0.55 + progress * 0.45;

        dot.style.cssText = `left:0;opacity:${opacity};transform:translate3d(${translateX}px,-50%,0)`;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const syncQuoteReveal = () => {
      quoteObserver?.disconnect();
      quoteObserver = null;
      quote?.classList.remove("is-motion-ready", "is-visible");
      if (!quote || reducedMotion.matches || !compactViewport.matches) return;

      quote.classList.add("is-motion-ready");
      quoteObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        quote.classList.add("is-visible");
        quoteObserver?.disconnect();
        quoteObserver = null;
      }, { threshold: 0.22, rootMargin: "0px 0px -8%" });
      quoteObserver.observe(quote);
    };

    const handleMotionPreference = () => {
      schedule();
      syncQuoteReveal();
    };

    update();
    syncQuoteReveal();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", handleMotionPreference);
    compactViewport.addEventListener("change", handleMotionPreference);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      compactViewport.removeEventListener("change", handleMotionPreference);
      quoteObserver?.disconnect();
      quote?.classList.remove("is-motion-ready", "is-visible");
      reset();
    };
  }, []);

  return null;
}
