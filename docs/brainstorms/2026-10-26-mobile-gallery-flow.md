---
date: 2026-10-26
topic: mobile-gallery-flow
---

# Mobile gallery flow

## What We're Building

The mobile home page gains an editorial transition between the artist hero and the works catalogue, a less mechanical asymmetric rhythm for artwork cards, and a single-step artwork viewer that shows the image and its information together.

## Why This Approach

Artist and gallery references use short first-person statements to frame bodies of work, while strong commerce references open products into one coherent image-and-information view. The result preserves the site’s gallery character without making the paintings feel like interchangeable products.

## Key Decisions
- Mobile preload has a 900 ms minimum presence rather than an artificial multi-second delay.
- The catalog starts with a real display heading instead of a ruled utility strip.
- The catalog count is removed; the title uses one restrained signature accent on the italic word “работ”.
- Each catalog item exposes “Узнать о работе”; the detail view uses the shorter contextual action “Связаться”.
- Mobile catalog works share one full content width but keep their real aspect ratios. There is no coloured mat, cropping, or artificial stretching.
- The stepped layout is removed; consistency comes from width, caption placement, and spacing rather than forced image dimensions.
- Motion stays limited to a soft opacity/vertical reveal; typewriter, collapse, and dramatic scaling effects are rejected as too performative for the work.
- The mobile footer closes the page with the wordmark, short navigation, contact, privacy link, and a return-to-top action.
- The mobile menu uses restrained 23–30 px display type, no utility heading or row rules, and reserves terracotta for arrows and the current section.
- Detail images use their natural ratio within max-width/max-height bounds, and navigation arrows sit directly below the artwork rather than at the viewport bottom.
- The quote transition contains only the quote and the artist's name. Numbering, category labels, counters, and decorative rules are intentionally removed.
- Mobile artwork details use natural-language metadata rather than a ruled fact table.
- The inquiry action is a single brick-red button; artwork navigation is reduced to unframed arrows and a quiet swipe hint.

- Use Ekaterina Sokolova’s existing verified quote as the transition into selected works.
- Keep asymmetry, but replace strict left-right alternation with a four-card editorial rhythm.
- Align every caption to its image rather than to the full viewport.
- Remove the mobile “Подробнее” step and show artwork facts immediately.
- Use restrained reveal, scale and panel transitions with a reduced-motion fallback.

## Open Questions

- None.

## Next Steps

Implement and verify at 320, 390 and 430 px without changing the desktop gallery.
