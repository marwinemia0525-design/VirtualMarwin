import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

/**
 * Floating pill that links to the Workflow ROI Estimator.
 * Hides itself on the /roi page. Plain anchor keeps it router-independent
 * (it is rendered outside BrowserRouter in App.tsx, same as FloatingCV).
 */
const FloatingROI = () => {
  const [onRoi, setOnRoi] = useState(false);

  useEffect(() => {
    const check = () => setOnRoi(window.location.pathname.startsWith("/roi"));
    check();
    window.addEventListener("popstate", check);
    const id = window.setInterval(check, 800);
    return () => {
      window.removeEventListener("popstate", check);
      window.clearInterval(id);
    };
  }, []);

  if (onRoi) return null;

  return (
    <a
      href="/roi"
      className="fixed bottom-16 left-4 md:bottom-20 md:left-6 z-[60] inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur border border-border shadow-lg hover:shadow-xl text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
      aria-label="Open the Workflow ROI Estimator"
    >
      <Calculator size={16} className="text-accent group-hover:scale-110 transition-transform duration-300" />
      <span className="text-xs font-semibold tracking-wide">ROI Calculator</span>
    </a>
  );
};

export default FloatingROI;
