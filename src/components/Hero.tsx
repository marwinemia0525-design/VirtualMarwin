import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      
      <div className="container-narrow relative z-10 px-6 md:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">Available for New Projects</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Hi, I'm{" "}
            <span className="text-gradient">Marwin G. Emia</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium mb-6"
          >
            Executive Virtual Assistant & AI Automation Specialist
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Detail-oriented Virtual Assistant with a strong background in branch and collections management. 
            Skilled in digital tools, workflow organization, and remote collaboration to help businesses 
            stay efficient and scalable.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-10"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>Davao del Sur, Philippines</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-accent" />
              <span>+63 763 147 667</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-accent" />
              <span>marwinemia0525@gmail.com</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com/marwinemia0525/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Schedule a Call
            </a>
            <a
              href="https://www.linkedin.com/in/marwin-emia-74a8aa366"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
