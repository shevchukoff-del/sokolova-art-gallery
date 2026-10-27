---
date: 2026-10-25
topic: mobile-artist-hero
---

# Mobile artist hero

## What We’re Building

The mobile home page becomes a clear artist identity page rather than opening with an abstract manifesto. The first viewport introduces Ekaterina Sokolova by name, locates her practice in Moscow, names the recurring subjects, and shows a real artwork crop before inviting the visitor into the collection.

## Why This Approach

The strongest artist portfolios from New York and France establish authorship first and let typography and one artwork carry the atmosphere. A large name, restrained metadata and a single image are clearer and more memorable than a generic statement. The previous “Живопись как состояние души” headline is removed from the opening screen.

## Key Decisions

- Hero hierarchy: “Современный российский художник” → “Екатерина Соколова” → real artwork → “Москва · Урбанизм · Цветы”.
- One compact CTA scrolls directly to the works list.
- The visible word “Меню” is removed; the two-line burger remains accessible through its ARIA label.
- Unicode arrow characters are replaced site-wide with a consistent inline SVG mark so mobile devices never render them as emoji.
- Existing palette, typography and vertical artwork list remain unchanged.
