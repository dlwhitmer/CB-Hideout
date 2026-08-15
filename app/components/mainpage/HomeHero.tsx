"use client";

import { useEffect, useState } from "react";

export default function HomeHero() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-50 flex items-start justify-center transition-opacity duration-1000 ${
        showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="/images/CBH_Logo.png"
        alt="Card Hideout"
        className="h-[300px] sm:h-[300px] md:h-[350px] lg:h-[500px] w-auto"
      />
    </div>
  );
}
