import { motion } from "framer-motion";
import { Clock, ShieldCheck, Rocket, Settings, Zap, User } from "lucide-react";
import marwinImage from "@/assets/marwin-emia.png";

const benefits = [
  { icon: Clock, title: "Save 10+ Hours Weekly", description: "Automate repetitive tasks so you can focus on growth." },
  { icon: ShieldCheck, title: "Reduce Human Errors", description: "Consistent, reliable automation for accuracy." },
  { icon: Rocket, title: "Faster Operations", description: "Streamlined workflows for quicker turnaround." },
  { icon: Settings, title: "Reliable Systems", description: "Automation that runs 24/7 without intervention." },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        {/* About Me */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tech VA & Automation Specialist
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Marwin G. Emia — an automation-focused Virtual Assistant skilled in workflow design, system integration, and building efficient processes for businesses.
              </p>
              <p>
                With 7+ years of management experience and training in modern digital tools, I help businesses eliminate manual work, reduce errors, and scale their operations through smart automation.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Zapier", "GoHighLevel", "n8n", "ClickUp", "Airtable"].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full"
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
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border shadow-lg">
                <img
                  src={marwinImage}
                  alt="Marwin G. Emia - Tech VA"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Decorative accent */}
              <div 
                className="absolute -bottom-3 -right-3 w-64 h-64 md:w-72 md:h-72 rounded-2xl -z-10"
                style={{ 
                  background: 'var(--gradient-accent)',
                  opacity: 0.15,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Why Work With Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Work With Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-glass p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `hsl(var(--accent) / 0.1)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                }}
              >
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
