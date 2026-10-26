import type { MetadataRoute } from "next";

const siteUrl = "https://sokolova-art.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/works/`, lastModified: "2026-10-25", changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about/`, lastModified: "2026-10-24", changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/artwear/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/interiors/`, lastModified: "2026-10-25", changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/press/`, lastModified: "2026-10-24", changeFrequency: "monthly", priority: 0.8 },
  ];
}
