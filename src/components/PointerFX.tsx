import { useEffect } from "react";

/**
 * Pointer-driven surface effects: a spotlight that tracks across glass cards,
 * and a magnetic pull on tagged CTAs.
 *
 * Deliberately renders nothing and holds no React state. Everything is written
 * straight to CSS custom properties, so a pointer moving across the page never
 * triggers a React render. One delegated listener, coalesced into a single rAF
 * per frame, serves every card and button on the page.
 *
 * Opts out entirely on coarse pointers and under prefers-reduced-motion, so
 * phones and tablets never pay for listeners they cannot use.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Extra reach beyond a button's own edge where the pull begins, in px. */
const MAGNET_REACH = 85;
/** Fraction of the pointer offset the button travels. Keep well under 0.5. */
const MAGNET_STRENGTH = 0.3;

const PointerFX = () => {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let teardown: (() => void) | null = null;

    const stop = () => {
      teardown?.();
      teardown = null;
    };

    const start = () => {
      if (teardown) return;

      let frame = 0;
      let pending: { x: number; y: number; target: Element | null } | null = null;

      let magnets: HTMLElement[] = [];
      let magnetsDirty = true;
      const pulled = new Set<HTMLElement>();

      let activeCard: HTMLElement | null = null;

      const releaseMagnet = (el: HTMLElement) => {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
        el.classList.remove("is-magnetic");
      };

      const flush = () => {
        frame = 0;
        const event = pending;
        pending = null;
        if (!event) return;

        if (magnetsDirty) {
          magnets = Array.from(
            document.querySelectorAll<HTMLElement>("[data-magnetic]"),
          );
          magnetsDirty = false;
        }

        // --- Read phase. Every layout read happens before any style write,
        // so we never force a synchronous reflow mid-loop. ---
        const card =
          event.target instanceof Element
            ? (event.target.closest(".card-glass") as HTMLElement | null)
            : null;
        const cardRect = card?.getBoundingClientRect();

        const magnetReads = magnets.map((el) => ({
          el,
          rect: el.getBoundingClientRect(),
        }));

        // --- Write phase. ---
        if (card && cardRect) {
          card.style.setProperty("--spot-x", `${event.x - cardRect.left}px`);
          card.style.setProperty("--spot-y", `${event.y - cardRect.top}px`);
          activeCard = card;
        } else if (activeCard) {
          activeCard = null;
        }

        for (const { el, rect } of magnetReads) {
          // Skip anything not currently laid out (a collapsed lazy section).
          if (rect.width === 0 && rect.height === 0) {
            if (pulled.has(el)) {
              releaseMagnet(el);
              pulled.delete(el);
            }
            continue;
          }

          const dx = event.x - (rect.left + rect.width / 2);
          const dy = event.y - (rect.top + rect.height / 2);
          const reachX = rect.width / 2 + MAGNET_REACH;
          const reachY = rect.height / 2 + MAGNET_REACH;

          // Normalised elliptical falloff, so wide buttons pull from the
          // sides rather than only from a circle around their centre.
          const spread = Math.hypot(dx / reachX, dy / reachY);

          if (spread < 1) {
            const pull = (1 - spread) * MAGNET_STRENGTH;
            el.style.setProperty("--mag-x", `${(dx * pull).toFixed(2)}px`);
            el.style.setProperty("--mag-y", `${(dy * pull).toFixed(2)}px`);
            if (!pulled.has(el)) {
              el.classList.add("is-magnetic");
              pulled.add(el);
            }
          } else if (pulled.has(el)) {
            releaseMagnet(el);
            pulled.delete(el);
          }
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        // Coarse pointers can still emit pointermove on tap; ignore them.
        if (e.pointerType !== "mouse") return;
        pending = { x: e.clientX, y: e.clientY, target: e.target as Element };
        if (!frame) frame = requestAnimationFrame(flush);
      };

      const releaseAll = () => {
        for (const el of pulled) releaseMagnet(el);
        pulled.clear();
      };

      const observer = new MutationObserver(() => {
        magnetsDirty = true;
      });
      observer.observe(document.body, { childList: true, subtree: true });

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", releaseAll);
      window.addEventListener("blur", releaseAll);

      teardown = () => {
        if (frame) cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", releaseAll);
        window.removeEventListener("blur", releaseAll);
        releaseAll();
      };
    };

    const sync = () => {
      if (fine.matches && !reduced.matches) start();
      else stop();
    };

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
};

export default PointerFX;
