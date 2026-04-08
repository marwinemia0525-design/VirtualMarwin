import { FileText } from "lucide-react";

const FloatingCV = () => {
  return (
    <a
      href="https://drive.google.com/file/d/1QlzHcE1N0E9-CaAZ-HeyCIBZRhMw01mf/view?usp=drivesdk"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg hover:shadow-xl text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-0.5 group"
      aria-label="Download CV"
    >
      <FileText size={16} className="text-accent group-hover:scale-110 transition-transform duration-300" />
      <span className="text-xs font-semibold tracking-wide">Download CV</span>
    </a>
  );
};

export default FloatingCV;
