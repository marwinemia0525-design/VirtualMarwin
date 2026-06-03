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
}: RevealProps) => {
  const reduce = useReducedMotion();
  const { x, y } = offset(direction, distance);

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;