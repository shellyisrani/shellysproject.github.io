// @ts-nocheck
import React from "react";
import { MapPin, Phone, Globe } from "lucide-react";
import HomeButton from "@/components/wedding/HomeButton";

const hotels = [
  {
    name: "The Grand Hotel",
    distance: "0.5 miles from venue",
    description: "A luxurious option with stunning views and world-class amenities. We've secured a room block at a special rate for our guests.",
    image: "/images/hotel-1.jpg",
    link: "#",
  },
  {
    name: "Boutique Inn",
    distance: "1 mile from venue",
    description: "A charming and intimate setting perfect for a weekend getaway. Complimentary breakfast included with your stay.",
    image: "/images/hotel-2.jpg",
    link: "#",
  },
  {
    name: "Comfort Suites",
    distance: "2 miles from venue",
    description: "A comfortable and affordable option with spacious rooms. Great for families and groups traveling together.",
    image: "/images/hotel-3.jpg",
    link: "#",
  },
];

export default function TravelAndStay() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />
      {/* Hero */}
      <div className="text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Plan Your Trip
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Travel & Stay
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Getting There */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#faf9f7] p-10 md:p-14">
          <h2
            className="text-3xl font-light text-[#2c2c2c] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Getting There
          </h2>
          <p
            className="text-[#2c2c2c] leading-relaxed opacity-70 mb-8"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.9rem" }}
          >
            The venue is easily accessible by car and is approximately 30 minutes from the nearest airport. We recommend arriving on Friday to settle in and enjoy the area before the big day.
          </p>
          <a
            href="https://maps.app.goo.gl/jhLa4WTGhErdWxzX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#2c2c2c] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] transition-all duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>

      {/* Where to Stay */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <h2
          className="text-3xl md:text-4xl font-light text-[#2c2c2c] text-center mb-16"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Where to Stay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.name} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3
                className="text-xl font-light text-[#2c2c2c] mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {hotel.name}
              </h3>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#c9a96e] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {hotel.distance}
              </p>
              <p
                className="text-[#2c2c2c] leading-relaxed opacity-60 text-sm"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                {hotel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}