import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Workflow, Settings, UserCheck, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PortfolioProject {
  id: string;
  title: string;
  platform: string;
  icon: React.ElementType;
  color: "accent" | "cta";
  summary: string;
  projects: {
    name: string;
    description: string;
    tools: string[];
    workflow: string;
    result: string;
  }[];
}

const portfolioItems: PortfolioProject[] = [
  {
    id: "zapier",
    title: "Zapier Automation Projects",
    platform: "Zapier",
    icon: Zap,
    color: "accent",
    summary: "Multi-step automations connecting business apps to eliminate manual work.",
    projects: [
      {
        name: "Lead Capture Automation",
        description: "Automated lead intake from website forms into CRM with instant email notifications to the sales team.",
        tools: ["Zapier", "Google Forms", "Google Sheets", "Gmail"],
        workflow: "Form Submission → Google Sheets → Email Notification",
        result: "Leads automatically organized and notified to the client within seconds.",
      },
      {
        name: "Client Onboarding Automation",
        description: "Streamlined the entire client onboarding process from form submission to task creation.",
        tools: ["Zapier", "Typeform", "Trello", "Gmail"],
        workflow: "Intake Form → Welcome Email → Task Board Setup",
        result: "Reduced onboarding time from 2 hours to 10 minutes per client.",
      },
    ],
  },
  {
    id: "n8n",
    title: "n8n Automation Projects",
    platform: "n8n",
    icon: Workflow,
    color: "cta",
    summary: "Advanced self-hosted workflows for complex business logic and data processing.",
    projects: [
      {
        name: "CRM Pipeline Automation",
        description: "Built a multi-stage pipeline that automatically moves deals and triggers follow-up sequences.",
        tools: ["n8n", "HubSpot", "Slack", "Google Sheets"],
        workflow: "Deal Stage Change → Slack Alert → Follow-up Email → Log to Sheet",
        result: "Sales team response time improved by 60%.",
      },
    ],
  },
  {
    id: "make",
    title: "Make Automation Projects",
    platform: "Make",
    icon: Settings,
    color: "accent",
    summary: "Visual automation scenarios for marketing, operations, and data sync.",
    projects: [
      {
        name: "Task Management Automation",
        description: "Automated task creation and assignment based on incoming emails and form submissions.",
        tools: ["Make", "Gmail", "ClickUp", "Slack"],
        workflow: "Email Received → Parse Content → Create Task → Notify Team",
        result: "Eliminated 5+ hours of weekly manual task entry.",
      },
    ],
  },
  {
    id: "ghl",
    title: "GoHighLevel System Setup",
    platform: "GoHighLevel",
    icon: Zap,
    color: "cta",
    summary: "Full CRM and marketing automation setup for agencies and service businesses.",
    projects: [
      {
        name: "Agency CRM & Pipeline Setup",
        description: "Configured a complete GoHighLevel instance with pipelines, automations, and client portals.",
        tools: ["GoHighLevel", "Calendly", "Stripe"],
        workflow: "Lead Capture → Pipeline Stage → Automated Follow-up → Booking",
        result: "Client converted 40% more leads with automated follow-ups.",
      },
    ],
  },
  {
    id: "ea",
    title: "Executive Assistant Work",
    platform: "Executive Support",
    icon: UserCheck,
    color: "accent",
    summary: "Professional administrative support for executives and entrepreneurs.",
    projects: [
      {
        name: "Executive Calendar & Email Management",
        description: "Managed complex calendars, inbox zero systems, and meeting coordination for C-level executives.",
        tools: ["Google Workspace", "Calendly", "Notion", "Slack"],
        workflow: "Email Triage → Calendar Scheduling → Meeting Prep → Follow-up",
        result: "Executive saved 15+ hours per week on administrative tasks.",
      },
    ],
  },
];

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const Automations = () => {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  return (
    <section id="automations" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real projects and systems I've built for businesses — click to explore details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: easing }}
              onClick={() => setSelected(item)}
              className="card-glass p-6 text-left group hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                  background: `hsl(var(--${item.color}) / 0.1)`,
                  border: `1px solid hsl(var(--${item.color}) / 0.2)`,
                }}
              >
                <item.icon
                  className="w-5 h-5"
                  style={{ color: `hsl(var(--${item.color}))` }}
                />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {item.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all duration-300">
                View Projects <ArrowRight size={12} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `hsl(var(--${selected.color}) / 0.1)`,
                      border: `1px solid hsl(var(--${selected.color}) / 0.2)`,
                    }}
                  >
                    <selected.icon
                      className="w-5 h-5"
                      style={{ color: `hsl(var(--${selected.color}))` }}
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selected.title}</DialogTitle>
                    <DialogDescription>{selected.summary}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {selected.projects.map((project) => (
                  <div
                    key={project.name}
                    className="rounded-xl border border-border bg-secondary/30 p-5 space-y-3"
                  >
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      {project.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium text-foreground">Workflow: </span>
                        <span className="text-muted-foreground">{project.workflow}</span>
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Result: </span>
                        <span className="text-muted-foreground">{project.result}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Automations;
