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
  video?: {
    mp4?: string;
    webm?: string;
  };
};
