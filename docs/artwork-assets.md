# Artwork image status

Checked on 2026-10-24.

The project currently contains **no original artwork photographs**. `public/artworks/` contains only its README. The public catalogue at `https://sokolova-art.com/gallery` exposes titles and metadata, but publication rights for copying the source image files into this repository have not been confirmed.

For that reason v0.2 continues to show clearly labelled colour studies as replaceable placeholders. They are not presented as paintings by Ekaterina Sokolova.

## Files required

Please provide approved, colour-corrected WebP or high-quality JPEG files using these names:

| File | Work | Required aspect ratio |
| --- | --- | --- |
| `krasnaya-moskva.webp` | Красная Москва | 100:120 |
| `paporotnik.webp` | Папоротник | 100:120 |
| `flamingo.webp` | Фламинго | 100:120 |
| `belie-lilii.webp` | Белые лилии | 80:140 |
| `nochnaya-smena.webp` | Ночная смена | 100:140 |
| `utrennyaya-italiya.webp` | Утренняя Италия | 140:100 |
| `lilovaya-siren.webp` | Лиловая сирень | 60:70 |
| `gorod-nochyu.webp` | Город ночью не спит | 60:90 |

Recommended longest edge: 1800–2400 px, sRGB, without added frames or watermarks. Once approved files are placed in `public/artworks/`, set each `image` field in `data/artworks.json`; the 3D and mobile views will use them automatically.
