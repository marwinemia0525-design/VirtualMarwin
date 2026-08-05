import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, AlertTriangle, CopyCheck, SplitSquareHorizontal } from "lucide-react";

import shot01 from "@/assets/case-studies/invoice-payment-reconciliation/01-n8n-canvas.webp";
import shot02 from "@/assets/case-studies/invoice-payment-reconciliation/02-reconciliation-log-sheet.webp";

const stats = [
  { value: "12", unit: "", label: "payments reconciled in one pass" },
  { value: "6", unit: "", label: "exception types, each caught once" },
  { value: "1", unit: "", label: "possible double charge surfaced" },
  { value: "0", unit: "", label: "LLM calls, deterministic by design" },
];

const trace = [
  { stage: "Load Open Invoices (mock QuickBooks)", detail: "10 items in" },
  { stage: "Aggregate Invoices to Single Item", detail: "1 item, the whole ledger" },
  { stage: "Load Incoming Payments (mock Stripe/PayPal)", detail: "12 items in" },
  { stage: "Reconcile Payment Against Invoice", detail: "12 items out, one classification each" },
  { stage: "IF Matched → true", detail: "6 items, invoice marked paid" },
  { stage: "IF Matched → false", detail: "6 items, exception alert built" },
  { stage: "Merge Matched + Exceptions (append)", detail: "12 items, one row per payment" },
  { stage: "Log to Reconciliation Sheet", detail: "12 rows written to a live Google Sheet" },
];

// Every row below is the actual output of the Reconcile Payment Against Invoice
// node on the twelve payment mock dataset, read off a real run.
const detail = [
  { id: "PAY-501", status: "MATCHED", flag: "none" },
  { id: "PAY-502", status: "PARTIAL_PAYMENT", flag: "$1,500 received against a $1,800 invoice. Invoice stays open." },
  { id: "PAY-503", status: "MATCHED", flag: "none" },
  { id: "PAY-504", status: "OVERPAID", flag: "$1,000 received against a $950 invoice. Review for refund or credit." },
  { id: "PAY-505", status: "UNMATCHED_NO_REF", flag: "$875 from an unrecognised payer with no invoice reference at all." },
  { id: "PAY-506", status: "MATCHED", flag: "none" },
  { id: "PAY-507", status: "MATCHED", flag: "none" },
  { id: "PAY-508", status: "DUPLICATE_PAYMENT", flag: "High severity. INV-1008 is already marked paid and a second payment references it." },
  { id: "PAY-509", status: "CURRENCY_MISMATCH", flag: "Paid in USD against an invoice billed in EUR. Flagged for manual FX, not auto converted." },
  { id: "PAY-510", status: "MATCHED", flag: "none" },
  { id: "PAY-511", status: "MATCHED", flag: "none" },
  { id: "PAY-512", status: "UNMATCHED_INVOICE_NOT_FOUND", flag: "High severity. References INV-1099, which does not exist in the ledger." },
];

const summary = [
  { k: "Payments processed", v: "12" },
  { k: "Matched cleanly", v: "6" },
  { k: "Exceptions raised", v: "6" },
  { k: "Match rate", v: "50.0%" },
  { k: "High severity exceptions", v: "2" },
  { k: "Medium severity exceptions", v: "4" },
  { k: "Rows written to the audit log", v: "12" },
];

const screenshots: { image: string; title: string; text: string }[] = [
  {
    image: shot01,
    title: "n8n canvas, a real run",
    text: "Item counts sit on every connection: 10 invoices in, 12 payments in, a clean 6 and 6 split at the branch, 12 back out. The two greyed nodes are the notification stubs, marked deactivated rather than hidden.",
  },
  {
    image: shot02,
    title: "Reconciliation Log sheet",
    text: "One row per payment under a single 17 column header. Matched rows carry the accounting action and leave the alert columns blank; exception rows do the exact reverse.",
  },
];

const stack = [
  {
    layer: "Orchestration",
    choice: "n8n",
    why: "Manual trigger for the demo, with the production webhook wired into the same pipeline so the trigger swaps without touching the logic",
  },
  {
    layer: "Matching logic",
    choice: "Deterministic rules (Code node)",
    why: "Comparing an amount, a currency, and an invoice status is exact work. An LLM here would add cost, latency, and a way to be confidently wrong",
  },
  {
    layer: "Payment sources",
    choice: "Stripe and PayPal webhooks",
    why: "Production swap for the current mock node. The webhook trigger already exists on the canvas; signature verification goes in immediately after it",
  },
  {
    layer: "Invoice ledger",
    choice: "QuickBooks Online / Xero, list open invoices",
    why: "Production swap for the mock node, on a schedule or short cache rather than a fetch per payment",
  },
  {
    layer: "Audit log",
    choice: "Google Sheets, live and running",
    why: "The record finance asks for in week one. Visible, sortable, and no new infrastructure for a small business",
  },
  {
    layer: "Alerting",
    choice: "Slack and email nodes, built and routed, deliberately disabled",
    why: "Wiring a demo to a real channel means posting fake finance alerts into someone's workspace on every run. Enabled per client at onboarding",
  },
];

const CaseStudyInvoiceReconciliation = () => {
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
            Case Study · Ops &amp; Financial Systems Automation
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            The payment matched the invoice. The problem is the{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              five times a month it doesn't.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            An invoice and payment reconciliation engine built in n8n: every incoming Stripe or
            PayPal payment is matched against the open invoice ledger, clean matches close
            themselves, and everything else is sorted into one of six named exceptions, ranked by
            severity, and written to an audit log a bookkeeper can actually work from.
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
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">The payment event and the invoice live in different systems</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Agencies, consultants, contractors, clinics, and law firms invoice their clients and
            collect through Stripe or PayPal, then book the result in QuickBooks or Xero. Nothing
            connects the two. Someone opens the payments dashboard, opens the invoice list, and
            works down the column by eye. At ten or twenty invoices a week that is a standing
            thirty to sixty minute daily job. It scales linearly with revenue, which is the wrong
            direction for a task that produces nothing.
          </p>
        </section>

        {/* What I built */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What I Built
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Six named outcomes instead of one red flag</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            Every payment is classified into exactly one of seven states. A clean match marks the
            invoice paid and moves on. The other six are the ones worth paying for: a partial
            payment that must leave the invoice open, an overpayment that needs a refund decision,
            a currency mismatch, a duplicate payment against an already paid invoice, a payment
            carrying no invoice reference, and a payment referencing an invoice that does not
            exist. Each one arrives with the amounts, the invoice, and a plain sentence saying
            what to do next.
          </p>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <CopyCheck className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">The duplicate payment is the one that pays for the build</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A payment lands against an invoice that is already marked paid. Every other
                exception on this list costs someone time. This one costs a customer money, and
                the business usually finds out when the customer calls. It is flagged high
                severity and named as a possible double charge, not filed under "review". Payment
                processors retry webhooks on any non-2xx response, so this case is not
                hypothetical, it is Tuesday.
              </p>
            </div>
            <div className="card-glass p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <SplitSquareHorizontal className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Flag the currency, don't convert it</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A payment in USD against an invoice billed in EUR could be auto converted. It
                isn't. Converting requires picking a rate source, the processor's rate, a market
                feed, or a fixed internal rate, and that is a decision with money attached that
                belongs to the business, not to the automation. The workflow flags it for manual
                FX handling and stops. Automating past the point where you have the authority to
                decide is how automations quietly produce wrong books.
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
            Twelve payments against a ten invoice ledger, built so every exception category fires
            exactly once. This is what the reconciliation node produced and what landed in the
            sheet, row for row.
          </p>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Reconciliation Log
          </h3>
          <div className="card-glass overflow-x-auto p-0 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Payment</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Classification</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">What it means</th>
                </tr>
              </thead>
              <tbody>
                {detail.map((row, i) => (
                  <tr key={row.id} className={i < detail.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 sm:px-6 py-3 font-mono text-xs whitespace-nowrap align-top">{row.id}</td>
                    <td
                      className={`px-4 sm:px-6 py-3 font-mono text-xs whitespace-nowrap align-top ${
                        row.status === "MATCHED" ? "text-muted-foreground" : "text-accent font-semibold"
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
            Run Summary
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
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8">
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

        {/* Bugs / what testing missed */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What The Test Suite Missed
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">A passing logic test is not a passing integration</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8">
            The classification rules were validated in a standalone script before anything was
            built in n8n, and those rules were correct. They stayed correct. What that test could
            not see was how n8n would actually execute them. Deploying to a live instance surfaced
            four configuration defects, every one of which would have produced an audit log that
            looked fine and was wrong.
          </p>
          <div className="card-glass overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">Defect</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-4 sm:px-6 py-3">What it would have produced</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">Three Code nodes written per item but left in n8n's default run once for all items mode</td>
                  <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent align-top">1 payment classified instead of 12</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">Merge node set to combine and multiplex rather than append</td>
                  <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent align-top">36 log rows, a cross join of both branches</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">Both branches wired into the merge twice, directly and through the disabled nodes. Disabled nodes pass data through, so this double counted immediately</td>
                  <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent align-top">Every payment logged twice</td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-3 text-muted-foreground align-top">Sheets resource locators missing their resolver flag</td>
                  <td className="px-4 sm:px-6 py-3 font-mono text-xs text-accent align-top">Node cannot resolve the target sheet</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mt-6">
            A fifth issue was structural rather than a bug. The invoice load and the payment load
            ran as parallel branches while the reconciliation step depended on the invoice branch
            finishing first. That held, but by luck rather than by construction. The two loads are
            now chained so the ordering is explicit.
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

        {/* What's live and what isn't */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            What's Live And What Isn't
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Said plainly, because the alternative is a demo that lies</h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-accent flex-none mt-0.5" />
              <p className="text-sm sm:text-base text-muted-foreground">
                The audit log is real. Payments are classified, exceptions are ranked by severity,
                and every result is written to a live Google Sheet through a real credential. That
                part runs.
              </p>
            </div>
            <div className="card-glass border-l-4 border-l-accent p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                The Slack alert and the customer receipt email sit on the canvas, wired into the
                right branches, and switched off on purpose. Pointing a demo at a live channel
                means posting six fake finance alerts into somebody's workspace every time it
                runs. So the honest description is that exceptions are classified, prioritised,
                and logged, with alerting built and ready to point at a channel, rather than
                "it alerts your finance team". Enabling it for a client is attaching a credential
                and naming a channel. The payment and invoice sources are mock nodes carrying mock
                data, so no real business's financials appear anywhere in this build.
              </p>
            </div>
          </div>
        </section>

        {/* Next */}
        <section className="mb-16 sm:mb-24">
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">
            Where It Goes Next
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">From mock data to a real ledger</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Going live means four things, none of which touch the reconciliation logic. Point the
            Stripe or PayPal webhook at the trigger that already exists on the canvas and verify
            its signature before any business logic runs. Replace the invoice mock with a
            QuickBooks or Xero call for open invoices, cached or scheduled rather than fetched per
            payment. Replace the accounting mock with a real update invoice call. Then deduplicate
            on the payment ID, so a processor retrying a webhook can never process the same
            payment twice.
          </p>
        </section>

        {/* CTA */}
        <section className="card-glass p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Still matching payments to invoices by eye?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            I build reconciliation and ops automations that close the clean cases quietly and tell
            you exactly what's wrong with the rest.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-[hsl(var(--cta))] hover:opacity-90 transition-opacity"
          >
            Let's talk <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-6">
            Built on synthetic invoice and payment data; no real business's financials were used.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyInvoiceReconciliation;
