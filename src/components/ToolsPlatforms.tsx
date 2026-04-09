import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, Bot, Sparkles, Brain } from "lucide-react";

interface ToolCard {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
  customIcon?: string;
}

const allTools: ToolCard[] = [
  // Automation & AI
  { name: "Make.com", icon: "make", color: "#6D00CC" },
  { name: "n8n", icon: "n8n", color: "#EA4B71" },
  { name: "Zapier", icon: "zapier", color: "#FF4F00" },
  { name: "GoHighLevel", lucideIcon: Zap, color: "#FF6B35" },
  { name: "OpenAI API", lucideIcon: Brain, color: "#10A37F" },
  { name: "Claude", icon: "anthropic", color: "#D97757" },
  { name: "Gemini", lucideIcon: Sparkles, color: "#4285F4" },
  { name: "Grok", lucideIcon: Brain, color: "#1DA1F2" },
  // Web, CRM & Operations
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "Lovable", lucideIcon: Bot, color: "#E040FB" },
  { name: "QuickBooks", icon: "quickbooks", color: "#2CA01C" },
  { name: "Oracle NetSuite", customIcon: "N", color: "#1B3A5C" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59" },
  { name: "ClickUp", icon: "clickup", color: "#7B68EE" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF" },
  { name: "Calendly", icon: "calendly", color: "#006BFF" },
];

const ToolIcon = memo(({ tool }: { tool: ToolCard }) => {
  if (tool.customIcon) {
    return (
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
        style={{ backgroundColor: tool.color, color: "#fff" }}
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
        className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
        loading="lazy"
      />
    );
  }
  if (tool.lucideIcon) {
    const Icon = tool.lucideIcon;
    return <Icon className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" style={{ color: tool.color }} />;
  }
  return null;
});

ToolIcon.displayName = "ToolIcon";

const ToolChip = memo(({ tool }: { tool: ToolCard }) => (
  <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 bg-card border border-border rounded-xl shrink-0 hover:border-accent/40 hover:scale-105 transition-all duration-300 cursor-default group"
    style={{ minWidth: "fit-content" }}
  >
    <div className="transition-transform duration-300 group-hover:scale-110">
      <ToolIcon tool={tool} />
    </div>
    <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
      {tool.name}
    </span>
  </div>
));

ToolChip.displayName = "ToolChip";

const ScrollRow = ({ tools, direction, speed = 30 }: { tools: ToolCard[]; direction: "left" | "right"; speed?: number }) => {
  // Triple the tools for seamless loop
  const tripled = useMemo(() => [...tools, ...tools, ...tools], [tools]);
  const animName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <div
        className="flex gap-3 sm:gap-4"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          width: "fit-content",
        }}
      >
        {tripled.map((tool, i) => (
          <ToolChip key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
};

const ToolsPlatforms = () => {
  const row1 = allTools.slice(0, 4);
  const row2 = allTools.slice(4, 8);
  const row3 = allTools.slice(8, 12);
  const row4 = allTools.slice(12, 16);

  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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

        <div className="space-y-4 sm:space-y-5">
          <ScrollRow tools={row1} direction="left" speed={35} />
          <ScrollRow tools={row2} direction="left" speed={40} />
          <ScrollRow tools={row3} direction="right" speed={38} />
          <ScrollRow tools={row4} direction="right" speed={33} />
        </div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
