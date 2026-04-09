import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

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

const allCertifications: Certification[] = [
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

const education = {
  degree: "Bachelor of Arts",
  major: "Major in English",
  school: "Southeastern College of Padada",
  period: "November 2015 – May 2017",
};

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [zoom, setZoom] = useState(false);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const cert = allCertifications[currentIndex];

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex((idx + allCertifications.length) % allCertifications.length);
  }, []);

  const prev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedCert) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, selectedCert]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="container-narrow relative z-10">
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

        {/* Two-column: Education (left) + Slider (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 md:gap-8 items-start">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-6 md:sticky md:top-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{education.degree}</h4>
              <p className="text-muted-foreground">{education.major}</p>
              <p className="text-sm text-muted-foreground mt-1">{education.school}</p>
              <p className="text-sm text-accent mt-2">{education.period}</p>
            </div>
          </motion.div>

          {/* Certifications Slider */}
          <div>
            <div
              ref={sliderRef}
              className="relative overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="card-glass cursor-pointer group"
                  onClick={() => { setSelectedCert(cert); setZoom(false); }}
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
                      className="w-full h-56 sm:h-72 md:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-accent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 leading-snug">
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
              </AnimatePresence>

              {/* Arrow buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-accent/50 text-foreground hover:text-accent transition-all duration-200 shadow-lg"
                aria-label="Previous certification"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-accent/50 text-foreground hover:text-accent transition-all duration-200 shadow-lg"
                aria-label="Next certification"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {allCertifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to certification ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
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
