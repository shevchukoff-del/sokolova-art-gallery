"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const GalleryExperience = dynamic(() => import("@/components/GalleryExperience"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [ready, setReady] = useState(false);
  const startedAt = useRef(Date.now());
  const readyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleReady = useCallback(() => {
    const isCompact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const remaining = isCompact ? Math.max(0, 900 - (Date.now() - startedAt.current)) : 0;
    readyTimer.current = setTimeout(() => setReady(true), remaining);
  }, []);

  useEffect(() => () => {
    if (readyTimer.current) clearTimeout(readyTimer.current);
  }, []);

  return (
    <>
      <main className={`loading-screen ${ready ? "is-ready" : ""}`} aria-live="polite" aria-hidden={ready}>
        <span>Sokolova Art</span>
        <div className="loading-rule" aria-hidden="true" />
        <small>Готовим экспозицию</small>
      </main>
      <GalleryExperience onReady={handleReady} />
    </>
  );
}
