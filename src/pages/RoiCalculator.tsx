import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Clock, DollarSign, TrendingUp, CalendarCheck } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

interface FieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}

const Field = ({ label, value, onChange, min, max, step, suffix }: FieldProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-2">
      <label className="text-sm text-muted-foreground">{label}</label>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">
        {value.toLocaleString()} {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-[hsl(var(--accent))] cursor-pointer"
      aria-label={label}
    />
  </div>
);

const RoiCalculator = () => {
  const [tasksPerWeek, setTasksPerWeek] = useState(50);
  const [minutesPerTask, setMinutesPerTask] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [people, setPeople] = useState(1);
  const [buildCost, setBuildCost] = useState(1500);
  const [monthlyCost, setMonthlyCost] = useState(100);

  const r = useMemo(() => {
    const hoursPerMonth = (tasksPerWeek * minutesPerTask * people * 4.33) / 60;
    const grossMonthly = hoursPerMonth * hourlyRate;
    const netMonthly = grossMonthly - monthlyCost;
    const yearOne = netMonthly * 12 - buildCost;
    const roiPct = buildCost + monthlyCost * 12 > 0 ? (yearOne / (buildCost + monthlyCost * 12)) * 100 : 0;
    const paybackMonths = netMonthly > 0 ? buildCost / netMonthly : Infinity;
    return { hoursPerMonth, grossMonthly, netMonthly, yearOne, roiPct, paybackMonths };
  }, [tasksPerWeek, minutesPerTask, hourlyRate, people, buildCost, monthlyCost]);

  const positive = r.netMonthly > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to marwinai.com
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-card border border-border">
            <Calculator className="w-6 h-6 text-accent" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold">Workflow ROI Estimator</h1>
        </div>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Estimate what a repetitive task really costs your business, and what automating it saves.
          Adjust the sliders to match your workflow.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <section
            aria-label="Your workflow inputs"
            className="rounded-2xl bg-card border border-border p-6 space-y-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Your workflow
            </h2>
            <Field label="Times the task happens per week" value={tasksPerWeek} onChange={setTasksPerWeek} min={1} max={500} step={1} suffix="times" />
            <Field label="Minutes spent each time" value={minutesPerTask} onChange={setMinutesPerTask} min={1} max={120} step={1} suffix="min" />
            <Field label="Hourly cost of the person doing it" value={hourlyRate} onChange={setHourlyRate} min={5} max={200} step={5} suffix="USD/hr" />
            <Field label="People doing this task" value={people} onChange={setPeople} min={1} max={20} step={1} suffix={people === 1 ? "person" : "people"} />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground pt-2">
              Automation investment
            </h2>
            <Field label="One-time build cost" value={buildCost} onChange={setBuildCost} min={0} max={10000} step={100} suffix="USD" />
            <Field label="Monthly tools and maintenance" value={monthlyCost} onChange={setMonthlyCost} min={0} max={1000} step={10} suffix="USD/mo" />
          </section>

          <section aria-label="Estimated results" className="space-y-4">
            <div className="rounded-2xl bg-card border border-border p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Clock className="w-4 h-4" aria-hidden="true" /> Hours freed per month
              </div>
              <div className="text-3xl font-bold">{r.hoursPerMonth.toFixed(0)} hrs</div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <DollarSign className="w-4 h-4" aria-hidden="true" /> Net savings per month
              </div>
              <div className={`text-3xl font-bold ${positive ? "text-accent" : "text-destructive"}`}>
                {fmt(r.netMonthly)}
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <TrendingUp className="w-4 h-4" aria-hidden="true" /> First-year return
              </div>
              <div className={`text-3xl font-bold ${r.yearOne > 0 ? "text-accent" : "text-destructive"}`}>
                {fmt(r.yearOne)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {Number.isFinite(r.paybackMonths) && r.paybackMonths > 0
                  ? `Pays for itself in ${r.paybackMonths < 1 ? "under a month" : `${r.paybackMonths.toFixed(1)} months`} · ${r.roiPct.toFixed(0)}% first-year ROI`
                  : "Adjust the inputs to see payback time"}
              </div>
            </div>

            <a
              href="https://calendly.com/marwinemia0525/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-2xl px-6 py-4 font-semibold text-cta-foreground transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-cta)" }}
            >
              <span className="inline-flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                These numbers look good? Book a free call
              </span>
            </a>
            <p className="text-xs text-muted-foreground text-center">
              Estimates only. Real projects get a scoped proposal with exact pricing.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RoiCalculator;
