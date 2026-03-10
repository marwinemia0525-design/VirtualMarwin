import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(222 47% 8%), hsl(220 43% 14%))' 
          : 'linear-gradient(135deg, hsl(199 89% 85%), hsl(210 40% 92%))',
        boxShadow: isDark 
          ? 'inset 0 2px 4px hsl(0 0% 0% / 0.3), 0 0 12px hsl(199 89% 60% / 0.15)' 
          : 'inset 0 2px 4px hsl(0 0% 0% / 0.08), 0 1px 3px hsl(0 0% 0% / 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Stars in dark mode */}
      <AnimatePresence>
        {isDark && (
          <>
            <motion.div
              className="absolute top-1.5 left-2 w-1 h-1 rounded-full bg-foreground/60"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
            <motion.div
              className="absolute top-3.5 left-4 w-0.5 h-0.5 rounded-full bg-foreground/40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sliding knob */}
      <motion.div
        className="relative w-6 h-6 rounded-full flex items-center justify-center"
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
          backgroundColor: isDark ? 'hsl(220, 13%, 91%)' : 'hsl(45, 93%, 58%)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          boxShadow: isDark 
            ? '0 0 12px hsl(199 89% 60% / 0.3), 0 2px 8px hsl(0 0% 0% / 0.3)' 
            : '0 0 8px hsl(45 93% 58% / 0.4), 0 2px 8px hsl(0 0% 0% / 0.15)',
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Moon size={14} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Sun size={14} className="text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
