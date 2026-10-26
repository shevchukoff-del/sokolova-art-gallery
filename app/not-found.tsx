import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import Watercolor404 from "@/components/Watercolor404";

export const metadata: Metadata = {
  title: "Страница не найдена — Sokolova Art",
  description: "Страница не найдена. Вернитесь в галерею Екатерины Соколовой.",
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Watercolor404 />
      <Link className="not-found-brand" href="/" aria-label="Sokolova Art — на главную">
        <span>Sokolova</span><i>Art</i>
      </Link>
      <section className="not-found-copy" aria-labelledby="not-found-title">
        <p>404 · Страница не найдена</p>
        <h1 id="not-found-title"><span>Такой страницы нет. </span><i>Но есть чистый лист :)</i></h1>
        <span className="not-found-instruction">Выберите цвет и рисуйте — пальцем или курсором.</span>
      </section>
      <nav className="not-found-actions" aria-label="Навигация со страницы 404">
        <Link className="not-found-primary" href="/"><span>Вернуться в галерею</span><ArrowIcon /></Link>
        <Link className="not-found-secondary" href="/works/">Каталог работ</Link>
      </nav>
    </main>
  );
}
