import type { Metadata } from "next";
import Link from "next/link";
import ArtwearCatalog from "@/components/ArtwearCatalog";
import ArtwearShowcase from "@/components/ArtwearShowcase";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
import MobileFooter from "@/components/MobileFooter";
import { artwearCatalogItems, artwearItems } from "@/data/artwear";

export const metadata: Metadata = {
  title: "SOKOLOVA ARTWEAR — Авторские изделия",
  description: "Футболки, платки, сумки и одежда с авторской росписью по мотивам живописи Екатерины Соколовой.",
};

export default function ArtwearPage() {
  return (
    <main id="top" className="artwear-page">
      <SiteHeader current="artwear" variant="artwear" />

      <section className="artwear-hero">
        <h1 className="display-title"><span>Sokolova</span><i>Artwear</i></h1>
        <div className="artwear-intro-copy">
          <p>Одежда и аксессуары по мотивам живописи Екатерины Соколовой — от футболок и платков до ручной росписи.</p>
        </div>
      </section>

      <section className="artwear-collection" aria-labelledby="collection-title">
        <div className="artwear-section-head">
          <h2 id="collection-title">Футболки</h2>
        </div>
        <ArtwearShowcase items={artwearItems} />
        <div className="artwear-rail-progress" aria-hidden="true"><i /></div>
      </section>

      <ArtwearCatalog items={artwearCatalogItems} />

      <section className="artwear-manifesto">
        <h2>Картина становится жестом, силуэтом <i>и частью движения.</i></h2>
      </section>

      <footer className="artwear-footer">
        <Link href="/"><ArrowIcon direction="left" /> Вернуться в галерею</Link>
        <p>Екатерина Соколова</p>
        <a href="mailto:katja.sokolova@gmail.com">Связаться <ArrowIcon /></a>
      </footer>
      <MobileFooter className="artwear-mobile-footer" />
    </main>
  );
}
