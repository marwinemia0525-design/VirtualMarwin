import { motion } from "framer-motion";
import { Zap, Workflow, UserCheck, TrendingUp, Settings, Mail, Linkedin, Calendar } from "lucide-react";
import portraitImage from "@/assets/marwin-portrait.jpg";

const expertise = [
  {
    icon: Zap,
    title: "Full-Stack Workflow Automation",
    description: "Multi-step n8n, Make.com, Zapier & GoHighLevel pipelines connecting your entire tech stack",
  },
  {
    icon: Settings,
    title: "AI Integrations & Prompt Engineering",
    description: "ChatGPT, Claude, Gemini & Grok powered automations and intelligent chatbots",
  },
  {
    icon: Workflow,
    title: "CRM Automation & Lead Capture",
    description: "Lead generation flows, funnels, and automated follow-ups that convert",
  },
  {
    icon: TrendingUp,
    title: "GoHighLevel Configuration & Funnels",
    description: "High-converting sales funnels, CRM setups, and complete automation systems",
  },
  {
    icon: UserCheck,
    title: "Operational Efficiency Systems",
    description: "Process optimization from 7+ years of branch management experience",
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Who I Am
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Turning Repetitive Work Into{" "}
            <span className="text-gradient glow-text">Intelligent Systems</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <img
                  src={portraitImage}
                  alt="Marwin G. Emia - AI Automation Specialist"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
              </div>
              <div 
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
                style={{ background: 'var(--gradient-accent)', opacity: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Right - Bio + Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                <span className="text-gradient">AI Workflow & Automation Specialist</span>
              </h3>
              <p className="text-base sm:text-lg font-semibold text-muted-foreground">
                Executive Virtual Assistant
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I'm Marwin Emia, an AI Workflow Automation Specialist & Executive Virtual Assistant with hands-on expertise in building multi-step pipelines using n8n, Make.com, Zapier, GoHighLevel, and AI integrations (ChatGPT, Claude, Gemini, Grok).
              </p>
              <p>
                I design end-to-end automation systems — from lead capture flows and CRM automations to smart workflows that remove the manual grind from business operations. With 7+ years in branch operations and collection management, I now help clients turn repetitive tasks into intelligent, scalable systems that save time and drive real growth.
              </p>
              <p>
                Leveraging cutting-edge AI tools, I create powerful automations that don't just save time — they actively help businesses attract leads, nurture prospects, and scale efficiently. My work is rooted in practical, results-driven solutions that are built to last.
              </p>
            </div>

            {/* What I Bring to the Table */}
            <div className="card-glass p-5 sm:p-6">
              <h4 className="text-sm sm:text-base font-bold text-foreground mb-4">
                What I Bring to the Table
              </h4>
              <div className="space-y-4">
                {expertise.map((item, index) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: 'hsl(var(--accent) / 0.1)',
                        border: '1px solid hsl(var(--accent) / 0.2)',
                      }}
                    >
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">{item.title}</h5>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:marwinemia0525@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail size={15} className="text-accent" />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/marwin-emia-74a8aa366"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground"
              >
                <Linkedin size={15} className="text-accent" />
                LinkedIn
              </a>
              <a
                href="https://calendly.com/marwinemia0525/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-sm px-4 py-2.5"
              >
                <Calendar size={15} />
                Book a Free Call
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
