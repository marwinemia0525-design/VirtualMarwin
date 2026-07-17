import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  MessageSquare,
  Users,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { value: "~30", unit: "s", label: "form to fully-handled lead" },
  { value: "4", unit: "", label: "production workflows in concert" },
  { value: "16", unit: "", label: "real bugs found, fixed & documented" },
  { value: "24/7", unit: "", label: "both intake doors always open" },
];

const trace = [
  { t: "00.0s", text: "patient submits form", hl: '"tooth pain since yesterday, need to be seen today"' },
  { t: "00.4s", text: "webhook → normalize → consent gate", ok: "✓ sms+email consent" },
  { t: "02.1s", text: "CRM dedupe lookup", ok: "✓ contact resolved" },
  { t: "06.8s", text: "Claude triage", ok: "✓ urgency=high service=dental confidence=0.95" },
  { t: "09.3s", text: "CRM updated", ok: "✓ tagged, staged \"Ready to Book\"" },
  { t: "11.0s", text: "database write", ok: "✓ lead + event rows (tenant-isolated)" },
  { t: "24.6s", text: "outreach email sent", ok: "✓ AI-drafted for THIS patient, not a template" },
  { t: "29.8s", text: "front desk alerted", ok: "✓ Slack — contact ID only, no PHI" },
];

const stack = [
  { layer: "Orchestration", choice: "n8n (self-hosted)", why: "4 workflows, 70+ nodes; surgical partial updates; execution logs as the source of truth" },
  { layer: "AI", choice: "Claude (Anthropic API)", why: "Haiku-class model for triage & the chat agent — fast, cheap, and entirely sufficient for classification + tool use" },
  { layer: "CRM", choice: "GoHighLevel (v2 API)", why: "Contacts, 17 custom fields, 6-stage pipeline, calendar + booking widget" },
  { layer: "Database", choice: "Supabase (Postgres)", why: "Leads + events tables with row-level security for clinic-level tenant isolation; daily-metrics view for reporting" },
  { layer: "Notifications", choice: "Slack webhooks", why: "Differentiated alerts: high-urgency, low-confidence, AI-booked — each tells staff exactly what to do next" },
  { layer: "Outreach", choice: "Gmail API + Twilio-ready SMS", why: "Per-channel consent gating; SMS ships behind a dry-run flag until a number is provisioned" },
];

const bugs = [
  { title: "The real form payload was nothing like the test payload — and silently dropped every real patient.", fix: "Synthetic tests sent nested JSON with snake_case keys and boolean consents. The real CRM form webhook sends a flat payload, fields keyed by display label, checkboxes as [\"true\"]. Every synthetic test passed while every real patient was rejected as \"no consent.\" Caught by submitting the real form once and reading the raw webhook output, never trusting fixtures. The normalizer now handles all three payload shapes." },
  { title: "Persistence ran twice for high-urgency leads.", fix: "A lead with both consents fanned out to two outreach branches, dragging the database-write chain along with each: duplicate rows, double alerts. Fixed by decoupling persistence from outreach so it runs exactly once regardless of how many channels fire." },
  { title: "A consent gate with AND instead of OR blocked legitimate leads.", fix: "Email-only consenters were denied all outreach. Changed to OR at the gate, with each channel independently re-checking its own consent before sending." },
  { title: "The AI agent claimed success while its tools silently failed.", fix: "A broken tool node type still let the agent reply \"you're all set!\" This is why every result in this project is verified against execution logs, not chat output, and why there's a failsafe Slack alert if a booking succeeds but the downstream sync fails." },
  { title: "Malformed AI responses crashed the workflow.", fix: "A bare JSON.parse died whenever the model wrapped output in code fences. Now: fence-stripping, try/catch, and a parse-failure sentinel that routes the lead to human review with confidence 0 — a bad AI response becomes a review task, never a lost patient." },
  { title: "Chat availability displayed times in the wrong timezone.", fix: "Slot times now convert to clinic-local time and are verified side-by-side against the calendar UI." },
];

const hipaa = [
  { title: "No PHI in Slack", text: "Alerts carry a CRM contact ID and a link; staff click through to the system of record." },
  { title: "AI disclosure up front", text: "The receptionist's first message discloses AI processing before asking for any personal or health information." },
  { title: "Tenant isolation at the database layer", text: "Row-level security policies scope every read and write to the clinic." },
  { title: "Secrets hygiene", text: "Credentials out of docs folders, dead keys confirmed rotated, service-role keys only in the host's environment." },
];

const performance = [
  { beat: "Form submission → triaged, logged, staff alerted, patient emailed", measured: "25–35 s" },
  { beat: "Chat answer to a plain question", measured: "5–10 s" },
  { beat: "Chat reads live calendar availability", measured: "~10 s" },
  { beat: "Chat books a real appointment (calendar entry + confirmation)", measured: "~15 s" },
  { beat: "Staff correction in CRM → reporting database synced", measured: "~7 s" },
];

const CaseStudyHealthcareFrontDesk = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container-narrow px-4 sm:px-6 py-10 sm:py-16 max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </Link>

        {/* Hero */}
        <header className="mb-10 sm:mb-14">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Case Study · AI & Workflow Automation
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            An AI front desk that answers, triages, and{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              books patients in thirty seconds.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            A healthcare speed-to-lead system built end-to-end for a demo clinic, Brightwell
            Health: web form and conversational AI intake, LLM triage with a human-review
            fallback, real calendar booking, and a CRM plus database plus Slack spine, every
            claim verified against execution logs, not chatbot transcripts.
          </p>
        </header>

        {/* Execution trace */}
        <div className="card-glass overflow-hidden mb-3 bg-card/80">
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-loose overflow-x-auto">
            {trace.map((row) => (
              <div key={row.t} className="whitespace-nowrap">
                <span className="text-muted-foreground/70 tabular-nums">{row.t}</span>
                <span className="text-muted-foreground">  {row.text}  </span>
                {row.hl && <span className="text-foreground">{row.hl}</span>}
                {row.ok && <span className="text-accent">{row.ok}</span>}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-mono mb-14 sm:mb-20">
          One real submission, rehearsal-verified timings. No human touched it.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-24">
          {stats.map((s) => (
            <div key={s.label} className="card-glass p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-bold tabular-nums">
                {s.value}
                <span className="text-sm sm:text-base font-medium text-muted-foreground ml-1">{s.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">The clinic that responds first wins the patient</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Most clinics respond in hours: a front desk juggling phones, forms landing in an
            unwatched inbox, after-hours inquiries waiting until morning. Every hour of delay is
            patients booking elsewhere. The brief I set myself: a system where every inquiry,
            form or conversation, 3 PM or 3 AM, is triaged, logged, routed, and answered in under
            a minute, with humans pulled in exactly when judgment is needed and never for data
            entry.
          </p>
        </section>

        {/* Two front doors */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What I Built
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">One pipeline, two front doors</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Patients arrive two ways: some fill out the appointment form, some open the chat and
            just talk. Both roads feed the same speed-to-lead pipeline, so triage, logging, and
            follow-up behave identically no matter how a patient shows up.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">The form path</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A submission hits the intake webhook and gets normalized (the pipeline handles
                three different payload shapes), passes a consent gate, and is deduplicated
                against the CRM. Claude reads the patient's free-text reason, not keyword
                matching, and returns urgency (high, medium, low), a service line, and a
                confidence score. High-urgency leads get an urgent, same-day-slot email written
                by a second AI call about their specific complaint; routine inquiries get a
                gentler nurture note. The front desk's Slack alert fires last, deliberately
                carrying only a CRM contact ID and a link, no patient details in channels that
                don't need them.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">The chat path</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The AI receptionist discloses it's an AI in its first message, offers a human
                anytime, and carries a real conversation: it answers FAQs without hallucinating
                specifics, gives 911/ER guidance on emergency language, reads live open slots
                from the actual booking calendar, and books real appointments — contact created,
                calendar entry made, confirmation email sent, database updated. A booked chat
                patient is flagged already_booked so the pipeline sends a booking confirmation
                instead of redundant "come book with us" outreach.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">The humans stay in the loop, efficiently</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                When triage confidence is below 0.5, the system doesn't guess: it alerts staff,
                while still logging the lead with the AI's low-confidence read so nothing is
                lost. And when front desk corrects the record in the CRM after a clarification
                call, a watcher workflow syncs their correction back to the reporting database in
                seconds. The human corrects once; every system follows.
              </p>
            </div>
          </div>
        </section>

        {/* Stack table */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Under The Hood
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-8">The stack, and why each piece</h2>
          <div className="card-glass overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Layer</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Choice</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Why</th>
                </tr>
              </thead>
              <tbody>
                {stack.map((row, i) => (
                  <tr key={row.layer} className={i < stack.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 sm:px-6 py-3 font-semibold whitespace-nowrap align-top">{row.layer}</td>
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent whitespace-nowrap align-top">{row.choice}</td>
                    <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bug list */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Engineering Nobody Sees In The Demo
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">16 real bugs, found the hard way</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            The demo looks effortless because the failure modes were found and fixed. A sample of
            the ones that matter:
          </p>
          <div className="flex flex-col gap-5">
            {bugs.map((b) => (
              <div key={b.title} className="border-l-2 border-border pl-4 sm:pl-5">
                <p className="text-sm font-semibold text-foreground mb-1">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HIPAA-ready */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Built HIPAA-Ready, Claimed Honestly
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">A demo with synthetic data, architected for the day it isn't</h2>
          <ul className="flex flex-col gap-3 mb-6 max-w-3xl">
            {hipaa.map((h) => (
              <li key={h.title} className="flex gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent flex-none mt-0.5" />
                <span>
                  <strong className="text-foreground font-semibold">{h.title}:</strong> {h.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="card-glass border-l-4 border-l-accent p-5 sm:p-6 max-w-3xl">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground font-semibold">The honest line I use with prospects:</strong>{" "}
              the architecture is HIPAA-ready; full compliance for production additionally
              requires signed BAAs with the AI and database vendors, a contracts step handled
              during onboarding, not a rebuild. Claiming readiness rather than compliance is
              itself part of the craft.
            </p>
          </div>
        </section>

        {/* Performance table */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Verified Performance
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-8">Read from execution logs, not conversation</h2>
          <div className="card-glass overflow-x-auto p-0 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Beat</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Measured</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((row, i) => (
                  <tr key={row.beat} className={i < performance.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">{row.beat}</td>
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent whitespace-nowrap align-top">{row.measured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground max-w-3xl">
            All timings from a full live rehearsal, read from execution logs. The system checks
            the logs, not the conversation — a principle, not a preference.
          </p>
        </section>

        {/* Next */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Where It Goes Next
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Everything around the appointment</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Intake, triage, booking, and confirmation run today. The scoped next layer is
            everything around the appointment: nurture sequences for not-ready-yet leads,
            post-visit follow-up, and no-show recovery. The pipeline is clinic-agnostic by
            design, onboarding another practice is a configuration change, not a rebuild.
          </p>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Want your front desk to never miss a patient?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            I build AI intake, triage, and booking systems that are verified against execution
            logs, not chatbot transcripts. Demo video available on request.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-6">
            Brightwell Health is a fictional demo clinic; no real patient data was used.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyHealthcareFrontDesk;
