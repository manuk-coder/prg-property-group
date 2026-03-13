import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialCTA } from "@/components/sections/TestimonialCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedListings />
      <ServicesSection />
      <TestimonialCTA />
    </>
  );
}
