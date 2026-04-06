import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import Certifications from "./Certifications";

const experiences = [
  {
    type: "work",
    title: "AI Workflow & Automation Specialist (Member)",
    company: "Technical Virtual Assistants PH",
    period: "2025 — Present",
    description: "Joined a pioneering AI-powered Technical VA community in the Philippines focused on workflow automation.",
    highlights: [
      "Mastering GoHighLevel, Make.com, n8n, Zapier, WordPress & Lovable",
      "Building AI integrations with ChatGPT, Gemini, Claude & Grok",
      "Developing CRM automation, lead capture flows & multi-system integrations",
    ],
  },
  {
    type: "work",
    title: "Branch Manager",
    company: "Desmark Corporation - Digos Branch",
    period: "July 2022 - Present",
    description: "Managed branch budget within 5% of figures while exceeding sales targets by 20%. Improved collection efficiency by 18% through optimized processes and tailored payment plans.",
    highlights: ["Budget Management", "Sales Leadership", "Team Supervision"],
  },
  {
    type: "work",
    title: "Branch Manager",
    company: "Premio Corporation - Matina Branch",
    period: "April 2021 - July 2022",
    description: "Promoted from Branch OIC due to outstanding leadership and operational performance. Led branch operations and achieved consistent sales growth.",
    highlights: ["Operations Management", "Staff Leadership", "Performance Excellence"],
  },
  {
    type: "work",
    title: "Branch OIC",
    company: "Premio Corporation - Matina Branch",
    period: "November 2020 - April 2021",
    description: "Assumed responsibility for branch operations and staff supervision in the absence of the Branch Manager.",
    highlights: ["Operations Oversight", "Team Management"],
  },
  {
    type: "work",
    title: "Credit Investigator / Collection Officer",
    company: "Premio Corporation - Matina Branch",
    period: "October 2017 - November 2020",
    description: "Investigated creditworthiness of customers and managed overdue accounts. Successfully reduced overdue accounts by 18%.",
    highlights: ["Credit Analysis", "Collections", "Customer Relations"],
  },
  {
    type: "work",
    title: "Product Field Specialist",
    company: "LG Electronics, Du Ek Sam Digos",
    period: "June 2017 - September 2017",
    description: "Demonstrated product features and benefits to customers. Worked towards achieving daily, weekly, and monthly sales targets.",
    highlights: ["Product Demonstration", "Sales Achievement"],
  },
];

const education = {
  degree: "Bachelor of Arts",
  major: "Major in English",
  school: "Southeastern College of Padada",
  period: "November 2015 - May 2017",
};


const Experience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden section-glow">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Over 7 years of progressive experience in management, operations, and customer service.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line hidden md:block" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative md:pl-16"
              >
                {/* Timeline Dot */}
                <div 
                  className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-accent/50 items-center justify-center transition-all duration-500 ease-out hover:scale-110 hover:border-accent"
                  style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' }}
                >
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                
                <div className="card-glass card-glow p-6 transition-all duration-500 ease-out hover:translate-x-2">
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

        {/* Education */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass card-glow p-6 max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{education.degree}</h4>
              <p className="text-muted-foreground">{education.major}</p>
              <p className="text-sm text-muted-foreground mt-1">{education.school}</p>
              <p className="text-sm text-accent mt-2">{education.period}</p>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Certifications />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
