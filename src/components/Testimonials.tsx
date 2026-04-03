import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";

const testimonials = [
  {
    name: "Kuys RJ Villamer",
    role: "Mentor — Technical Virtual Assistants PH",
    badge: "n8n Ambassador 🇵🇭",
    content: "Marwin has shown strong dedication in learning automation and technical VA skills. His ability to understand workflows, build systems, and continuously improve makes him a promising automation specialist. He is reliable, resourceful, and committed to delivering quality work.",
    rating: 5,
  },
  {
    name: "Surge Marketplace",
    role: "Internship Training Center",
    content: "Marwin successfully completed the Masterclass Virtual Assistant (MVA) program, demonstrating excellent skills in digital tools, workflow automation, and remote collaboration.",
    rating: 5,
  },
  {
    name: "Alvin Tiongco",
    role: "Regional Manager",
    content: "An outstanding professional who exceeds expectations. Marwin's attention to detail and commitment to achieving targets has significantly contributed to our regional success.",
    rating: 5,
  },
  {
    name: "Aireen Lucero",
    role: "Area Manager",
    content: "Working with Marwin has been a pleasure. His organizational skills, proactive approach, and ability to handle complex situations make him an invaluable team member.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden section-glow">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            What People Say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Trusted by managers and colleagues throughout my professional journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-glass p-4 sm:p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-accent font-semibold text-[10px] sm:text-xs">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-xs sm:text-sm truncate">{testimonial.name}</p>
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
