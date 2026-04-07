const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 md:px-12 border-t border-border">
      <div className="container-narrow">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(199,89%,60%)] to-[hsl(263,70%,58%)] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">
              <span className="text-foreground">Automate</span>
              <span className="text-accent"> With Marwin</span>
            </span>
          </a>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © {currentYear} Marwin G. Emia. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
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
