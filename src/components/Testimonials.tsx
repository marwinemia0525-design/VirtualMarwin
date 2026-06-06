import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
        name: "Kuys RJ Villamer",
        role: "Mentor — Technical Virtual Assistants PH",
        badge: "n8n Ambassador 🇵🇭",
        content: "Marwin has shown strong dedication in learning automation and technical VA skills. His ability to understand workflows, build systems, and continuously improve makes him a promising automation specialist. He is reliable, resourceful, and committed to delivering quality work.",
        rating: 5,
  },
  {
        name: "Aubrey Hubbell",
        role: "Founder — Floodgate Growth Partners",
        content: "Marwin stood out immediately for his deep expertise in GoHighLevel architecture and automation. He took full ownership of our backend builds and delivered robust, scalable automation systems for our law firm intake and conversion workflows. Exactly the kind of specialist we needed.",
        rating: 5,
  },
  {
        name: "Maria",
        role: "New York Music Center",
        content: "Marwin seamlessly connected our Facebook Lead Ads to GoHighLevel using Zapier with proper lead syncing into our CRM. The entire setup was clean, reliable, and exactly what we needed. He was professional and easy to work with throughout the whole process.",
        rating: 5,
  },
  {
        name: "Jesus Francis Garcia",
        role: "Best Gutters NC",
        content: "Marwin automated our entire GoHighLevel setup across multiple websites — funnels, calendar bookings, text messages, and voice blast follow-ups. His knowledge of GHL and Zapier is top-notch. Our operations are running so much smoother now.",
        rating: 5,
  },
  ];

const Testimonials = () => {
    return (
          <section id="testimonials" className="section-padding relative overflow-hidden">
                <div className="container-narrow relative z-10">
                        <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center mb-10 sm:mb-14"
                                  >
                                  <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">Testimonials</p>
                                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">What People Say</h2>
                                  <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                                              Kind words from mentors and clients who reached out to work with me.
                                  </p>
                        </motion.div>
                
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          {testimonials.map((testimonial, index) => (
                        <motion.div
                                        key={testimonial.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="card-glass p-4 sm:p-6 hover:-translate-y-1 transition-transform duration-300"
                                      >
                                      <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                                                        ))}
                                      </div>
                                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                                                      "{testimonial.content}"
                                      </p>
                                      <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                                                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                                                                        <span className="text-accent font-semibold text-[10px] sm:text-xs">
                                                                          {testimonial.name.split(" ").map((n) => n[0]).join("")}
                                                                        </span>
                                                      </div>
                                                      <div className="min-w-0 flex-1">
                                                                        <div className="flex items-center gap-2 flex-wrap">
                                                                                            <p className="font-semibold text-foreground text-xs sm:text-sm truncate">{testimonial.name}</p>p>
                                                                          {"badge" in testimonial && testimonial.badge && (
                                                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] sm:text-[10px] font-medium whitespace-nowrap">
                                                                                      <Star className="w-2.5 h-2.5" />
                                                                {testimonial.badge}
                                                              </span>
                                                                                            )}
                                                                        </div>
                                                                        <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</p>
                                                      </div>
                                      </div>
                        </motion.div>
                      ))}
                        </div>
                </div>
          </section>
        );
};

export default Testimonials;
