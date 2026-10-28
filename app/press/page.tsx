import type { Metadata } from "next";
import Link from "next/link";
import PressArchive from "@/components/PressArchive";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import MobileFooter from "@/components/MobileFooter";
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
    <main className="press-page" id="top" lang="ru">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader current="press" variant="press" />

      <section className="press-hero">
        <h1 className="display-title"><span>Выставки</span><i>и публикации</i></h1>
      </section>

      <section className="press-archive" aria-label="Выставки и публикации по годам">
        <PressArchive items={publishedTimelineItems} />
      </section>

      <section className="press-profiles" aria-labelledby="profiles-title">
        <h2 id="profiles-title">Каталоги и профили</h2>
        <div>
          {pressProfiles.map((profile) => (
            <a key={profile.url} href={profile.url} target="_blank" rel="noopener noreferrer">
              <b>{profile.name}</b>
              <i aria-hidden="true"><ArrowIcon /></i>
            </a>
          ))}
        </div>
      </section>

      <section className="press-cta" aria-labelledby="press-cta-title">
        <p>Живопись</p>
        <h2 id="press-cta-title">Работы<br /><i>Екатерины Соколовой</i></h2>
        <Link className="site-primary-cta" href="/works/">Смотреть работы <span aria-hidden="true"><ArrowIcon /></span></Link>
      </section>

      <footer className="press-footer">
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
      <MobileFooter className="press-mobile-footer" />
    </main>
  );
}
