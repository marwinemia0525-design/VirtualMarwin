import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listServices from "./tools/list-services";
import listCaseStudies from "./tools/list-case-studies";
import listToolsStack from "./tools/list-tools-stack";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "marwin-portfolio-mcp",
  title: "Marwin Emia — Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Public MCP server for Marwin Emia's AI Automation portfolio. Use these tools to learn about Marwin's services, case studies, technology stack, and how to book a call.",
  tools: [getProfile, listServices, listCaseStudies, listToolsStack, getContact],
});