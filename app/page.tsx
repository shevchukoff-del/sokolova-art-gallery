"use client";

import dynamic from "next/dynamic";

const GalleryExperience = dynamic(() => import("@/components/GalleryExperience"), {
  ssr: false,
  loading: () => (
    <main className="loading-screen" aria-live="polite">
      <span>Sokolova Art</span>
      <div className="loading-rule" />
      <small>Preparing the gallery</small>
    </main>
  ),
});

export default function Home() {
  return <GalleryExperience />;
}
