// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";
import ScrollToTop from "@/components/wedding/ScrollToTop";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = currentPageName === "Home";

  const navItems = [
    { name: "Our Story", page: "OurStory" },
    { name: "Travel & Stay", page: "TravelAndStay" },
    { name: "Day of the Wedding", page: "DayOfWedding" },
    { name: "Registry", page: "Registry" },
    { name: "Rehearsal Dinner", page: "RehearsalDinner" },
    { name: "RSVP", page: "RSVP" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Montserrat', system-ui, sans-serif;
          --color-charcoal: #2c2c2c;
          --color-warm-white: #faf9f7;
          --color-gold: #c9a96e;
          --color-soft-gray: #e8e6e3;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${isHome ? 'absolute bg-transparent' : 'fixed bg-white/95 backdrop-blur-sm border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Left Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, -1).map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-70 ${
                  isHome ? 'text-white' : 'text-[#2c2c2c]'
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className={`w-6 h-6 ${isHome ? 'text-white' : 'text-[#2c2c2c]'}`} />
          </button>

          {/* RSVP Button */}
          <Link
            to={createPageUrl("RSVP")}
            className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              isHome
                ? 'bg-white text-[#2c2c2c] hover:bg-gray-100'
                : 'bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]'
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            RSVP
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10 md:hidden">
          <button
            className="absolute top-6 right-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-[#2c2c2c]" />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#2c2c2c] text-sm tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <ScrollToTop />

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}