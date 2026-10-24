---
date: 2026-10-24
topic: digital-gallery
---

# Sokolova Art — Digital Gallery

## What We're Building

A single luminous, architectural 3D gallery that opens as a cinematic title sequence and becomes an exploratory exhibition. Native scrolling moves the camera along a composed path; selecting a work creates a close viewing moment without leaving the room.

## Why This Approach

A guided route offers stronger art direction and more reliable performance than free-roam controls, while still feeling spatial and interactive. A lightweight editorial view preserves access on small screens and devices where WebGL is unsuitable.

## Key Decisions

- One continuous double-height room with warm ivory plaster, pale oak and skylight rhythm.
- A slow S-curve camera path controlled by ordinary page scroll; no WASD or scroll trapping.
- Eight data-driven artwork positions with explicit placeholder canvases until image rights are confirmed.
- Real public catalog metadata may be represented, but no unapproved artwork imagery is bundled.
- Desktop gets WebGL; compact screens get an accessible 2D catalogue using the same data.
- Reduced-motion users get direct, near-instant transitions and no automatic drift.

## Open Questions

- Which six to eight artwork images have confirmed web-display rights?
- Should the final inquiry action open email, a dedicated form, or an existing CRM form?

## Next Steps

Build, validate and replace placeholders once approved files are supplied in `public/artworks/`.
