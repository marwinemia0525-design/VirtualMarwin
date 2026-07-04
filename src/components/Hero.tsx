import { motion } from "framer-motion";
import { ArrowRight, Calendar, ArrowDown, Eye, Sparkles } from "lucide-react";
import marwinImage from "@/assets/marwin-emia.webp";
import ghlLogo from "@/assets/ghl-logo.webp";

const heroTools = [
  { name: "GoHighLevel", imgSrc: ghlLogo },
  { name: "n8n", iconUrl: "/icons/n8n.svg" },
  { name: "Make.com", iconUrl: "/icons/make.svg" },
  { name: "Zapier", iconUrl: "/icons/zapier.svg" },
];

const stats = [
  { value: "7+", label: "Yrs Professional Experience" },
  { value: "50+", label: "Workflows Built" },
  { value: "35+", label: "Tools Mastered" },
  { value: "2,000+", label: "Automation Executions" },
  { value: "1.3%", label: "Failure Rate", sub: "across 2,000+ production executions" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Soft hero glow on top of global animated background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-glow)' }} />

      {/* Hero workflow visualization - SVG nodes & flowing connections behind headline */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1200 700"
      >
        <defs>
          <linearGradient id="heroFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(244 90% 68%)" stopOpacity="0.0" />
            <stop offset="50%" stopColor="hsl(189 94% 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(270 85% 65%)" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="heroNode">
            <stop offset="0%" stopColor="hsl(189 94% 75%)" stopOpacity="1" />
            <stop offset="60%" stopColor="hsl(244 90% 68%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(244 90% 68%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          "M 60 380 C 240 280, 360 480, 540 380 S 840 280, 1140 380",
          "M 100 540 C 280 460, 420 620, 600 540 S 900 460, 1160 540",
          "M 40 220 C 220 140, 380 320, 580 220 S 880 140, 1180 220",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="url(#heroFlow)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 8"
            style={{ animation: `flow-dash ${7 + i * 2}s linear infinite`, animationDelay: `${i}s` }}
          />
        ))}
        {[[60, 380], [540, 380], [1140, 380], [100, 540], [600, 540], [1160, 540], [40, 220], [580, 220], [1180, 220]].map(
          ([cx, cy], i) => (
            <g key={`hn-${i}`}>
              <circle cx={cx} cy={cy} r="28" fill="url(#heroNode)">
                <animate attributeName="r" values="22;34;22" dur="3.5s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="4" fill="hsl(189 94% 80%)" />
            </g>
          )
        )}
      </svg>

      <div className="container-narrow relative z-10 px-4 sm:px-6 md:px-12 pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16">
        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          {/* Left side - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-panel text-accent mb-4 sm:mb-6"
            >
              <Sparkles size={12} className="text-accent" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">AI Automation & Systems Architect</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
              Hi, I'm Marwin Emia — an AI & Workflow Automation Specialist who designs GoHighLevel, n8n, Make.com, and Zapier systems with AI integrations (ChatGPT, Claude, Gemini, Grok) that save time, streamline operations, and drive real business growth. I help agencies and growing businesses turn manual work into reliable, scalable systems.
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
            className="flex justify-center lg:justify-end lg:-mt-8 w-full"
          >
            <div className="flex flex-col items-center max-w-full">
              <div className="relative mb-10 max-w-full">
              <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[19rem] lg:h-[19rem] rounded-2xl overflow-hidden border border-border shadow-lg relative z-10">
                <img
                  src={marwinImage}
                  alt="Marwin G. Emia - AI Automation Specialist"
                  className="w-full h-full object-cover object-center"
                  width={304}
                  height={304}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div 
                aria-hidden
                className="absolute -bottom-3 -right-3 w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[19rem] lg:h-[19rem] rounded-2xl -z-0 pointer-events-none"
                style={{ background: 'var(--gradient-accent)', opacity: 0.15 }}
              />
              {/* Badge under photo */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg">
                <p className="text-[10px] sm:text-xs font-semibold text-accent whitespace-nowrap">AI Automation Specialist</p>
              </div>
              </div>

              {/* Tool logos row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center justify-center gap-6 sm:gap-8 px-5 py-3 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at center, hsla(var(--accent), 0.06) 0%, transparent 70%)' }}
              >
                {heroTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="opacity-95 hover:opacity-100 hover:scale-[1.08] transition-all duration-300 hover:drop-shadow-[0_0_8px_hsla(var(--accent),0.4)]"
                    title={tool.name}
                  >
                    {tool.imgSrc ? (
                      <img src={tool.imgSrc} alt={tool.name} className="h-10 sm:h-14 w-auto object-contain" loading="lazy" />
                    ) : tool.iconUrl ? (
                      <img src={tool.iconUrl} alt={tool.name} className="w-11 h-11 sm:w-14 sm:h-14" loading="lazy" />
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-glass p-4 sm:p-5 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
              {stat.sub && (
                <div className="text-[9px] sm:text-[10px] text-muted-foreground/70 mt-1 leading-tight">{stat.sub}</div>
              )}
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
