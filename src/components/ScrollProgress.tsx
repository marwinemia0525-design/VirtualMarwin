import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar pinned to the top of the viewport,
 * tracking how far the user has scrolled through the page.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "var(--gradient-accent)",
        boxShadow: "0 0 12px hsl(var(--accent) / 0.6)",
      }}
    />
  );
};

export default ScrollProgress;