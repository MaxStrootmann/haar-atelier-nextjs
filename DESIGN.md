# Haar Atelier Design Context

## Current Visual Base

The existing site uses:

- warm cream background;
- elegant serif headings/logo;
- soft salon photography;
- gold/tan buttons;
- simple black text and utility icons.

The refresh should preserve the calm premium salon feeling, but make hierarchy, photography, CTAs, and mobile rhythm stronger.

## Desired Direction

Working direction:

```text
Warm Editorial Atelier
```

This blends Haar's natural/local salon softness with owner-approved Allure-inspired editorial type, large images, and warm terracotta accents.

## Color Strategy

Use a restrained-to-committed warm palette. Avoid pure black/white. Prefer OKLCH tokens in new prototype code.

Named roles:

```text
Atelier Cream     warm page base
Warm Plaster      secondary neutral/background
Clay Copper       primary CTA / owner reference accent
Soft Terracotta   secondary accent / large CTA surfaces
Deep Auburn       editorial headline accent
Natural Brown     body text / logo-like dark neutral
Muted Gold        softer Haar-native CTA option
```

Approximate color feel:

- cream / ivory, not white;
- terracotta / clay for stronger Allure-like CTAs;
- deep red-brown for editorial headlines;
- soft beige/plaster for image-adjacent sections;
- muted gold/tan for Haar-native softer variant.

## Typography

Display:

- high-contrast editorial serif;
- large mobile-first headlines;
- tight line-height;
- careful negative tracking only for large display sizes.

Body/UI:

- clean sans for navigation, body text, CTA labels, and utility copy;
- uppercase letter-spaced CTA labels can be used, but not everywhere.

Current implementation uses Cormorant globally. Future font candidates to test:

```text
Cormorant Garamond / Cormorant Infant
Bodoni Moda
Playfair Display
Fraunces
Libre Baskerville
DM Sans / Inter as sans pair
```

Do not finalize fonts until tested with Dutch headlines and the Haar logo.

## Layout Principles

- Mobile-first.
- Large image/video hero before complex page redesign.
- Appointment CTA primary, shop CTA secondary.
- Use fewer, stronger sections instead of many small blocks.
- Avoid nested cards and generic card grids for brand pages.
- Product/shop pages may use cards, but they should be polished and consistent.

## Motion Principles

Owner likes moving images. Prefer:

- short optimized hero video loops;
- slow photo/video transitions;
- subtle reveal/opacity/transform motion;
- no bouncy/elastic effects.

Motion should feel like salon atmosphere, not tech demo.

## Component Notes

### Hero

Should test:

- image/video-first composition;
- overlaid or adjacent large Dutch headline;
- `Afspraak maken` as primary CTA;
- `Shop haarverzorging` as secondary CTA.

### CTAs

- Large enough for mobile.
- Simple rectangular or subtly softened shapes.
- Terracotta/copper option for Allure-inspired direction.
- Muted gold/tan option for Haar-native direction.

### Navigation

Current header can remain for safe previews, but serious design prototypes may need an isolated preview shell to evaluate the hero properly without existing chrome constraints.

## Current Prototype Directions

Three hero directions are being tested:

1. Allure-inspired — strongest terracotta/auburn/editorial approach.
2. Haar-native — calmer cream/gold approach.
3. Mix — Allure energy with Haar softness.

## Accessibility / Performance

- Maintain readable contrast over images.
- Do not rely on text over busy video without overlay.
- Optimize video/image assets for mobile.
- Keep CTAs obvious and tappable.
