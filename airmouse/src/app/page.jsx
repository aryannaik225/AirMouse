import HeroSection from "@/components/HeroSection";
import WhatAndWhy from "@/components/WhatAndWhy";
import React from "react";

export default function Home() {
  return (
    <div className="cursor-airmouse overflow-x-hidden">
      <HeroSection />
      <WhatAndWhy />
    </div>
  );
}
