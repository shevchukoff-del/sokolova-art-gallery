# Confirmed design constraints

This file records the current implemented direction. It is not permission to redesign adjacent pages.

- The visual system uses warm ivory and paper backgrounds, dark ink, muted rules, and a restrained brick-red accent defined in `app/globals.css`.
- Display typography uses the existing Bodoni/Didot serif stack; interface text uses the existing Avenir/Helvetica sans-serif stack.
- The home experience is a guided gallery rather than free-roam navigation: native scroll controls the desktop camera route, without WASD controls or scroll trapping.
- Desktop uses the real-time 3D gallery; compact/coarse-pointer devices use the editorial `MobileGallery` presentation from the same artwork data.
- Reduced-motion behavior must avoid automatic drift and long transitions.
- Artwork, artwear, interior, and press imagery must come from their existing content directories. Do not substitute unrelated stock or AI-generated artwork for documented originals.
- Shared navigation and repeated controls should reuse `SiteHeader`, `ArrowIcon`, and existing artwork-detail components.
- Preserve responsive behavior, keyboard focus visibility, semantic controls, image alt text, and the current static-export constraints.

Historical proposals and their status remain in `docs/brainstorms/`; they are context, not automatically approved requirements.
