// @ts-nocheck
import React from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToDetails = () => {
    const el = document.getElementById("the-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home_page.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center text-white px-10 md:px-16 lg:px-24 max-w-xl">
        {/* Top text */}
        <p
          className="text-xs md:text-sm tracking-[0.35em] uppercase mb-8 opacity-100 font-semibold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We're Getting Married!
        </p>

        {/* Names */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Kerry & Shelly
        </h1>

        {/* Save the Date */}
        <p
          className="mt-6 text-sm md:text-base tracking-[0.2em] uppercase opacity-100 font-semibold"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          Save the Date
        </p>

        {/* Date */}
        <p
          className="mt-3 text-lg md:text-xl tracking-[0.3em] font-semibold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          9.26.2026
        </p>

      </div>

      {/* The Details with arrow - truly centered */}
      <button
        onClick={scrollToDetails}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 cursor-pointer group z-10"
      >
        <span
          className="text-xs tracking-[0.25em] uppercase text-white opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The Details
        </span>
        <ChevronDown className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 animate-bounce" />
      </button>
    </section>
  );
}