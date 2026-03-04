import React, { useState } from "react";
import HomeButton from "@/components/wedding/HomeButton";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PASSWORD = "sherry";

export default function RehearsalDinner() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <HomeButton />
        <div className="text-center max-w-sm w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-[#f5f3f0] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#c9a96e]" />
            </div>
          </div>
          <h1
            className="text-3xl font-light text-[#2c2c2c] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Rehearsal Dinner
          </h1>
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-10"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Private Access Only
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              className="border-[#e8e6e3] rounded-none py-6 text-center focus:border-[#c9a96e] focus:ring-0"
              style={{ fontFamily: "var(--font-sans)" }}
            />
            {error && (
              <p
                className="text-xs tracking-wide text-[#b0856a]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Incorrect password. Please try again.
              </p>
            )}
            <Button
              type="submit"
              className="w-full py-6 bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white text-xs tracking-[0.25em] uppercase rounded-none"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Enter
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />

      {/* Hero */}
      <div className="text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          September 25, 2026
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Rehearsal Dinner
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-32 space-y-16">
        <div className="text-center">
          <p
            className="text-[#2c2c2c] opacity-60 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            We're so excited to celebrate the evening before our big day with our closest family and friends. Details below!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Date", value: "Friday, September 25", sub: "2026" },
            { label: "Time", value: "7:00 PM", sub: "Dinner to follow" },
            { label: "Location", value: "TBD", sub: "Details coming soon" },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e]" style={{ fontFamily: "var(--font-sans)" }}>
                {item.label}
              </p>
              <p className="text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "var(--font-serif)" }}>
                {item.value}
              </p>
              <p className="text-xs text-[#2c2c2c] opacity-50" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}