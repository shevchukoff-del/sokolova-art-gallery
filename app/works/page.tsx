import type { Metadata } from "next";
import WorksCatalog from "@/components/WorksCatalog";
import artworksJson from "@/data/artworks.json";
import type { ArtworkData } from "@/lib/types";

export const metadata: Metadata = {
  title: "Каталог работ — Sokolova Art",
  description: "Живопись Екатерины Соколовой: доступные и архивные работы.",
};

export default function WorksPage() {
  return <WorksCatalog artworks={artworksJson as ArtworkData[]} />;
}
