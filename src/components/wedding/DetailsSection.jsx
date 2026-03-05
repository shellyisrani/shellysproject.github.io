import React from "react";
import { MapPin, Clock, Calendar } from "lucide-react";

export default function DetailsSection() {
  return (
    <section id="the-details" className="w-full bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left - Details */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 order-2 lg:order-1">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The Celebration
          </p>

          <h2
            className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-12"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            When & Where
          </h2>

          <div className="space-y-10">
            {/* Date */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2c] flex items-center justify-center flex-shrink-0 mt-1">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase font-medium text-[#2c2c2c] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Date
                </h3>
                <p
                  className="text-2xl text-[#2c2c2c] font-light"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  September 26, 2026
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2c] flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase font-medium text-[#2c2c2c] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Time
                </h3>
                <p
                  className="text-2xl text-[#2c2c2c] font-light"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  4:00 PM
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2c] flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3
                  className="text-sm tracking-[0.15em] uppercase font-medium text-[#2c2c2c] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Venue
                </h3>
                <p
                  className="text-2xl text-[#2c2c2c] font-light mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The Wedding Venue
                </p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#b8944f] transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  View on Google Maps
                  <span className="text-base">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative min-h-[50vh] lg:min-h-full order-1 lg:order-2 overflow-hidden">
          <img
            src="/images/when_where.jpg"
            alt="Wedding venue"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectPosition: '50% 100%'
            }}
          />
        </div>
      </div>
    </section>
  );
}