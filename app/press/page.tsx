import type { Metadata } from "next";
import Link from "next/link";
import PressArchive from "@/components/PressArchive";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import { pressProfiles, publishedTimelineItems } from "@/data/press";

const canonicalUrl = "https://sokolova-art.com/press/";
const pageTitle = "Екатерина Соколова – выставки, публикации и аукционы";
const pageDescription = "Выставки художницы Екатерины Соколовой, публикации в СМИ, международные аукционы и архив событий творческой биографии.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonicalUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: "Sokolova Art",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: canonicalUrl,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: publishedTimelineItems.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: publishedTimelineItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.sourceUrl,
    })),
  },
};

export default function PressPage() {
  return (
    <main className="press-page" lang="ru">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader current="press" meta="Архив · 2005–2025" variant="press" />

      <section className="press-hero">
        <p className="press-kicker">Архив 2005–2025</p>
        <h1 className="display-title"><span>Выставки</span><i>и публикации</i></h1>
        <p className="press-intro">
          Публикации в СМИ, выставки и аукционная история Екатерины Соколовой. События и материалы,
          отражающие творческий путь художницы в России и за её пределами.
        </p>
      </section>

      <section className="press-archive" aria-label="Хронология выставок и публикаций">
        <PressArchive items={publishedTimelineItems} />
      </section>

      <section className="press-profiles" aria-labelledby="profiles-title">
        <p>Дополнительные источники</p>
        <h2 id="profiles-title">Каталоги и профили</h2>
        <div>
          {pressProfiles.map((profile, index) => (
            <a key={profile.url} href={profile.url} target="_blank" rel="noopener noreferrer">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{profile.name}</b>
              <i aria-hidden="true"><ArrowIcon /></i>
            </a>
          ))}
        </div>
      </section>

      <section className="press-cta">
        <p>Живопись Екатерины Соколовой</p>
        <Link href="/">Смотреть работы <span aria-hidden="true"><ArrowIcon /></span></Link>
      </section>

      <footer className="press-footer">
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
    </main>
  );
}
