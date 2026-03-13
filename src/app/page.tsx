import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialCTA } from "@/components/sections/TestimonialCTA";

export const metadata: Metadata = {
  title: "Miami Luxury Real Estate & Property Management | PRG Property Group",
  description: "Elite real estate brokers and property managers specializing in Key Biscayne, Miami Midtown, and the Design District. Invest in luxury properties today.",
};

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Miami Luxury Real Estate Broker & Property Management | Key Biscayne, Midtown, Design District</h1>
      <HeroSection />
      <IntroSection />
      <FeaturedListings />
      <ServicesSection />
      <TestimonialCTA />
    </main>
  );
}
