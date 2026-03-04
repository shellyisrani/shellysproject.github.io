import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function StoryTeaser() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p
          className="text-lg md:text-xl text-[#2c2c2c] font-light tracking-wide"
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}
        >
          See how it all started
        </p>

        {/* Two decorative lines with gap */}
        <div className="flex items-center justify-center gap-6 mt-6 mb-10">
          <div className="w-20 md:w-32 h-px bg-[#c9a96e]" />
          <div className="w-20 md:w-32 h-px bg-[#c9a96e]" />
        </div>

        {/* Our Story Button */}
        <Link
          to={createPageUrl("OurStory")}
          className="inline-block px-10 py-4 bg-[#2c2c2c] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1a1a1a] transition-all duration-300"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Our Story
        </Link>
      </div>
    </section>
  );
}