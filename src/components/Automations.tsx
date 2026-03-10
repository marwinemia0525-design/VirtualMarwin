import { motion } from "framer-motion";
import { Mail, FileText, Bell, Users, ArrowRight, CheckCircle, Zap } from "lucide-react";

const automations = [
  {
    title: "Task Automation",
    description: "Email → Task → Spreadsheet workflow",
    steps: [
      { icon: Mail, label: "Email Received" },
      { icon: CheckCircle, label: "Create Task" },
      { icon: FileText, label: "Log to Sheet" },
    ],
    color: "accent",
  },
  {
    title: "Lead Management",
    description: "Form submission → CRM → Notification",
    steps: [
      { icon: FileText, label: "Form Submitted" },
      { icon: Users, label: "Add to CRM" },
      { icon: Bell, label: "Send Alert" },
    ],
    color: "cta",
  },
  {
    title: "Client Onboarding",
    description: "Form → Welcome email → Task creation",
    steps: [
      { icon: FileText, label: "Intake Form" },
      { icon: Mail, label: "Welcome Email" },
      { icon: CheckCircle, label: "Create Tasks" },
    ],
    color: "accent",
  },
];

const Automations = () => {
  return (
    <section id="automations" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Automation Workflows
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sample automations I build for businesses to eliminate manual work and boost efficiency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {automations.map((auto, index) => (
            <motion.div
              key={auto.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-accent" />
                <h3 className="font-semibold text-foreground">{auto.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{auto.description}</p>

              {/* Visual steps */}
              <div className="space-y-3">
                {auto.steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: `hsl(var(--${auto.color}) / 0.1)`,
                          border: `1px solid hsl(var(--${auto.color}) / 0.2)`,
                        }}
                      >
                        <step.icon size={16} style={{ color: `hsl(var(--${auto.color}))` }} />
                      </div>
                      {i < auto.steps.length - 1 && (
                        <div 
                          className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3"
                          style={{ background: `hsl(var(--${auto.color}) / 0.2)` }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-foreground font-medium">{step.label}</span>
                    </div>
                    {i < auto.steps.length - 1 && (
                      <ArrowRight size={12} className="text-muted-foreground/40" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Automations;
