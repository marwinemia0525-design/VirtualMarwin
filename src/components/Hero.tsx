import { motion } from "framer-motion";
import { ArrowRight, Calendar, Zap, GitBranch, Mail, MessageSquare, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container-narrow relative z-10 px-4 sm:px-6 md:px-12 pt-24 pb-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Available for Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-4 sm:mb-6 tracking-tight"
          >
            Helping Businesses{" "}
            <span className="text-gradient glow-text">Save Time, Reduce Errors,</span>{" "}
            and Automate Repetitive Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            I help businesses streamline their operations by building automation workflows and providing reliable executive assistance. My goal is to eliminate repetitive tasks, improve efficiency, and help teams focus on high-value work instead of manual processes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
          >
            <a href="#automations" className="btn-cta w-full sm:w-auto">
              View My Work
              <ArrowRight size={16} />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~0176000d5826043a12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 text-sm hover:-translate-y-0.5 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #14A800 0%, #1DBF00 100%)",
                boxShadow: "0 4px 16px rgba(20, 168, 0, 0.3)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
              </svg>
              Hire Me on Upwork
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

          {/* Automation Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 sm:mt-20 relative"
          >
            <div className="card-glass p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent/60" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/60" />
                <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground font-medium">Automation Workflow</span>
              </div>
              
              <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
                {[
                  { icon: Mail, label: "Incoming Email", color: "accent" },
                  { icon: Zap, label: "Zapier Trigger", color: "cta" },
                  { icon: GitBranch, label: "Auto-Route", color: "accent" },
                  { icon: MessageSquare, label: "Notify Team", color: "cta" },
                ].map((step, i) => (
                  <motion.div 
                    key={step.label}
                    className="flex flex-col md:flex-row items-center gap-2 md:gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  >
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `hsl(var(--${step.color}) / 0.1)`,
                          border: `1px solid hsl(var(--${step.color}) / 0.25)`,
                        }}
                      >
                        <step.icon size={18} className="sm:w-5 sm:h-5" style={{ color: `hsl(var(--${step.color}))` }} />
                      </div>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium whitespace-nowrap">{step.label}</span>
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
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
