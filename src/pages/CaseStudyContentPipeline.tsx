import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Bug,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  ListChecks,
  MessageSquare,
  ShieldCheck,
  Video,
} from "lucide-react";

const stats = [
  { value: "4", unit: "workflows", label: "independent n8n workflows, one shared queue" },
  { value: "1", unit: "queue", label: "a Google Sheet every step reads and writes" },
  { value: "2", unit: "human gates", label: "review in the queue, then approve on Telegram" },
  { value: "4", unit: "real bugs", label: "found and fixed before they made a bad post" },
  { value: "2", unit: "paths proven", label: "approve and disapprove, both verified live" },
];

const flow = [
  { label: "Drop a file", sub: "Google Drive folder", io: true },
  { label: "Watch", sub: "daily, opens a Draft row" },
  { label: "Write", sub: "AI copy plus hashtags" },
  { label: "Review", sub: "human edits, sets Ready" },
  { label: "Approve", sub: "Telegram, approve or not" },
  { label: "Publish", sub: "Facebook Graph API" },
  { label: "Posted row", sub: "real post id written back", io: true },
];

const bugs = [
  {
    title: "The right id under the wrong field name",
    text: "Facebook's /photos response returns both id (the photo object) and post_id (the shape used everywhere else). The queue was saving id unconditionally, so every photo post recorded an id that pointed at nothing useful. Now it reads post_id first and falls back to id for the text path, which only ever returns the correct shape.",
  },
  {
    title: "A failure path that crashed instead of alerting",
    text: "Forcing a broken Drive link proved the download step had no error output wired. Instead of routing to the failure handler, it killed the whole execution, left the row stuck mid-publish, and sent no alert. That is the exact silent failure the design exists to prevent. Fixed, re-run, and confirmed on a real execution.",
  },
  {
    title: "A green run that wrote garbage",
    text: "The vision model returns a content block array, not a flat string. Reading it wrong produced the literal text [object Object] in the copy column on a run that reported success. Caught by opening the sheet and looking, not by trusting the status badge.",
  },
  {
    title: "A validator that passed and a runtime that did not",
    text: "A Sheets append step was missing its explicit column schema. It validated clean and failed only at runtime with a required-field error. Same bug had already been found and fixed in a sibling workflow days earlier, and this instance was missed. Fixed and verified with a real execution that queued two new files correctly.",
  },
];

const proven = [
  { ok: true, text: "Text posts published for real, with the post id written back to the queue" },
  { ok: true, text: "Photo posts published for real, after the post id bug was fixed" },
  { ok: true, text: "Approve path verified on a live execution: post goes out, row marked Posted" },
  { ok: true, text: "Disapprove path verified on a live execution: nothing publishes, row parked cleanly" },
  { ok: true, text: "Failure path verified: a forced download error routes to the handler and alerts" },
  { ok: false, text: "Video publishing is wired and statically checked, but has not published a real post yet" },
  { ok: false, text: "Multi-image posts are built and pass every offline check, not yet deployed or run live" },
  { ok: false, text: "The publisher reads as switched off right now, so nothing can post until someone turns it back on" },
];

const CaseStudyContentPipeline = () => {
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
        <header className="mb-14 sm:mb-20">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Case Study · AI Content Pipeline
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Drop a file in a folder.{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Approve the post on your phone.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            Posting consistently takes two kinds of work that do not scale together: writing
            on-voice captions, and actually getting media off a phone and onto the page on
            schedule. Most AI content tools solve half of that. They write the copy, you still
            touch every file and every post, and nothing stops you publishing something you never
            read. This pipeline closes both halves and keeps a human in front of the publish
            button.
          </p>
          <div className="inline-flex flex-wrap items-center gap-2 mt-6 text-sm font-mono text-accent bg-card border border-border rounded-lg px-4 py-2.5">
            <span>Draft</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Ready</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Posting</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Posted</span>
            <span className="text-muted-foreground ml-1">/* the whole system is this state machine */</span>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-16 sm:mb-24">
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

        {/* Pipeline flow */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Pipeline
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Four workflows that never step on each other
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            There is no orchestrator handing work down a chain. Four independent n8n workflows and
            one local routine share a single content queue, and each one only ever acts on rows in
            a specific state. Any step can be skipped, redone by hand, or run out of order, and the
            system still behaves, because the queue is the only thing they agree on.
          </p>
          <div className="overflow-x-auto pb-3 -mx-4 px-4">
            <div className="flex items-center gap-0 min-w-max">
              {flow.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  {i > 0 && <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground/50 flex-none" />}
                  <div
                    className={
                      step.io
                        ? "rounded-full border border-border bg-card px-5 py-2.5"
                        : "rounded-full px-5 py-2.5 bg-gradient-to-br from-[hsl(var(--primary))/0.25] to-[hsl(var(--accent))/0.15] border border-[hsl(var(--primary))/0.35]"
                    }
                  >
                    <div className={`text-sm font-semibold whitespace-nowrap ${step.io ? "text-accent" : "text-foreground"}`}>
                      {step.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground whitespace-nowrap">{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            The AI steps can only ever produce a <code className="font-mono text-accent">Draft</code>.
            Nothing the automation writes can flip itself to{" "}
            <code className="font-mono text-accent">Ready</code>. That decision is always a person.
          </p>
        </section>

        {/* Two copy paths */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Writing The Copy
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Two paths, because a video is not an image
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            An image can be described by a vision model in the cloud. A video cannot, not honestly,
            because a caption written from thumbnails is a guess. So the video half runs locally
            against the real transcript and posts its result back to the cloud through a webhook.
          </p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Images: cloud vision</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Runs daily in n8n</p>
              <p className="text-sm text-muted-foreground">
                Claude looks at the actual image and writes copy plus hashtags in a fixed voice.
                The prompt carries explicit rules against overclaiming: describe only what is
                visually verifiable, never imply a client engagement that does not exist, never
                invent a detail the image does not show. Those rules exist because an early run
                produced copy that read like paid client work. That is the exact line the
                hand-written drafts had always been careful not to cross.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8 border-[hsl(var(--primary))/0.4]">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Video: local transcript</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Runs on the machine, returns over a webhook</p>
              <p className="text-sm text-muted-foreground">
                The hosted n8n instance has no speech model, so this half runs locally. It pulls
                the video down, transcribes it with faster-whisper (borrowed from my video editing
                pipeline), writes copy from what was actually said, and posts the result to an
                intake webhook that files it on the right queue row. Same voice rules, same review
                gate, same everything downstream.
              </p>
            </div>
          </div>
        </section>

        {/* The approval gate */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Gate
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Two human checkpoints, not one</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Every automated content system I have seen has one review step. This one has two,
            because they catch different things.
          </p>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="card-glass p-6">
              <ListChecks className="w-5 h-5 text-accent mb-3" />
              <h3 className="text-sm font-semibold mb-2">1. Review in the queue</h3>
              <p className="text-sm text-muted-foreground">
                The AI draft sits in the sheet. Read it, rewrite it, throw it out. Nothing moves
                until a person sets the row to Ready by hand.
              </p>
            </div>
            <div className="card-glass p-6">
              <MessageSquare className="w-5 h-5 text-accent mb-3" />
              <h3 className="text-sm font-semibold mb-2">2. Approve on Telegram</h3>
              <p className="text-sm text-muted-foreground">
                The publisher sends the exact final copy to Telegram and waits. Approve publishes
                it. Disapprove parks the row and moves on. Both outcomes are handled, so there is
                no dead end either way.
              </p>
            </div>
            <div className="card-glass p-6">
              <ShieldCheck className="w-5 h-5 text-accent mb-3" />
              <h3 className="text-sm font-semibold mb-2">Then, proof written back</h3>
              <p className="text-sm text-muted-foreground">
                On success the real post id from the platform goes back into the queue. Every post
                is traceable to the row that produced it. On failure the row records why, and an
                alert goes out.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            The waiting step has a hard three day limit. An unanswered approval times out and
            resumes instead of holding an execution open forever with nothing visibly wrong.
          </p>
        </section>

        {/* Bugs */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What Broke
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Four bugs caught before they could make a bad post
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Not one of these was caught by reading a status badge. Two of the four happened on runs
            that reported success outright. Every one was found by opening the saved output and
            checking what it actually said.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {bugs.map((b) => (
              <div key={b.title} className="card-glass p-6">
                <Bug className="w-5 h-5 text-accent mb-3" />
                <h3 className="text-sm font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Extending it */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Extending It
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Multi-image posts, added without touching what already worked
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <Layers className="w-5 h-5 text-accent mb-4" />
              <p className="text-sm text-muted-foreground mb-3">
                The system was built for single images and video first. Multi-image posts came
                later and needed three genuinely new things: file discovery that treats a folder of
                images as one post instead of several, a way to tell those queue items apart from
                every other kind, and a completely different publishing sequence (upload each image
                unpublished, collect the ids, then assemble one post from all of them).
              </p>
              <p className="text-sm text-muted-foreground">
                All of it went in as an isolated branch alongside the proven path. The single image
                and video routes were not modified. The biggest piece went through an independent
                review pass before deploying it, specifically to catch the class of bug listed
                above, which it did.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8 border-[hsl(var(--primary))/0.4]">
              <AlertTriangle className="w-5 h-5 text-primary mb-4" />
              <h3 className="text-sm font-semibold mb-2">And it is not proven yet</h3>
              <p className="text-sm text-muted-foreground mb-3">
                It passes every offline check available: topology and node parameter validation
                against the platform's own schemas with zero errors, plus a syntax check on every
                line of code in it. None of that exercises the grouping logic, the accumulated
                state, or the platform calls against real data.
              </p>
              <p className="text-sm text-muted-foreground">
                So it is written down as unverified and it stays that way until a real multi-image
                post publishes. Rounding that up to "done" would be the same failure the whole
                system is designed against.
              </p>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Honest Status
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Proven, and not yet proven</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Pulled directly from the live instance rather than from any changelog, because
            activation state on this project has drifted from what a document claimed more than
            once. Verified 30 July 2026.
          </p>
          <div className="card-glass p-6 sm:p-8">
            <ul className="space-y-3.5">
              {proven.map((p) => (
                <li key={p.text} className="flex items-start gap-3 text-sm">
                  {p.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-accent flex-none mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-muted-foreground flex-none mt-0.5" />
                  )}
                  <span className={p.ok ? "text-muted-foreground" : "text-muted-foreground/80"}>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Self-built and self-run against my own page, which is why the status can be this
            specific. The same discipline shows up in every project here: documented bugs, an
            honest activation state, and a person in front of anything that goes live.
          </p>
        </section>

        {/* Stack */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            The Stack
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-6">Built on ordinary parts</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "n8n",
              "Google Sheets",
              "Google Drive",
              "Claude vision",
              "Groq",
              "faster-whisper",
              "Telegram approvals",
              "Facebook Graph API",
              "Claude Code as operator",
            ].map((t) => (
              <span key={t} className="text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-start gap-2 mt-6 text-sm text-muted-foreground max-w-3xl">
            <Bot className="w-4 h-4 text-accent flex-none mt-0.5" />
            <p>
              Nothing exotic. The value is not in the parts, it is in the state machine holding
              them together and in refusing to let any of them publish on their own.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Want a review-gated pipeline for your business?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            The same architecture works for content, leads, invoices, or anything else where the
            work should be automatic but the decision to send it should not be. Swap the source,
            swap the destination, keep the gate.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Book a free call <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyContentPipeline;
