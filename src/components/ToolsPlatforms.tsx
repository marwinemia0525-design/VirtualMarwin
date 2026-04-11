import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, Bot, Sparkles, Brain, Briefcase } from "lucide-react";

interface Tool {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
}

const tools: Tool[] = [
  { name: "GoHighLevel", lucideIcon: Zap, color: "hsl(var(--accent))" },
  { name: "n8n", icon: "n8n", color: "#EA4B71" },
  { name: "Make.com", icon: "make", color: "#6D00CC" },
  { name: "Zapier", icon: "zapier", color: "#FF4F00" },
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "Lovable", lucideIcon: Bot, color: "#E040FB" },
  { name: "QuickBooks", icon: "quickbooks", color: "#2CA01C" },
  { name: "Google Workspace", lucideIcon: Briefcase, color: "#4285F4" },
  { name: "AI Integrations", lucideIcon: Brain, color: "hsl(var(--accent))" },
];

const ToolItem = memo(({ tool }: { tool: Tool }) => {
  const renderIcon = () => {
    if (tool.icon) {
      return (
        <img
          src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace("#", "")}`}
          alt={tool.name}
          className="w-5 h-5 sm:w-6 sm:h-6"
          loading="lazy"
        />
      );
    }
    if (tool.lucideIcon) {
      const Icon = tool.lucideIcon;
      return <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: tool.color }} />;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-card border border-border hover:border-accent/30 transition-all duration-300 group cursor-default">
      <div className="transition-transform duration-300 group-hover:scale-110">{renderIcon()}</div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
});

ToolItem.displayName = "ToolItem";

const ToolsPlatforms = () => {
  return (
    <section id="tools" className="py-10 sm:py-14 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-muted-foreground">
            Tools I Work With
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {tools.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
