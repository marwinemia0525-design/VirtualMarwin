import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";

// Below-the-fold sections are lazy loaded to keep the initial bundle small.
const Services = lazy(() => import("@/components/Services"));
const AIAssistedDev = lazy(() => import("@/components/AIAssistedDev"));
const Automations = lazy(() => import("@/components/Automations"));
const FeaturedCaseStudy = lazy(() => import("@/components/FeaturedCaseStudy"));
const ToolsPlatforms = lazy(() => import("@/components/ToolsPlatforms"));
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Certifications = lazy(() => import("@/components/Certifications"));
const AdditionalCertifications = lazy(() => import("@/components/AdditionalCertifications"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={null}>
          <Reveal><Services /></Reveal>
          <Reveal><AIAssistedDev /></Reveal>
          <Reveal><FeaturedCaseStudy /></Reveal>
          <Reveal><Automations /></Reveal>
          <Reveal><About /></Reveal>
          <Reveal><Experience /></Reveal>
          <Reveal><Certifications /></Reveal>
          <Reveal><AdditionalCertifications /></Reveal>
          <Reveal><ToolsPlatforms /></Reveal>
          <Reveal><Testimonials /></Reveal>
          <Reveal><Contact /></Reveal>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
