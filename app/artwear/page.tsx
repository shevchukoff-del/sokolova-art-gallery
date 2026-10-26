import type { Metadata } from "next";
import Link from "next/link";
import ArtwearShowcase from "@/components/ArtwearShowcase";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import { artwearItems } from "@/data/artwear";

export const metadata: Metadata = {
  title: "SOKOLOVA ARTWEAR — Авторские футболки",
  description: "Коллекция авторских футболок на основе оригинальной живописи Екатерины Соколовой.",
};

export default function ArtwearPage() {
  return (
    <main className="artwear-page">
      <SiteHeader current="artwear" meta="Коллекция · 01" variant="artwear" />

      <section className="artwear-hero">
        <p className="artwear-kicker">Живопись, которую можно носить</p>
        <h1 className="display-title"><span>SOKOLOVA</span><span>ARTWEAR</span></h1>
        <div className="artwear-intro-copy">
          <p>Оригинальные картины Екатерины Соколовой становятся частью формы — крупно, свободно, без компромиссов.</p>
          <small>Пилотная коллекция · 2026</small>
        </div>
      </section>

      <section className="artwear-collection" aria-labelledby="collection-title">
        <div className="artwear-section-head">
          <h2 id="collection-title">Первая серия</h2>
          <span>03 модели</span>
        </div>
        <ArtwearShowcase items={artwearItems} />
      </section>

      <section className="artwear-manifesto">
        <p>Не репродукция на сувенире.</p>
        <h2>Картина становится жестом, силуэтом <i>и частью движения.</i></h2>
        <span>Каждый принт воспроизводит оригинальную работу без изменений.</span>
      </section>

      <footer className="artwear-footer">
        <Link href="/"><ArrowIcon direction="left" /> Вернуться в галерею</Link>
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
    </main>
  );
}
