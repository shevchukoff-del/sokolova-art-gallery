---
date: 2026-10-24
topic: gallery-focus-interaction
---

# Gallery focus interaction

## What we're building

A two-stage museum interaction for the 3D gallery. Selecting a work first aligns the camera squarely
with the complete framed painting and reveals a quiet caption bar. The information panel opens only
after the visitor chooses “Подробнее” or clicks the focused painting again.

The hanging sequence expands from nine to twelve official works. The additional works occupy empty
wall intervals while preserving deliberate architectural pauses. The end-wall work remains the route's
visual destination and uses the source image aspect ratio rather than catalogue-number proportions.

## Why this approach

An immediate side panel competes with the artwork and makes the camera crop feel worse. A full-screen
lightbox would hide the gallery entirely. The two-stage approach keeps the spatial experience intact,
shows the artwork without perspective distortion, and makes detailed metadata optional.

## Key decisions

- Focus camera: calculate a perpendicular viewing vector from each artwork's wall rotation.
- Artwork proportions: render frames from the actual source-image aspect ratio with no stretching.
- Caption: replace the pixelated 3D tooltip with a fixed, typographically controlled museum label.
- Details: use a narrower sliding panel; separate availability status from price.
- Exit: add an explicit “На главную” control that restores the intro and route start.
- Density: add МГУ, Морская раковина, and Зелёная жемчужина from the official catalogue.

## Open questions

None for this iteration. Final spacing will be validated in the live 3D scene.

## Next steps

Build, inspect first-screen and focused states, test navigation and panel transitions, then republish.
