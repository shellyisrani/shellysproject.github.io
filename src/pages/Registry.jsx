import React from "react";
import { Gift, Heart, ExternalLink } from "lucide-react";
import HomeButton from "@/components/wedding/HomeButton";

const registries = [
  {
    name: "Crate & Barrel",
    description: "Home essentials and beautiful pieces for our new life together.",
    link: "#",
  },
  {
    name: "Williams Sonoma",
    description: "Kitchen and dining items for all the dinner parties we plan to host.",
    link: "#",
  },
  {
    name: "Honeymoon Fund",
    description: "Help us create unforgettable memories on our honeymoon adventure.",
    link: "#",
  },
];

export default function Registry() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />
      {/* Hero */}
      <div className="text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Gifts & Wishes
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Registry
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Message */}
      <div className="max-w-2xl mx-auto text-center px-6 pb-16">
        <p
          className="text-[#2c2c2c] leading-relaxed opacity-70"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.95rem", lineHeight: "1.8" }}
        >
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've registered at the following places. We are so grateful for your generosity and love.
        </p>
      </div>

      {/* Registry Cards */}
      <div className="max-w-4xl mx-auto px-6 pb-28">
        <div className="space-y-6">
          {registries.map((registry) => (
            <a
              key={registry.name}
              href={registry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="border border-[#e8e6e3] p-8 md:p-12 flex items-center justify-between hover:border-[#c9a96e] transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#faf9f7] flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-[#c9a96e]" />
                  </div>
                  <div>
                    <h3
                      className="text-xl md:text-2xl font-light text-[#2c2c2c] mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {registry.name}
                    </h3>
                    <p
                      className="text-[#2c2c2c] opacity-50 text-sm"
                      style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                    >
                      {registry.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
              </div>
            </a>
          ))}
        </div>

        {/* Love note */}
        <div className="text-center mt-20">
          <Heart className="w-6 h-6 text-[#c9a96e] mx-auto mb-4" />
          <p
            className="text-[#2c2c2c] opacity-50 text-sm"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem" }}
          >
            With love and gratitude, Kerry & Shelly
          </p>
        </div>
      </div>
    </div>
  );
}