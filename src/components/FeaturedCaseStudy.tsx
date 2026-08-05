import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clapperboard, PhoneCall, Receipt, Scale, ShieldCheck, Stethoscope, UserCheck } from "lucide-react";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const caseStudies = [
  {
    to: "/case-studies/ai-receptionist",
    icon: PhoneCall,
    title: "An AI receptionist, live on a real call in 24 hours",
    text: "Built and shipped a Vapi voice agent plus n8n speed-to-lead pipeline for a mortgage brokerage, verified with a live inbound call the same day: qualified, warm-transferred, and logged to the CRM as a hot lead in 65 seconds.",
  },
  {
    to: "/case-studies/healthcare-front-desk",
    icon: Stethoscope,
    title: "An AI front desk that books patients in 30 seconds",
    text: "A healthcare speed-to-lead system for a demo clinic: web form and conversational AI intake, LLM triage with human-review fallback, real calendar booking, verified against execution logs — 16 real bugs found and fixed along the way.",
  },
  {
    to: "/case-studies/dwinvideo",
    icon: Clapperboard,
    title: "DwinVideo: an AI-operated video editing pipeline",
    text: "Raw talking-head in, branded short out. Transcription-driven cuts, karaoke captions, motion graphics as code, -14 LUFS audio mastering, and a premium bespoke edit tier — run end-to-end by an AI agent watching a Drive folder.",
  },
  {
    to: "/case-studies/content-pipeline",
    icon: ShieldCheck,
    title: "A content pipeline that cannot publish without you",
    text: "Drop a file in a Drive folder, get an AI-written draft, review it, approve it on Telegram, and only then does it go live. Four n8n workflows on one shared queue, with four real bugs documented and an honest account of what is proven and what is not.",
  },
  {
    to: "/case-studies/ecommerce-reconciliation",
    icon: Scale,
    title: "A monthly close that closes itself, until it can't",
    text: "Built an n8n reconciliation engine that pulls Shopify orders, Stripe payouts, and QuickBooks Online ledger entries into one pass, matches them against exact fee and deposit rules, and flags only the transactions a bookkeeper actually needs to look at, each one with the specific reason attached.",
  },
  {
    to: "/case-studies/invoice-reconciliation",
    icon: Receipt,
    title: "Invoice reconciliation that names the problem",
    text: "Every Stripe and PayPal payment matched against the open invoice ledger, sorted into one of six named exceptions ranked by severity, and written to a live audit log. Catches the partial payment, the currency mismatch, and the duplicate that would otherwise reach the customer as a double charge.",
  },
  {
    to: "/case-studies/vapi-ghl-sync",
    icon: UserCheck,
    title: "Voice AI call data into the CRM, without duplicates",
    text: "A Vapi to GoHighLevel sync in n8n that searches by phone before it writes, so a repeat caller updates their existing record instead of becoming a second one. Handles transfers, blocked caller ID, and payloads too incomplete to safely store.",
  },
];

const FeaturedCaseStudy = () => {
  return (
    <section id="case-study" className="section-padding relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Featured Case Studies
          </span>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing, delay: i * 0.1 }}
              className="h-full"
            >
              <Link
                to={cs.to}
                className="card-glass flex flex-col h-full p-6 sm:p-8 group hover:-translate-y-1 transition-all duration-500 ease-out"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-none mb-5"
                  style={{
                    background: `hsl(var(--accent) / 0.1)`,
                    border: `1px solid hsl(var(--accent) / 0.2)`,
                  }}
                >
                  <cs.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {cs.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">{cs.text}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-accent flex-none mt-5">
                  Read the case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
