import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const UPWORK_URL = "https://www.upwork.com/freelancers/~0176000d5826043a12";

const UpworkCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden section-glow">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px]" style={{ background: "hsl(130 60% 40% / 0.06)" }} />
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: "#14A800" }}>
            Upwork
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work With Me on Upwork
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            You can hire me through Upwork for automation projects, system integrations, and executive assistance. Click the button below to view my profile and start a project.
          </p>

          <motion.a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 text-sm"
            style={{
              background: "linear-gradient(135deg, #14A800 0%, #1DBF00 100%)",
              boxShadow: "0 4px 20px rgba(20, 168, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(20, 168, 0, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(20, 168, 0, 0.3)";
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
            </svg>
            Hire Me on Upwork
            <ArrowUpRight size={16} />
          </motion.a>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#14A800" }} />
              Available Now
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Top Rated
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpworkCTA;
