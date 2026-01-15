import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
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
    <section id="testimonials" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by managers and colleagues throughout my professional journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-6 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-accent/30" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
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
