"use client";

import CTA from "@/components/home/CTA";
import HowItWorks from "@/components/home/HowItWorks";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
