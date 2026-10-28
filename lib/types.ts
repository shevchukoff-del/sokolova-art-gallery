export type ArtworkStatus = "available" | "sold";

export type ArtworkData = {
  id: string;
  title: string;
  titleEn: string;
  year: string | null;
  widthCm: number | null;
  heightCm: number | null;
  medium: string;
  price: string | null;
  status: ArtworkStatus;
  image: string | null;
  imageAspectRatio?: number;
  palette: [string, string, string, string];
};

export type ArtwearItem = {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  sourceUrl: string;
  artworkImage: string;
  modelImage: string;
  sizes?: string[];
  video?: {
    mp4?: string;
    webm?: string;
  };
};

export type ArtwearCategory = "tshirts" | "scarves" | "bags" | "wearable-art";

export type ArtwearCatalogItem = {
  id: string;
  title: string;
  category: ArtwearCategory;
  categoryLabel: string;
  status: "available" | "inquiry" | "custom";
  statusLabel: string;
  image: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
  sizes?: string[];
  artworkImage?: string;
  sourceUrl?: string;
  featured?: boolean;
};
