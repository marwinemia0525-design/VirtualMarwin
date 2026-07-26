import { useEffect, useRef, useState } from "react";

/**
 * Inverting cursor: a precise dot at the pointer plus a trailing ring, both
 * drawn with mix-blend-mode: difference so they invert whatever sits beneath.
 * One cursor then reads correctly over the dark hero, the light cards and the
 * screenshot galleries alike, with no per-section theming.
 *
 * Written against rAF directly rather than framer-motion springs: this runs on
 * every frame the pointer moves, so it stays off the motion chunk and we keep
 * exact control over the per-frame cost (two transform writes).
 *
 * Two gating bugs from the previous implementation are fixed here:
 *  - Capability is resolved with `(hover: hover) and (pointer: fine)`, matching
 *    SmoothScroll. The old `'ontouchstart' in window` test disabled the cursor
 *    on every touch-capable Windows laptop, which is most of them now.
 *  - prefers-reduced-motion drops the trail lag rather than the cursor itself,
 *    so the pointer stays visible but nothing eases or overshoots.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Anything that should swell the ring, including div-based cards. */
const INTERACTIVE = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[data-cursor-hover]",
  ".card-glass",
  ".cursor-pointer",
].join(",");

/** Per-frame easing toward the pointer. Lower is laggier. */
const TRAIL_EASE = 0.18;
const SCALE_EASE = 0.22;
const HOVER_SCALE = 1.8;

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Keep resolving capability: plugging in a mouse or docking a tablet should
  // flip this without a reload.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Park offscreen until the pointer first reports in, so neither element
    // sits in the top-left corner on load.
    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const render = () => {
      frame = requestAnimationFrame(render);

      const still = reduced.matches;
      ringX += (pointerX - ringX) * (still ? 1 : TRAIL_EASE);
      ringY += (pointerY - ringY) * (still ? 1 : TRAIL_EASE);
      scale += (targetScale - scale) * (still ? 1 : SCALE_EASE);

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    };

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      show();
    };

    // Delegated, so lazily mounted sections are covered without rebinding.
    const onOver = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      targetScale = e.target.closest(INTERACTIVE) ? HOVER_SCALE : 1;
    };

    const onDown = () => {
      targetScale *= 0.75;
    };
    const onUp = () => {
      targetScale = targetScale < HOVER_SCALE * 0.85 ? 1 : HOVER_SCALE;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", show);
    window.addEventListener("blur", hide);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      window.removeEventListener("blur", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  // mix-blend-mode sits on each element rather than a shared wrapper: a
  // full-viewport blended layer would make the compositor reblend the whole
  // screen every frame, where two small layers cost almost nothing.
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 border-white opacity-0 mix-blend-difference transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
