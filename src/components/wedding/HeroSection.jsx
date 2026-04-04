// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function HeroSection() {
  const countdown = useCountdown("2026-09-26T17:00:00-04:00"); // EDT (Eastern Daylight Time)
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

        {/* Date */}
        <p
          className="mt-6 text-lg md:text-xl tracking-[0.3em] font-semibold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          9.26.2026
        </p>

        {/* Countdown */}
        <div className="mt-6 flex gap-6">
          {[[countdown.days, "Days"], [countdown.hours, "Hrs"], [countdown.minutes, "Min"], [countdown.seconds, "Sec"]].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-4xl md:text-4xl font-semibold md:font-light" style={{ fontFamily: "var(--font-serif)" }}>
                {String(val).padStart(2, "0")}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase opacity-70 mt-1" style={{ fontFamily: "var(--font-sans)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The Details with arrow - truly centered */}
      <button
        onClick={scrollToDetails}
        className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 cursor-pointer group z-10"
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