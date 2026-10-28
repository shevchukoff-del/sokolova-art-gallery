import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

type MobileFooterProps = {
  topHref?: string;
  className?: string;
};

export default function MobileFooter({ topHref = "#top", className = "" }: MobileFooterProps) {
  return (
    <footer className={`mobile-footer ${className}`.trim()}>
      <a className="mobile-footer-brand" href={topHref} aria-label="В начало страницы"><span>Sokolova</span><i>Art</i></a>
      <nav aria-label="Навигация в подвале">
        <Link href="/">Главное</Link>
        <Link href="/about/">Об авторе</Link>
        <Link href="/works/">Каталог работ</Link>
        <Link href="/artwear/">Artwear / Изделия</Link>
        <Link href="/interiors/">Роспись интерьеров</Link>
        <Link href="/press/">Выставки и публикации</Link>
      </nav>
      <a className="mobile-footer-contact" href="mailto:katja.sokolova@gmail.com"><span>Связаться</span><ArrowIcon /></a>
      <div className="mobile-footer-bottom">
        <div>
          <Link href="/privacy/">Политика конфиденциальности</Link>
          <Link href="/consent/">Согласие на обработку данных</Link>
          <span>© 2026</span>
        </div>
        <a className="mobile-footer-top" href={topHref}><span>Наверх</span><ArrowIcon /></a>
      </div>
    </footer>
  );
}
