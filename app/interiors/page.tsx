import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import { assetPath } from "@/lib/assetPath";

const canonicalUrl = "https://sokolova-art.com/interiors/";
const pageTitle = "Роспись интерьеров — Екатерина Соколова";
const pageDescription = "Авторская настенная роспись, графика и роспись интерьерных поверхностей на заказ от художницы Екатерины Соколовой.";

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
    images: [{
      url: "https://sokolova-art.com/interiors/relief-artist-seated.jpg",
      alt: "Екатерина Соколова создаёт настенную роспись",
    }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Авторская роспись интерьеров",
  description: pageDescription,
  url: canonicalUrl,
  provider: {
    "@type": "Person",
    name: "Екатерина Соколова",
    url: "https://sokolova-art.com/about/",
  },
  areaServed: "Россия",
  serviceType: ["Настенная роспись", "Роспись деревянных поверхностей", "Интерьерная графика"],
};

const contactHref = "mailto:katja.sokolova@gmail.com?subject=%D0%A0%D0%BE%D1%81%D0%BF%D0%B8%D1%81%D1%8C%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%8C%D0%B5%D1%80%D0%B0";

export default function InteriorsPage() {
  return (
    <main className="interiors-page" lang="ru">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader current="interiors" meta="Авторская роспись · На заказ" variant="interiors" />

      <section className="interiors-hero" aria-labelledby="interiors-title">
        <p className="interiors-eyebrow">Пространство как холст</p>
        <h1 className="display-title" id="interiors-title"><span>Роспись</span><i>интерьеров</i></h1>
        <div className="interiors-hero-image">
          <Image
            src={assetPath("/interiors/relief-process.jpg")}
            alt="Екатерина Соколова работает над авторской росписью стены"
            fill
            preload
            sizes="(max-width: 700px) 82vw, 39vw"
          />
          <span>Ручная работа · индивидуальный эскиз</span>
        </div>
        <p className="interiors-hero-copy">
          Авторская графика для стен, дверей и архитектурных поверхностей — от первого эскиза до последней линии.
        </p>
        <a className="interiors-hero-cta" href={contactHref}>Обсудить проект <span aria-hidden="true"><ArrowIcon /></span></a>
        <div className="interiors-hero-index" aria-hidden="true"><span>Москва</span><i /><span>01—03</span></div>
      </section>

      <section className="interiors-statement" aria-labelledby="interiors-statement-title">
        <p>Подход</p>
        <h2 id="interiors-statement-title">Не декор поверх стены.<br /><i>Продолжение пространства.</i></h2>
        <div>
          <p>Рисунок рождается из архитектуры, света и характера интерьера. Поэтому каждый проект начинается не с готового шаблона, а с разговора о месте.</p>
          <span>Частные и общественные пространства</span>
        </div>
      </section>

      <section className="interiors-project interiors-project-relief" aria-labelledby="relief-title">
        <header>
          <span>01 · Настенная роспись</span>
          <h2 id="relief-title">Линии<br /><i>рельефа</i></h2>
          <p>Свободная белая линия и золотые акценты раскрывают сложную геометрию стены, сохраняя спокойный характер интерьера.</p>
        </header>
        <figure className="interiors-image interiors-image-main">
          <Image src={assetPath("/interiors/relief-artist-seated.jpg")} alt="Художница Екатерина Соколова рядом с настенной росписью" fill sizes="(max-width: 700px) 100vw, 56vw" />
          <figcaption>Общий вид · работа в пространстве</figcaption>
        </figure>
        <figure className="interiors-image interiors-image-detail">
          <Image src={assetPath("/interiors/relief-detail.jpg")} alt="Деталь серо-золотой настенной росписи" fill sizes="(max-width: 700px) 66vw, 24vw" />
          <figcaption>Фрагмент · линия и золото</figcaption>
        </figure>
        <figure className="interiors-image interiors-image-process">
          <Image src={assetPath("/interiors/relief-finished.jpg")} alt="Екатерина Соколова рядом с завершённой настенной росписью" fill sizes="(max-width: 700px) 78vw, 31vw" />
          <figcaption>Завершённая работа</figcaption>
        </figure>
      </section>

      <section className="interiors-project interiors-project-botanical" aria-labelledby="botanical-title">
        <header>
          <span>02 · Интерьерная графика</span>
          <h2 id="botanical-title">Живая<br /><i>линия</i></h2>
          <p>Ботанический ритм собирается непосредственно на стене: масштаб рисунка подчинён поверхности, а не формату картины.</p>
        </header>
        <figure className="interiors-image interiors-botanical-detail">
          <Image src={assetPath("/interiors/botanical-detail.jpg")} alt="Екатерина Соколова на фоне ботанической настенной росписи" fill sizes="(max-width: 700px) 100vw, 48vw" />
          <figcaption>Графика · фрагмент</figcaption>
        </figure>
        <figure className="interiors-image interiors-botanical-process">
          <Image src={assetPath("/interiors/botanical-process.jpg")} alt="Екатерина Соколова расписывает стену вручную" fill sizes="(max-width: 700px) 78vw, 34vw" />
          <figcaption>Работа на объекте</figcaption>
        </figure>
      </section>

      <section className="interiors-project interiors-project-doors" aria-labelledby="doors-title">
        <header>
          <span>03 · Деревянная поверхность</span>
          <h2 id="doors-title">Двери как<br /><i>арт-объект</i></h2>
          <p>Рисунок следует конструкции филёнок и превращает функциональный предмет в уникальную часть интерьера.</p>
        </header>
        <figure className="interiors-image interiors-doors-context">
          <Image src={assetPath("/interiors/doors-context.jpg")} alt="Расписанные межкомнатные двери в интерьере" fill sizes="(max-width: 700px) 100vw, 48vw" />
          <figcaption>Роспись по дереву · выполнено на заказ</figcaption>
        </figure>
        <figure className="interiors-image interiors-doors-front">
          <Image src={assetPath("/interiors/doors-front.jpg")} alt="Фронтальный вид авторской росписи межкомнатных дверей" fill sizes="(max-width: 700px) 70vw, 29vw" />
          <figcaption>Деталь композиции</figcaption>
        </figure>
      </section>

      <section className="interiors-services" aria-labelledby="services-title">
        <div className="interiors-section-label"><span>04</span><p>Что можно расписать</p></div>
        <h2 id="services-title">От стены<br /><i>до детали</i></h2>
        <div className="interiors-services-grid">
          <article><span>01</span><h3>Стены</h3><p>Авторская композиция, разработанная под масштаб, освещение и назначение помещения.</p></article>
          <article><span>02</span><h3>Поверхности</h3><p>Двери, деревянные панели и архитектурные элементы, которые становятся частью общего образа.</p></article>
          <article><span>03</span><h3>Графика</h3><p>Линейный рисунок и цветовые акценты для частных и общественных пространств.</p></article>
        </div>
      </section>

      <section className="interiors-process" aria-labelledby="process-title">
        <div className="interiors-section-label"><span>05</span><p>Как строится работа</p></div>
        <h2 id="process-title">Четыре<br /><i>этапа</i></h2>
        <ol>
          <li><span>01</span><div><h3>Знакомство с пространством</h3><p>Фотографии, размеры, задача и желаемое настроение будущей работы.</p></div></li>
          <li><span>02</span><div><h3>Авторский эскиз</h3><p>Композиция создаётся специально для выбранной стены или поверхности.</p></div></li>
          <li><span>03</span><div><h3>Согласование</h3><p>Уточняются масштаб, цвет, материалы и последовательность работы на объекте.</p></div></li>
          <li><span>04</span><div><h3>Роспись</h3><p>Рисунок переносится вручную и становится частью архитектуры интерьера.</p></div></li>
        </ol>
      </section>

      <section className="interiors-contact" aria-labelledby="contact-title">
        <p>Есть пространство для идеи?</p>
        <h2 id="contact-title">Давайте создадим<br /><i>работу для него.</i></h2>
        <a href={contactHref}>Обсудить роспись <span aria-hidden="true"><ArrowIcon /></span></a>
      </section>

      <footer className="interiors-footer">
        <Link href="/"><ArrowIcon direction="left" /> В галерею</Link>
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
    </main>
  );
}
