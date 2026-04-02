// @ts-nocheck
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

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 pb-28 space-y-10">
        {/* Image on top */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="/images/our_story.jpg"
            alt="Our Story"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Centered paragraphs */}
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-[#2c2c2c] leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            Kerry and Shelly’s story started the way many modern love stories do: with a match on Hinge in 2018. After months of canceling plans to meet up, the two met in downtown Manhattan for their first date at the (now closed) Ghost Donkey. What began as a simple conversation quickly turned into something much more meaningful, and the two have been inseparable since.
          </p>
          <p
            className="mt-5 text-[#2c2c2c] leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            Six months in, they made the practical decision of moving in together to avoid long distance after graduating from college. Shortly after, in desperate need of another significant life change, they adopted their first cat, Florence. About six months later, they added a second cat to the mix, Mozart (just in time for a global pandemic). Suddenly, after just one year together, they were together 24/7 with two cats who had no respect for personal space.
          </p>
          <p
            className="mt-5 text-[#2c2c2c] leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            Over the years together, Kerry and Shelly learned how to grow both in a long-term relationship and as individuals. Placing an importance on professional development, they have successfully acquired their dream careers: an attorney and a data wizard. They also prioritize traveling, having now visited 14 countries together. They have so many amazing memories to look back on in the last 7 years and so many new ones to look forward to.
          </p>
          <p
            className="mt-5 text-[#2c2c2c] leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            In 2024, shortly after getting engaged, Kerry and Shelly welcomed their third child, Iris. Through it all, they’ve built a life (and a zoo) full of love, resilience, and just the right amount of chaos. Now, they can’t wait to celebrate the next chapter with all of you.
          </p>
        </div>
      </div>
    </div>
  );
}