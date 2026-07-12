"use client";

import { cardboard } from "../../lib/fonts";

export default function MagicWord({ children }: { children: React.ReactNode }) {
  return (
    <span className={cardboard.className}>
      {children}
    </span>
  );
}