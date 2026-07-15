import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bot,
  Captions,
  Clapperboard,
  Cloud,
  FolderSync,
  Scissors,
  Sparkles,
  Timer,
  Wand2,
} from "lucide-react";

const stats = [
  { value: "1", unit: "command", label: "raw clip to finished short" },
  { value: "-14", unit: "LUFS", label: "audio master, verified -24.6 to -14.1" },
  { value: "18", unit: "modules", label: "Python helpers behind one orchestrator" },
  { value: "11", unit: "templates", label: "HTML/SVG motion graphics, all on-brand" },
  { value: "20", unit: "min", label: "Drive watch cycle: drop a file, get it back edited" },
];

const flow = [
  { label: "raw.mp4", sub: "Drive /to-edit/", io: true },
  { label: "Transcribe", sub: "faster-whisper, word timings" },
  { label: "Auto-cut", sub: "filler, stutters, silence" },
  { label: "Captions", sub: "karaoke, word-synced" },
  { label: "Graphics", sub: "title card, lower third, end card" },
  { label: "Master", sub: "-14 LUFS + de-hiss" },
  { label: "Package", sub: "chapters, SEO description" },
  { label: "final.mp4", sub: "Drive /edited/", io: true },
];

const capabilities = [
  { icon: Scissors, title: "Filler & silence removal", text: "Ums, uhs, restarts, and dead air cut against a tunable gap threshold — every cut lands in a reviewable EDL first." },
  { icon: Captions, title: "Karaoke captions", text: "Word-synced highlight captions generated straight from the same transcript that drives the cuts, so they can never drift." },
  { icon: Clapperboard, title: "Graphics as code", text: "Title cards, lower thirds, keyword pop-ups, and end cards are HTML/CSS templates rendered to frames and composited with FFmpeg." },
  { icon: AudioLines, title: "Broadcast-standard audio", text: "Two-pass loudnorm masters to YouTube's -14 LUFS playback target with a light de-hiss pass — measured, not eyeballed." },
  { icon: FolderSync, title: "Repurposing built in", text: "Clip extraction, 9:16 vertical reframe, b-roll suggestions with ready download commands, and deterministic YouTube chapters." },
  { icon: Bot, title: "Agent-operated", text: "A scheduled watcher checks the Drive folder every 20 minutes; Claude Code reads the transcript, tunes the cut list, and runs the render." },
];

const CaseStudyDwinVideo = () => {
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
            Case Study · AI Video Automation
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Raw talking-head in.{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Branded short out.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            DwinVideo is an end-to-end video production pipeline I built and operate: it
            transcribes a raw clip, cuts the filler and dead air, burns karaoke captions,
            composites branded motion graphics, masters the audio to platform loudness, and
            writes the YouTube chapters — from a single command, or automatically when a file
            lands in a watched Google Drive folder.
          </p>
          <code className="inline-block mt-6 text-sm font-mono text-accent bg-card border border-border rounded-lg px-4 py-2.5">
            <span className="text-muted-foreground">$</span> python studio.py raw.mp4 --all
          </code>
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
            Every stage a hand editor does, wired in sequence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            A short that takes an editor two to three hours by hand runs unattended in minutes.
            Each stage is its own module, so any step can run alone or be swapped out per project.
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
            Cuts land in a reviewable <code className="font-mono text-accent">edl.json</code> before
            rendering — an AI-assisted edit the operator can veto line-by-line, never a black box.
          </p>
        </section>

        {/* Editing tiers */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Editing Tiers
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Templated when speed matters, bespoke when it counts
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            The pipeline ships two edit tiers behind the same Drive-folder workflow — the tier is
            chosen per clip, by a filename flag or a one-line request.
          </p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Standard — the studio pass</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Minutes per video · the default</p>
              <p className="text-sm text-muted-foreground">
                The full automated run: auto-cut, karaoke captions, title card, lower third, end
                card, mastered audio. Consistent, on-brand, fast — built for a steady posting
                cadence.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8 border-[hsl(var(--primary))/0.4]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Premium — the produced edit</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">20–40+ minutes per video · flagged per clip</p>
              <p className="text-sm text-muted-foreground mb-3">
                A packaged premium skill turns the AI agent into a motion designer: it storyboards
                the video into content-aware sections, then builds bespoke GSAP compositions
                anchored to the words being spoken — whip transitions, stat cards that slam in on
                the numbers, keyword graphics choreographed to the voice.
              </p>
              <p className="text-sm text-muted-foreground">
                No two premium edits look alike, but every one stays inside the brand system.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Cloud brain, local render farm</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Heavy video work stays on local hardware where it's free and fast; coordination,
            content generation, and publishing live in the cloud. A shared Drive folder pair is
            the handshake between the two — no tunnels, no always-on servers.
          </p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">n8n orchestration</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Webhook intake</strong> — a content brief arrives as JSON and kicks off the run</li>
                <li><strong className="text-foreground">Claude-generated metadata</strong> — titles, descriptions, and platform copy in the channel's brand voice</li>
                <li><strong className="text-foreground">Slack notifications</strong> — every run reports in; approval steps planned next</li>
                <li><strong className="text-foreground">Multi-platform publish backbone</strong> — LinkedIn, Instagram Reels, YouTube Shorts, with the AI-disclosure flag YouTube requires</li>
              </ul>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Local pipeline + AI operator</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Drive watcher</strong> — a scheduled task checks the intake folder every 20 minutes</li>
                <li><strong className="text-foreground">Agent-operated editing</strong> — Claude Code reads the transcript, tunes the cut list, and runs the render</li>
                <li><strong className="text-foreground">Two quality tiers</strong> — fast templated pass or bespoke premium motion-graphics edit</li>
                <li><strong className="text-foreground">Round-trip delivery</strong> — the finished video lands back in the output folder for the cloud side to pick up</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-8">What ships in the box</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c) => (
              <div key={c.title} className="card-glass p-5 sm:p-6">
                <c.icon className="w-5 h-5 text-accent mb-3" />
                <h3 className="text-sm font-semibold mb-2">{c.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {["Python", "FFmpeg", "faster-whisper", "n8n", "rclone", "Google Drive API", "GSAP", "Claude Code as operator"].map((t) => (
              <span key={t} className="text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Want this for your content?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            The same architecture generalizes to any creator or business: swap the brand spec,
            point the watcher at your folder, and the pipeline produces your shorts in your
            visual identity — with a human approval gate wherever you want one.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyDwinVideo;
