import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Receipt, FileSpreadsheet, GitMerge } from "lucide-react";

// Screenshot gallery: drop the exported .webp files into
// src/assets/case-studies/ecommerce-reconciliation/ and uncomment the imports below.
//   01-reconciliation-detail-sheet.webp
//   02-summary-kpi-sheet.webp
//   03-n8n-canvas.webp
// import shot01 from "@/assets/case-studies/ecommerce-reconciliation/01-reconciliation-detail-sheet.webp";
// import shot02 from "@/assets/case-studies/ecommerce-reconciliation/02-summary-kpi-sheet.webp";
// import shot03 from "@/assets/case-studies/ecommerce-reconciliation/03-n8n-canvas.webp";

const stats = [
  { value: "10", unit: "", label: "orders reconciled in one pass" },
  { value: "5", unit: "", label: "distinct discrepancy types caught" },
  { value: "$72.77", unit: "", label: "unbooked deposits surfaced" },
  { value: "0", unit: "", label: "LLM calls, deterministic by design" },
];

const trace = [
  { stage: "Shopify: Get Orders", detail: "10 items in" },
  { stage: "Stripe: Get Payouts", detail: "9 items in" },
  { stage: "QBO: Get Ledger Entries", detail: "8 items in" },
  { stage: "Merge Sources (append)", detail: "27 items combined" },
  { stage: "Reconcile Transactions", detail: "matched against fee, refund, and deposit rules" },
  { stage: "Sheets: Reconciliation Detail", detail: "10 rows out, one per order, status + flag reason" },
  { stage: "Sheets: Summary KPIs", detail: "1 roll up row: match rate, variance, unbooked deposits" },
];

// Every row below is the actual output of the Reconcile Transactions node
// against the ten order mock dataset in the demo repo.
const detail = [
  { id: "O-1001", status: "MATCHED", flag: "none" },
  { id: "O-1002", status: "MATCHED", flag: "none" },
  { id: "O-1003", status: "MATCHED", flag: "none" },
  { id: "O-1004", status: "FLAGGED", flag: "REFUND_UNRECORDED (Shopify shows a refund, needs a QBO credit check)" },
  { id: "O-1005", status: "FLAGGED", flag: "MISSING_PAYOUT" },
  { id: "O-1006", status: "FLAGGED", flag: "FEE_MISMATCH ($5.42 variance vs expected 2.9% + $0.30)" },
  { id: "O-1007", status: "MATCHED", flag: "none" },
  { id: "O-1008", status: "FLAGGED", flag: "MISSING_LEDGER_ENTRY" },
  { id: "O-1009", status: "FLAGGED", flag: "LEDGER_MISMATCH ($27.00 variance vs Stripe net)" },
  { id: "O-1010", status: "MATCHED", flag: "none" },
];

const summary = [
  { k: "Orders processed", v: "10" },
  { k: "Matched", v: "5" },
  { k: "Flagged", v: "5" },
  { k: "Match rate", v: "50.0%" },
  { k: "Total fee variance", v: "$5.42" },
  { k: "Total ledger variance", v: "$27.00" },
  { k: "Unbooked deposits", v: "$72.77" },
];

const screenshots: { image: string; title: string; text: string }[] = [
  // { image: shot01, title: "Reconciliation Detail sheet", text: "All 10 orders, one row each, status and flag reason spelled out in plain language, not an error code." },
  // { image: shot02, title: "Summary KPI sheet", text: "The roll up row a bookkeeper or owner actually opens first: match rate, total variance, unbooked deposits." },
  // { image: shot03, title: "n8n canvas", text: "The full five stage pipeline: three parallel source pulls, merge, reconcile, and a split output to both the detail log and the summary layer." },
];

const stack = [
  {
    layer: "Orchestration",
    choice: "n8n",
    why: "Modular source nodes built to be swapped independently; merge and reconcile logic kept separate from the data pull",
  },
  {
    layer: "Matching logic",
    choice: "Deterministic rules (Code node)",
    why: "Fee percentage, refund pairing, and deposit variance are exact math, not something worth spending an LLM call on",
  },
  {
    layer: "Data sources",
    choice: "Shopify Admin API, Stripe Balance Transactions API, QuickBooks Online / Xero Accounting API",
    why: "Production swap for the current mock nodes. Each source stays independently swappable, so a real credential replaces a mock node with no downstream changes",
  },
  {
    layer: "Output",
    choice: "Google Sheets (Detail + Summary KPIs)",
    why: "Two layers on purpose: the sheet a bookkeeper works from, and the sheet an owner glances at",
  },
  {
    layer: "Alerting",
    choice: "Slack or email when flagged_count > 0 (documented, not yet wired)",
    why: "A bookkeeper doesn't need a ping on a clean close, only when something needs a decision",
  },
];

const CaseStudyEcommerceReconciliation = () => {
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
            Case Study · AI &amp; Workflow Automation
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            A monthly close automation that tells a bookkeeper{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              exactly what's wrong, not just that something is.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            An ecommerce accounting reconciliation engine built in n8n: pulls Shopify orders,
            Stripe payouts, and QuickBooks Online ledger entries into one pass, matches every
            transaction against exact fee and deposit rules, and surfaces only the ones that need
            a human decision, with the reason attached, not a generic red flag.
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
          Item counts read off the nodes in a real run, not a diagram.
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
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Three systems that should agree, and don't</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Ecommerce sellers running Shopify, Stripe, and QuickBooks Online are reconciling three
            ledgers that were never designed to talk to each other. Stripe pulls its fee out before
            the payout ever lands. A refund shows up in Shopify the moment a seller clicks the
            button, but the matching credit in QuickBooks might never get entered. The bookkeeper
            closing the books ends up with three browser tabs open, manually eyeballing which order
            matches which payout matches which ledger line. It's the same failure pattern every
            single month, and it doesn't scale past a handful of orders.
          </p>
        </section>

        {/* What I built */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What I Built
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">One pass, three sources, rules that don't guess</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            The workflow pulls all three sources in parallel so any one of them can be swapped for
            a real API call without touching the other two. Shopify orders, Stripe payouts, and
            QuickBooks ledger entries all merge into one dataset, then run through a reconciliation
            pass that checks three specific things: does the Stripe fee match the expected 2.9%
            plus $0.30, does the Stripe net deposit match what QuickBooks actually recorded, and
            does every side of a transaction exist at all (an order with no payout, a payout with
            no ledger entry, a refund that still needs its QuickBooks credit confirmed).
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <FileSpreadsheet className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Detail first, summary second</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every order gets one row in a Reconciliation Detail sheet: matched or flagged, and
                if flagged, exactly why. "FEE_MISMATCH ($5.42 variance vs expected 2.9% + $0.30)"
                tells a bookkeeper what to check first instead of just turning the row red. On top
                of that sits a Summary KPI roll up, orders processed, matched count, flagged count,
                match rate, total fee variance, total ledger variance, unbooked deposits, so an
                owner can see the health of the close in one row without opening the detail sheet
                at all.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <GitMerge className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Built on mock data, on purpose</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ten sample orders carry five different discrepancy types baked in deliberately, so
                the pipeline can be demoed and screenshotted without putting a real seller's
                financials on screen. Every mock node has a comment showing the exact production
                swap: Shopify Admin API, Stripe Balance Transactions API, QuickBooks Online or Xero
                Accounting API. Moving this from demo to a live seller's stack is a credential swap
                and a trigger change, not a rebuild.
              </p>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Proof, Not Promises
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">The actual output of a real run</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Not a summary of what the system would do. This is what the reconciliation node wrote
            to the sheet, row for row, on the ten order dataset.
          </p>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Reconciliation Detail
          </h3>
          <div className="card-glass overflow-x-auto p-0 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Order</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Status</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Flag reason</th>
                </tr>
              </thead>
              <tbody>
                {detail.map((row, i) => (
                  <tr key={row.id} className={i < detail.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs whitespace-nowrap align-top">{row.id}</td>
                    <td
                      className={`px-4 sm:px-6 py-3 font-mono text-xs whitespace-nowrap align-top ${
                        row.status === "FLAGGED" ? "text-accent font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {row.status}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">{row.flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Summary KPIs
          </h3>
          <div className="card-glass overflow-x-auto p-0">
            <table className="w-full text-sm">
              <tbody>
                {summary.map((row, i) => (
                  <tr key={row.k} className={i < summary.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">{row.k}</td>
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent whitespace-nowrap align-top text-right">
                      {row.v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {screenshots.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8">
              {screenshots.map((s) => (
                <a
                  key={s.title}
                  href={s.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass overflow-hidden text-left group hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-border">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
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

        {/* Why this one is different */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Why This One's Different
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Built to prove judgment, not just plumbing</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex gap-3">
              <Receipt className="w-5 h-5 text-accent flex-none mt-0.5" />
              <p className="text-sm sm:text-base text-muted-foreground">
                This build doesn't reach for an LLM because it doesn't need one. Matching a Stripe
                fee against 2.9% plus $0.30 is exact arithmetic, and pretending otherwise just
                adds a point of failure and a cost per row for no reason.
              </p>
            </div>
            <div className="card-glass border-l-4 border-l-accent p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                The judgment call here was scoping the automation to the 90% of the close that's
                mechanical, and leaving the last 10%, the actual decision on a flagged row, to the
                person who's accountable for the books. That's also why this page doesn't claim a
                live bug log or rehearsed timings like the other builds: this one hasn't been run
                against a real seller's data yet. Said plainly instead of dressed up.
              </p>
            </div>
          </div>
        </section>

        {/* Next */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Where It Goes Next
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">From mock data to a real seller's stack</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            The pipeline is source agnostic by design. Swapping in a live seller means three
            things: replace the three mock nodes with the documented API calls, replace the manual
            trigger with a schedule (daily, or timed to the actual monthly close) or a webhook, and
            wire the optional Slack or email alert so the owner only hears from the system when a
            row needs their judgment.
          </p>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Want your monthly close to stop being a manual cross check?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            I build reconciliation and ops automations that tell you exactly what's wrong and why,
            not just that something doesn't match.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-6">
            Built on synthetic order data; no real seller's financials were used.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyEcommerceReconciliation;
