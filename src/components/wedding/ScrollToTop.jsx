import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-24 z-50 w-12 h-12 bg-[#2c2c2c] flex items-center justify-center hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}