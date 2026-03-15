import { motion } from "framer-motion";
import { Zap, Link2, TrendingUp, UserCheck } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automating repetitive tasks and connecting business apps to improve efficiency.",
  },
  {
    icon: Link2,
    title: "App Integrations",
    description: "Connecting tools like CRMs, spreadsheets, and communication platforms for seamless workflows.",
  },
  {
    icon: UserCheck,
    title: "Executive Assistance",
    description: "Providing reliable administrative support including calendar management, email management, task organization, research, and business support.",
  },
  {
    icon: TrendingUp,
    title: "Process Optimization",
    description: "Analyzing and improving business processes to save time and reduce manual work.",
  },
];

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const Services = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            What I Can Do For You
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            End-to-end automation, integration, and executive support solutions tailored for modern businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
              className="card-glass p-5 sm:p-8 group cursor-default hover:-translate-y-1 transition-all duration-500 ease-out"
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-colors duration-300"
                style={{
                  background: `hsl(var(--accent) / 0.1)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                }}
              >
                <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
