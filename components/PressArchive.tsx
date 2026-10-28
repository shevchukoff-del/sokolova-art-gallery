import Image from "next/image";
import type { PressItem, PressTimelineType } from "@/data/press";
import { assetPath } from "@/lib/assetPath";
import ArrowIcon from "./ArrowIcon";

const typeLabels: Record<PressTimelineType, string> = {
  press: "Публикация",
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
  if (item.timelineLabel) return item.timelineLabel;
  if (item.datePrecision === "year") return item.date;
  const [year, month, day] = item.date.split("-").map(Number);
  return `${day} ${monthNames[month - 1]} ${year}`;
}

export default function PressArchive({ items }: { items: PressItem[] }) {
  const groupedItems = items.reduce<{ year: string; items: PressItem[] }[]>((groups, item) => {
    const year = item.timelineLabel ?? item.date.slice(0, 4);
    const current = groups.at(-1);
    if (current?.year === year) current.items.push(item);
    else groups.push({ year, items: [item] });
    return groups;
  }, []);

  return (
      <div className="press-timeline">
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
                        className="is-contained"
                      />
                    </div>
                  )}
                  <div className="press-entry-copy">
                    <div className={`press-entry-meta ${item.timelineLabel ? "press-entry-meta--period" : ""}`}>
                      {!item.timelineLabel && <time dateTime={item.date}>{formatDate(item)}</time>}
                      <span>{typeLabels[item.type as PressTimelineType]}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <a
                      className="press-entry-source"
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{item.sourceName}</span>
                      <ArrowIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
  );
}
