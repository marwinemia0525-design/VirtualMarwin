import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "AI Workflow & Automation Specialist",
    company: "Technical Virtual Assistants PH",
    period: "2025 — Present",
    description: "Building AI-powered automation workflows for businesses using no-code and low-code platforms.",
    highlights: ["Make.com", "n8n", "Zapier", "GoHighLevel", "OpenAI API", "Claude", "Gemini"],
  },
  {
    title: "Branch Manager & Operations Lead",
    company: "Desmark Corp & Premio Corp",
    period: "2017 — 2024",
    description: "Managed full branch operations for 7+ years across multiple locations, exceeding sales targets by 20% and improving collection efficiency by 18% through process optimization.",
    highlights: ["Operations Management", "Team Leadership", "Process Optimization"],
  },
];

const CV_LINK = "https://drive.google.com/file/d/1Mm46QUWXtofvPvMsZzwZLrEOx10Ch8IT/view?usp=sharing";

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden section-glow">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From 7+ years in operations management to AI-powered automation specialist.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative md:pl-16"
              >
                <div
                  className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-accent/50 items-center justify-center transition-all duration-500 ease-out hover:scale-110 hover:border-accent"
                  style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' }}
                >
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <div className="card-glass p-6 transition-all duration-500 ease-out hover:translate-x-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full border border-accent/20">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 text-xs font-medium bg-secondary/50 backdrop-blur-sm rounded-full text-secondary-foreground border border-border/30 cursor-default transition-all duration-300 ease-out hover:scale-105 hover:border-accent/50"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground text-sm mb-2">Want the full career history?</p>
          <a
            href={CV_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors duration-300"
          >
            Download My CV
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
