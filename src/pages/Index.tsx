import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Automations from "@/components/Automations";
import ToolsPlatforms from "@/components/ToolsPlatforms";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BrandedLoader from "@/components/BrandedLoader";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";

const Index = () => {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("me_loader_shown") !== "1";
  });

  const finishLoading = () => {
    try { sessionStorage.setItem("me_loader_shown", "1"); } catch {}
    setLoading(false);
  };

  return (
    <>
      {loading && <BrandedLoader onComplete={finishLoading} />}
      <motion.div
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0, y: 20 }}
        animate={loading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Reveal><Services /></Reveal>
          <Reveal><Automations /></Reveal>
          <Reveal><About /></Reveal>
          <Reveal><Experience /></Reveal>
          <Reveal><Certifications /></Reveal>
          <Reveal><ToolsPlatforms /></Reveal>
          <Reveal><Testimonials /></Reveal>
          <Reveal><Process /></Reveal>
          <Reveal><Contact /></Reveal>
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
