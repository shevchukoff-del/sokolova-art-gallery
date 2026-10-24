# Sokolova Art — Interactive Digital Gallery

First working prototype of a light, scroll-driven digital gallery for Ekaterina Sokolova. The project exports to plain static files and is independent of a specific hosting provider.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static production build

```bash
npm run typecheck
npm run build
```

The deployable site is written to `out/`. Preview it with any static HTTP server, for example `npx serve out`.

## Content

- Artwork metadata lives in [`data/artworks.json`](./data/artworks.json).
- Approved images should be placed in [`public/artworks/`](./public/artworks/).
- Current artwork-file status and required filenames are documented in [`docs/artwork-assets.md`](./docs/artwork-assets.md).
- Freepik concept references can be added to [`references/freepik/`](./references/freepik/).

No artwork images from the existing public site are bundled in this prototype because reuse rights have not yet been confirmed. The colour fields in the room are clearly labelled temporary image slots.

## Interaction model

- Desktop: native scroll drives a composed camera route through one real-time 3D room.
- Artwork index or canvas click: camera focuses the work and opens the information panel.
- Mobile/coarse pointer: lightweight editorial catalogue, with the same metadata and inquiry flow.
- Reduced motion: automatic drift and long transitions are disabled.

## Stack

Next.js 16, React 19, TypeScript, React Three Fiber, Three.js, Drei and GSAP.

## GitHub Pages

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml). The workflow type-checks the project, creates the static export with the repository base path, uploads `out/` and deploys it through GitHub Pages.

Expected project URL: `https://<github-user>.github.io/sokolova-art-gallery/`.

In the GitHub repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** if it is not selected automatically.

## REG.RU migration

Build with `NEXT_PUBLIC_BASE_PATH` unset and upload the contents of `out/` to the hosting document root. See [`docs/deployment/reg-ru.md`](./docs/deployment/reg-ru.md) for shared-hosting and future VPS options.
