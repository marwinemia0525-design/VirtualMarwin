
## 1. Fix hero load flash (navbar snap-in)

Root cause: `Navbar` and Hero elements each use their own `motion` initial/animate with staggered delays (0.05–0.6s), while lazy-loaded sections below share the same viewport. The navbar's `y: -100 → 0` and Hero's per-element `opacity: 0 → 1` fires separately, producing a two-stage pop.

Fix:
- `src/components/Navbar.tsx`: remove the `initial={{ y: -100 }} animate={{ y: 0 }}` on `motion.header` — render at final position from the first frame (keep the AnimatePresence on the mobile menu).
- `src/components/Hero.tsx`: remove the per-element `initial/animate/transition` on the badge, headline, paragraph, CTA row, photo, tool-logo strip, stats grid, and scroll indicator. Render everything at full opacity from mount. (Keep the internal hover/transition polish; only strip the entrance animations.)
- Net effect: navbar + hero render together at full opacity on first paint — no fade, no stagger.

## 2. Fix light mode

Root cause: `AnimatedBackground` is rendered unconditionally with dark-mode HSL values (indigo/cyan orbs, SVG node/line gradients tuned for dark bg). `.btn-primary`/`.btn-cta` use `--cta-foreground` which is white in both themes, fine on the gradient, but hover shadows/translucency wash out on light bg.

Fix:
- `src/components/AnimatedBackground.tsx`: read theme via `useTheme()` from `ThemeProvider`. When theme is `light`, return a lightweight replacement — just the static grid overlay at lower opacity (~0.05) and the vignette, with no orbs, no SVG workflow nodes/lines, no floating particles, no scan lines. Dark mode keeps current behavior (but reduced — see #3).
- `src/index.css`: in the light `:root` block, set `--cta-foreground: 0 0% 100%` explicitly (already effectively white) and ensure `.btn-primary` / `.btn-cta` in light mode have a solid opaque gradient background with readable white text on both default and hover. Add a `:root` (light) override that removes the reduced-opacity glow on hover and keeps `background: var(--gradient-cta)` fully opaque (it already is; the issue is only the extra glow shadow — cap hover box-shadow to a darker solid shadow in light mode so text stays legible).

## 3. Reduce background animation density

Keep ONE ambient effect. Remove the rest.

- `src/components/AnimatedBackground.tsx` (dark mode):
  - Keep: static gradient mesh base + the floating orbs (they're the signature look) + vignette.
  - Remove: the SVG workflow paths + node circles, the floating particle dots (`FloatingShape` × 24), and both animated horizontal scan lines.
  - Keep the subtle grid overlay but drop its parallax transform to reduce motion.
- `src/components/Hero.tsx`: remove the inline hero SVG workflow visualization (the `<svg>` with `heroFlow`/`heroNode` paths and animated node circles). Keep the soft `--gradient-glow` layer.
- Do not touch `text-gradient` / `glow-text` (they're static, not animated).
- Do not add anything new.

## Files touched
- `src/components/Navbar.tsx` — strip entrance motion on header.
- `src/components/Hero.tsx` — strip per-element entrance motion; remove inline animated workflow SVG.
- `src/components/AnimatedBackground.tsx` — theme-aware render; remove SVG workflow, particles, scan lines in dark mode; near-empty in light mode.
- `src/index.css` — light-mode button hover polish (opaque background + solid shadow).

## Out of scope (untouched)
- `src/components/Certifications.tsx` (per constraint).
- Section order, copy, component structure, `Reveal` scroll animations for below-fold sections.
