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

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <BrandedLoader onComplete={() => setLoading(false)} />}
      <motion.div
        className="min-h-screen bg-background"
        initial={{ opacity: 0, y: 20 }}
        animate={loading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Process />
          <Automations />
          <About />
          <Experience />
          <Certifications />
          <ToolsPlatforms />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
