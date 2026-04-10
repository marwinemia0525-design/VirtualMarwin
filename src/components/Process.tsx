import { motion } from "framer-motion";
import { Phone, Search, FileText, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Book a Call",
    description: "Schedule a free 30-minute call through my calendar. No commitment needed — just a quick chat to see if we're a good fit.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discovery Call",
    description: "We dive deep into your business — what's manual, what's repetitive, and where automation (and AI) can make the biggest impact on your time and revenue.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Strategy & Proposal",
    description: "I map out the exact automation system tailored to your workflow — tools (GoHighLevel, n8n, Make.com, Zapier), AI integrations, timeline, and a clear breakdown of what gets built and why.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Build & Test",
    description: "I build your custom automation workflows end-to-end using n8n, Make.com, GoHighLevel, and AI (ChatGPT, Claude, Gemini, Grok). I test every trigger and action to make sure everything runs perfectly.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch & Handover",
    description: "We go live, I walk you through how everything works, hand over full access, train you, and provide ongoing support so you're never left wondering.",
  },
];

const Process = () => {
  return (
    <section id="process" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            From First Call to <span className="text-gradient glow-text">Full Automation</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Simple, straightforward process — no fluff, no confusion. Here's exactly what happens when you work with me.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Circle on timeline */}
                <div
                  className="absolute left-0 top-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center z-10 border-2 border-accent/30 bg-card"
                  style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.15)' }}
                >
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>

                {/* Dotted connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[23px] sm:left-[31px] top-12 sm:top-16 h-6 sm:h-8 border-l-2 border-dashed border-accent/20" />
                )}

                <div className="card-glass p-5 sm:p-6 hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent font-bold text-lg sm:text-xl font-display">{step.number}</span>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
