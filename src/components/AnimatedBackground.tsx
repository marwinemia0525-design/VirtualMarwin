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

const FloatingShape = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{
      left: x,
      top: y,
      background: "hsl(var(--accent))",
      boxShadow: "0 0 8px hsl(var(--accent) / 0.8)",
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.9, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 5,
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
  const yGrid = useTransform(scrollY, [0, 2000], [0, reduce || isMobile ? 0 : -90]);
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

      {/* Grid overlay for enterprise feel */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{ y: yGrid,
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

      {/* (legacy single div removed) */}
      <div
        className="hidden"
        style={{
          display: "none",
        }}
      />

      {/* Workflow nodes + connection lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(244 90% 68%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(189 94% 60%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(270 85% 65%)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nodeGrad">
            <stop offset="0%" stopColor="hsl(189 94% 70%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(244 90% 60%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[
          "M 100 200 Q 400 100 700 300 T 1340 250",
          "M 50 600 Q 350 500 650 700 T 1380 550",
          "M 200 50 Q 500 350 800 200 T 1300 450",
          "M 80 800 Q 480 650 880 850 T 1400 750",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="url(#lineGrad)"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="6 10"
            style={{
              animation: `flow-dash ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}

        {[
          [120, 210], [710, 295], [1320, 245],
          [70, 595], [660, 700], [1370, 555],
          [220, 60], [810, 200], [1290, 450],
        ].map(([cx, cy], i) => (
          <g key={`n-${i}`}>
            <circle cx={cx} cy={cy} r="22" fill="url(#nodeGrad)" opacity="0.6">
              <animate attributeName="r" values="18;28;18" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="3" fill="hsl(189 94% 75%)" />
          </g>
        ))}
      </svg>

      {/* Floating particles */}
      {[...Array(isMobile ? 0 : 24)].map((_, i) => (
        <FloatingShape
          key={i}
          delay={i * 0.4}
          x={`${5 + (i * 7) % 92}%`}
          y={`${8 + (i * 11) % 84}%`}
        />
      ))}

      {/* Animated horizontal scan lines */}
      {!isMobile && (
      <><motion.div
        className="absolute h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5), transparent)`,
          top: "28%",
        }}
        animate={{ x: ["-100%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)`,
          top: "72%",
        }}
        animate={{ x: ["100%", "-100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 13, delay: 4, repeat: Infinity, ease: "linear" }}
      /></>
      )}

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
