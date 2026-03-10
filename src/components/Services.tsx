import { motion } from "framer-motion";
import { Zap, Users, Link2, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automate repetitive tasks using Zapier, n8n, and GoHighLevel to save hours every week.",
  },
  {
    icon: Users,
    title: "CRM & Task Management Setup",
    description: "Organize teams and streamline operations with Monday.com, ClickUp, Trello, and GoHighLevel CRM.",
  },
  {
    icon: Link2,
    title: "Zapier / Integration Setup",
    description: "Connect your favorite apps and build powerful multi-step automation workflows.",
  },
  {
    icon: TrendingUp,
    title: "Process Optimization",
    description: "Identify inefficiencies and redesign business processes for speed, accuracy, and scale.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What I Can Do For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end automation and virtual assistance solutions tailored for modern businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-8 group cursor-default hover:-translate-y-1 transition-transform duration-300"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{
                  background: `hsl(var(--accent) / 0.1)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                }}
              >
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
