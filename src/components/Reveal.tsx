import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
  /** Above-the-fold: animate immediately on mount instead of on scroll. */
  eager?: boolean;
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case "up": return { x: 0, y: d };
    case "down": return { x: 0, y: -d };
    case "left": return { x: d, y: 0 };
    case "right": return { x: -d, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

/**
 * Reusable on-scroll reveal wrapper. Fades + slides in once in view.
 * Honors prefers-reduced-motion.
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 24,
  className,
  once = true,
  as = "div",
  eager = false,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const { x, y } = offset(direction, distance);

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0, transform: "translate3d(0px, 0px, 0)" }
      : { opacity: 0, transform: `translate3d(${x}px, ${y}px, 0)` },
    show: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0)",
      transition: { duration, delay: eager ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  // Eager (above-the-fold) sections animate on mount so any paint change
  // happens during initial paint, not ~1s later after hydration.
  if (eager) {
    return (
      <MotionTag
        className={className}
        style={{ willChange: "opacity, transform" }}
        variants={variants}
        initial="hidden"
        animate="show"
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={{ willChange: "opacity, transform" }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.05, margin: "0px 0px -5% 0px" }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;