import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Surge Marketplace",
    role: "Internship Training Center",
    content: "Marwin successfully completed the Masterclass Virtual Assistant (MVA) program, demonstrating excellent skills in digital tools, workflow automation, and remote collaboration.",
    rating: 5,
  },
  {
    name: "Ronald Juntilla",
    role: "Area Manager",
    content: "Marwin consistently demonstrates exceptional leadership and dedication. His ability to manage operations while maintaining strong customer relationships is truly impressive.",
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
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by managers and colleagues throughout my professional journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-glass p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent font-semibold text-xs">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
