import { defineTool } from "@lovable.dev/mcp-js";

const stack = {
  automation_platforms: ["GoHighLevel", "n8n", "Make.com", "Zapier"],
  ai_models: ["OpenAI / ChatGPT", "Anthropic Claude", "Google Gemini", "xAI Grok"],
  voice_ai: ["Vapi", "Retell AI", "ElevenLabs"],
  data_and_storage: ["Airtable", "Google Sheets", "Supabase", "Firebase", "Google Drive"],
  messaging: ["Slack", "Discord", "Telegram", "WhatsApp API", "Twilio", "Gmail API"],
  crm_and_sales: ["GoHighLevel", "HubSpot", "Pipedrive", "ActiveCampaign", "Mailchimp"],
  payments_ecommerce: ["Stripe", "Shopify"],
  dev_tooling: ["TypeScript", "Python", "Trigger.dev", "GitHub Actions", "MCP (Model Context Protocol)"],
  productivity: ["Notion", "ClickUp", "Trello", "Calendly"],
};

export default defineTool({
  name: "list_tools_stack",
  title: "List tools & platforms",
  description: "List the tools, platforms, and technologies Marwin works with, grouped by category.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(stack, null, 2) }],
  }),
});