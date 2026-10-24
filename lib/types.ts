export type ArtworkStatus = "available" | "sold";

export type ArtworkData = {
  id: string;
  title: string;
  titleEn: string;
  year: string | null;
  widthCm: number;
  heightCm: number;
  medium: string;
  price: string | null;
  status: ArtworkStatus;
  image: string | null;
  palette: [string, string, string, string];
};
