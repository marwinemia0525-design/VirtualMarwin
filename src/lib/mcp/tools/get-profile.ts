import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Get a summary of Marwin Emia — AI Automation & Workflow Specialist. Returns headline, bio, years of experience, and key stats.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: "Marwin G. Emia",
          title: "AI Automation & Workflow Specialist",
          headline: "I automate businesses with AI & smart workflows.",
          bio: "AI & Workflow Automation Specialist who designs GoHighLevel, n8n, Make.com, and Zapier systems with AI integrations (ChatGPT, Claude, Gemini, Grok) that save time, streamline operations, and drive real business growth.",
          stats: {
            years_experience: "7+",
            workflows_built: "50+",
            tools_mastered: "35+",
            automation_executions: "2,000+",
            failure_rate: "1.3% across 2,000+ production executions",
          },
          website: "https://marwinai.com",
        }, null, 2),
      },
    ],
  }),
});