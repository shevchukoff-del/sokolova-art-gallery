"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PressItem, PressTimelineType } from "@/data/press";
import { assetPath } from "@/lib/assetPath";
import ArrowIcon from "./ArrowIcon";

type FilterValue = "all" | PressTimelineType;

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "press", label: "СМИ" },
  { value: "exhibition", label: "Выставки" },
  { value: "auction", label: "Аукционы" },
];

const typeLabels: Record<PressTimelineType, string> = {
  press: "СМИ",
  exhibition: "Выставка",
  auction: "Аукцион",
};

const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function formatDate(item: PressItem) {
  if (item.datePrecision === "year") return item.date;
  const [year, month, day] = item.date.split("-").map(Number);
  return `${day} ${monthNames[month - 1]} ${year}`;
}

export default function PressArchive({ items }: { items: PressItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const groupedItems = useMemo(() => {
    const visible = activeFilter === "all" ? items : items.filter((item) => item.type === activeFilter);
    return visible.reduce<{ year: string; items: PressItem[] }[]>((groups, item) => {
      const year = item.date.slice(0, 4);
      const current = groups.at(-1);
      if (current?.year === year) current.items.push(item);
      else groups.push({ year, items: [item] });
      return groups;
    }, []);
  }, [activeFilter, items]);

  return (
    <>
      <div className="press-filter" role="group" aria-label="Фильтр хронологии">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={activeFilter === filter.value ? "is-active" : ""}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="press-timeline" aria-live="polite">
        {groupedItems.map((group) => (
          <section className="press-year" key={group.year} aria-labelledby={`year-${group.year}`}>
            <h2 id={`year-${group.year}`}>{group.year}</h2>
            <div className="press-year-items">
              {group.items.map((item) => (
                <article className={`press-entry ${item.image ? "press-entry--media" : "press-entry--text"}`} key={item.id}>
                  {item.image && (
                    <div
                      className={`press-entry-media press-entry-media--${item.imageLayout ?? "landscape"}`}
                      style={item.imageAspectRatio ? { aspectRatio: item.imageAspectRatio } : undefined}
                    >
                      <Image
                        src={assetPath(item.image)}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 24vw"
                        className={item.imageFit === "contain" ? "is-contained" : undefined}
                      />
                    </div>
                  )}
                  <div className="press-entry-copy">
                    <div className="press-entry-meta">
                      <time dateTime={item.date}>{formatDate(item)}</time>
                      <span>{typeLabels[item.type as PressTimelineType]}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="press-entry-source">
                      <span>{item.sourceName}</span>
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Перейти к источнику <ArrowIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
