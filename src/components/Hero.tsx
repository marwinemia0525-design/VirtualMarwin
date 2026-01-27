import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import marwinImage from "@/assets/marwin-emia.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      
      <div className="container-narrow relative z-10 px-6 md:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
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
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8"
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
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-sm text-muted-foreground mb-10"
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
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="https://calendly.com/marwinemia0525/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 12px 30px -6px hsl(var(--accent) / 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/marwin-emia-74a8aa366"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
              <motion.div
                className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-accent/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* Accent dots */}
            <motion.div
              className="absolute top-4 right-4 lg:right-12 w-4 h-4 bg-accent rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-8 left-4 lg:left-12 w-3 h-3 bg-accent/60 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Profile Image */}
            <motion.div
              className="relative z-10 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-card shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={marwinImage}
                alt="Marwin G. Emia"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

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
