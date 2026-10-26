import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Екатерина Соколова — художница, Москва",
  description: "Онлайн-галерея авторской живописи Екатерины Соколовой — современной российской художницы из Москвы.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
