import { defineTool } from "@lovable.dev/mcp-js";

const caseStudies = [
  { title: "Vehicle Rental Service — Complete GHL Automation System", platform: "GoHighLevel", summary: "7 interconnected workflows covering lead intake, quotes/booking, confirmations, reply detection, no-reply follow-up, and post-rental review." },
  { title: "Patient Speed-to-Lead System", platform: "n8n + GoHighLevel + Claude + Supabase + Twilio + Slack", tag: "Healthcare / HIPAA-aware", summary: "AI-powered patient intake and booking. Claude qualifies urgency, routes by service line, gates on consent, then triggers tiered SMS/email follow-up plus Slack alerts. Projected impact: 20–35% fewer no-shows and $2,500–$3,600/mo recovered revenue for a 50-lead/mo practice." },
  { title: "AI Job Scraper + Resume Optimizer", platform: "n8n", summary: "Scrapes job listings and generates AI-optimized resumes matching each posting." },
  { title: "Facebook Page AI Agent", platform: "n8n", summary: "AI agent that responds to Facebook page messages and comments in-brand." },
  { title: "Fitness Coach — Weekly Client Check-in", platform: "n8n", summary: "Automated weekly progress check-ins with AI-personalized coaching feedback." },
  { title: "Desmark FB Payment Monitor", platform: "n8n", summary: "Monitors Facebook page for payment confirmations and updates internal tracking." },
];

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description: "List selected portfolio case studies and automation projects Marwin has built (GoHighLevel and n8n).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(caseStudies, null, 2) }],
  }),
});