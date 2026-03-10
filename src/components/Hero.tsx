import { motion } from "framer-motion";
import { ArrowRight, Calendar, Zap, GitBranch, Mail, MessageSquare, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container-narrow relative z-10 px-6 md:px-12 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">Available for Projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
          >
            I Build Automations That{" "}
            <span className="text-gradient glow-text">Save Businesses Hours</span>{" "}
            Every Week.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tech Virtual Assistant specializing in workflow automation, system integration, and productivity solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#automations" className="btn-cta">
              View My Automations
              <ArrowRight size={16} />
            </a>
            <a
              href="https://calendly.com/marwinemia0525/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Calendar size={16} />
              Book a Free Discovery Call
            </a>
          </motion.div>

          {/* Automation Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="card-glass p-6 md:p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground font-medium">Automation Workflow</span>
              </div>
              
              {/* Workflow visualization */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                {[
                  { icon: Mail, label: "Incoming Email", color: "accent" },
                  { icon: Zap, label: "Zapier Trigger", color: "cta" },
                  { icon: GitBranch, label: "Auto-Route", color: "accent" },
                  { icon: MessageSquare, label: "Notify Team", color: "cta" },
                ].map((step, i) => (
                  <motion.div 
                    key={step.label}
                    className="flex items-center gap-4 md:gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl bg-${step.color}/10 border border-${step.color}/20 flex items-center justify-center`}
                        style={{
                          background: `hsl(var(--${step.color}) / 0.1)`,
                          borderColor: `hsl(var(--${step.color}) / 0.25)`,
                        }}
                      >
                        <step.icon size={20} style={{ color: `hsl(var(--${step.color}))` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{step.label}</span>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block">
                        <ArrowRight size={16} className="text-muted-foreground/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
