import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clapperboard } from "lucide-react";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const FeaturedCaseStudy = () => {
  return (
    <section id="case-study" className="section-padding relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <Link
            to="/case-studies/dwinvideo"
            className="card-glass block p-6 sm:p-10 group hover:-translate-y-1 transition-all duration-500 ease-out"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-none"
                style={{
                  background: `hsl(var(--accent) / 0.1)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                }}
              >
                <Clapperboard className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
              </div>
              <div className="flex-1">
                <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-2 block">
                  Featured Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  DwinVideo: an AI-operated video editing pipeline
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Raw talking-head in, branded short out. Transcription-driven cuts, karaoke
                  captions, motion graphics as code, -14 LUFS audio mastering, and a premium
                  bespoke edit tier — run end-to-end by an AI agent watching a Drive folder.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent flex-none">
                Read the case study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
