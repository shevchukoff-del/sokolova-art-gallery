# Project map

SOKOLOVA is a Next.js 16 App Router site exported as static files. `next.config.ts` keeps `output: "export"`, trailing-slash routes, unoptimized images, and optional `NEXT_PUBLIC_BASE_PATH` support.

## Routes

| Route | Source | Main UI |
| --- | --- | --- |
| `/` | `app/page.tsx` | `GalleryExperience`, with `GalleryScene` on desktop and `MobileGallery` on compact/coarse-pointer devices |
| `/works/` | `app/works/page.tsx` | `WorksCatalog`, backed by `data/artworks.json` |
| `/about/` | `app/about/page.tsx` | Biography and milestones from `data/about.ts` |
| `/artwear/` | `app/artwear/page.tsx` | `ArtwearShowcase` and `ArtwearCard`, backed by `data/artwear.ts` |
| `/interiors/` | `app/interiors/page.tsx` | Editorial interior-project page |
| `/press/` | `app/press/page.tsx` | `PressArchive`, backed by `data/press.ts` |
| `/robots.txt` | `app/robots.ts` | Static metadata route |
| `/sitemap.xml` | `app/sitemap.ts` | Static metadata route |

## Shared structure

- `app/layout.tsx`: root metadata and global stylesheet.
- `app/globals.css`: shared visual system and responsive page styles.
- `components/SiteHeader.tsx`: shared navigation.
- `components/ArtworkDetails.tsx`: shared artwork detail UI.
- `components/ArrowIcon.tsx`: shared directional icon.
- `lib/assetPath.ts`: applies the deployment base path to public assets.
- `lib/artworkOrder.ts`: shared gallery/catalog ordering.
- `lib/types.ts`: shared content types.
- `public/`: production artwork, artwear, hero, interior, and press media.

## Build and deployment

- Validate with `npm run typecheck` and, when warranted, `npm run build`.
- `npm run build` writes the deployable static site to `out/`.
- Pushes to `main` deploy through `.github/workflows/deploy-pages.yml` to GitHub Pages.
- Future REG.RU deployment is documented in `docs/deployment/reg-ru.md`.
