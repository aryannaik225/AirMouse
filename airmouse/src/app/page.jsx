import ContactCTA from "@/components/ContactCTA";
import Downloads from "@/components/Downloads";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import SystemRequirements from "@/components/SystemRequirements";
import WhatAndWhy from "@/components/WhatAndWhy";
import React from "react";

export default function Home() {
  return (
    <div className="cursor-airmouse overflow-x-hidden">
      <HeroSection />
      <WhatAndWhy />
      <HowItWorks />
      <Downloads />
      <SystemRequirements />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}
