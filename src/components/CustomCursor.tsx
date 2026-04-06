import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const trailX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const trailY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const rafRef = useRef<number>();

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    });
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .interactive, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = "a,button,[role='button'],input,textarea,select{cursor:none!important}[data-no-cursor]{cursor:auto!important}[data-no-cursor] *{cursor:auto!important}";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.documentElement.style.cursor = "";
      document.getElementById("custom-cursor-style")?.remove();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, handleMouseMove]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "hsl(var(--accent))",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "hsl(var(--accent) / 0.5)",
          opacity: isVisible ? 0.7 : 0,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "hsl(var(--accent) / 0.8)" : "hsl(var(--accent) / 0.4)",
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
