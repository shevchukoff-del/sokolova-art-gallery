"use client";

import { useEffect, useState } from "react";
import ArtwearCard from "./ArtwearCard";
import type { ArtwearItem } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import ArrowIcon from "./ArrowIcon";

export default function ArtwearShowcase({ items }: { items: ArtwearItem[] }) {
  const [selected, setSelected] = useState<ArtwearItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  return (
    <>
      <div className="artwear-grid">
        {items.map((item) => <ArtwearCard key={item.id} item={item} onOpen={setSelected} />)}
      </div>

      {selected && (
        <div className="artwear-modal" role="dialog" aria-modal="true" aria-labelledby="artwear-modal-title" onMouseDown={() => setSelected(null)}>
          <div className="artwear-modal-panel" onMouseDown={(event) => event.stopPropagation()}>
            <button className="artwear-modal-close" onClick={() => setSelected(null)} aria-label="Закрыть">×</button>
            <div className="artwear-modal-look">
              <img src={assetPath(selected.modelImage)} alt={`Футболка «${selected.title}»`} />
            </div>
            <div className="artwear-modal-copy">
              <p>{selected.number} · SOKOLOVA ARTWEAR</p>
              <h2 id="artwear-modal-title">{selected.title}</h2>
              <p className="artwear-modal-description">Авторская живопись Екатерины Соколовой перенесена на плотный хлопок в крупном выставочном формате.</p>
              <div className="artwear-original">
                <img src={assetPath(selected.artworkImage)} alt={`Оригинальная работа «${selected.title}»`} />
                <span><small>Оригинальная работа</small><b>{selected.title}</b></span>
              </div>
              <a className="inquiry-link" href={selected.sourceUrl} target="_blank" rel="noreferrer">
                <span>Смотреть работу</span><i aria-hidden="true"><ArrowIcon /></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
