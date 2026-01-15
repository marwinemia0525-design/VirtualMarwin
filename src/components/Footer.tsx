import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight">
            MARWIN<span className="text-accent">.</span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Marwin G. Emia. Built with <Heart size={14} className="text-accent fill-accent" /> 
          </p>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
