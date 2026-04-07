import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn, Star } from "lucide-react";

import zapierCert from "@/assets/certifications/zapier_certificate.png";
import makeCert from "@/assets/certifications/make_certificate.png";
import mvaCompletion from "@/assets/certifications/mva_completion.png";
import mvaAttendance from "@/assets/certifications/mva_attendance.png";
import bestContentPlan from "@/assets/certifications/best_content_plan.png";
import davsurWorkshop from "@/assets/certifications/davsur_va_workshop.png";
import civilService from "@/assets/certifications/civil_service_eligibility.png";

interface Certification {
  title: string;
  image: string;
  badges: string[];
  featured?: boolean;
  caption?: string;
}

const certificationRows: { label: string; items: Certification[] }[] = [
  {
    label: "Top Priority — Automation & Tech",
    items: [
      {
        title: "No Code Automation with Zapier — Full Training",
        image: zapierCert,
        badges: ["Automation", "Zapier"],
        featured: true,
        caption: "Technical Virtual Assistants PH · March 2026",
      },
      {
        title: "No Code Automation with Make.com — Full Training",
        image: makeCert,
        badges: ["Automation", "Make.com"],
        featured: true,
        caption: "Technical Virtual Assistants PH · April 2026",
      },
      {
        title: "Masterclass Virtual Assistant (MVA) — Completion",
        image: mvaCompletion,
        badges: ["Virtual Assistant", "Business Training"],
        featured: true,
        caption: "Surge Marketplace · May 2025 · 40 Hours",
      },
    ],
  },
  {
    label: "Supporting Skills",
    items: [
      {
        title: "Masterclass Virtual Assistant (MVA) — Attendance",
        image: mvaAttendance,
        badges: ["Virtual Assistant"],
        caption: "Surge Marketplace · May 2025",
      },
      {
        title: "Best in Content Plan Award",
        image: bestContentPlan,
        badges: ["Content Strategy", "Award 🏆"],
        caption: "Surge Freelancing Marketplace · May 2025",
      },
    ],
  },
  {
    label: "Additional Certifications",
    items: [
      {
        title: "DavSur Free Virtual Assistant Workshop",
        image: davsurWorkshop,
        badges: ["Virtual Assistant", "Workshop"],
        caption: "Digos City · September 2025",
      },
      {
        title: "Civil Service Eligibility — Professional Level",
        image: civilService,
        badges: ["Compliance", "Government"],
        caption: "CSC Region XI · Rating: 80.26% · March 2022",
      },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Automation: "bg-[hsl(199,89%,60%)]/15 text-[hsl(199,89%,60%)] border-[hsl(199,89%,60%)]/30",
  "Make.com": "bg-[hsl(263,70%,58%)]/15 text-[hsl(263,70%,58%)] border-[hsl(263,70%,58%)]/30",
  Zapier: "bg-[hsl(24,100%,50%)]/15 text-[hsl(24,100%,50%)] border-[hsl(24,100%,50%)]/30",
  "Virtual Assistant": "bg-[hsl(192,91%,43%)]/15 text-[hsl(192,91%,43%)] border-[hsl(192,91%,43%)]/30",
  "Business Training": "bg-[hsl(224,64%,33%)]/15 text-[hsl(224,64%,50%)] border-[hsl(224,64%,33%)]/30",
  "Content Strategy": "bg-[hsl(263,70%,58%)]/15 text-[hsl(263,70%,58%)] border-[hsl(263,70%,58%)]/30",
  "Award 🏆": "bg-[hsl(45,93%,47%)]/15 text-[hsl(45,93%,47%)] border-[hsl(45,93%,47%)]/30",
  Workshop: "bg-[hsl(192,91%,43%)]/15 text-[hsl(192,91%,43%)] border-[hsl(192,91%,43%)]/30",
  Compliance: "bg-[hsl(142,71%,45%)]/15 text-[hsl(142,71%,45%)] border-[hsl(142,71%,45%)]/30",
  Government: "bg-[hsl(215,16%,47%)]/15 text-[hsl(215,16%,47%)] border-[hsl(215,16%,47%)]/30",
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [zoom, setZoom] = useState(false);

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
              <Award className="w-5 h-5 text-accent" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Certifications & <span className="text-gradient">Verified Skills</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Proof of Skills & Continuous Learning
          </p>
        </motion.div>

        {/* Certification Rows */}
        {certificationRows.map((row, rowIdx) => (
          <div key={row.label} className="mb-10 last:mb-0">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: rowIdx * 0.1 }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2"
            >
              {rowIdx === 0 && <Star className="w-3.5 h-3.5 text-accent" />}
              {row.label}
            </motion.p>
            <div className={`grid gap-5 ${row.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} grid-cols-1`}>
              {row.items.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + rowIdx * 0.15 }}
                  whileHover={{ y: -4 }}
                  onClick={() => { setSelectedCert(cert); setZoom(false); }}
                  className={`card-glass cursor-pointer group relative ${
                    cert.featured
                      ? "ring-1 ring-accent/30 shadow-[0_0_20px_hsl(var(--accent)/0.08)]"
                      : ""
                  }`}
                >
                  {cert.featured && (
                    <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-t-2xl bg-muted/50">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-44 sm:h-52 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-accent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 leading-snug">
                      {cert.title}
                    </h3>
                    {cert.caption && (
                      <p className="text-xs text-muted-foreground mb-3">{cert.caption}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {cert.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                            badgeColors[badge] || "bg-secondary text-secondary-foreground border-border"
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{selectedCert.title}</h3>
                  {selectedCert.caption && (
                    <p className="text-xs text-muted-foreground">{selectedCert.caption}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(!zoom)}
                    className="p-2 rounded-lg bg-secondary hover:bg-accent/20 transition-colors text-foreground"
                    aria-label="Toggle zoom"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-lg bg-secondary hover:bg-destructive/20 transition-colors text-foreground"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className={`overflow-auto rounded-xl border border-border bg-card ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={() => setZoom(!zoom)}>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className={`w-full transition-transform duration-300 ${zoom ? "scale-150 origin-top-left" : ""}`}
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedCert.badges.map((badge) => (
                  <span
                    key={badge}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      badgeColors[badge] || "bg-secondary text-secondary-foreground border-border"
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
