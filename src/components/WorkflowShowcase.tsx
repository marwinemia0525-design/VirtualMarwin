import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import aiContentImg from "@/assets/workflows/AI_Content_Repurposing.png";
import asanaCrmImg from "@/assets/workflows/Asana_CRM_LEAD_Engagement_Workflow.png";
import leadEnrichmentImg from "@/assets/workflows/Automated_Lead_Enrichment.png";

interface Workflow {
  id: string;
  image: string;
  fileName: string;
  platform: string;
  description: string;
  steps: string;
}

const workflows: Workflow[] = [
  {
    id: "ai-content",
    image: aiContentImg,
    fileName: "AI Content Repurposing",
    platform: "Zapier",
    description:
      "This automation monitors Google Drive for new files, extracts content from URLs using AI, generates blog posts, then splits them into paths for publishing to Facebook Pages and LinkedIn simultaneously.",
    steps:
      "Google Drive Trigger → Filter by Zapier → AI Extract Content → AI Generate Blog Posts → Loop Line Items → Split into Paths → Facebook & LinkedIn Publishing",
  },
  {
    id: "asana-crm",
    image: asanaCrmImg,
    fileName: "Asana CRM LEAD Engagement Workflow",
    platform: "Zapier",
    description:
      "A 26-step CRM engagement workflow that routes Asana task updates through multiple paths — Ready to Start, No Response, Quoted, Approved, and Paid & Closed — each triggering tailored emails, follow-ups, and document generation.",
    steps:
      "Asana Updated Task → Split into Paths → Path Conditions → AI Email Generation → Gmail Send → Delay → Filter → Follow-up Emails → Google Drive → Welcome Email",
  },
  {
    id: "lead-enrichment",
    image: leadEnrichmentImg,
    fileName: "Automated Lead Enrichment",
    platform: "Zapier",
    description:
      "Captures incoming leads via webhook, enriches them using Apollo, then splits into priority paths — high-priority leads are saved to Google Sheets with Slack notifications and AI-drafted client emails; low-priority leads get a simple Gmail notification.",
    steps:
      "Webhook Lead In → Formatter Get URL → Apollo Enrichment → Split Paths → High Priority: Sheets + Slack + AI Email Draft + Gmail → Low Priority: Gmail Notification",
  },
];

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const WorkflowShowcase = () => {
  const [selected, setSelected] = useState<Workflow | null>(null);

  return (
    <section id="workflows" className="section-padding relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Workflow Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Real Automations I've Built</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore actual workflow screenshots from automation projects — click any card to see the full breakdown.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((wf, index) => (
            <motion.button
              key={wf.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
              onClick={() => setSelected(wf)}
              className="card-glass group text-left overflow-hidden hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
            >
              {/* Screenshot */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={wf.image}
                  alt={wf.fileName}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/90 text-white backdrop-blur-sm">
                  {wf.platform}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300 line-clamp-1">
                  {wf.fileName}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {wf.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                  View Details <ArrowRight size={12} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
          {selected && (
            <>
              {/* Large screenshot */}
              <div className="relative w-full">
                <img
                  src={selected.image}
                  alt={selected.fileName}
                  className="w-full rounded-t-lg"
                />
                <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent/90 text-white backdrop-blur-sm">
                  {selected.platform}
                </span>
              </div>

              <div className="p-6 space-y-5">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selected.fileName}</DialogTitle>
                  <DialogDescription className="text-sm">
                    Platform: {selected.platform}
                  </DialogDescription>
                </DialogHeader>

                {/* Steps */}
                <div className="rounded-xl border border-border bg-secondary/30 p-5 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Automation Flow</h4>
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                    {selected.steps}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Brief Explanation</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selected.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorkflowShowcase;
