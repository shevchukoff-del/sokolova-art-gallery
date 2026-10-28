"use client";

import { useEffect, useRef } from "react";
import type { ArtwearItem } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import ArrowIcon from "./ArrowIcon";

type Props = {
  item: ArtwearItem;
  onOpen: (item: ArtwearItem) => void;
};

export default function ArtwearCard({ item, onOpen }: Props) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(item.video?.mp4 || item.video?.webm);

  useEffect(() => {
    if (!hasVideo || !video.current || !root.current) return;

    const media = video.current;
    const compact = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    if (compact.matches) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.62) media.play().catch(() => undefined);
          else media.pause();
        },
        { threshold: [0, 0.62, 1] },
      );
      observer.observe(root.current);
      return () => observer.disconnect();
    }

    const node = root.current;
    const play = () => media.play().catch(() => undefined);
    const pause = () => media.pause();
    node.addEventListener("mouseenter", play);
    node.addEventListener("mouseleave", pause);
    return () => {
      node.removeEventListener("mouseenter", play);
      node.removeEventListener("mouseleave", pause);
    };
  }, [hasVideo]);

  return (
    <article ref={root} className="artwear-card" id={item.id}>
      <button className="artwear-card-open" onClick={() => onOpen(item)} aria-label={`Открыть ${item.title}`}>
        <span className="artwear-media">
          {hasVideo ? (
            <video ref={video} muted loop playsInline preload="none" poster={assetPath(item.modelImage)}>
              {item.video?.webm && <source src={assetPath(item.video.webm)} type="video/webm" />}
              {item.video?.mp4 && <source src={assetPath(item.video.mp4)} type="video/mp4" />}
            </video>
          ) : (
            <img src={assetPath(item.modelImage)} alt="" loading="lazy" decoding="async" />
          )}
        </span>
        <span className="artwear-caption">
          <span>
            <b>{item.title}</b>
            <small>Доступно к заказу</small>
            <span className="artwear-card-action">Заказать изделие <ArrowIcon /></span>
          </span>
        </span>
      </button>
    </article>
  );
}
