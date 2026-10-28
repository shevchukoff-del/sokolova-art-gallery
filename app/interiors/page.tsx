import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import MobileFooter from "@/components/MobileFooter";
import { assetPath } from "@/lib/assetPath";

const canonicalUrl = "https://sokolova-art.com/interiors/";
const pageTitle = "Роспись стен и интерьеров — Екатерина Соколова";
const pageDescription = "Авторская роспись стен и интерьеров на заказ — от идеи и индивидуального эскиза до работы на объекте.";

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
  name: "Авторская роспись стен и интерьеров",
  description: pageDescription,
  url: canonicalUrl,
  provider: {
    "@type": "Person",
    name: "Екатерина Соколова",
    url: "https://sokolova-art.com/about/",
  },
  areaServed: "Россия",
  serviceType: ["Роспись стен", "Роспись интерьеров", "Роспись деревянных поверхностей", "Интерьерная графика"],
};

const contactHref = "mailto:katja.sokolova@gmail.com?subject=%D0%A0%D0%BE%D1%81%D0%BF%D0%B8%D1%81%D1%8C%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%8C%D0%B5%D1%80%D0%B0";

export default function InteriorsPage() {
  return (
    <main className="interiors-page" id="top" lang="ru">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader current="interiors" meta="Роспись стен · На заказ" variant="interiors" />

      <section className="interiors-hero" aria-labelledby="interiors-title">
        <h1 className="display-title" id="interiors-title"><span>Роспись стен</span><i>и интерьеров</i></h1>
        <div className="interiors-hero-image">
          <Image
            src={assetPath("/interiors/relief-process.jpg")}
            alt="Екатерина Соколова работает над авторской росписью стены"
            fill
            preload
            sizes="(max-width: 700px) 82vw, 39vw"
          />
        </div>
        <p className="interiors-hero-copy">
          Авторская роспись для частных и общественных пространств — от идеи и эскиза до работы на объекте.
        </p>
        <a className="site-primary-cta interiors-hero-cta" href={contactHref}>Обсудить роспись <span aria-hidden="true"><ArrowIcon /></span></a>
      </section>

      <section className="interiors-statement" aria-labelledby="interiors-statement-title">
        <h2 id="interiors-statement-title">Не декор поверх стены.<br /><i>Продолжение пространства.</i></h2>
        <div>
          <p>Рисунок создаётся под архитектуру, свет и характер конкретного интерьера. Без готовых шаблонов и повторений.</p>
        </div>
      </section>

      <section className="interiors-projects" aria-labelledby="projects-title">
        <p className="interiors-section-label">Избранные работы</p>
        <h2 id="projects-title">Работы <i>в пространстве</i></h2>
        <div className="interiors-projects-grid">
          <article className="interiors-project-card interiors-project-card-featured">
            <figure className="interiors-image">
              <Image src={assetPath("/interiors/relief-artist-seated.jpg")} alt="Екатерина Соколова рядом с настенной росписью" fill sizes="(max-width: 700px) 100vw, 58vw" />
            </figure>
            <div><span>Настенная роспись</span><h3><span>Линии</span> <i>рельефа</i></h3><p>Рисунок раскрывает геометрию стены и становится частью спокойного, собранного интерьера.</p></div>
          </article>
          <article className="interiors-project-card">
            <figure className="interiors-image">
              <Image src={assetPath("/interiors/botanical-detail.jpg")} alt="Ботаническая настенная роспись в интерьере" fill sizes="(max-width: 700px) 100vw, 40vw" />
            </figure>
            <div><span>Интерьерная графика</span><h3><span>Живая</span> <i>линия</i></h3><p>Ботанический ритм собирается непосредственно на стене и подчиняется масштабу помещения.</p></div>
          </article>
          <article className="interiors-project-card">
            <figure className="interiors-image">
              <Image src={assetPath("/interiors/doors-context.jpg")} alt="Расписанные межкомнатные двери в интерьере" fill sizes="(max-width: 700px) 100vw, 40vw" />
            </figure>
            <div><span>Роспись по дереву</span><h3><span>Двери как</span> <i>арт-объект</i></h3><p>Композиция следует конструкции дверей и превращает функциональный предмет в часть общего образа.</p></div>
          </article>
        </div>
      </section>

      <section className="interiors-services" aria-labelledby="services-title">
        <p className="interiors-section-label">Возможности</p>
        <h2 id="services-title">Что можно расписать<span>:</span></h2>
        <div className="interiors-services-layout">
          <article className="interiors-service-item">
            <figure className="interiors-service-image">
              <Image src={assetPath("/interiors/relief-detail.jpg")} alt="Деталь настенной росписи с рельефной линией" fill sizes="(max-width: 700px) 100vw, 52vw" />
            </figure>
            <div>
              <span>Настенная роспись</span>
              <h3>Стены<br /><i>и рельеф</i></h3>
              <p>Авторская композиция создаётся под масштаб, свет и архитектуру конкретного помещения.</p>
            </div>
          </article>
          <article className="interiors-service-item">
            <figure className="interiors-service-image">
              <Image src={assetPath("/interiors/botanical-process.jpg")} alt="Процесс создания ботанической графики на стене" fill sizes="(max-width: 700px) 100vw, 52vw" />
            </figure>
            <div>
              <span>Работа на объекте</span>
              <h3>Интерьерная<br /><i>графика</i></h3>
              <p>Линия и цвет подчиняются пропорциям пространства и продолжают его визуальный ритм.</p>
            </div>
          </article>
          <article className="interiors-service-item">
            <figure className="interiors-service-image">
              <Image src={assetPath("/interiors/doors-detail-a.jpg")} alt="Деталь авторской росписи на деревянной двери" fill sizes="(max-width: 700px) 100vw, 52vw" />
            </figure>
            <div>
              <span>Роспись по дереву</span>
              <h3>Двери<br /><i>и дерево</i></h3>
              <p>Функциональная поверхность становится самостоятельным акцентом и частью общего образа.</p>
            </div>
          </article>
        </div>
        <div className="interiors-services-more">
          <span>Также можно расписать</span>
          <p>Потолки, панели и архитектурные детали.<i>Решение подбирается под пространство и материал.</i></p>
        </div>
      </section>

      <section className="interiors-process" aria-labelledby="process-title">
        <p className="interiors-section-label">Как строится работа</p>
        <h2 id="process-title">От идеи<br /><i>до росписи</i></h2>
        <ol>
          <li><h3>Знакомство</h3><p>Вы присылаете фотографии, размеры и кратко рассказываете о задаче.</p></li>
          <li><h3>Авторский эскиз</h3><p>Композиция создаётся специально для выбранной стены или поверхности.</p></li>
          <li><h3>Подготовка</h3><p>Согласовываем масштаб, цвет, материалы, стоимость и работу на объекте.</p></li>
          <li><h3>Роспись</h3><p>Рисунок переносится вручную и становится частью пространства.</p></li>
        </ol>
      </section>

      <section className="interiors-contact" aria-labelledby="contact-title">
        <p>Начать проект</p>
        <h2 id="contact-title">Есть пространство<br /><i>для искусства?</i></h2>
        <span>Пришлите фотографии и кратко расскажите о задаче — обсудим идею, формат и работу на объекте.</span>
        <a className="site-primary-cta" href={contactHref}>Обсудить роспись <span aria-hidden="true"><ArrowIcon /></span></a>
      </section>

      <footer className="interiors-footer">
        <Link href="/"><ArrowIcon direction="left" /> В галерею</Link>
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
      <MobileFooter className="interiors-mobile-footer" />
    </main>
  );
}
