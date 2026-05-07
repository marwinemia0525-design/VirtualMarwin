import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Brain, Bot, Phone, Database, Globe, Mail, MessageSquare,
  CreditCard, Flame, Heart, Webhook, HardDrive, CalendarDays,
  BarChart3, ShoppingCart, Megaphone, Send, Code2, Sparkles, Mic
} from "lucide-react";

interface Tool {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
}

const row1: Tool[] = [
  { name: "Make.com", icon: "make", color: "#6D00CC" },
  { name: "N8N", icon: "n8n", color: "#EA4B71" },
  { name: "Zapier", icon: "zapier", color: "#FF4F00" },
  { name: "GoHighLevel", lucideIcon: BarChart3, color: "#4CAF50" },
  { name: "OpenAI", icon: "openai", color: "#412991" },
  { name: "ChatGPT", lucideIcon: Brain, color: "#10A37F" },
  { name: "Claude", lucideIcon: Bot, color: "#D97757" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF" },
  { name: "Google Sheets", icon: "googlesheets", color: "#34A853" },
  { name: "Slack", icon: "slack", color: "#4A154B" },
  { name: "Notion", icon: "notion", color: "#888888" },
  { name: "ClickUp", icon: "clickup", color: "#7B68EE" },
  { name: "Trello", icon: "trello", color: "#0052CC" },
  { name: "Calendly", icon: "calendly", color: "#006BFF" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59" },
  { name: "Pipedrive", icon: "pipedrive", color: "#1A1A1A" },
  { name: "Shopify", icon: "shopify", color: "#7AB55C" },
];

const row2: Tool[] = [
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "Webhooks", lucideIcon: Webhook, color: "#FF6B6B" },
  { name: "Gmail API", icon: "gmail", color: "#EA4335" },
  { name: "Google Drive", icon: "googledrive", color: "#4285F4" },
  { name: "WhatsApp API", icon: "whatsapp", color: "#25D366" },
  { name: "Twilio", icon: "twilio", color: "#F22F46" },
  { name: "Stripe", icon: "stripe", color: "#635BFF" },
  { name: "Mailchimp", icon: "mailchimp", color: "#FFE01B" },
  { name: "ActiveCampaign", icon: "activecampaign", color: "#356AE6" },
  { name: "Discord", icon: "discord", color: "#5865F2" },
  { name: "Telegram", icon: "telegram", color: "#26A5E4" },
  { name: "Firebase", icon: "firebase", color: "#FFCA28" },
  { name: "Supabase", icon: "supabase", color: "#3FCF8E" },
  { name: "Replit", icon: "replit", color: "#F26207" },
  { name: "Lovable", lucideIcon: Heart, color: "#FF6B9D" },
  { name: "Vapi", lucideIcon: Phone, color: "#7C3AED" },
  { name: "Retell AI", lucideIcon: Mic, color: "#00B4D8" },
  { name: "ElevenLabs", lucideIcon: Sparkles, color: "#000000" },
];

const ToolCard = memo(({ tool }: { tool: Tool }) => {
  const [imgError, setImgError] = useState(false);
  const handleError = useCallback(() => setImgError(true), []);

  const renderIcon = () => {
    if (tool.icon && !imgError) {
      return (
        <img
          src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace("#", "")}`}
          alt={tool.name}
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          loading="lazy"
          onError={handleError}
        />
      );
    }
    if (tool.lucideIcon) {
      const Icon = tool.lucideIcon;
      return <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: tool.color }} />;
    }
    return (
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-foreground/70 bg-muted flex-shrink-0">
        {tool.name.charAt(0)}
      </div>
    );
  };

  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 hover:border-accent/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.25)]">
      <div className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.4)]">
        {renderIcon()}
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
});

ToolCard.displayName = "ToolCard";

const InfiniteRow = ({ tools, direction }: { tools: Tool[]; direction: "left" | "right" }) => {
  const animationClass = direction === "left" ? "animate-[scroll-left_40s_linear_infinite]" : "animate-[scroll-right_40s_linear_infinite]";

  return (
    <div className="relative overflow-hidden group/row">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className={`flex gap-3 sm:gap-4 w-max ${animationClass} group-hover/row:[animation-play-state:paused]`}>
        {[...tools, ...tools, ...tools].map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
};

const ToolsPlatforms = () => {
  return (
    <section id="tools" className="py-14 sm:py-20 px-0 relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 px-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Tools & Platforms I Use
          </h2>
          <p className="text-sm text-muted-foreground">
            Automation, AI, and Business Systems I Work With
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <InfiniteRow tools={row1} direction="left" />
          <InfiniteRow tools={row2} direction="right" />
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
