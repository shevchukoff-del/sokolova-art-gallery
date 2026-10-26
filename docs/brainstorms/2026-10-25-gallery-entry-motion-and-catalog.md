# Gallery entry, artwork motion and catalog

## Decision

- Replace the abstract hero line with two concrete lines: “Москва · Урбанизм · Цветы” and “Онлайн-галерея авторской живописи”. This says what the artist paints and what the visitor can do here without competing with the artist’s name.
- Remove “Галерея · 01”. Before entry the right side of the header stays quiet; after entry it only carries the scroll hint.
- Keep the 3D walk as the primary experience and add a separate `/works/` catalog as the fast route for visitors who want to browse directly.
- Surface the catalog in three predictable places: the intro CTA, the global menu, and a quiet bottom-left link inside the 3D gallery.
- Order Previous/Next by the physical route through the room, not by the source JSON order.
- Move the camera between selected works on a curved corridor-safe path, with a gentle departure and arrival instead of a direct snap across the room.
- Use one preloader from application mount until the 3D scene is ready; do not show a second intermediate loader.

## Catalog direction

The catalog is an editorial, asymmetrical two-column layout on desktop and a single vertical sequence on mobile. Filters separate all works, currently available works, and archive/private-collection works. Selecting a work reuses the existing details panel and previous/next controls.
