---
date: 2026-10-27
topic: mobile-works-catalog
---

# Mobile works catalog

## What We're Building

The mobile catalog continues the editorial language already used on the home and author pages: large Bodoni display type, warm paper, restrained terracotta accents, full-width artwork and quiet supporting metadata.

## Why This Approach

A two-column grid was considered, but the collection contains varied portrait and landscape proportions. On a phone it makes horizontal paintings too small and pushes the page toward a shop-like thumbnail wall. One consistent column gives every work enough scale and removes the stepped rhythm the user explicitly rejected.

## Key Decisions

- Keep the approved three-option filter and make its bar sticky for long browsing.
- Use one full content-width column with natural image ratios and equal vertical rhythm.
- Move numbering and availability into a quiet caption below each painting instead of placing a dark overlay on the art.
- Reuse the mobile footer from the home and author pages.
- Preserve the desktop catalog unchanged.
- Remove repeated labels, numbering, divider rules and redundant action copy so the mobile catalog reads as an exhibition list rather than an interface.
- Keep the positioning sentence as a quiet deck, not a quotation: it is descriptive copy rather than the artist's spoken voice.
- Use one shared line-built close icon across artwork and product viewers, with a short rotation response and reduced-motion fallback.
- Artwork viewers must never crop an image: render the full source at its natural ratio and let tall works extend the scrollable viewer.
- Adjacent-work transitions use a restrained 360 ms directional fade without scale, and reset the viewer to the top for each new artwork.

## Open Questions

- None.

## Next Steps

Validate at 320, 390 and 430 px, including filter and artwork-detail interactions.
