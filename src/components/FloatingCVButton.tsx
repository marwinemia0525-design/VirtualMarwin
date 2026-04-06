import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const CV_URL = "https://drive.google.com/file/d/1QlzHcE1N0E9-CaAZ-HeyCIBZRhMw01mf/view?usp=sharing";

const FloatingCVButton = () => {
  return (
    <motion.a
      href={CV_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm shadow-lg transition-shadow duration-300 hover:shadow-[0_0_25px_hsl(var(--accent)/0.5)]"
      style={{
        boxShadow: "0 0 15px hsl(var(--accent) / 0.3)",
      }}
      aria-label="View CV"
    >
      <FileText className="w-4 h-4" />
      CV
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping bg-accent/20 pointer-events-none" style={{ animationDuration: "3s" }} />
    </motion.a>
  );
};

export default FloatingCVButton;
