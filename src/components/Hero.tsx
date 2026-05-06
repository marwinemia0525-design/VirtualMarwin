import { motion } from "framer-motion";
import { ArrowRight, Calendar, ArrowDown, Eye, Zap } from "lucide-react";
import marwinImage from "@/assets/marwin-emia.png";

const heroTools = [
  { name: "GoHighLevel", icon: null, lucideIcon: Zap, color: "hsl(var(--accent))" },
  { name: "n8n", iconUrl: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Make.com", iconUrl: "https://cdn.simpleicons.org/make/6D00CC" },
  { name: "Zapier", iconUrl: "https://cdn.simpleicons.org/zapier/FF4F00" },
];

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "10+", label: "Workflows Built" },
  { value: "8+", label: "Tools Mastered" },
  { value: "100%", label: "Client Satisfaction" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-narrow relative z-10 px-4 sm:px-6 md:px-12 pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16">
        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          {/* Left side - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Available for Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] mb-4 sm:mb-6 tracking-tight"
            >
              I Automate Businesses with{" "}
              <span className="text-gradient glow-text">AI & Smart Workflows</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed"
            >
              Hi, I'm Marwin Emia — an AI Workflow Automation Specialist & Executive Virtual Assistant who builds GoHighLevel, n8n, Make.com, and Zapier pipelines with AI integrations (ChatGPT, Claude, Gemini, Grok) that save time, streamline operations, and drive real business growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
            >
              <a
                href="https://calendly.com/marwinemia0525/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta w-full sm:w-auto"
              >
                <Calendar size={16} />
                Book a Free Call
              </a>
              <a href="#automations" className="btn-secondary w-full sm:w-auto">
                <Eye size={16} />
                View Work
              </a>
            </motion.div>
          </div>

          {/* Right side - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-border shadow-lg relative z-10">
                <img
                  src={marwinImage}
                  alt="Marwin G. Emia - AI Automation Specialist"
                  className="w-full h-full object-cover object-center"
                  width={320}
                  height={320}
                />
              </div>
              <div 
                className="absolute -bottom-3 -right-3 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl -z-0"
                style={{ background: 'var(--gradient-accent)', opacity: 0.15 }}
              />
              {/* Badge under photo */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg">
                <p className="text-[10px] sm:text-xs font-semibold text-accent whitespace-nowrap">AI Automation Specialist</p>
              </div>

              {/* Tool logos row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 sm:gap-5"
              >
                {heroTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
                    title={tool.name}
                  >
                    {tool.iconUrl ? (
                      <img src={tool.iconUrl} alt={tool.name} className="w-6 h-6 sm:w-7 sm:h-7" loading="lazy" />
                    ) : tool.lucideIcon ? (
                      <tool.lucideIcon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: tool.color }} />
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-glass p-4 sm:p-5 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2"
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
