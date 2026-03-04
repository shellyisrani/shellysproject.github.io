import React from "react";
import HeroSection from "@/components/wedding/HeroSection";
import DetailsSection from "@/components/wedding/DetailsSection";
import StoryTeaser from "@/components/wedding/StoryTeaser";
import JoinUsSection from "@/components/wedding/JoinUsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DetailsSection />
      <StoryTeaser />
      <JoinUsSection />
    </div>
  );
}