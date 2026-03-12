import { motion } from "framer-motion";
import { Zap, PenTool, Scissors, Monitor, FileSpreadsheet, Presentation } from "lucide-react";
import { useRef, useState } from "react";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface ToolCard {
  name: string;
  icon?: string | null;
  lucideIcon?: React.ElementType;
  color: string;
  category: string;
}

const tools: ToolCard[] = [
  { name: "Zapier", icon: "zapier", color: "#FF4F00", category: "Automation" },
  { name: "n8n", icon: "n8n", color: "#EA4B71", category: "Automation" },
  { name: "Make", icon: "make", color: "#6D00CC", category: "Automation" },
  { name: "GoHighLevel", lucideIcon: Zap, color: "#FF6B35", category: "CRM" },
  { name: "Google Calendar", icon: "googlecalendar", color: "#4285F4", category: "Productivity" },
  { name: "Gmail", icon: "gmail", color: "#EA4335", category: "Productivity" },
  { name: "Google Sheets", icon: "googlesheets", color: "#34A853", category: "Productivity" },
  { name: "Google Docs", icon: "googledocs", color: "#4285F4", category: "Productivity" },
  { name: "Google Drive", icon: "googledrive", color: "#4285F4", category: "Productivity" },
  { name: "Slack", icon: "slack", color: "#4A154B", category: "Communication" },
  { name: "Zoom", icon: "zoom", color: "#0B5CFF", category: "Communication" },
  { name: "Calendly", icon: "calendly", color: "#006BFF", category: "Communication" },
  { name: "Notion", icon: "notion", color: "#000000", category: "Management" },
  { name: "ClickUp", icon: "clickup", color: "#7B68EE", category: "Management" },
  { name: "Trello", icon: "trello", color: "#0052CC", category: "Management" },
  { name: "Monday.com", lucideIcon: Monitor, color: "#FF3D57", category: "Management" },
  { name: "Asana", icon: "asana", color: "#F06A6A", category: "Management" },
  { name: "Airtable", icon: "airtable", color: "#18BFFF", category: "Management" },
  { name: "Canva", icon: "canva", color: "#00C4CC", category: "Design" },
  { name: "CapCut", lucideIcon: Scissors, color: "#000000", category: "Design" },
  { name: "WordPress", icon: "wordpress", color: "#21759B", category: "Design" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59", category: "CRM" },
  { name: "Microsoft Word", lucideIcon: FileSpreadsheet, color: "#2B579A", category: "Productivity" },
  { name: "Microsoft Excel", lucideIcon: FileSpreadsheet, color: "#217346", category: "Productivity" },
  { name: "Microsoft PowerPoint", lucideIcon: Presentation, color: "#B7472A", category: "Productivity" },
];

// Duplicate for seamless loop
const duplicatedTools = [...tools, ...tools];

const ToolsPlatforms = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cta/5 rounded-full blur-[120px]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Integrations
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tools & Platforms I Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated stack of automation, productivity, and communication tools I use to deliver results.
          </p>
        </motion.div>

        {/* Infinite scroll carousel */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          
          <div
            className="flex gap-5 w-max"
            style={{
              animation: `scroll-left ${tools.length * 3}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="group flex-shrink-0 w-36 cursor-pointer"
              >
                <div className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.15)] aspect-square">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                    style={{ background: 'radial-gradient(circle at center, hsl(var(--accent) / 0.08) 0%, transparent 70%)' }} 
                  />
                  
                  <div className="w-10 h-10 flex items-center justify-center relative z-10">
                    {tool.icon ? (
                      <img
                        src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color.replace('#', '')}`}
                        alt={tool.name}
                        className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : tool.lucideIcon ? (
                      <tool.lucideIcon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: tool.color }} />
                    ) : null}
                  </div>

                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center leading-tight relative z-10">
                    {tool.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPlatforms;
