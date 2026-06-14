import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const NODE_COUNT = 5;
const LABELS = ["Trigger", "Process", "Automate", "Optimize", "Result"];

// Electric SaaS brand palette (matches index.css dark tokens)
const INDIGO = "#6366f1"; // primary
const CYAN = "#22d3ee";   // accent
const PURPLE = "#a855f7"; // highlight
const BG_FROM = "#070818";
const BG_VIA = "#0b0f24";
const BG_TO = "#050614";

const BrandedLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [exiting, setExiting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => {
        if (prev >= NODE_COUNT - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 600);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 20% 0%, ${INDIGO}33 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, ${CYAN}26 0%, transparent 55%), linear-gradient(180deg, ${BG_FROM} 0%, ${BG_VIA} 50%, ${BG_TO} 100%)`,
          }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />

          {/* Ambient glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] lg:w-[760px] lg:h-[760px] rounded-full will-change-transform"
              style={{
                background: `radial-gradient(circle, ${INDIGO}26 0%, transparent 70%)`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[460px] md:h-[460px] rounded-full will-change-transform"
              style={{
                background: `radial-gradient(circle, ${CYAN}26 0%, transparent 70%)`,
                left: "20%",
                top: "60%",
                transform: "translate(-50%, -50%)",
                filter: "blur(20px)",
              }}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[420px] md:h-[420px] rounded-full will-change-transform"
              style={{
                background: `radial-gradient(circle, ${PURPLE}26 0%, transparent 70%)`,
                right: "15%",
                top: "25%",
                transform: "translate(50%, -50%)",
                filter: "blur(20px)",
              }}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {/* Logo monogram */}
          <motion.div
            className="relative mb-5 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${INDIGO} 0%, ${PURPLE} 50%, ${CYAN} 100%)`,
                boxShadow: `0 10px 40px ${INDIGO}66, 0 0 60px ${CYAN}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}
            >
              <span className="font-display font-bold text-white text-xl sm:text-2xl md:text-3xl tracking-tight">
                ME
              </span>
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                />
              )}
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-2 sm:mb-3 md:mb-4 text-center bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${CYAN} 50%, ${INDIGO} 100%)`,
              filter: `drop-shadow(0 0 30px ${INDIGO}66) drop-shadow(0 0 60px ${CYAN}33)`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Marwin Emia
          </motion.h1>

          <motion.p
            className="text-[10px] sm:text-xs md:text-base lg:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-10 sm:mb-14 md:mb-20 lg:mb-24 text-center max-w-[90vw] leading-relaxed"
            style={{ color: "#9aa3c7" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            AI & Workflow Automation Specialist
          </motion.p>

          {/* Workflow nodes */}
          <div className="relative flex items-center justify-center w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
            {LABELS.map((label, i) => {
              const isActive = i <= activeNode;
              const isCurrent = i === activeNode;
              const nodeColor = i % 2 === 0 ? INDIGO : CYAN;
              return (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <motion.div
                      className="relative w-7 h-7 sm:w-9 sm:h-9 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center will-change-transform"
                      style={{
                        borderColor: isActive ? nodeColor : "rgba(255,255,255,0.12)",
                        background: isActive
                          ? `radial-gradient(circle, ${nodeColor}55 0%, transparent 70%)`
                          : "rgba(255,255,255,0.02)",
                        backdropFilter: "blur(8px)",
                      }}
                      animate={
                        isCurrent && !prefersReducedMotion
                          ? { boxShadow: [`0 0 0px ${nodeColor}00`, `0 0 28px ${nodeColor}cc`, `0 0 0px ${nodeColor}00`] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full"
                        style={{ background: isActive ? nodeColor : "rgba(255,255,255,0.18)" }}
                        animate={isCurrent && !prefersReducedMotion ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </motion.div>
                    <motion.span
                      className="text-[9px] sm:text-[11px] md:text-sm lg:text-base font-medium tracking-wide whitespace-nowrap"
                      style={{ color: isActive ? "#e2e8ff" : "rgba(154,163,199,0.45)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                  </div>
                  {i < NODE_COUNT - 1 && (
                    <div className="relative flex-1 min-w-[14px] max-w-[56px] md:max-w-[120px] lg:max-w-[160px] h-0.5 md:h-1 mx-1.5 sm:mx-3 md:mx-5 lg:mx-6 -mt-4 sm:-mt-5 md:-mt-7 lg:-mt-8">
                      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${INDIGO} 0%, ${CYAN} 100%)`,
                          boxShadow: `0 0 12px ${CYAN}99`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: i < activeNode ? "100%" : "0%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Loading text */}
          <motion.div
            className="mt-10 sm:mt-14 md:mt-20 lg:mt-24 flex items-center gap-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl" style={{ color: "#9aa3c7" }}>
              Automating Your Workflow
            </span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="text-xs sm:text-sm md:text-lg lg:text-xl"
                style={{ color: i === 0 ? INDIGO : i === 1 ? PURPLE : CYAN }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandedLoader;
