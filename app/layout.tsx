import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ekaterina Sokolova — Art Gallery",
  description: "An interactive digital gallery of Ekaterina Sokolova's paintings.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
