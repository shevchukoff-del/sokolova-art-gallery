"use client";

import { useEffect, useMemo, useState } from "react";
import type { ArtwearCatalogItem, ArtwearCategory } from "@/lib/types";
import { assetPath } from "@/lib/assetPath";
import CloseIcon from "./CloseIcon";
import ArtwearOrderControls from "./ArtwearOrderControls";
import ArrowIcon from "./ArrowIcon";

type CatalogFilter = "all" | ArtwearCategory;

const filters: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "tshirts", label: "Футболки" },
  { id: "scarves", label: "Платки" },
  { id: "bags", label: "Сумки" },
  { id: "wearable-art", label: "Роспись одежды" },
];

export default function ArtwearCatalog({ items }: { items: ArtwearCatalogItem[] }) {
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [selected, setSelected] = useState<ArtwearCatalogItem | null>(null);
  const visibleItems = useMemo(
    () => filter === "all" ? items : items.filter((item) => item.category === filter),
    [filter, items],
  );

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  return (
    <section className="artwear-catalog" aria-label="Каталог изделий">
      <div className="artwear-catalog-filter" aria-label="Фильтр изделий">
        {filters.map((item) => (
            <button
              className={filter === item.id ? "is-active" : ""}
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              <span>{item.label}</span>
            </button>
        ))}
      </div>

      <div className="artwear-catalog-grid">
        {visibleItems.map((item, index) => (
          <article className={`artwear-product-card${item.featured ? " artwear-product-card--featured" : ""}`} data-artwear-id={item.id} key={item.id}>
            <button type="button" onClick={() => setSelected(item)} aria-label={`Открыть изделие «${item.title}»`}>
              <span className="artwear-product-image">
                <img src={assetPath(item.image)} alt="" loading={index < 4 ? "eager" : "lazy"} decoding="async" />
              </span>
              <span className="artwear-product-copy">
                <strong>{item.title}</strong>
                <span>{item.categoryLabel}</span>
                <small className={`is-${item.status}`}>{item.statusLabel}</small>
              </span>
            </button>
          </article>
        ))}
      </div>

      {selected && (
        <div className="artwear-modal" role="dialog" aria-modal="true" aria-labelledby="artwear-catalog-modal-title" onMouseDown={() => setSelected(null)}>
          <div className="artwear-modal-panel" data-artwear-id={selected.id} onMouseDown={(event) => event.stopPropagation()}>
            <button className="artwear-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Закрыть"><CloseIcon /></button>
            <div className="artwear-modal-look"><img src={assetPath(selected.image)} alt={selected.title} /></div>
            <div className="artwear-modal-copy">
              <p>
                {selected.categoryLabel} <span aria-hidden="true">·</span>{" "}
                <strong className={`is-${selected.status}`}>{selected.statusLabel}</strong>
              </p>
              <h2 id="artwear-catalog-modal-title">{selected.title}</h2>
              <p className="artwear-modal-description">{selected.description}</p>
              {selected.artworkImage && selected.sourceUrl && (
                <a className="artwear-original artwear-original-link" href={selected.sourceUrl} target="_blank" rel="noreferrer">
                  <img src={assetPath(selected.artworkImage)} alt={`Оригинальная работа «${selected.title}»`} />
                  <span><small>По мотивам работы</small><b>{selected.title} <ArrowIcon /></b></span>
                </a>
              )}
              <ArtwearOrderControls actionLabel={selected.actionLabel} actionUrl={selected.actionUrl} sizes={selected.sizes} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
