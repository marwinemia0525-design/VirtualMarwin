import { motion } from "framer-motion";
import { Code2, Bot, Zap, GitBranch, Network, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "TypeScript & Python Automation",
    description: "Custom automation scripts, APIs, and data pipelines written in TypeScript and Python for logic that no-code tools can't reach.",
  },
  {
    icon: Bot,
    title: "Claude Code as Development Partner",
    description: "AI-assisted coding with Claude Code to design, refactor, and ship production-grade automations faster and with fewer bugs.",
  },
  {
    icon: Zap,
    title: "Background Jobs with Trigger.dev",
    description: "Reliable, observable background job orchestration for long-running tasks, retries, and scheduled workflows at scale.",
  },
  {
    icon: GitBranch,
    title: "GitHub Actions CI/CD",
    description: "Automated testing, linting, and deployment pipelines that keep every workflow, edge function, and integration production-ready.",
  },
  {
    icon: Network,
    title: "Model Context Protocol (MCP) Servers",
    description: "Custom MCP servers that give AI agents structured, secure access to your business tools, data, and internal systems.",
  },
];

const AIAssistedDev = () => {
  return (
    <section id="ai-assisted-dev" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              New Capability
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            AI-Assisted <span className="text-gradient glow-text">Development</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Beyond no-code — I ship custom, production-grade automations with modern developer tooling and AI pair-programming.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-glass p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {capabilities.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "hsl(var(--accent) / 0.1)",
                    border: "1px solid hsl(var(--accent) / 0.2)",
                  }}
                >
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAssistedDev;