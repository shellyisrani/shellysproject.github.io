import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home } from "lucide-react";

export default function HomeButton() {
  return (
    <Link
      to={createPageUrl("Home")}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#2c2c2c] flex items-center justify-center hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg"
      title="Home"
    >
      <Home className="w-5 h-5 text-white" />
    </Link>
  );
}