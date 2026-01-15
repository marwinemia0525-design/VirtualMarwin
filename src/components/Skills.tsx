import { motion } from "framer-motion";

const toolCategories = [
  {
    category: "Productivity Suite",
    tools: ["Google Docs", "Google Sheets", "Google Drive", "Google Calendar", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
  },
  {
    category: "CRM & Automation",
    tools: ["GoHighLevel", "Zapier", "n8n", "Airtable"],
  },
  {
    category: "Project Management",
    tools: ["Monday.com", "ClickUp", "Trello"],
  },
  {
    category: "Design & Content",
    tools: ["Canva", "CapCut", "WordPress"],
  },
  {
    category: "Communication",
    tools: ["Zoom", "Slack", "Calendly"],
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

const Skills = () => {
  return (
    <section id="works" className="section-padding bg-secondary/30">
      <div className="container-narrow">
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
                className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground border border-border hover:border-accent hover:bg-accent/5 transition-colors cursor-default"
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
              className="card-glass p-6"
            >
              <h4 className="font-semibold text-foreground mb-4 pb-3 border-b border-border">
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent rounded-lg"
                  >
                    {tool}
                  </span>
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
