---
date: 2026-10-24
topic: ai-multiview-gallery
---

# AI Multi-view Gallery

## What We're Building

A photorealistic presentation layer for the existing interactive gallery based on the approved Freepik/Magnific concept A. The desired result must remain navigable, keep clickable artwork planes and work as a static deployment.

## Why This Approach

A flat panorama preserves the approved look but fails as soon as the camera translates. Independent AI camera views provide useful visual coverage, but the pilot proves they are not geometrically identical enough to stitch directly. The recommended architecture is therefore a spatial world representation, preferably a compressed Gaussian Splat, combined with the existing Three.js scene as an interaction and collision proxy.

## Key Decisions

- Keep the current Three.js camera route, artwork interaction and interface.
- Use concept A as the primary art-direction image.
- Treat generated side views as world-model inputs, not as final cubemap faces.
- Keep artwork imagery separate from the generated environment so invented AI paintings are never presented as Ekaterina Sokolova's work.
- Retain the current conventional 3D scene as a fallback for weak devices and reduced-data conditions.

## Pilot Result

- Core architecture stayed recognizable at ±25°: curved partition, skylights, oak floor and warm plaster.
- Secondary details were inconsistent: artworks disappeared, furniture changed and extra columns appeared.
- The generated depth map separates the main spatial layers clearly enough for a limited 2.5D test, but not for unrestricted navigation.

## Open Questions

- Whether to run a free World Labs Marble multi-image trial and evaluate the exported `.spz` size and visual consistency.
- The maximum desktop and mobile payload acceptable for the final static site.

## Next Step

Generate one world-model proof of concept from concept A plus the two pilot views. Do not replace the production gallery until its camera corridor, mobile frame rate, file size and artwork overlays have been validated.
