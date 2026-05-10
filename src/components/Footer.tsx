const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-10 px-4 sm:px-6 md:px-12 border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="container-narrow">
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:justify-between text-center md:text-left">
          <a href="#" className="flex items-center gap-2 group" aria-label="Back to top">
            <img
              src="/logo.png"
              alt="Automate With Marwin logo"
              className="w-7 h-7 rounded-lg transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="text-sm font-bold tracking-tight">
              <span className="text-foreground">Automate</span>
              <span className="text-accent"> With Marwin</span>
            </span>
          </a>
          <p className="text-xs sm:text-sm text-muted-foreground order-last md:order-none">
            © {currentYear} Marwin G. Emia. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#automations" className="hover:text-foreground transition-colors">Work</a>
            <a href="#certifications" className="hover:text-foreground transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
