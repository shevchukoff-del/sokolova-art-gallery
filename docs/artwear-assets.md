# SOKOLOVA ARTWEAR assets

## Original artworks

The three original files were downloaded from the `og:image` / product gallery entries on the artist's public website on 2026-10-24. They are kept unchanged in `public/artwear/originals/`.

| Work | Public source | Local file | SHA-256 |
| --- | --- | --- | --- |
| Теперь с дипломом | https://sokolova-art.com/gallery/tproduct/858708727922-teper-s-diplomom | `teper-s-diplomom.jpg` | `a5ac05585a9de0b3d9065d293ef5c2ff39879acf6d154f0a81584aef867ad0ee` |
| Гостиница Украина | https://sokolova-art.com/gallery/tproduct/605271821782-gostinitsa-ukraina | `gostinitsa-ukraina.jpeg` | `7b019b04238dd3271e3ab9cd370a13e64e3b9f86f0f030d0e5db734fded5840c` |
| Тигр | https://sokolova-art.com/gallery/tproduct/629188149372-tigr | `tigr.png` | `1e8dbac34d07d5468056048510403881b75e30d1ecdefd181c2e87ae1f9df47b` |

## Campaign images

Final website assets live in `public/artwear/campaign/*-final.jpg`. The built-in image generation tool was used in compositing mode. Each image used:

1. a photorealistic front-facing model in a blank heavyweight white T-shirt as the edit target;
2. the matching original artwork above as the required print source;
3. the invariant that only the T-shirt print may change, while the model, framing and lighting stay fixed;
4. an oversized front print integrated into the cotton weave, perspective, folds, highlights and shadows;
5. an explicit prohibition on redraws, altered colors, extra graphics, logos, text and back prints.

Normalized final prompt:

> Print the exact supplied original artwork as one large vertical direct-to-garment image on the front of the blank white T-shirt. Keep the artwork's composition, subjects, colors, proportions, brushwork and details unchanged. Integrate the print into the cotton weave so it follows the garment's perspective, folds, light and shadow. Keep the model, face, pose, background and framing unchanged. Front view only; no text, logo, border, back print or floating sticker effect.

The checked-in JPEGs use quality 88 and retain the 1122 × 1402 campaign dimensions. The source PNGs remain reproducible from the generated-image session; they are not needed by the website.

## Future video slots

Each item in `data/artwear.ts` accepts optional `video.webm` and `video.mp4` paths. `ArtwearCard` already implements muted looping playback, desktop hover, mobile intersection playback, poster fallback, lazy loading and reduced-motion fallback.
