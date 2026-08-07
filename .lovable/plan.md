# Rebrand to Gold / Black

Shift the site from the electric indigo/cyan palette to a luxury gold-on-black identity, keeping the same layout, sections, and animations.

## New palette

- Background: near-black charcoal (near #0A0A0B) instead of deep navy
- Primary / CTA: rich gold (near #D4AF37)
- Accent: warm champagne gold (near #F2D479) for highlights and glows
- Text: warm off-white on black; muted text in warm grey
- Light mode: warm ivory background, deep charcoal text, gold primary (kept readable)

## What changes

1. **Design tokens (`src/index.css`)** - replace background, card, primary, accent, cta, border, ring, and all gradient/shadow tokens in both `:root` and `.dark` with the gold/black values. Gradients become gold-to-champagne sweeps; glows become gold.
2. **Animated background (`src/components/AnimatedBackground.tsx`)** - recolor the floating orbs from indigo/cyan/purple to gold/amber/bronze tones at lower opacity so they read as warm light, not colored haze.
3. **Kinetic grid (`src/components/KineticGrid.tsx`)** - swap the hardcoded palettes: dark bg to near-black, grid lines/nodes to faint gold; light mode to ivory with warm grey lines; cursor/ripple accent to gold.
4. **Branded loader (`src/components/BrandedLoader.tsx`)** - update its accent color to gold.
5. **Sweep for stragglers** - check components for any remaining hardcoded blue/cyan classes and move them onto the semantic tokens.

## Not changing

Logo image, portrait, tool icons, screenshots, and layout stay as they are. (The current "M" logo is a blue/cyan gradient asset - it can be regenerated in gold as a follow-up if you want.)

## Technical notes

All values stay HSL in `index.css` and flow through the existing Tailwind semantic classes, so no component class renaming is needed beyond the hardcoded canvas colors.
