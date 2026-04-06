import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Workflow, Settings, UserCheck, ArrowRight, ArrowLeft, CheckCircle2, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import aiContentImg from "@/assets/workflows/AI_Content_Repurposing.png";
import asanaCrmImg from "@/assets/workflows/Asana_CRM_LEAD_Engagement_Workflow.png";
import leadEnrichmentImg from "@/assets/workflows/Automated_Lead_Enrichment.png";
import gmailAttachmentImg from "@/assets/workflows/AI_Powered_Gmail_Attachment_Auto_Renamer_Organizer_Make.png";
import xeroAsanaImg from "@/assets/workflows/Automated_Xero_Asana_CSV_Attachment_Make.png";

import approvedContent from "@/assets/ea-samples/Approved_Content_Scheduled.png";
import carouselScheduling from "@/assets/ea-samples/Carousel_Post_Scheduling.png";
import funFriday from "@/assets/ea-samples/Fun_Friday_Content_Scheduling.png";
import promoContent from "@/assets/ea-samples/Promotional_Content_Scheduling.png";
import sundayContent from "@/assets/ea-samples/Sunday_Content_Scheduling.png";
import bookingPage from "@/assets/ea-samples/Booking_Page_Creation.jpg";
import calendarMgmt from "@/assets/ea-samples/Calendar_Management.jpg";
import emailFilters from "@/assets/ea-samples/Email_Filters.jpg";
import emailVacation from "@/assets/ea-samples/Email_Vacation_Responder.jpg";
import adCampaign from "@/assets/ea-samples/Ad_Campaign_Management.jpg";

interface WorkflowItem {
  image: string;
  fileName: string;
  description: string;
  steps: string;
}

interface EASample {
  image: string;
  title: string;
  task: string;
  description: string;
}

interface PortfolioProject {
  id: string;
  title: string;
  platform: string;
  icon: React.ElementType;
  color: "accent" | "cta";
  summary: string;
  projects: {
    name: string;
    description: string;
    tools: string[];
    workflow: string;
    result: string;
  }[];
  workflows?: WorkflowItem[];
  eaSamples?: EASample[];
}

const portfolioItems: PortfolioProject[] = [
  {
    id: "zapier",
    title: "Zapier Automation Projects",
    platform: "Zapier",
    icon: Zap,
    color: "accent",
    summary: "Multi-step automations connecting business apps to eliminate manual work.",
    projects: [
      {
        name: "Lead Capture Automation",
        description: "Automated lead intake from website forms into CRM with instant email notifications to the sales team.",
        tools: ["Zapier", "Google Forms", "Google Sheets", "Gmail"],
        workflow: "Form Submission → Google Sheets → Email Notification",
        result: "Leads automatically organized and notified to the client within seconds.",
      },
      {
        name: "Client Onboarding Automation",
        description: "Streamlined the entire client onboarding process from form submission to task creation.",
        tools: ["Zapier", "Typeform", "Trello", "Gmail"],
        workflow: "Intake Form → Welcome Email → Task Board Setup",
        result: "Reduced onboarding time from 2 hours to 10 minutes per client.",
      },
    ],
    workflows: [
      {
        image: aiContentImg,
        fileName: "AI Content Repurposing",
        description: "Monitors Google Drive for new files, extracts content using AI, generates blog posts, then splits into paths for publishing to Facebook Pages and LinkedIn simultaneously.",
        steps: "Google Drive Trigger → Filter by Zapier → AI Extract Content → AI Generate Blog Posts → Loop Line Items → Split into Paths → Facebook & LinkedIn Publishing",
      },
      {
        image: asanaCrmImg,
        fileName: "Asana CRM LEAD Engagement Workflow",
        description: "A 26-step CRM engagement workflow that routes Asana task updates through multiple paths — Ready to Start, No Response, Quoted, Approved, and Paid & Closed — each triggering tailored emails, follow-ups, and document generation.",
        steps: "Asana Updated Task → Split into Paths → Path Conditions → AI Email Generation → Gmail Send → Delay → Filter → Follow-up Emails → Google Drive → Welcome Email",
      },
      {
        image: leadEnrichmentImg,
        fileName: "Automated Lead Enrichment",
        description: "Captures incoming leads via webhook, enriches them using Apollo, then splits into priority paths — high-priority leads are saved to Google Sheets with Slack notifications and AI-drafted client emails.",
        steps: "Webhook Lead In → Formatter Get URL → Apollo Enrichment → Split Paths → High Priority: Sheets + Slack + AI Email Draft + Gmail → Low Priority: Gmail Notification",
      },
    ],
  },
  {
    id: "n8n",
    title: "n8n Automation Projects",
    platform: "n8n",
    icon: Workflow,
    color: "cta",
    summary: "Advanced self-hosted workflows for complex business logic and data processing.",
    projects: [
      {
        name: "CRM Pipeline Automation",
        description: "Built a multi-stage pipeline that automatically moves deals and triggers follow-up sequences.",
        tools: ["n8n", "HubSpot", "Slack", "Google Sheets"],
        workflow: "Deal Stage Change → Slack Alert → Follow-up Email → Log to Sheet",
        result: "Sales team response time improved by 60%.",
      },
    ],
  },
  {
    id: "make",
    title: "Make Automation Projects",
    platform: "Make",
    icon: Settings,
    color: "accent",
    summary: "Visual automation scenarios for marketing, operations, and data sync.",
    projects: [
      {
        name: "Task Management Automation",
        description: "Automated task creation and assignment based on incoming emails and form submissions.",
        tools: ["Make", "Gmail", "ClickUp", "Slack"],
        workflow: "Email Received → Parse Content → Create Task → Notify Team",
        result: "Eliminated 5+ hours of weekly manual task entry.",
      },
    ],
    workflows: [
      {
        image: gmailAttachmentImg,
        fileName: "AI-Powered Gmail Attachment Auto-Renamer & Organizer",
        description: "Watches Gmail for new emails, lists attachments, uploads files to AI for analysis, generates smart file names, uploads renamed attachments to Google Drive, logs everything to Google Sheets, and sends an email notification summary.",
        steps: "Gmail Watch → List Attachments → Upload to AI (Analyza) → Generate New File Name → Upload to Google Drive → Save Log to Google Sheets → Send Email Notification",
      },
      {
        image: xeroAsanaImg,
        fileName: "Automated Xero → Asana CSV Attachment",
        description: "Monitors Asana for completed tasks, pulls financial data from Xero via API, routes through a multi-path workflow that iterates data, logs to Google Sheets, aggregates text, and uploads CSV attachments back to Asana with automatic sheet cleanup.",
        steps: "Asana Watch Tasks → Xero API Call → Router → Iterator → Google Sheets Log → Tools Sleep → Get Range Values → Text Aggregator → Asana Upload Attachment → Google Sheets Clear Range",
      },
    ],
  },
  {
    id: "ghl",
    title: "GoHighLevel System Setup",
    platform: "GoHighLevel",
    icon: Zap,
    color: "cta",
    summary: "Full CRM and marketing automation setup for agencies and service businesses.",
    projects: [
      {
        name: "Agency CRM & Pipeline Setup",
        description: "Configured a complete GoHighLevel instance with pipelines, automations, and client portals.",
        tools: ["GoHighLevel", "Calendly", "Stripe"],
        workflow: "Lead Capture → Pipeline Stage → Automated Follow-up → Booking",
        result: "Client converted 40% more leads with automated follow-ups.",
      },
    ],
  },
  {
    id: "ea",
    title: "Executive Assistant Work",
    platform: "Executive Support",
    icon: UserCheck,
    color: "accent",
    summary: "Professional administrative support for executives and entrepreneurs.",
    projects: [
      {
        name: "Executive Calendar & Email Management",
        description: "Managed complex calendars, inbox zero systems, and meeting coordination for C-level executives.",
        tools: ["Google Workspace", "Calendly", "Notion", "Slack"],
        workflow: "Email Triage → Calendar Scheduling → Meeting Prep → Follow-up",
        result: "Executive saved 15+ hours per week on administrative tasks.",
      },
    ],
    eaSamples: [
      { image: approvedContent, title: "Approved Content Scheduled", task: "Social Media Content Scheduling", description: "Scheduled and managed approved social media content across Facebook and Instagram using Meta Business Suite, ensuring consistent posting cadence and audience engagement." },
      { image: carouselScheduling, title: "Carousel Post Scheduling", task: "Carousel Content Creation & Scheduling", description: "Created and scheduled carousel posts with engaging copy, hashtags, and cross-platform publishing to Facebook and Instagram for maximum reach." },
      { image: funFriday, title: "Fun Friday Content Scheduling", task: "Themed Content Scheduling", description: "Planned and scheduled themed weekly content series like Fun Friday posts, maintaining brand voice and community engagement through consistent storytelling." },
      { image: promoContent, title: "Promotional Content Scheduling", task: "Promotional Campaign Scheduling", description: "Managed promotional campaign content scheduling with targeted dates, cross-platform publishing, and audience-optimized timing for maximum conversions." },
      { image: sundayContent, title: "Sunday Content Scheduling", task: "Inspirational Content Series", description: "Curated and scheduled inspirational weekly content series with culturally relevant themes, driving community engagement and brand identity." },
      { image: bookingPage, title: "Booking Page Creation", task: "Appointment Booking Setup", description: "Set up and configured Google Calendar appointment scheduling pages with video conferencing integration, enabling seamless client booking for strategy calls." },
      { image: calendarMgmt, title: "Calendar Management", task: "Calendar Management", description: "Managed and organized executive calendars, scheduled meetings, coordinated appointments, and maintained organized notes to ensure efficient time management." },
      { image: emailFilters, title: "Email Filters Setup", task: "Email Management & Organization", description: "Configured Gmail filters and labels to automatically categorize incoming emails, maintaining inbox zero policy and ensuring important communications are never missed." },
      { image: emailVacation, title: "Email Vacation Responder", task: "Email Automation & Templates", description: "Set up professional out-of-office vacation responders, email labels, and organizational systems for efficient executive email management." },
      { image: adCampaign, title: "Ad Campaign Management", task: "Social Media Ad Management", description: "Managed Facebook and Instagram ad campaigns through Ads Manager, including creative placement optimization across feeds, stories, and explore for maximum visibility." },
    ],
  },
];

// Flatten all viewable items for next/prev navigation
const getAllViewableItems = (project: PortfolioProject) => {
  const items: { type: "workflow" | "ea"; data: WorkflowItem | EASample }[] = [];
  project.workflows?.forEach((wf) => items.push({ type: "workflow", data: wf }));
  project.eaSamples?.forEach((ea) => items.push({ type: "ea", data: ea }));
  return items;
};

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const Automations = () => {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [selectedEA, setSelectedEA] = useState<EASample | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const navigateItem = useCallback((direction: 1 | -1) => {
    if (!selected) return;
    const items = getAllViewableItems(selected);
    const currentIndex = items.findIndex((item) => {
      if (selectedWorkflow && item.type === "workflow") return (item.data as WorkflowItem).fileName === selectedWorkflow.fileName;
      if (selectedEA && item.type === "ea") return (item.data as EASample).title === selectedEA.title;
      return false;
    });
    if (currentIndex === -1) return;
    const newIndex = (currentIndex + direction + items.length) % items.length;
    const next = items[newIndex];
    if (next.type === "workflow") { setSelectedWorkflow(next.data as WorkflowItem); setSelectedEA(null); }
    else { setSelectedEA(next.data as EASample); setSelectedWorkflow(null); }
  }, [selected, selectedWorkflow, selectedEA]);

  const currentItemLabel = () => {
    if (!selected) return "";
    const items = getAllViewableItems(selected);
    const currentIndex = items.findIndex((item) => {
      if (selectedWorkflow && item.type === "workflow") return (item.data as WorkflowItem).fileName === selectedWorkflow.fileName;
      if (selectedEA && item.type === "ea") return (item.data as EASample).title === selectedEA.title;
      return false;
    });
    if (currentIndex === -1) return "";
    return `${currentIndex + 1} / ${items.length}`;
  };

  return (
    <section id="automations" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">My Work</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Real projects and systems I've built for businesses — click to explore details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolioItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: easing }}
              onClick={() => setSelected(item)}
              className="card-glass p-4 sm:p-6 text-left group hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
            >
              {item.workflows && item.workflows.length > 0 && (
                <div className="mb-3 sm:mb-4 rounded-lg overflow-hidden aspect-[16/9] border border-border/50">
                  <img
                    src={item.workflows[0].image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              {item.eaSamples && item.eaSamples.length > 0 && !item.workflows && (
                <div className="mb-3 sm:mb-4 rounded-lg overflow-hidden aspect-[16/9] border border-border/50">
                  <img
                    src={item.eaSamples[0].image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              {!item.workflows && !item.eaSamples && (
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300"
                  style={{
                    background: `hsl(var(--${item.color}) / 0.1)`,
                    border: `1px solid hsl(var(--${item.color}) / 0.2)`,
                  }}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: `hsl(var(--${item.color}))` }} />
                </div>
              )}
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                {item.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all duration-300">
                View Projects <ArrowRight size={12} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Detail Modal */}
      <Dialog open={!!selected && !selectedWorkflow && !selectedEA} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `hsl(var(--${selected.color}) / 0.1)`,
                      border: `1px solid hsl(var(--${selected.color}) / 0.2)`,
                    }}
                  >
                    <selected.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: `hsl(var(--${selected.color}))` }} />
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-lg sm:text-xl">{selected.title}</DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">{selected.summary}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Workflow Screenshots */}
              {selected.workflows && selected.workflows.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Workflow Screenshots
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selected.workflows.map((wf) => (
                      <button
                        key={wf.fileName}
                        onClick={() => setSelectedWorkflow(wf)}
                        className="rounded-xl border border-border bg-secondary/30 overflow-hidden text-left group hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={wf.image} alt={wf.fileName} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-2.5 sm:p-3">
                          <h5 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">{wf.fileName}</h5>
                          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mt-0.5">{wf.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* EA Work Samples Grid */}
              {selected.eaSamples && selected.eaSamples.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Work Samples
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selected.eaSamples.map((sample) => (
                      <button
                        key={sample.title}
                        onClick={() => setSelectedEA(sample)}
                        className="rounded-xl border border-border bg-secondary/30 overflow-hidden text-left group hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={sample.image} alt={sample.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="p-2.5 sm:p-3">
                          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-accent block mb-0.5">{sample.task}</span>
                          <h5 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">{sample.title}</h5>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text-based Projects */}
              <div className="space-y-3 sm:space-y-4 mt-4">
                {selected.projects.map((project) => (
                  <div key={project.name} className="rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      {project.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span key={tool} className="text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{tool}</span>
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm space-y-1">
                      <p><span className="font-medium text-foreground">Workflow: </span><span className="text-muted-foreground">{project.workflow}</span></p>
                      <p><span className="font-medium text-foreground">Result: </span><span className="text-muted-foreground">{project.result}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Workflow Detail Modal */}
      <AnimatePresence>
        {selectedWorkflow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedWorkflow(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl max-w-[95vw] sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full">
                <img
                  src={selectedWorkflow.image}
                  alt={selectedWorkflow.fileName}
                  className="w-full rounded-t-2xl cursor-zoom-in"
                  onClick={() => setZoomedImage(selectedWorkflow.image)}
                />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/90 text-white backdrop-blur-sm">Zapier</span>
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => setZoomedImage(selectedWorkflow.image)}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">{selectedWorkflow.fileName}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Platform: Zapier</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-3 sm:p-5 space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">Automation Flow</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed break-words">{selectedWorkflow.steps}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">Brief Explanation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{selectedWorkflow.description}</p>
                </div>
                {/* Navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <button onClick={() => navigateItem(-1)} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:text-foreground transition-colors">
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="text-xs text-muted-foreground">{currentItemLabel()}</span>
                  <button onClick={() => navigateItem(1)} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:text-foreground transition-colors">
                    Next <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  onClick={() => { setSelectedWorkflow(null); }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} /> Back to {selected?.title}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EA Sample Detail Modal */}
      <AnimatePresence>
        {selectedEA && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedEA(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl max-w-[95vw] sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedEA.image}
                  alt={selectedEA.title}
                  className="w-full rounded-t-2xl object-cover max-h-[50vh] cursor-zoom-in"
                  onClick={() => setZoomedImage(selectedEA.image)}
                />
                <button
                  onClick={() => setSelectedEA(null)}
                  className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => setZoomedImage(selectedEA.image)}
                  className="absolute bottom-3 right-3 p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-1.5 sm:mb-2 block">{selectedEA.task}</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">{selectedEA.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{selectedEA.description}</p>
                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                  <button onClick={() => navigateItem(-1)} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:text-foreground transition-colors">
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="text-xs text-muted-foreground">{currentItemLabel()}</span>
                  <button onClick={() => navigateItem(1)} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:text-foreground transition-colors">
                    Next <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  onClick={() => { setSelectedEA(null); }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mt-3"
                >
                  <ArrowLeft size={14} /> Back to {selected?.title}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen Image Zoom Lightbox */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomedImage}
              alt="Zoomed view"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg touch-pinch-zoom"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Automations;
