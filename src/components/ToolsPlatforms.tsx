import { motion } from "framer-motion";
import { Zap, Scissors, Monitor, FileSpreadsheet, Presentation, FileText } from "lucide-react";
import { useState } from "react";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface ToolCard {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
  customIcon?: string;
}

const allTools: ToolCard[] = [
  { name: "Zapier", icon: "zapier", color: "#FF4F00" },
  { name: "n8n", icon: "n8n", color: "#EA4B71" },
  { name: "Make", icon: "make", color: "#6D00CC" },
  { name: "GoHighLevel", lucideIcon: Zap, color: "#FF6B35" },
  { name: "Google Calendar", icon: "googlecalendar", color: "#4285F4" },
  { name: "Gmail", icon: "gmail", color: "#EA4335" },
  { name: "Google Sheets", icon: "googlesheets", color: "#34A853" },
  { name: "Google Docs", icon: "googledocs", color: "#4285F4" },
  { name: "Google Drive", icon: "googledrive", color: "#4285F4" },
  { name: "Slack", customIcon: "S", color: "#4A154B" },
  { name: "Zoom", icon: "zoom", color: "#0B5CFF" },
  { name: "Calendly", icon: "calendly", color: "#006BFF" },
  { name: "Notion", icon: "notion", color: "#000000" },
  { name: "ClickUp", icon: "clickup", color: "#7B68EE" },
  { name: "Trello", icon: "trello", color: "#0052CC" },
  { name: "Monday.com", lucideIcon: Monitor, color: "#FF3D57" },
  { name: "Asana", icon: "asana", color: "#F06A6A" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF" },
  { name: "Canva", customIcon: "C", color: "#00C4CC" },
  { name: "CapCut", lucideIcon: Scissors, color: "#000000" },
  { name: "WordPress", icon: "wordpress", color: "#21759B" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59" },
  { name: "MS Word", lucideIcon: FileText, color: "#2B579A" },
  { name: "MS Excel", lucideIcon: FileSpreadsheet, color: "#217346" },
  { name: "MS PowerPoint", lucideIcon: Presentation, color: "#B7472A" },
];

const chunkTools = (arr: ToolCard[], chunks: number) => {
  const result: ToolCard[][] = Array.from({ length: chunks }, () => []);
  arr.forEach((item, i) => result[i % chunks].push(item));
  return result;
};

const rows = chunkTools(allTools, 4);

const UPWORK_URL = "https://www.upwork.com/freelancers/~0176000d5826043a12";

interface ScrollRowProps {
  tools: ToolCard[];
  direction: "left" | "right";
  speed?: number;
}

const ScrollRow = ({ tools, direction, speed = 40 }: ScrollRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...tools, ...tools, ...tools];
  const duration = tools.length * speed;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex gap-3 sm:gap-4 w-max"
        style={{
          animation: `scroll-${direction} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicated.map((tool, index) => (
          <a
            key={`${tool.name}-${index}`}
            href={UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-24 sm:w-28 md:w-32 cursor-pointer"
          >
            <div className="relative flex flex-col items-center justify-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.15)] aspect-square">
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
                }}
              />
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center relative z-10">
                {tool.customIcon ? (
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-[10px] sm:text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: tool.color }}
                  >
                    {tool.customIcon}
                  </div>
                ) : tool.icon ? (
                  <img
                    src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace("#", "")}`}
                    alt={tool.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : tool.lucideIcon ? (
                  <tool.lucideIcon
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: tool.color }}
                  />
                ) : null}
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center leading-tight relative z-10">
                {tool.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const ToolsPlatforms = () => {
  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cta/5 rounded-full blur-[120px]" />

      <div className="relative z-10">
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
            A curated stack of automation, productivity, and communication tools I use to deliver results.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="space-y-3 sm:space-y-4">
            <ScrollRow tools={rows[0]} direction="left" speed={5} />
            <ScrollRow tools={rows[1]} direction="left" speed={6} />
            <ScrollRow tools={rows[2]} direction="right" speed={5.5} />
            <ScrollRow tools={rows[3]} direction="right" speed={6.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
