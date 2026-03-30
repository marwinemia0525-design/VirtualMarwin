import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NODE_COUNT = 5;
const LABELS = ["Trigger", "Process", "Automate", "Optimize", "Result"];

const BrandedLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [exiting, setExiting] = useState(false);

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(145deg, #020617 0%, #0F172A 50%, #020617 100%)",
          }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(192 91% 43% / 0.08) 0%, transparent 70%)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Logo / Name */}
          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-2"
            style={{
              color: "hsl(192 91% 60%)",
              textShadow: "0 0 30px hsl(192 91% 43% / 0.4), 0 0 60px hsl(192 91% 43% / 0.15)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Marwin Emia
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base tracking-[0.3em] uppercase mb-12 sm:mb-16"
            style={{ color: "hsl(210 40% 60%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Tech & Automation VA
          </motion.p>

          {/* Workflow nodes */}
          <div className="relative flex items-center gap-3 sm:gap-6 md:gap-8 px-4">
            {LABELS.map((label, i) => {
              const isActive = i <= activeNode;
              const isCurrent = i === activeNode;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    {/* Node */}
                    <motion.div
                      className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: isActive ? "hsl(192 91% 43%)" : "hsl(210 40% 25%)",
                        background: isActive
                          ? "radial-gradient(circle, hsl(192 91% 43% / 0.25) 0%, transparent 70%)"
                          : "transparent",
                      }}
                      animate={
                        isCurrent
                          ? { boxShadow: ["0 0 0px hsl(192 91% 43% / 0)", "0 0 20px hsl(192 91% 43% / 0.5)", "0 0 0px hsl(192 91% 43% / 0)"] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                        style={{ background: isActive ? "hsl(192 91% 50%)" : "hsl(210 40% 25%)" }}
                        animate={isCurrent ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </motion.div>
                    {/* Label */}
                    <motion.span
                      className="text-[10px] sm:text-xs font-medium tracking-wide"
                      style={{ color: isActive ? "hsl(192 91% 60%)" : "hsl(210 40% 35%)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                  </div>
                  {/* Connector line */}
                  {i < NODE_COUNT - 1 && (
                    <div className="relative w-6 sm:w-10 md:w-14 h-0.5 ml-3 sm:ml-6 md:ml-8 -mt-5">
                      <div className="absolute inset-0 rounded-full" style={{ background: "hsl(210 40% 20%)" }} />
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: "hsl(192 91% 43%)", boxShadow: "0 0 8px hsl(192 91% 43% / 0.5)" }}
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
            className="mt-12 sm:mt-16 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm sm:text-base" style={{ color: "hsl(210 40% 55%)" }}>
              Automating Your Workflow
            </span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="text-sm sm:text-base"
                style={{ color: "hsl(192 91% 50%)" }}
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
