import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Sokolova Art",
  description: "Политика конфиденциальности сайта художницы Екатерины Соколовой.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page" lang="ru">
      <Link className="privacy-back" href="/">Sokolova Art</Link>
      <article>
        <p>Правовая информация</p>
        <h1>Политика конфиденциальности</h1>
        <p>Сайт Sokolova Art не использует формы регистрации и не собирает платёжные данные. При обращении по электронной почте пользователь самостоятельно передаёт адрес и содержание сообщения своему почтовому сервису и получателю.</p>
        <p>Технические данные, необходимые для загрузки сайта, могут обрабатываться хостинг-провайдером в соответствии с его условиями. Если на сайте появятся формы, аналитика или дополнительные способы обработки данных, политика будет обновлена.</p>
        <p>По вопросам обработки данных: <a href="mailto:katja.sokolova@gmail.com">katja.sokolova@gmail.com</a>.</p>
        <small>Редакция от 26 октября 2026 года</small>
      </article>
    </main>
  );
}
