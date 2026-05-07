import { memo, useState, useCallback } from "react";
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

const ToolItem = memo(({ tool, index }: { tool: Tool; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const handleError = useCallback(() => setImgError(true), []);

  const renderIcon = () => {
    if (tool.icon && !imgError) {
      return (
        <img
          src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace("#", "")}`}
          alt={tool.name}
          className="w-5 h-5 sm:w-6 sm:h-6"
          loading="lazy"
          onError={handleError}
        />
      );
    }
    if (tool.icon && imgError) {
      return (
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-foreground/70 bg-muted"
        >
          {tool.name.charAt(0)}
        </div>
      );
    }
    if (tool.lucideIcon) {
      const Icon = tool.lucideIcon;
      return <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: tool.color }} />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer group"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
      onHoverStart={() => {}}
    >
      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_hsl(var(--accent)/0.3)]">{renderIcon()}</div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
        {tool.name}
      </span>
    </motion.div>
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

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {row1.map((tool) => (
            <ToolItem key={tool.name} tool={tool} index={row1.indexOf(tool)} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {row2.map((tool) => (
            <ToolItem key={tool.name} tool={tool} index={row2.indexOf(tool) + row1.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
