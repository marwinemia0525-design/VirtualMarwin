import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Get ways to reach Marwin: book a call, LinkedIn, Upwork, and the portfolio website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          book_a_call: "https://calendly.com/marwinemia0525/30min",
          website: "https://marwinai.com",
          published_portfolio: "https://marwinemia.lovable.app",
          message: "Book a free 30-minute discovery call to discuss your automation project.",
        }, null, 2),
      },
    ],
  }),
});