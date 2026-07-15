import { defineTool } from "@lovable.dev/mcp-js";

const services = [
  { name: "AI Automation Systems", description: "Custom AI-powered workflows using ChatGPT, Claude, Gemini, and Grok for lead qualification, content generation, and decision automation." },
  { name: "CRM & Sales Automation", description: "GoHighLevel setup, pipelines, follow-up sequences, and speed-to-lead systems that convert more leads without more staff." },
  { name: "No-Code Workflow Engineering", description: "n8n, Make.com, and Zapier workflows that connect your entire stack — CRM, email, SMS, spreadsheets, payments, and internal tools." },
  { name: "AI-Assisted Development", description: "TypeScript & Python automation, MCP servers, Trigger.dev background jobs, and GitHub Actions CI/CD for production-grade custom automation." },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the four core services Marwin offers: AI automation, CRM/sales automation, no-code workflow engineering, and AI-assisted development.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
  }),
});