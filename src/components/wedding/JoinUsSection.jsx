// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function JoinUsSection() {
  return (
    <section className="relative w-full">
      {/* Image with overlay text */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src="/images/join_us.jpg"
          alt="Wedding celebration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-start text-white px-6 pt-24">
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-90 mb-4"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Join Us
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We hope you can make it!
          </h2>
        </div>
      </div>

      {/* RSVP Box */}
      <div className="flex justify-center py-16 bg-white">
        <Link
          to={createPageUrl("RSVP")}
          className="px-12 py-4 bg-white border-2 border-[#2c2c2c] text-[#2c2c2c] text-xs tracking-[0.25em] uppercase hover:bg-[#2c2c2c] hover:text-white transition-all duration-300"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          RSVP
        </Link>
      </div>
    </section>
  );
}