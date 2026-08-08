import { useEffect, useRef, useState } from "react";

/**
 * KineticGrid — site-wide fixed canvas backdrop.
 *
 * A full-viewport grid that warps toward the pointer (mouse *and* touch) and
 * ripples outward on click/tap. Rendered once at the app root, fixed behind
 * every route, pointer-events: none so it never intercepts scroll or taps.
 *
 * Under prefers-reduced-motion the grid is painted once, statically: no rAF
 * loop, no listeners of any kind.
 */

const BASE_CELL = 55;
const MOBILE_CELL = 82; // coarser grid below 768px: less paint, less noise
const MOBILE_BP = 768;
const WARP_RADIUS = 260;
const MAX_WARP = 24;
const EDGE_PIN = 40;
const LERP = 0.12;
const RIPPLE_LIFE = 1000; // ms
const RIPPLE_SPEED = 0.55; // px per ms
const RIPPLE_WIDTH = 70;
const RIPPLE_PUSH = 26;

type Palette = { bg: string; accent: [number, number, number]; line: string; node: string };

const PALETTES: Record<"default" | "monochrome", { dark: Palette; light: Palette }> = {
  default: {
    dark: {
      bg: "#0a0a09",
      accent: [212, 175, 55],
      line: "rgba(212,175,55,0.07)",
      node: "rgba(212,175,55,0.14)",
    },
    light: {
      bg: "#faf7f0",
      accent: [166, 124, 27],
      line: "rgba(60,50,25,0.08)",
      node: "rgba(60,50,25,0.15)",
    },
  },
  monochrome: {
    dark: {
      bg: "#000000",
      accent: [255, 255, 255],
      line: "rgba(255,255,255,0.06)",
      node: "rgba(255,255,255,0.12)",
    },
    light: {
      bg: "#ffffff",
      accent: [0, 0, 0],
      line: "rgba(0,0,0,0.07)",
      node: "rgba(0,0,0,0.14)",
    },
  },
};

interface Point {
  ox: number;
  oy: number;
  x: number;
  y: number;
  pinned: boolean;
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

interface KineticGridProps {
  globalColor?: "default" | "monochrome";
  className?: string;
}

const KineticGrid = ({ globalColor = "default", className = "" }: KineticGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  // Track theme so the backdrop never fights the foreground text colour.
  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => setIsDark(root.classList.contains("dark")));
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = (PALETTES[globalColor] ?? PALETTES.default)[isDark ? "dark" : "light"];
    const [ar, ag, ab] = palette.accent;

    const rmq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const interactive = !rmq?.matches;

    let width = 0;
    let height = 0;
    let cell = BASE_CELL;
    let cols = 0;
    let rows = 0;
    let points: Point[] = [];
    let dots: { x: number; y: number; a: number }[] = [];
    let frame = 0;
    const ripples: Ripple[] = [];

    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;

    const viewport = () => {
      const vv = window.visualViewport;
      return {
        w: Math.max(1, Math.round(vv?.width ?? window.innerWidth)),
        h: Math.max(1, Math.round(vv?.height ?? window.innerHeight)),
      };
    };

    const build = () => {
      const { w, h } = viewport();
      width = w;
      height = h;
      cell = width < MOBILE_BP ? MOBILE_CELL : BASE_CELL;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * cell;
          const oy = r * cell;
          const pinned =
            ox <= EDGE_PIN || oy <= EDGE_PIN || ox >= width - EDGE_PIN || oy >= height - EDGE_PIN;
          points.push({ ox, oy, x: ox, y: oy, pinned });
        }
      }

      const count = Math.round((width * height) / (width < MOBILE_BP ? 14000 : 9000));
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({ x: Math.random() * width, y: Math.random() * height, a: 0.02 + Math.random() * 0.05 });
      }
    };

    const at = (r: number, c: number) => points[r * cols + c];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      const dotColor = isDark ? "212,175,55" : "60,50,25";
      for (const d of dots) {
        ctx.fillStyle = `rgba(${dotColor},${d.a})`;
        ctx.fillRect(d.x, d.y, 1, 1);
      }

      const glowAt = (x: number, y: number) => {
        if (!interactive || cx < -1000) return 0;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > WARP_RADIUS) return 0;
        return Math.pow(1 - dist / WARP_RADIUS, 2);
      };

      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = at(r, c);
          if (c < cols - 1) {
            const q = at(r, c + 1);
            const g = Math.max(glowAt(p.x, p.y), glowAt(q.x, q.y));
            ctx.strokeStyle = g ? `rgba(${ar},${ag},${ab},${0.06 + g * 0.5})` : palette.line;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            const q = at(r + 1, c);
            const g = Math.max(glowAt(p.x, p.y), glowAt(q.x, q.y));
            ctx.strokeStyle = g ? `rgba(${ar},${ag},${ab},${0.06 + g * 0.5})` : palette.line;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const g = glowAt(p.x, p.y);
        if (g > 0.02) {
          ctx.fillStyle = `rgba(${ar},${ag},${ab},${0.25 + g * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 + g * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = palette.node;
          ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
        }
      }
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;

      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].start > RIPPLE_LIFE) ripples.splice(i, 1);
      }

      for (const p of points) {
        let dx = 0;
        let dy = 0;

        if (!p.pinned) {
          const vx = cx - p.ox;
          const vy = cy - p.oy;
          const dist = Math.hypot(vx, vy);
          if (dist < WARP_RADIUS && dist > 0.001) {
            const t = dist / WARP_RADIUS;
            const fall = Math.exp(-(t * t) * 4);
            dx += (vx / dist) * MAX_WARP * fall;
            dy += (vy / dist) * MAX_WARP * fall;
          }

          for (const rp of ripples) {
            const age = now - rp.start;
            const radius = age * RIPPLE_SPEED;
            const rx = p.ox - rp.x;
            const ry = p.oy - rp.y;
            const d = Math.hypot(rx, ry);
            const delta = Math.abs(d - radius);
            if (delta < RIPPLE_WIDTH && d > 0.001) {
              const band = 1 - delta / RIPPLE_WIDTH;
              const fade = 1 - age / RIPPLE_LIFE;
              const push = RIPPLE_PUSH * band * fade;
              dx += (rx / d) * push;
              dy += (ry / d) * push;
            }
          }
        }

        p.x += (p.ox + dx - p.x) * 0.2;
        p.y += (p.oy + dy - p.y) * 0.2;
      }

      draw();
    };

    // Canvas is fixed to the viewport, so client coords map 1:1.
    const setTarget = (x: number, y: number) => {
      tx = x;
      ty = y;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setTarget(e.clientX, e.clientY);
    };

    const onLeave = () => {
      tx = -9999;
      ty = -9999;
    };

    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTarget(t.clientX, t.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      setTarget(t.clientX, t.clientY);
      ripples.push({ x: t.clientX, y: t.clientY, start: performance.now() });
    };

    const onTouchEnd = () => {
      // Let the warp drift away once the finger lifts.
      tx = -9999;
      ty = -9999;
    };

    const onResize = () => {
      build();
      draw();
    };

    build();
    draw();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("click", onClick, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      frame = requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [globalColor, isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default KineticGrid;
