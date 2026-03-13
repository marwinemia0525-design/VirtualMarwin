import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Automations from "@/components/Automations";
import EAWorkSamples from "@/components/EAWorkSamples";
import ToolsPlatforms from "@/components/ToolsPlatforms";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import UpworkCTA from "@/components/UpworkCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Automations />
        <EAWorkSamples />
        <ToolsPlatforms />
        <About />
        <Testimonials />
        <UpworkCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
