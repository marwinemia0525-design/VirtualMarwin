import { motion } from "framer-motion";
import { Award, Trophy, ExternalLink } from "lucide-react";

const certificates = [
  {
    filename: "zapier-cert.png",
    title: "No Code Automation with Zapier",
    description:
      "Completed full Zapier training by Technical Virtual Assistants PH (March 10, 2026). Covers Zapier Interface, Triggers, Formatter, Delay, Filter, Paths, Looping, Sub Zaps, Webhooks, and AI by Zapier.",
  },
  {
    filename: "civil-service-cert.png",
    title: "Civil Service Exam – Professional Level",
    description:
      "Passed the Philippine Civil Service Examination (Professional Level) with a rating of 80.26%, conducted by the Civil Service Commission in Davao City on March 13, 2022.",
  },
  {
    filename: "mva-attendance-cert.png",
    title: "MVA Certificate of Attendance – Surge Marketplace",
    description:
      "Attended the 5-day In-Person Masterclass Virtual Assistant (MVA) Training by Surge Marketplace. Given May 15, 2025.",
  },
  {
    filename: "best-content-plan-cert.png",
    title: "Best in Content Plan Award – Surge Freelancing Marketplace",
    description:
      "Awarded for outstanding achievement during the 5-Day In-Person MVA Training Batch 36. Given May 15, 2025.",
    badge: "🏆 Award",
  },
  {
    filename: "mva-completion-cert.png",
    title: "MVA Certificate of Completion – Surge Marketplace",
    description:
      "Successfully completed the In-Person Virtual Assistant Program (40 hours). Covers admin tasks, CRM, social media, SEO, email marketing, freelancing setup, and client acquisition. Cert ID: MVA 0000-184. Given May 26, 2025.",
  },
  {
    filename: "makecom-cert.png",
    title: "No Code Automation with Make.com",
    description:
      "Completed full Make.com training by Technical Virtual Assistants PH (April 3, 2026). Covers Interface Walkthrough, Scenario Structure, Filters, Triggers, Connecting Apps, Actions, Error Handling, and HTTP Requests.",
  },
  {
    filename: "davsur-workshop-cert.png",
    title: "DavSur Free Virtual Assistant Workshop",
    description:
      "Certificate of Participation for the DavSur Free VA Workshop held on September 27, 2025 at Viewpoint Hotel, Digos City, Davao del Sur. Facilitated by Digos City Freelancers Group & Davao Freelancers Community.",
  },
  {
    filename: "apprenticeship-cert.png",
    title: "Apprenticeship Certificate – Surge Marketplace",
    description:
      "Completed the 1-month Surge Marketplace Apprenticeship Program focused on Executive Assistant tasks — Social Media Content Creation, Management, Content Scheduling, and File Management. Overall Performance: 4.64/5. Given September 27, 2025.",
  },
];

const Certifications = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Award className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-xl font-semibold">Certifications</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card-glass card-glow overflow-hidden group"
          >
            {/* Image area */}
            <a
              href={`/certificates/${cert.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[4/3] bg-secondary/30 border-b border-border/30 overflow-hidden"
            >
              <img
                src={`/certificates/${cert.filename}`}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              {/* Placeholder shown if image fails */}
              <div
                className="absolute inset-0 border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-muted-foreground text-sm gap-2"
                style={{ display: "none" }}
              >
                <Award className="w-8 h-8 opacity-40" />
                <span>Upload Certificate Image</span>
                <span className="text-xs opacity-60">{cert.filename}</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-accent-foreground opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </a>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground text-sm leading-snug">
                  {cert.title}
                </h4>
                {cert.badge && (
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {cert.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Add new certificate cards here */}
      </div>
    </div>
  );
};

export default Certifications;
