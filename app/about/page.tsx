import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import MobileFooter from "@/components/MobileFooter";
import AboutTimelineMotion from "@/components/AboutTimelineMotion";
import { aboutMilestones, biographySources } from "@/data/about";
import { assetPath } from "@/lib/assetPath";

const canonicalUrl = "https://sokolova-art.com/about/";
const pageTitle = "Екатерина Соколова — современный российский художник";
const pageDescription = "Биография современного российского художника Екатерины Соколовой: образование, художественная практика, избранные выставки, ярмарки и этапы творческого пути.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "profile",
    locale: "ru_RU",
    url: canonicalUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: "Sokolova Art",
    images: [{ url: "https://sokolova-art.com/press/artist-portrait-restored.jpg", alt: "Екатерина Соколова — современный российский художник" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Екатерина Сергеевна Соколова",
  alternateName: "Катя Соколова",
  jobTitle: "Современный российский художник",
  birthPlace: { "@type": "Place", name: "Москва" },
  homeLocation: { "@type": "Place", name: "Москва" },
  url: canonicalUrl,
  image: "https://sokolova-art.com/press/artist-portrait-restored.jpg",
  sameAs: biographySources.map((source) => source.url),
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Московское государственное академическое художественное училище памяти 1905 года" },
    { "@type": "EducationalOrganization", name: "МГХПА имени С. Г. Строганова" },
  ],
  knowsAbout: ["Живопись", "Графика", "Городской пейзаж", "Натюрморт"],
};

const chapters = [
  {
    index: "01",
    label: "Город",
    title: "Москва",
    text: "Москва в картинах Соколовой — не фон, а самостоятельный герой: светящиеся окна, вертикали высоток, мокрый асфальт и движение большого города.",
    work: { image: "/artworks/krasnaya-moskva.webp", alt: "Картина Екатерины Соколовой «Красная Москва»", caption: "Красная Москва · холст, масло" },
  },
  {
    index: "02",
    label: "Живая форма",
    title: "Природа",
    text: "Цветы, листья и морские формы художник рассматривает крупным планом. Знакомый мотив перестаёт быть просто натюрмортом и приобретает собственный характер.",
    work: { image: "/artworks/paporotnik.webp", alt: "Картина Екатерины Соколовой «Папоротник»", caption: "Папоротник · холст, масло" },
  },
  {
    index: "03",
    label: "Граница",
    title: "Реальное и воображаемое",
    text: "Фигуративность остаётся основой, но цвет, масштаб и композиция переводят увиденное в пространство памяти, ощущения и воображения.",
    work: { image: "/artworks/flamingo.webp", alt: "Картина Екатерины Соколовой «Фламинго»", caption: "Фламинго · холст, масло" },
  },
] as const;

const selectedMilestones = aboutMilestones.slice(1);

export default function AboutPage() {
  return (
    <main className="about-page" id="top" lang="ru">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader current="about" meta="Москва · Живопись" variant="about" />

      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-identity">
          <p className="about-hero-kicker">Современный российский художник</p>
          <h1 className="display-title" id="about-title"><span>Екатерина</span><i>Соколова</i></h1>
        </div>
        <div className="about-hero-portrait">
          <Image
            src={assetPath("/press/artist-portrait-restored.jpg")}
            alt="Портрет Екатерины Соколовой"
            fill
            priority
            sizes="(max-width: 700px) 66vw, 30vw"
          />
        </div>
        <p className="about-hero-intro">
          Современный московский художник. Живопись, графика, текстиль и&nbsp;роспись интерьеров.
        </p>
        <div className="about-hero-actions">
          <Link href="/works/"><span>Смотреть работы</span><ArrowIcon /></Link>
          <a href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
        </div>
        <div className="about-hero-index" aria-hidden="true"><span>1975</span><i /><span>Сегодня</span></div>
      </section>

      <section className="about-statement about-reveal" aria-labelledby="statement-title" data-quote-reveal>
        <p className="about-statement-copy" id="statement-title">
          <span>Всё начинается с наблюдения.</span>{" "}
          <i>Реальность становится образом.</i>
        </p>
        <Link href="/works/">Смотреть работы <span aria-hidden="true"><ArrowIcon /></span></Link>
      </section>

      <section className="about-biography about-reveal" aria-labelledby="biography-title">
        <div className="about-section-label"><span>01</span><p>О художнике</p></div>
        <h2 id="biography-title">
          <span className="about-biography-title-desktop">О Екатерине <i>Соколовой</i></span>
          <span className="about-biography-title-mobile">О <i>художнике</i></span>
        </h2>
        <div className="about-biography-copy">
          <p>
            Екатерина Соколова родилась в Москве в семье художников. Получила классическое художественное
            образование в училище памяти 1905 года, а затем окончила факультет графики Строгановской академии.
          </p>
          <p>
            В основе её живописи — внимательное наблюдение за городской архитектурой, природой и человеком.
            Реальные мотивы сохраняют узнаваемость, но цвет и композиция переводят их в пространство памяти
            и воображения.
          </p>
          <p>
            Помимо станковой живописи и графики, Екатерина работает с текстилем и предметами, переносит
            авторские мотивы на платки, одежду и аксессуары, создаёт росписи для интерьеров. Её работы
            показывались на российских и международных выставочных и аукционных проектах и находятся
            в частных коллекциях в России и США.
          </p>
        </div>
      </section>

      <section className="about-practice" aria-labelledby="practice-title">
        <div className="about-section-label"><span>02</span><p>Художественный язык</p></div>
        <h2 id="practice-title">Темы <i>и образы</i></h2>
        <div className="about-chapters">
          {chapters.map((chapter) => (
            <article className="about-chapter about-reveal" key={chapter.index}>
              <div className="about-chapter-gallery">
                <figure className="about-chapter-image">
                  <Image src={assetPath(chapter.work.image)} alt={chapter.work.alt} fill sizes="(max-width: 700px) 90vw, 52vw" />
                  <figcaption>{chapter.work.caption}</figcaption>
                </figure>
              </div>
              <div className="about-chapter-copy">
                <div><span>{chapter.index}</span><p>{chapter.label}</p></div>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </div>
            </article>
          ))}
        </div>
        <Link className="about-practice-cta" href="/works/">Смотреть все работы <ArrowIcon /></Link>
      </section>

      <section className="about-journey" aria-labelledby="journey-title" data-about-timeline>
        <AboutTimelineMotion />
        <header>
          <div className="about-section-label"><span>03</span><p>Линия пути</p></div>
          <h2 id="journey-title">Творческий <i>путь</i></h2>
          <p>Образование, выставки и основные события. Полная хронология — в разделе выставок и публикаций.</p>
        </header>
        <ol>
          {selectedMilestones.map((milestone, index) => (
            <li className="about-milestone about-reveal" key={`${milestone.year}-${milestone.title}`}>
              <span className="about-milestone-number">{String(index + 1).padStart(2, "0")}</span>
              <time>{milestone.year}</time>
              <span className="about-milestone-track" aria-hidden="true"><i /></span>
              <div>
                <p>{milestone.eyebrow}</p>
                <h3>{milestone.title}</h3>
                <span>{milestone.text}</span>
                {milestone.sourceUrl.startsWith("/") ? (
                  <Link href={milestone.sourceUrl}>{milestone.sourceName} <i aria-hidden="true"><ArrowIcon /></i></Link>
                ) : (
                  <a href={milestone.sourceUrl} target="_blank" rel="noopener noreferrer">{milestone.sourceName} <i aria-hidden="true"><ArrowIcon /></i></a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <Link className="about-journey-archive" href="/press/">Полная хронология и публикации <ArrowIcon /></Link>
      </section>

      <section className="about-sources" aria-labelledby="sources-title">
        <p id="sources-title">Источники биографии</p>
        <div>
          {biographySources.map((source, index) => (
            <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>
              <span>{String(index + 1).padStart(2, "0")}</span><b>{source.name}</b><i aria-hidden="true"><ArrowIcon /></i>
            </a>
          ))}
        </div>
      </section>

      <section className="about-next">
        <p>Продолжить знакомство</p>
        <Link href="/">Смотреть живопись <span aria-hidden="true"><ArrowIcon /></span></Link>
        <Link href="/press/">Выставки и публикации <span aria-hidden="true"><ArrowIcon /></span></Link>
      </section>

      <footer className="about-footer">
        <p>Екатерина Соколова</p>
        <span>Москва · 2026</span>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>

      <div className="about-mobile-end">
        <section className="mobile-home-contact about-mobile-contact" aria-labelledby="about-contact-title">
          <p>Sokolova Art · Москва</p>
          <h2 id="about-contact-title">Искусство может стать частью <i>вашей коллекции, вещи или пространства.</i></h2>
          <span>Приобрести картину, заказать изделие или обсудить интерьерный проект.</span>
          <a href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
        </section>
        <MobileFooter className="about-mobile-footer" />
      </div>
    </main>
  );
}
