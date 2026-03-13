import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

import approvedContent from "@/assets/ea-samples/Approved_Content_Scheduled.png";
import carouselScheduling from "@/assets/ea-samples/Carousel_Post_Scheduling.png";
import funFriday from "@/assets/ea-samples/Fun_Friday_Content_Scheduling.png";
import promoContent from "@/assets/ea-samples/Promotional_Content_Scheduling.png";
import sundayContent from "@/assets/ea-samples/Sunday_Content_Scheduling.png";
import bookingPage from "@/assets/ea-samples/Booking_Page_Creation.jpg";
import calendarMgmt from "@/assets/ea-samples/Calendar_Management.jpg";
import emailFilters from "@/assets/ea-samples/Email_Filters.jpg";
import emailVacation from "@/assets/ea-samples/Email_Vacation_Responder.jpg";
import adCampaign from "@/assets/ea-samples/Ad_Campaign_Management.jpg";

interface WorkSample {
  id: number;
  title: string;
  image: string;
  task: string;
  description: string;
}

const samples: WorkSample[] = [
  {
    id: 1,
    title: "Approved Content Scheduled",
    image: approvedContent,
    task: "Social Media Content Scheduling",
    description: "Scheduled and managed approved social media content across Facebook and Instagram using Meta Business Suite, ensuring consistent posting cadence and audience engagement.",
  },
  {
    id: 2,
    title: "Carousel Post Scheduling",
    image: carouselScheduling,
    task: "Carousel Content Creation & Scheduling",
    description: "Created and scheduled carousel posts with engaging copy, hashtags, and cross-platform publishing to Facebook and Instagram for maximum reach.",
  },
  {
    id: 3,
    title: "Fun Friday Content Scheduling",
    image: funFriday,
    task: "Themed Content Scheduling",
    description: "Planned and scheduled themed weekly content series like Fun Friday posts, maintaining brand voice and community engagement through consistent storytelling.",
  },
  {
    id: 4,
    title: "Promotional Content Scheduling",
    image: promoContent,
    task: "Promotional Campaign Scheduling",
    description: "Managed promotional campaign content scheduling with targeted dates, cross-platform publishing, and audience-optimized timing for maximum conversions.",
  },
  {
    id: 5,
    title: "Sunday Content Scheduling",
    image: sundayContent,
    task: "Inspirational Content Series",
    description: "Curated and scheduled inspirational weekly content series with culturally relevant themes, driving community engagement and brand identity.",
  },
  {
    id: 6,
    title: "Booking Page Creation",
    image: bookingPage,
    task: "Appointment Booking Setup",
    description: "Set up and configured Google Calendar appointment scheduling pages with video conferencing integration, enabling seamless client booking for strategy calls.",
  },
  {
    id: 7,
    title: "Calendar Management",
    image: calendarMgmt,
    task: "Calendar Management",
    description: "Managed and organized executive calendars, scheduled meetings, coordinated appointments, and maintained organized notes to ensure efficient time management.",
  },
  {
    id: 8,
    title: "Email Filters Setup",
    image: emailFilters,
    task: "Email Management & Organization",
    description: "Configured Gmail filters and labels to automatically categorize incoming emails, maintaining inbox zero policy and ensuring important communications are never missed.",
  },
  {
    id: 9,
    title: "Email Vacation Responder",
    image: emailVacation,
    task: "Email Automation & Templates",
    description: "Set up professional out-of-office vacation responders, email labels, and organizational systems for efficient executive email management.",
  },
  {
    id: 10,
    title: "Ad Campaign Management",
    image: adCampaign,
    task: "Social Media Ad Management",
    description: "Managed Facebook and Instagram ad campaigns through Ads Manager, including creative placement optimization across feeds, stories, and explore for maximum visibility.",
  },
];

const EAWorkSamples = () => {
  const [selected, setSelected] = useState<WorkSample | null>(null);

  return (
    <section id="ea-work" className="section-padding relative overflow-hidden section-glow">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Executive Assistant <span className="text-gradient">Work Samples</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real examples of executive support, content management, and administrative tasks I've completed for clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample, i) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelected(sample)}
              className="card-glass cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={sample.image}
                  alt={sample.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-1.5 block">
                  {sample.task}
                </span>
                <h3 className="font-semibold text-foreground text-sm mb-1">{sample.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{sample.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full rounded-t-2xl object-cover max-h-[50vh]"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2 block">
                  {selected.task}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">{selected.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EAWorkSamples;
