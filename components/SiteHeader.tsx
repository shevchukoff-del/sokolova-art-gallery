"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowIcon from "./ArrowIcon";

type SiteHeaderProps = {
  current: "gallery" | "works" | "about" | "artwear" | "interiors" | "press";
  meta?: string;
  variant: "gallery" | "works" | "about" | "artwear" | "interiors" | "press";
  onHome?: () => void;
};

const links = [
  { id: "gallery", href: "/", label: "Галерея" },
  { id: "works", href: "/works/", label: "Каталог работ" },
  { id: "about", href: "/about/", label: "Об авторе" },
  { id: "artwear", href: "/artwear/", label: "Artwear" },
  { id: "interiors", href: "/interiors/", label: "Роспись интерьеров" },
  { id: "press", href: "/press/", label: "Выставки и публикации" },
] as const;

export default function SiteHeader({ current, meta, variant, onHome }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className={`${variant}-header site-header ${open ? "is-menu-open" : ""}`}>
      <Link className={`${variant}-wordmark`} href="/" onClick={onHome}>Sokolova Art</Link>
      <button
        className="site-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={`${variant}-navigation`}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((value) => !value)}
      >
        <i aria-hidden="true"><b /><b /></i>
      </button>
      <button className="site-menu-scrim" type="button" aria-label="Закрыть меню" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <nav id={`${variant}-navigation`} aria-label="Основная навигация">
        <small>Навигация</small>
        {links.map((link) => (
          <Link
            key={link.id}
            className={current === link.id ? "is-current" : undefined}
            href={link.href}
            aria-current={current === link.id ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{link.label}</span><ArrowIcon />
          </Link>
        ))}
      </nav>
      {meta && <span>{meta}</span>}
    </header>
  );
}
