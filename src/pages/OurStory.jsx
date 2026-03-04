import React from "react";
import HomeButton from "@/components/wedding/HomeButton";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />
      {/* Hero */}
      <div className="text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          How It All Began
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Our Story
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-6 pb-28 space-y-24">
        {/* First Meeting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80"
              alt="First meeting"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The Beginning
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              When We First Met
            </h2>
            <p
              className="text-[#2c2c2c] leading-relaxed opacity-70"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
            >
              It was one of those ordinary days that turned into something extraordinary. We met by chance, and from the very first conversation, we knew something special was unfolding. The laughter came easy, the silence felt comfortable, and the world seemed to slow down just for us.
            </p>
          </div>
        </div>

        {/* The Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p
              className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The Journey
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Growing Together
            </h2>
            <p
              className="text-[#2c2c2c] leading-relaxed opacity-70"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
            >
              From late-night conversations to early-morning adventures, every moment together has been a treasure. We've traveled, laughed, cried, and grown in ways we never thought possible. Through every season of life, our love has only deepened.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80"
              alt="Journey together"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* The Proposal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80"
              alt="The proposal"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The Question
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The Proposal
            </h2>
            <p
              className="text-[#2c2c2c] leading-relaxed opacity-70"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
            >
              And then came the moment that changed everything. With hearts full of love and eyes full of happy tears, we said yes to forever. Now we're counting down the days until we get to celebrate with all of you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}