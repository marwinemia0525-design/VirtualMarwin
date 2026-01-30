import { motion } from "framer-motion";

// Tool data with Simple Icons slugs for logos
const toolCategories = [
  {
    category: "Productivity Suite",
    tools: [
      { name: "Google Docs", icon: "googledocs", color: "#4285F4" },
      { name: "Google Sheets", icon: "googlesheets", color: "#34A853" },
      { name: "Google Drive", icon: "googledrive", color: "#4285F4" },
      { name: "Google Calendar", icon: "googlecalendar", color: "#4285F4" },
      { name: "Microsoft Word", icon: null, color: "#2B579A", customIcon: "W" },
      { name: "Microsoft Excel", icon: null, color: "#217346", customIcon: "X" },
      { name: "Microsoft PowerPoint", icon: null, color: "#B7472A", customIcon: "P" },
    ],
  },
  {
    category: "CRM & Automation",
    tools: [
      { name: "GoHighLevel", icon: null, color: "#FF6B35", customIcon: "GHL" },
      { name: "Zapier", icon: "zapier", color: "#FF4F00" },
      { name: "n8n", icon: "n8n", color: "#EA4B71" },
      { name: "Airtable", icon: "airtable", color: "#18BFFF" },
    ],
  },
  {
    category: "Project Management",
    tools: [
      { name: "Monday.com", icon: null, color: "#FF3D57", customIcon: "M" },
      { name: "ClickUp", icon: "clickup", color: "#7B68EE" },
      { name: "Trello", icon: "trello", color: "#0052CC" },
    ],
  },
  {
    category: "Design & Content",
    tools: [
      { name: "Canva", icon: "canva", color: "#00C4CC" },
      { name: "CapCut", icon: null, color: "#000000", customIcon: "CC" },
      { name: "WordPress", icon: "wordpress", color: "#21759B" },
    ],
  },
  {
    category: "Communication",
    tools: [
      { name: "Zoom", icon: "zoom", color: "#0B5CFF" },
      { name: "Slack", icon: "slack", color: "#4A154B" },
      { name: "Calendly", icon: "calendly", color: "#006BFF" },
    ],
  },
];

const skillsList = [
  "Time Management",
  "Task & Project Coordination",
  "Meeting & Calendar Management",
  "Contact Database Management",
  "Research Management",
  "Email Management",
  "Cold Emailing",
  "Lead Generation",
  "Content Writing & Copywriting",
  "SEO Content Writing",
  "Blog & Website Content Creation",
  "Email Marketing",
  "Social Media Management",
  "Video Editing",
  "Content Planning & Scheduling",
  "Order Processing",
];

interface Tool {
  name: string;
  icon: string | null;
  color: string;
  customIcon?: string;
}

const ToolIcon = ({ tool }: { tool: Tool }) => {
  if (tool.customIcon) {
    // Custom icon for tools without Simple Icons
    return (
      <div 
        className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
        style={{ backgroundColor: tool.color }}
      >
        {tool.customIcon}
      </div>
    );
  }
  
  if (tool.icon) {
    // Use Simple Icons CDN with the tool's brand color
    const iconColor = tool.color.replace('#', '');
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <img
          src={`https://cdn.simpleicons.org/${tool.icon}/${iconColor}`}
          alt={tool.name}
          className="w-5 h-5"
          loading="lazy"
        />
      </div>
    );
  }
  
  // Fallback initials
  return (
    <div 
      className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
      style={{ backgroundColor: tool.color }}
    >
      {tool.name.substring(0, 2).toUpperCase()}
    </div>
  );
};

const Skills = () => {
  return (
    <section id="works" className="section-padding relative overflow-hidden section-glow">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proficient in a wide range of digital tools and platforms to deliver exceptional results.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skillsList.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full text-sm font-medium text-foreground border border-border/50 hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-glass card-glow p-6"
            >
              <h4 className="font-semibold text-foreground mb-4 pb-3 border-b border-border/50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.tools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    className="flex items-center gap-2 px-3 py-2 bg-secondary/50 backdrop-blur-sm rounded-lg border border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={tool.name}
                  >
                    <ToolIcon tool={tool} />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
