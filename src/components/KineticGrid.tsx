import { useEffect, useRef, type ReactNode } from "react";

/**
 * KineticGrid — full-bleed animated canvas grid that warps toward the cursor
 * and ripples on click.
 *
 * Follows the same capability gating as PointerFX/CustomCursor: on coarse
 * pointers or under prefers-reduced-motion no listeners are attached and no
 * rAF loop runs — the grid is painted once, statically.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const CELL = 55;
const WARP_RADIUS = 260;
const MAX_WARP = 24;
const EDGE_PIN = 40;
const LERP = 0.12;
const RIPPLE_LIFE = 1000; // ms
const RIPPLE_SPEED = 0.55; // px per ms
const RIPPLE_WIDTH = 70;
const RIPPLE_PUSH = 26;

type Palette = { bg: string; accent: [number, number, number] };

const PALETTES: Record<"default" | "monochrome", Palette> = {
  default: { bg: "#0d0f14", accent: [96, 165, 250] },
  monochrome: { bg: "#000000", accent: [255, 255, 255] },
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
  className?: string;
  globalColor?: "default" | "monochrome";
  children?: ReactNode;
}

const KineticGrid = ({
  className = "",
  globalColor = "default",
  children,
}: KineticGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = PALETTES[globalColor] ?? PALETTES.default;
    const [ar, ag, ab] = palette.accent;

    const mq = window.matchMedia?.(FINE_POINTER);
    const rmq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const interactive = !!mq?.matches && !rmq?.matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points: Point[] = [];
    let dots: { x: number; y: number; a: number }[] = [];
    let frame = 0;
    const ripples: Ripple[] = [];

    // Pointer target, lerped toward by `cur`.
    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * CELL;
          const oy = r * CELL;
          const pinned =
            ox <= EDGE_PIN ||
            oy <= EDGE_PIN ||
            ox >= width - EDGE_PIN ||
            oy >= height - EDGE_PIN;
          points.push({ ox, oy, x: ox, y: oy, pinned });
        }
      }

      // Static dot texture for depth — generated once per size.
      const count = Math.round((width * height) / 9000);
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          a: 0.02 + Math.random() * 0.05,
        });
      }
    };

    const at = (r: number, c: number) => points[r * cols + c];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      for (const d of dots) {
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.fillRect(d.x, d.y, 1, 1);
      }

      const glowAt = (x: number, y: number) => {
        if (!interactive || cx < -1000) return 0;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > WARP_RADIUS) return 0;
        return Math.pow(1 - dist / WARP_RADIUS, 2);
      };

      ctx.lineWidth = 1;

      // Lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = at(r, c);
          if (c < cols - 1) {
            const q = at(r, c + 1);
            const g = Math.max(glowAt(p.x, p.y), glowAt(q.x, q.y));
            ctx.strokeStyle = g
              ? `rgba(${ar},${ag},${ab},${0.06 + g * 0.5})`
              : "rgba(255,255,255,0.06)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            const q = at(r + 1, c);
            const g = Math.max(glowAt(p.x, p.y), glowAt(q.x, q.y));
            ctx.strokeStyle = g
              ? `rgba(${ar},${ag},${ab},${0.06 + g * 0.5})`
              : "rgba(255,255,255,0.06)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of points) {
        const g = glowAt(p.x, p.y);
        if (g > 0.02) {
          ctx.fillStyle = `rgba(${ar},${ag},${ab},${0.25 + g * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 + g * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.12)";
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

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = wrap.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };

    const onLeave = () => {
      tx = -9999;
      ty = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        start: performance.now(),
      });
    };

    const onResize = () => {
      build();
      draw();
    };

    build();
    draw();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      wrap.addEventListener("pointerleave", onLeave);
      wrap.addEventListener("click", onClick);
      frame = requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("click", onClick);
    };
  }, [globalColor]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default KineticGrid;