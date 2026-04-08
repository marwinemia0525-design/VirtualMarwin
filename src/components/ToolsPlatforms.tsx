import { motion } from "framer-motion";
import { Zap, Bot, Sparkles, Brain } from "lucide-react";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface ToolCard {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
  customIcon?: string;
}

const automationTools: ToolCard[] = [
  { name: "Make.com", icon: "make", color: "#6D00CC" },
  { name: "n8n", icon: "n8n", color: "#EA4B71" },
  { name: "Zapier", icon: "zapier", color: "#FF4F00" },
  { name: "GoHighLevel", lucideIcon: Zap, color: "#FF6B35" },
  { name: "OpenAI API", icon: "openai", color: "#412991" },
  { name: "Claude", icon: "anthropic", color: "#D97757" },
  { name: "Gemini", lucideIcon: Sparkles, color: "#4285F4" },
  { name: "Grok", lucideIcon: Brain, color: "#1DA1F2" },
];

const webCrmTools: ToolCard[] = [
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "Lovable", lucideIcon: Bot, color: "#E040FB" },
  { name: "QuickBooks", icon: "quickbooks", color: "#2CA01C" },
  { name: "Oracle NetSuite", customIcon: "N", color: "#1B3A5C" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59" },
  { name: "ClickUp", icon: "clickup", color: "#7B68EE" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF" },
  { name: "Calendly", icon: "calendly", color: "#006BFF" },
];

const ToolIcon = ({ tool }: { tool: ToolCard }) => {
  if (tool.customIcon) {
    return (
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold text-white"
        style={{ backgroundColor: tool.color }}
      >
        {tool.customIcon}
      </div>
    );
  }
  if (tool.icon) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace("#", "")}`}
        alt={tool.name}
        className="w-8 h-8 sm:w-10 sm:h-10"
        loading="lazy"
      />
    );
  }
  if (tool.lucideIcon) {
    const Icon = tool.lucideIcon;
    return <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: tool.color }} />;
  }
  return null;
};

const ToolGrid = ({ tools, label }: { tools: ToolCard[]; label: string }) => (
  <div>
    <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-[0.15em] mb-4 sm:mb-6 text-center">
      {label}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
          className="card-glass flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 group hover:-translate-y-1 transition-all duration-300"
        >
          <div className="transition-transform duration-300 group-hover:scale-110">
            <ToolIcon tool={tool} />
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center leading-tight">
            {tool.name}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

const ToolsPlatforms = () => {
  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-10 sm:mb-14 px-4"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Integrations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            Tools & Platforms I Work With
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            A curated stack of automation, AI, and business tools I use to deliver results.
          </p>
        </motion.div>

        <div className="space-y-10 sm:space-y-14">
          <ToolGrid tools={automationTools} label="Automation & AI" />
          <ToolGrid tools={webCrmTools} label="Web, CRM & Operations" />
        </div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
