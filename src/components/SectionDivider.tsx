import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = "" }: SectionDividerProps) => {
  return (
    <div className={`relative h-24 overflow-hidden ${className}`}>
      {/* Animated line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5), transparent)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Center glow dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"
        style={{ boxShadow: "0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent) / 0.5)" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        animate={{
          boxShadow: [
            "0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent) / 0.5)",
            "0 0 30px hsl(var(--accent)), 0 0 60px hsl(var(--accent) / 0.7)",
            "0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent) / 0.5)",
          ],
        }}
      />
      
      {/* Side decorative elements */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/50"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/50"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
    </div>
  );
};

export default SectionDivider;
