import React, { useRef } from "react";
import HomeButton from "@/components/wedding/HomeButton";

const sections = [
  { id: "timeline", label: "Timeline of Events" },
  { id: "menu", label: "The Menu" },
  { id: "faq", label: "FAQ" },
];

export default function DayOfWedding() {
  const refs = {
    timeline: useRef(null),
    menu: useRef(null),
    faq: useRef(null),
  };

  const scrollTo = (id) => {
    refs[id].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />

      {/* Hero */}
      <div className="text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          September 26, 2026
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Day of the Wedding
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>

        {/* Section Nav */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-sm font-bold tracking-[0.15em] uppercase text-[#8a7560] hover:text-[#c9a96e] transition-colors duration-300 border-b-2 border-transparent hover:border-[#c9a96e] pb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-6 pb-32 space-y-28">

        {/* Timeline */}
        <div ref={refs.timeline} id="timeline">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3" style={{ fontFamily: "var(--font-sans)" }}>
            The Day
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-10" style={{ fontFamily: "var(--font-serif)" }}>
            Timeline of Events
          </h2>
          <div className="space-y-0">
            {[
              { time: "3:30 PM", event: "Guests Arrive & are Seated" },
              { time: "4:00 PM", event: "Ceremony Begins" },
              { time: "4:30 PM", event: "Cocktail Hour" },
              { time: "5:45 PM", event: "Dinner" },
              { time: "7:00 PM", event: "Dessert & Reception" },
              { time: "10:30 PM", event: "Second Dessert" },
              { time: "11:30 PM", event: "Bedtime" },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 py-5 border-b border-[#e8e6e3]">
                <span
                  className="text-[#c9a96e] text-sm tracking-widest w-24 shrink-0"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  {item.time}
                </span>
                <span
                  className="text-[#2c2c2c] text-sm"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div ref={refs.menu} id="menu">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3" style={{ fontFamily: "var(--font-sans)" }}>
            Culinary Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-10" style={{ fontFamily: "var(--font-serif)" }}>
            The Menu
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3" style={{ fontFamily: "var(--font-sans)" }}>
            From the Cocktail Hour onwards, we will have a full open bar which will include liquor, beer, wine and a variety of non-alcholic drinks.
            <br />
            The kitchen at Roxbury is fully nut-free and can accomodate specific allergies or dietary restrictions. Please let us know in the RSVP section if any allergies or restrictions need to be noted down.
          </p>
          <div className="space-y-10">
            {[
              {
                course: "Cocktail Hour (Passed Hors D'Oeuvre's)",
                items: [
                  "Mac & Cheese Shooter",
                  "Fried Chicken Skewers (GF/DF)",
                  "Butternut Squash Flatbread",
                  "Vegetable Samosa (GF/DF/VEG)"
                ],
              },
              {
                course: "First Course",
                items: ["Cabbage & Carrot Salad w/Tumeric & Lemon Vinaigrette (GF/DF/V)"],
              },
              {
                course: "Main Course",
                note: "All entrées are served with garlic naan (gluten-free option available).",
                items: [
                  "Palak Paneer (GF/VEG)",
                  "Aloo Gobi (GF/DF/V)",
                  "Lamb Vindaloo (GF)",
                  "Butter Chicken (GF)"
                ],
              },
              {
                course: "Dessert",
                items: ["Wedding Cake", "Seasonal Fruit & Cream"],
              },
            ].map((course, i) => (
              <div key={i}>
                <h3
                  className="text-xs tracking-[0.2em] uppercase text-[#8a7560] mb-4 font-bold"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {course.course}
                </h3>
                <ul className="space-y-2">
                  {course.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-[#2c2c2c] text-sm flex items-start gap-3"
                      style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                    >
                      <span className="text-[#c9a96e] mt-1">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div ref={refs.faq} id="faq">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3" style={{ fontFamily: "var(--font-sans)" }}>
            Good to Know
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#2c2c2c] mb-10" style={{ fontFamily: "var(--font-serif)" }}>
            FAQ
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "What is the dress code?",
                a: "No black or red is allowed! Exceptions will be made for shoes. \n Black tie preferred. We encourage guests to dress to impress — think formal gowns, suits, or cocktail attire.",
              },
              {
                q: "Will there be transportation?",
                a: "Shuttle service will be provided between select hotels and the venue. Details will be shared closer to the date. Due to the location of the venue, rideshare services may take a while to come or may not be available at all.",
              },
              {
                q: "Is there parking at the venue?",
                a: "Yes, but parking is limited. If you prefer to not use the complimentary shuttle, please let us know so we can keep track of parking availiblity.",
              },
              {
                q: "Are children welcome?",
                a: "We love your little ones! However, this event is adults-only.",
              },
              {
                q: "Can I take photos during the ceremony?",
                a: "We are having an unplugged ceremony — please keep phones and cameras away during the ceremony so everyone can be fully present. Feel free to snap away at the reception!",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-[#e8e6e3] pb-8">
                <h3
                  className="text-[#2c2c2c] mb-3 font-bold text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.q}
                </h3>
                <p
                  className="text-[#2c2c2c] opacity-60 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}