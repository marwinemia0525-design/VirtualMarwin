import { motion } from "framer-motion";
import { ArrowRight, Calendar, ArrowDown, Send } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container-narrow relative z-10 px-4 sm:px-6 md:px-12 pt-16 pb-12 sm:pt-24 sm:pb-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-4 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Available for Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-4 sm:mb-6 tracking-tight"
          >
            Helping Businesses{" "}
            <span className="text-gradient glow-text">Save Time, Reduce Errors,</span>{" "}
            and Automate Repetitive Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
          >
            I help businesses streamline their operations by building automation workflows and providing reliable executive assistance. My goal is to eliminate repetitive tasks, improve efficiency, and help teams focus on high-value work instead of manual processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
          >
            <a href="#automations" className="btn-cta w-full sm:w-auto">
              View My Work
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-secondary w-full sm:w-auto">
              <Send size={16} />
              Contact Me
            </a>
            <a
              href="https://calendly.com/marwinemia0525/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              <Calendar size={16} />
              Book a Free Discovery Call
            </a>
          </motion.div>


        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
