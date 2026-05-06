import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, Brain, MessageSquare, Phone, Hash, LayoutGrid, BookOpen, Database } from "lucide-react";

interface Tool {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
}

const row1: Tool[] = [
  { name: "OpenAI / ChatGPT", lucideIcon: Brain, color: "#10A37F" },
  { name: "Claude", lucideIcon: Bot, color: "#D97757" },
  { name: "Google Gemini", icon: "google", color: "#4285F4" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF" },
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "Notion", icon: "notion", color: "888888" },
];

const row2: Tool[] = [
  { name: "Vapi", lucideIcon: Phone, color: "#7C3AED" },
  { name: "Twilio", icon: "twilio", color: "#F22F46" },
  { name: "Slack", icon: "slack", color: "#4A154B" },
  { name: "Trello", icon: "trello", color: "#0052CC" },
  { name: "QuickBooks", icon: "quickbooks", color: "#2CA01C" },
  { name: "Xero", icon: "xero", color: "#13B5EA" },
  { name: "Apify", lucideIcon: Database, color: "#00C853" },
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
    <div className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-card border border-border hover:border-accent/30 hover:scale-105 hover:shadow-lg dark:hover:shadow-[0_0_20px_hsl(var(--accent)/0.08)] transition-all duration-300 group cursor-default">
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
    <section id="tools" className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Tools & Platforms I Use
          </h2>
          <p className="text-sm text-muted-foreground">
            Automation, AI, and Business Systems I Work With
          </p>
        </motion.div>

        {/* Row 1 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
        >
          {row1.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {row2.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
