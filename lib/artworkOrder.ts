import type { ArtworkData } from "./types";

export const galleryRouteIds = [
  "krasnaya-moskva",
  "mgu",
  "paporotnik",
  "flamingo",
  "nochnaya-smena",
  "belie-lilii",
  "morskaya-rakovina",
  "zelenaya-zhemchuzhina",
  "utrennyaya-italiya",
  "lilovaya-siren",
  "gorod-nochyu",
  "gostinitsa-ukraina",
] as const;

export function isGalleryRouteArtwork(artwork: ArtworkData) {
  return galleryRouteIds.includes(artwork.id as (typeof galleryRouteIds)[number]);
}

export function orderArtworksByGalleryRoute(artworks: ArtworkData[]) {
  const byId = new Map(artworks.map((artwork) => [artwork.id, artwork]));
  const ordered = galleryRouteIds.flatMap((id) => {
    const artwork = byId.get(id);
    return artwork ? [artwork] : [];
  });
  const knownIds = new Set(galleryRouteIds);
  return [...ordered, ...artworks.filter((artwork) => !knownIds.has(artwork.id as (typeof galleryRouteIds)[number]))];
}
