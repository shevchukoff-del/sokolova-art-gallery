# Official artwork curation for the gallery prototype

## Goal

Replace the generated placeholder textures with a concise selection of real works from Ekaterina
Sokolova's official catalogue while preserving the current 3D route, interactions, and static build.

## Decision

Use the eight works already represented in `data/artworks.json`, then add a ninth work as the focal
point on the end wall. Three strong, colourful works establish the entrance; the remaining side-wall
selection varies subject and format along the route; the final vertical cityscape closes the view down
the corridor. Nine works fill every intended placement without making the gallery feel crowded.

## Constraints

- Source artwork imagery only from <https://sokolova-art.com/gallery>.
- Preserve official titles, media, dimensions, availability, and pricing already recorded in data.
- Interpret catalogue measurements as height × width when mapping them to `widthCm` and `heightCm`.
- Keep the current click targets, details panel, scroll navigation, and GitHub Pages asset paths.
- Optimize source files for real-time 3D delivery; never use generated imagery as the artwork itself.

## Selected works

1. Красная Москва
2. Папоротник
3. Фламинго
4. Белые лилии (2025, 80 × 140 cm catalogue listing)
5. Ночная смена
6. Утренняя Италия
7. Лиловая сирень
8. Город ночью не спит
9. Гостиница Украина — frontal focal work on the end wall

## Next step

Validate the selection in the rendered scene. If the artist approves the prototype, confirm image
reproduction rights and request master files for the final high-resolution deployment.
