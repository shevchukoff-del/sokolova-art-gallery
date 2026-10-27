import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import { aboutMilestones, biographySources } from "@/data/about";
import { assetPath } from "@/lib/assetPath";

const canonicalUrl = "https://sokolova-art.com/about/";
const pageTitle = "Екатерина Соколова — художница, биография и творческий путь";
const pageDescription = "Биография московской художницы Екатерины Соколовой: образование, художественная практика, избранные выставки, ярмарки и этапы творческого пути.";

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
    images: [{ url: "https://sokolova-art.com/press/artist-portrait-restored.jpg", alt: "Художница Екатерина Соколова" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Екатерина Сергеевна Соколова",
  alternateName: "Катя Соколова",
  jobTitle: "Художница",
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
    title: "Москва как состояние",
    text: "Архитектура в картинах Соколовой не служит декорацией. Она становится живым ритмом: светящиеся окна, вертикали высоток, мокрый асфальт и движение большого города.",
    image: "/artworks/krasnaya-moskva.webp",
    alt: "Картина Екатерины Соколовой «Красная Москва»",
    caption: "Красная Москва · холст, масло",
  },
  {
    index: "02",
    label: "Живая форма",
    title: "Природа крупным планом",
    text: "Цветы, листья и морские формы художница приближает почти до портрета. Узнаваемый мотив перестаёт быть натюрмортом и превращается в самостоятельный характер.",
    image: "/artworks/paporotnik.webp",
    alt: "Картина Екатерины Соколовой «Папоротник»",
    caption: "Папоротник · холст, масло",
  },
  {
    index: "03",
    label: "Граница",
    title: "Реальное и внутреннее",
    text: "Фигуративность остаётся точкой опоры, но цвет, масштаб и композиция сдвигают увиденное в сторону памяти, ощущения и лёгкой мистики.",
    image: "/artworks/flamingo.webp",
    alt: "Картина Екатерины Соколовой «Фламинго»",
    caption: "Фламинго · холст, масло",
  },
] as const;

const selectedMilestones = aboutMilestones.slice(1, 6);

export default function AboutPage() {
  return (
    <main className="about-page" lang="ru">
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
            alt="Портрет художницы Екатерины Соколовой"
            fill
            priority
            sizes="(max-width: 700px) 66vw, 30vw"
          />
        </div>
        <p className="about-hero-intro">
          Московская художница, работающая с живописью и графикой. В центре её практики — город,
          живая природа и тот момент, когда наблюдаемая реальность становится внутренним образом.
        </p>
        <div className="about-hero-index" aria-hidden="true"><span>1975</span><i /><span>Сегодня</span></div>
      </section>

      <section className="about-statement about-reveal" aria-labelledby="statement-title">
        <p>От автора</p>
        <blockquote id="statement-title">«Работа для меня — это один из способов общения с миром, размышление о жизни».</blockquote>
        <a href="https://sokolova-art.com/" target="_blank" rel="noopener noreferrer">Официальный сайт <span aria-hidden="true"><ArrowIcon /></span></a>
      </section>

      <section className="about-biography about-reveal" aria-labelledby="biography-title">
        <div className="about-section-label"><span>01</span><p>О художнице</p></div>
        <h2 id="biography-title">Между точностью наблюдения <i>и свободой образа</i></h2>
        <div className="about-biography-copy">
          <p>
            Екатерина Соколова родилась в Москве в семье художников. Получила классическое художественное
            образование в училище памяти 1905 года, а затем окончила факультет графики Строгановской академии.
          </p>
          <p>
            Её живопись начинается с внимательного взгляда на окружающее: городскую архитектуру, цветы,
            растения, воду и человеческую фигуру. Реальные мотивы сохраняют узнаваемость, но через цвет и
            композицию приобретают ощущение сна, памяти или едва уловимой мистики.
          </p>
          <p>
            Художница живёт и работает в Москве. Её работы участвовали в российских и международных
            выставочных и аукционных проектах и находятся в частных коллекциях в России и США.
          </p>
        </div>
      </section>

      <section className="about-practice" aria-labelledby="practice-title">
        <div className="about-section-label"><span>02</span><p>Художественный язык</p></div>
        <h2 id="practice-title">Три линии<br /><i>одной живописи</i></h2>
        <div className="about-chapters">
          {chapters.map((chapter) => (
            <article className="about-chapter about-reveal" key={chapter.index}>
              <div className="about-chapter-image">
                <Image src={assetPath(chapter.image)} alt={chapter.alt} fill sizes="(max-width: 700px) 92vw, 52vw" />
                <span>{chapter.caption}</span>
              </div>
              <div className="about-chapter-copy">
                <div><span>{chapter.index}</span><p>{chapter.label}</p></div>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-journey" aria-labelledby="journey-title">
        <header>
          <div className="about-section-label"><span>03</span><p>Линия пути</p></div>
          <h2 id="journey-title">Этапы, которые<br /><i>собирают историю</i></h2>
          <p>Избранные подтверждённые события. Полная событийная хронология — в разделе выставок и публикаций.</p>
        </header>
        <ol>
          {selectedMilestones.map((milestone, index) => (
            <li className="about-milestone about-reveal" key={`${milestone.year}-${milestone.title}`}>
              <span className="about-milestone-number">{String(index + 1).padStart(2, "0")}</span>
              <time>{milestone.year}</time>
              <div>
                <p>{milestone.eyebrow}</p>
                <h3>{milestone.title}</h3>
                <span>{milestone.text}</span>
                {milestone.sourceUrl.startsWith("/") ? (
                  <Link href={milestone.sourceUrl}>Источник · {milestone.sourceName} <i aria-hidden="true"><ArrowIcon /></i></Link>
                ) : (
                  <a href={milestone.sourceUrl} target="_blank" rel="noopener noreferrer">Источник · {milestone.sourceName} <i aria-hidden="true"><ArrowIcon /></i></a>
                )}
              </div>
            </li>
          ))}
        </ol>
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
    </main>
  );
}
