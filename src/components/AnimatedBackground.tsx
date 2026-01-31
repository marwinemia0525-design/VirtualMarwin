import { motion } from "framer-motion";

const FloatingOrb = ({ 
  size, 
  color, 
  delay, 
  duration, 
  initialX, 
  initialY 
}: { 
  size: number; 
  color: string; 
  delay: number; 
  duration: number; 
  initialX: string; 
  initialY: string; 
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-20"
    style={{
      width: size,
      height: size,
      background: color,
      left: initialX,
      top: initialY,
    }}
    animate={{
      x: [0, 100, -50, 80, 0],
      y: [0, -80, 60, -40, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      opacity: [0.2, 0.3, 0.15, 0.25, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FloatingShape = ({ 
  delay, 
  x, 
  y 
}: { 
  delay: number; 
  x: string; 
  y: string; 
}) => (
  <motion.div
    className="absolute w-1 h-1 bg-accent rounded-full"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating orbs */}
      <FloatingOrb size={400} color="hsl(var(--accent) / 0.3)" delay={0} duration={20} initialX="10%" initialY="20%" />
      <FloatingOrb size={300} color="hsl(var(--accent) / 0.2)" delay={5} duration={25} initialX="70%" initialY="60%" />
      <FloatingOrb size={250} color="hsl(var(--accent) / 0.15)" delay={10} duration={30} initialX="40%" initialY="80%" />
      <FloatingOrb size={350} color="hsl(var(--primary) / 0.1)" delay={2} duration={22} initialX="80%" initialY="10%" />
      
      {/* Small floating particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingShape 
          key={i} 
          delay={i * 0.5} 
          x={`${5 + (i * 5) % 90}%`} 
          y={`${10 + (i * 7) % 80}%`} 
        />
      ))}
      
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsl(var(--accent) / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 70%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.4, 0.25, 0.35, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Moving gradient line */}
      <motion.div
        className="absolute h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5), transparent)`,
          top: "30%",
        }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3), transparent)`,
          top: "70%",
        }}
        animate={{
          x: ["100%", "-100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 12,
          delay: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
