import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  Flame,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const metrics = [
  { value: "<24", unit: "h", label: "from first line of config to a verified live phone call" },
  { value: "65", unit: "s", label: "caller qualified, escalated & warm-transferred to a human" },
  { value: "<60", unit: "s", label: "web lead → scored → booked → loan officer alerted" },
  { value: "~$0.11", unit: "", label: "cost of the full qualified call — every call becomes a CRM record" },
];

const flows = [
  {
    icon: PhoneCall,
    title: "Flow A — Stella, the AI receptionist",
    chain: "inbound call → qualify (intent + urgency) → hot? warm-transfer a live human · else book against real calendar slots → every call → end-of-call report",
    text: "Her first job isn't booking, it's recognizing a hot caller (a rate lock expiring, an investor with a closing deadline) and handing them to a loan processor while they're still on the line. She knows the brokerage's actual product shelf, and she's hard-ruled never to quote rates.",
  },
  {
    icon: Flame,
    title: "Flow B — Speed-to-lead scoring",
    chain: "any lead (web form · portal · Stella's calls) → AI scores hot/warm/cold + confidence + reason → hot: auto-book + alert · warm: personalized AI email · cold: reactivation queue",
    text: "Every conversation Stella has becomes a scored pipeline record with a transcript summary. No call ever dies in a notepad, and the loan officer's alert includes the exact angle to open with.",
  },
  {
    icon: RefreshCw,
    title: "Flow C — Cold lead reactivation",
    chain: "CRM segment by last-touch → daily run → AI writes one email per lead, off what they originally asked about → responders return flagged \"reactivated\"",
    text: "The buried money. Not a blast: each message is written from that lead's own history, and anyone who replies re-enters the pipeline with context attached.",
  },
];

const timeline = [
  { h: "H 0–2", title: "Research.", text: "Read the brokerage's site, mapped their real product shelf (including hard-money investor loans, their most time-sensitive callers), identified the three leak points." },
  { h: "H 2–10", title: "Backend.", text: "Built three n8n workflows: the voice-tool backend (4 webhook endpoints), speed-to-lead scoring with AI hot/warm/cold routing, and the reactivation engine. Log-first design, validated in 3–5 node increments." },
  { h: "H 10–14", title: "Verification round one.", text: "Simulated every tool payload end-to-end; found and fixed a timezone bug, a key-ordering bug, and a dead OAuth credential before any caller could meet them." },
  { h: "H 14–20", title: "Voice layer.", text: "Deployed the Vapi assistant via API from a version-controlled JSON definition: system prompt, tool schemas matched to the backend extractors, structured end-of-call data, warm-transfer config. Provisioned a real phone number." },
  { h: "H 20–24", title: "Live verification.", text: "Dialed the number, played a rate-lock borrower: qualified in seconds, transfer fired, Slack alert landed mid-call, and on hang-up the caller appeared in the CRM as a Hot 85% lead with a consult auto-booked. Diagnosed a carrier-network WebRTC issue along the way and shipped a documented workaround." },
];

const guardrails = [
  { title: "Log-first", text: "the record exists before any outreach is attempted — even failed calls become traceable CRM entries, never silence." },
  { title: "Compliance by prompt", text: "the agent never quotes rates or fees, defers numbers to licensed staff, and answers honestly if asked whether it's an AI." },
  { title: "Escalation over booking", text: "time-sensitive callers reach a human live; the calendar is the fallback, not the goal." },
  { title: "Everything as config", text: "the assistant deploys from versioned JSON in one command: reproducible, reviewable, portable to the client's own accounts." },
  { title: "Score with receipts", text: "every AI lead score ships with a confidence number and a written reason, both logged for review." },
];

const stack = ["Vapi (voice)", "ElevenLabs (voice clone)", "n8n (orchestration)", "Claude (lead scoring & drafting)", "GPT-4o (call brain)", "GoHighLevel-ready CRM layer", "Google Calendar", "Slack alerts", "Deepgram (transcription)"];

const CaseStudyReceptionist = () => {
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
            Case Study · AI Voice Automation
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            An AI receptionist for a mortgage brokerage.{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Live on a real phone call in 24 hours.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            An Arizona mortgage brokerage was losing deals at the phone: unanswered calls, cold
            leads dying in the CRM, hot borrowers stuck in voicemail. Instead of writing a
            proposal, I built the system, and verified it with a live call the same day.
          </p>
        </header>

        {/* Call transcript card */}
        <div className="card-glass overflow-hidden mb-14 sm:mb-20">
          <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border bg-card/60 text-xs font-mono text-muted-foreground">
            <span>first verified call · inbound PSTN · 1m 05s · $0.11</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> LIVE
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col gap-3">
            <div className="flex gap-3 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-wide text-accent w-16 flex-none pt-0.5">Stella</span>
              <span className="text-foreground/90">"Thanks for calling, this is Stella. How can I help you with your home loan today?"</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-wide text-primary w-16 flex-none pt-0.5">Caller</span>
              <span className="text-foreground/90">"My rate lock expires Friday and I can't get hold of anyone, I need to talk to someone today."</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-wide text-accent w-16 flex-none pt-0.5">Stella</span>
              <span className="text-foreground/90">"I can help with that. Let me get you straight to our loan processor, can I grab your callback number in case we get disconnected?"</span>
            </div>
            <div className="flex gap-3 text-xs font-mono text-muted-foreground bg-card/60 rounded-md px-3 py-2">
              <span className="uppercase tracking-wide w-16 flex-none pt-0.5">system</span>
              <span>
                escalate_to_processor ✓ → Slack alert to processor →{" "}
                <b className="text-red-400">live warm transfer</b> → call logged, scored{" "}
                <b className="text-red-400">HOT 85%</b>, consult auto-booked
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-24">
          {metrics.map((m) => (
            <div key={m.label} className="card-glass p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-bold tabular-nums">
                {m.value}
                <span className="text-sm sm:text-base font-medium text-muted-foreground ml-1">{m.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Mortgage is a speed-to-lead business</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            The first lender to respond usually wins the deal. This brokerage had three leak
            points: inbound calls hitting voicemail after hours, qualified leads not landing on a
            loan officer's calendar fast enough, and hundreds of cold leads sitting silently in
            the CRM. Every one of those is a commission walking to a competitor.
          </p>
        </section>

        {/* System / flows */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The System
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Three interlocking flows, one CRM as the system of record
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Orchestrated in n8n behind a Vapi voice agent.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            {flows.map((f) => (
              <div key={f.title} className="card-glass p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <f.icon className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <div className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-nowrap pb-2 mb-2">
                  {f.chain}
                </div>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            24 Hours, Hour By Hour
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-8">From first commit to a live warm transfer</h2>
          <div className="flex flex-col">
            {timeline.map((t, i) => (
              <div
                key={t.h}
                className={`grid grid-cols-[5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-4 ${
                  i < timeline.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="font-mono text-xs sm:text-sm text-accent pt-0.5 tabular-nums">{t.h}</div>
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground font-semibold">{t.title}</strong> {t.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack + guardrails */}
        <section className="mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start">
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
                Stack
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">What it runs on</h2>
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span key={t} className="text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
                Engineering Choices
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Built to fail safely, not just fail fast</h2>
              <ul className="flex flex-col gap-3">
                {guardrails.map((g) => (
                  <li key={g.title} className="flex gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-accent flex-none mt-0.5" />
                    <span>
                      <strong className="text-foreground font-semibold">{g.title}:</strong> {g.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Want a phone line that never loses a lead?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            I build AI receptionists, speed-to-lead pipelines, and CRM automations that are
            verified live before you ever commit. This one took a day.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-6">
            Client details anonymized — this system was built as a working test project for an
            Arizona mortgage brokerage. Metrics are from the actual verified calls, taken from
            platform logs.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyReceptionist;
