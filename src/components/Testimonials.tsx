import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Surge Marketplace",
    role: "Internship Training Center",
    content: "Marwin successfully completed the Masterclass Virtual Assistant (MVA) program, demonstrating excellent skills in digital tools, workflow automation, and remote collaboration. His dedication and quick learning ability made him stand out among trainees.",
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
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 border border-accent/20 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-16 h-16 border border-accent/15 rounded-full"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-accent font-semibold text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by managers and colleagues throughout my professional journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="card-glass card-glow p-6 flex flex-col relative group overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full"
                animate={{ translateX: ["200%", "-200%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
              
              {/* Quote Icon */}
              <div className="mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 ease-out group-hover:scale-110">
                  <Quote className="w-5 h-5 text-accent transition-transform duration-500 group-hover:rotate-6" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.08 + i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--accent)))' }} />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border/50 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center transition-all duration-400 ease-out hover:scale-110 hover:border-accent/50">
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
