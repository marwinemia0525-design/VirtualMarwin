import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, GitBranch, PhoneIncoming, ShieldAlert, UserCheck } from "lucide-react";

const stats = [
  { value: "4", unit: "", label: "call scenarios handled end to end" },
  { value: "0", unit: "", label: "duplicate contacts created" },
  { value: "200", unit: "", label: "always, so the voice platform never retries" },
  { value: "0", unit: "", label: "LLM calls, deterministic by design" },
];

const trace = [
  { stage: "Vapi Webhook (end-of-call-report)", detail: "1 call event in" },
  { stage: "Is End-of-Call Report?", detail: "other event types acknowledged and dropped" },
  { stage: "Extract & Normalize Call Data", detail: "nested payload flattened to one record" },
  { stage: "Payload Has Usable Data?", detail: "no phone or call id → exception branch" },
  { stage: "Normalize Phone (E.164)", detail: "+15551234567" },
  { stage: "GHL: Search Contact by Phone", detail: "the dedup lookup, before any write" },
  { stage: "Existing Contact Found?", detail: "true → update · false → create" },
  { stage: "GHL: Add Call Note to Contact", detail: "transcript, summary, recording, outcome" },
  { stage: "Respond: Synced", detail: "reports which branch it took" },
];

// The four responses below are the literal JSON returned by the live webhook
// on 2026-08-05, one run per scenario.
const responses = [
  {
    scenario: "Repeat caller",
    input: "Known number, +15551234567",
    body: '{ "status": "synced", "contactId": "ghl_contact_001", "contactAction": "CONTACT_UPDATED", "outcome": "ready-to-schedule" }',
  },
  {
    scenario: "First-time caller",
    input: "Unknown number, +15559876543, transferred mid-call",
    body: '{ "status": "synced", "contactId": "ghl_contact_new_6543", "contactAction": "CONTACT_CREATED", "outcome": "emergency-transfer" }',
  },
  {
    scenario: "Incomplete payload",
    input: "Web widget call, no phone captured",
    body: '{ "status": "logged_exception", "exceptionType": "MISSING_PHONE" }',
  },
  {
    scenario: "Wrong event type",
    input: "A status-update event on the same URL",
    body: '{ "status": "ignored", "reason": "not an end-of-call-report event" }',
  },
];

const stack = [
  {
    layer: "Trigger",
    choice: "n8n Webhook, set as the Vapi Server URL",
    why: "Vapi fires many event types at one URL, so the first node after the trigger filters for end-of-call-report and drops the rest",
  },
  {
    layer: "Normalization",
    choice: "Code node, flattens call / artifact / analysis",
    why: "Vapi nests the useful fields three levels deep and structured output is optional per assistant, so derived fields fall back to endedReason when it is missing",
  },
  {
    layer: "Phone matching",
    choice: "Explicit E.164 normalization before every lookup",
    why: "CRM phone search is exact string. A missing country code silently creates a duplicate instead of throwing an error, which is the worst kind of bug",
  },
  {
    layer: "Dedup",
    choice: "Search, then branch to update or create",
    why: "The CRM's upsert endpoint is one call instead of two, but it hides the match decision. Branching makes it visible and gives a hook to report matched versus new",
  },
  {
    layer: "Call history",
    choice: "Notes for transcript and summary, custom fields for outcome",
    why: "Notes append and timestamp, so history accumulates. A custom field is single value and would be overwritten by the next call, destroying the record",
  },
  {
    layer: "GoHighLevel API",
    choice: "Mocked to the documented v2 response shapes",
    why: "No client account exists yet. Each mock node carries the exact production HTTP config in its notes, so going live is a node swap plus a credential",
  },
];

const CaseStudyVapiGhlSync = () => {
  return (
    <div className="relative z-10 min-h-screen bg-transparent text-foreground">
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
            Case Study · Voice AI &amp; CRM Integration
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            The voice agent worked. Then it created a{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              second contact for your best customer.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            A Vapi to GoHighLevel call sync built in n8n. Every completed call is normalized,
            matched against the CRM by phone before anything is written, and either appended to
            the caller's existing record or filed as a new contact. The part that matters is the
            order of operations: search first, write second.
          </p>
        </header>

        {/* Pipeline trace */}
        <div className="card-glass overflow-hidden mb-3 bg-card/80">
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-loose overflow-x-auto">
            {trace.map((row) => (
              <div key={row.stage} className="whitespace-nowrap">
                <span className="text-foreground">{row.stage}</span>
                <span className="text-muted-foreground/70">{"  →  "}</span>
                <span className="text-accent">{row.detail}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-mono mb-14 sm:mb-20">
          The path a matched repeat caller actually took through a live run.
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
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">The call ends and the data dies in a dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            A voice agent generates a rich event on every conversation: who called, how long, what
            was said, what they wanted, whether it was transferred, whether anything needs a follow
            up. It sits in the voice platform's dashboard and never reaches the CRM the business
            actually runs on, unless somebody copies it across by hand. The naive fix, pushing
            every call straight into the CRM, is worse than doing nothing: a regular customer who
            calls four times becomes four contact records, and a CRM full of duplicates cannot be
            segmented, cannot be reported on, and quietly ruins every automation downstream of it.
          </p>
        </section>

        {/* What I built */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What I Built
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Search before you write</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            The whole build turns on one decision made in the right order. Before any contact is
            created, the workflow normalizes the caller's number to E.164 and searches the CRM for
            it. A hit updates that contact and appends the call as a note. A miss creates a new
            contact tagged as a voice AI lead. Either path converges on the same note append, so
            call history accumulates in one place regardless of how the caller entered the system.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">The phone format is the whole ballgame</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                CRM phone search is exact string matching. A number arriving as
                <span className="font-mono text-xs"> (555) 123-4567 </span> will not match a stored
                <span className="font-mono text-xs"> +15551234567</span>, and the failure mode is
                not an error, it is a silent duplicate. So normalization to E.164 is its own
                explicit step before every lookup, with a documented assumption about the default
                country code rather than a buried one. This is the single most common way these
                integrations break in production.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Refusing to write is a feature</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Some calls arrive with no caller identity at all: a web widget where the browser
                never had a number, a blocked caller ID, a dropped call sending a partial payload.
                The workflow deliberately does not create a contact for these. A record with no
                phone and no email can never be matched to the same person later, so it is not a
                lead, it is permanent clutter that pollutes every future dedup attempt. The
                exception is logged with its type and the raw payload instead, ready to route to a
                Slack channel or an inbox.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <PhoneIncoming className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Always answer 200, even when rejecting the data</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Voice platforms retry a webhook that does not get a fast success response. If the
                workflow returned an error on a payload it had already inspected and correctly
                decided to reject, the platform would resend that same broken payload on a loop.
                A handled exception is a successful outcome from the sender's point of view, so it
                returns 200 with a body explaining what was logged and why.
              </p>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Proof, Not Promises
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Four scenarios, four responses, one workflow</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            These are the literal JSON bodies the live webhook returned, one run per scenario. The
            first two are the ones worth reading together: the same workflow, given two different
            phone numbers, took two different branches and reported which one it took.
          </p>

          <div className="flex flex-col gap-4">
            {responses.map((r) => (
              <div key={r.scenario} className="card-glass overflow-hidden">
                <div className="px-5 sm:px-6 py-3 border-b border-border flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold text-foreground">{r.scenario}</span>
                  <span className="text-xs text-muted-foreground">{r.input}</span>
                </div>
                <div className="px-5 sm:px-6 py-4 font-mono text-xs text-accent overflow-x-auto">
                  <span className="whitespace-nowrap">{r.body}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mt-8">
            The note appended to the created contact was inspected on that same run. It carried the
            outcome, the duration, the appointment status, the AI summary, the recording URL, the
            full transcript, and the detail that matters most on an emergency call:{" "}
            <span className="font-mono text-xs text-accent">Transferred: true to emergency-repair-line</span>.
            Tags resolved to voice AI lead and needs follow up, and all three custom fields carried
            the right values.
          </p>
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
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent align-top">{row.choice}</td>
                    <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What's real and what isn't */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What's Real And What Isn't
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">The honest boundary on this one</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex gap-3">
              <GitBranch className="w-5 h-5 text-accent flex-none mt-0.5" />
              <p className="text-sm sm:text-base text-muted-foreground">
                Every branch this workflow owns has executed on a live n8n instance: the event
                filter, the payload extraction, the data quality gate, the phone normalization,
                the search and the update-versus-create decision, the note construction, and the
                exception path. The responses above are what came back.
              </p>
            </div>
            <div className="card-glass border-l-4 border-l-accent p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                What has not been proven is GoHighLevel's real API behaviour. No client account was
                available, so the four CRM calls are mocked to GoHighLevel's documented v2 response
                shapes, with the exact production request config recorded in each node. That is
                enough to prove the dedup logic branches correctly, and it is not the same as
                having written a contact to a real CRM. Before a client go live, three things get
                verified against their account: the real search response envelope, that the custom
                fields exist on the contact object, and their duplicate-contact setting, which
                changes how matching behaves. Said plainly rather than dressed up, because a
                reviewer will find it in ten seconds and the claim is strong enough without it.
              </p>
            </div>
          </div>
        </section>

        {/* Next */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Where It Goes Next
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">A credential and a webhook URL</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Going live is four steps that leave the logic untouched. Add the CRM API token as a
            credential and swap each mock node for the HTTP request already documented inside it.
            Create the three custom fields on the contact object. Point the voice assistant's
            server URL at the webhook and verify its signature before any business logic runs, so a
            forged call report cannot write into the CRM. Then add an idempotency check on the call
            id, so a retried webhook cannot append the same note twice.
          </p>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Running a voice agent that isn't talking to your CRM?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            I build the integration layer between voice AI and the CRM you already run on, with
            dedup that holds up on the fourth call from the same customer.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-6">
            Built on synthetic call payloads; no real caller's data was used.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyVapiGhlSync;
