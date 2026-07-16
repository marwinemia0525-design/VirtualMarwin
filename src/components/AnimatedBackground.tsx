import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingOrb = ({
  size,
  color,
  delay,
  duration,
  initialX,
  initialY,
}: {
  size: number;
  color: string;
  delay: number;
  duration: number;
  initialX: string;
  initialY: string;
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{
      width: size,
      height: size,
      background: color,
      left: initialX,
      top: initialY,
    }}
    animate={{
      x: [0, 80, -40, 60, 0],
      y: [0, -60, 50, -30, 0],
      scale: [1, 1.15, 0.92, 1.08, 1],
      opacity: [0.3, 0.5, 0.25, 0.4, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    }}
  />
);

const AnimatedBackground = () => {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const yOrbs = useTransform(scrollY, [0, 2000], [0, reduce || isMobile ? 0 : -180]);

  // Track resolved theme by observing the html element's class list.
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true,
  );
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Light mode: minimal, static background — no orbs, no workflow SVG, no particles.
  if (!isDark) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        style={{ contain: "strict" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 60%, hsl(var(--background) / 0.6) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ contain: "strict", willChange: "transform" }}
    >
      {/* Static gradient mesh base for depth */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-mesh)", opacity: 0.7 }}
      />

      {/* Subtle static grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Parallax wrapper for orbs */}
      <motion.div className="absolute inset-0" style={{ y: yOrbs }}>
        <FloatingOrb size={500} color="hsl(244 90% 60% / 0.35)" delay={0} duration={24} initialX="-5%" initialY="10%" />
        {!isMobile && (
          <>
            <FloatingOrb size={420} color="hsl(189 94% 55% / 0.28)" delay={6} duration={28} initialX="65%" initialY="55%" />
            <FloatingOrb size={360} color="hsl(270 85% 65% / 0.25)" delay={3} duration={26} initialX="35%" initialY="80%" />
            <FloatingOrb size={300} color="hsl(220 90% 60% / 0.22)" delay={9} duration={30} initialX="80%" initialY="5%" />
          </>
        )}
      </motion.div>

      {/* Vignette to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
