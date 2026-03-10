import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-lg font-bold tracking-tight text-foreground">
            MARWIN<span className="text-accent">.</span>
          </a>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Marwin G. Emia. All rights reserved.
          </p>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#automations" className="hover:text-foreground transition-colors">Automations</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
