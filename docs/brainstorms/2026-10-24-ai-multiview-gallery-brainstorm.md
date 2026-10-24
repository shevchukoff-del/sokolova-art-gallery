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

## World Labs Marble Proof of Concept

A single free Marble 1.1 generation was created on 2026-10-24 from the concept A front view and the two Magnific side views. Auto Layout was enabled and the images were assigned as Front, Left and Right.

- Creation ID: `f940d917-0d2d-4d57-8652-fdc5ed076566`
- World ID: `72746e7b-3203-412e-b247-3472a77c8d9c`
- Live world: <https://marble.worldlabs.ai/world/72746e7b-3203-412e-b247-3472a77c8d9c>
- Saved verification frames: `references/worldlabs/marble-world-origin.png` and `references/worldlabs/marble-world-interior.png`

### Findings

- The central camera corridor is coherent and preserves the intended warm plaster, pale oak, rectangular skylights, curved partition and distant niche.
- Forward movement works and remains visually convincing across the primary route.
- Strong lateral movement exposes sparse or black regions and blurred surfaces. Three views are not enough for unrestricted six-degree-of-freedom navigation.
- The generated environment includes invented abstract artwork. Production must continue to render approved artwork as separate interactive Three.js planes.
- On the free plan the world must be public. Splat, collider mesh, high-quality mesh, low-resolution splat, panorama and embedded-viewer exports are disabled.
- Marble advertises splat export on its paid Standard plan. No subscription or paid action was taken.

## Decision

The world-model approach is visually promising, but this free proof cannot be integrated into the static site because the `.spz` export is unavailable. Keep the existing Three.js gallery as the production implementation. If a later paid export is approved, use the splat only as a photoreal presentation layer and retain the current geometry for camera constraints, collisions, click targets, artwork planes and fallback rendering.

## Recommended Next Step

Before any paid generation, create 6–8 tightly overlapping views of the same clean gallery without identifiable paintings. Cover the central route, both sides of the curved partition and the terminal niche. A future exported splat should be accepted only after checking payload size, desktop/mobile frame rate, visual holes along the constrained route and alignment of separate approved artwork planes.
