import { GraduationCap, ExternalLink } from "lucide-react";

interface AdditionalCert {
  title: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  badges: string[];
}

const additionalCertifications: AdditionalCert[] = [
  {
    title: "Claude Code 101",
    issuer: "Anthropic Academy",
    date: "June 25, 2026",
    verifyUrl: "https://verify.skilljar.com/c/4yzdksdz7b6g",
    badges: ["Claude", "AI"],
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "June 26, 2026",
    verifyUrl: "https://verify.skilljar.com/c/rkd3mwyj8pmu",
    badges: ["Claude", "AI"],
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic Education",
    date: "June 27, 2026",
    verifyUrl: "https://verify.skilljar.com/c/9ujm6y8iinrv",
    badges: ["MCP", "AI"],
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic Education",
    date: "June 27, 2026",
    verifyUrl: "https://verify.skilljar.com/c/u7sw5sh75c6x",
    badges: ["AI Agents", "Claude"],
  },
  {
    title: "Introduction to Claude Cowork",
    issuer: "Anthropic Education",
    date: "June 26, 2026",
    verifyUrl: "https://verify.skilljar.com/c/eqctkrvprhk8",
    badges: ["Claude", "Cowork"],
  },
  {
    title: "In Practice: AI, Testing & Best Practices",
    issuer: "n8n Education Team",
    date: "June 21, 2026",
    verifyUrl: "https://learn.n8n.io/certificates/d9272f1a6b9548509b8bc81b4eaa0a2d",
    badges: ["n8n", "Automation"],
  },
  {
    title: "Prompt Engineering — Full Training",
    issuer: "Technical Virtual Assistants PH",
    date: "April 14, 2026",
    verifyUrl: "https://my-certificates.com/certificates/69dde353395a8c8f35d0f4bb",
    badges: ["Prompt Engineering", "AI"],
  },
  {
    title: "WordPress Web Page Building and Maintenance",
    issuer: "Technical Virtual Assistants PH",
    date: "May 6, 2026",
    verifyUrl: "https://my-certificates.com/certificates/69fac26d10b8479ec0addd3b",
    badges: ["WordPress", "Web"],
  },
];

const AdditionalCertifications = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            <GraduationCap className="w-4 h-4" />
            Credentials
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Additional Certifications &amp; Badges
          </h3>
          <p className="text-sm text-muted-foreground">
            Short-form courses and training completions, verified by their issuing platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {additionalCertifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-xl border border-border bg-card/60 p-4 flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {cert.issuer} &middot; {cert.date}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-secondary text-secondary-foreground border-border"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-1"
              >
                Verify credential
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalCertifications;
