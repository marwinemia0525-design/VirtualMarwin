import { FileText } from "lucide-react";

const FloatingCV = () => {
  return (
    <a
      href="https://drive.google.com/uc?export=download&id=1Mm46QUWXtofvPvMsZzwZLrEOx10Ch8IT"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[60] inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur border border-border shadow-lg hover:shadow-xl text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
      aria-label="Download CV"
      download="Marwin-Emia-CV.pdf"
    >
      <FileText size={16} className="text-accent group-hover:scale-110 transition-transform duration-300" />
      <span className="text-xs font-semibold tracking-wide">Download CV</span>
    </a>
  );
};

export default FloatingCV;
