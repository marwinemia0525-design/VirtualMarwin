import { motion } from "framer-motion";
import { Zap, Workflow, UserCheck, TrendingUp } from "lucide-react";
import marwinImage from "@/assets/marwin-emia.png";

const metrics = [
  {
    value: "10–20+",
    unit: "Hours Saved Weekly",
    description: "Automating repetitive tasks allows businesses to recover valuable time each week.",
  },
  {
    value: "30–50%",
    unit: "Reduction in Manual Tasks",
    description: "Workflow automation reduces the need for repetitive manual work and improves productivity.",
  },
  {
    value: "Faster",
    unit: "Workflows, Fewer Errors",
    description: "Automated systems improve consistency and minimize human mistakes.",
  },
];

const skills = [
  { icon: Zap, title: "Workflow Automation", description: "I build multi-step automations using Make.com, n8n, and Zapier to eliminate manual data entry and connect your business apps. From lead capture to invoice generation — if it's repetitive, I automate it." },
  { icon: Workflow, title: "System Integrations", description: "I connect your CRM, email, spreadsheets, and third-party tools into one seamless system. No more copy-pasting between platforms — your data flows automatically where it needs to go." },
  { icon: TrendingUp, title: "Business Process Optimization", description: "I map your current workflows, identify bottlenecks, and redesign processes for speed and accuracy. My 7+ years in operations management means I understand how real businesses run." },
  { icon: UserCheck, title: "Executive Assistance", description: "I provide high-level administrative support including calendar management, email workflows, research, and reporting. Powered by AI tools so I work faster and smarter than a traditional VA." },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        {/* About Me */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
              About Me
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Tech VA & Automation Specialist
            </h2>
            <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I'm Marwin G. Emia — an automation-focused Virtual Assistant skilled in workflow design, system integration, and building efficient processes for businesses.
              </p>
              <p>
                With 7+ years of management experience and training in modern digital tools, I help businesses eliminate manual work, reduce errors, and scale their operations through smart automation.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {["Zapier", "GoHighLevel", "n8n", "ClickUp", "Airtable"].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border shadow-lg">
                <img
                  src={marwinImage}
                  alt="Marwin G. Emia - Tech VA"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div 
                className="absolute -bottom-3 -right-3 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl -z-10"
                style={{ background: 'var(--gradient-accent)', opacity: 0.15 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Results
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            The Results Businesses Get When They Work With Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.unit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-6 sm:p-8 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent mb-2">{metric.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">{metric.unit}</div>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            What I Specialize In
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-glass p-4 sm:p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{
                  background: `hsl(var(--accent) / 0.1)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                }}
              >
                <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-2">{skill.title}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
