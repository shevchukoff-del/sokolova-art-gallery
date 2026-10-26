"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const GalleryExperience = dynamic(() => import("@/components/GalleryExperience"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

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
