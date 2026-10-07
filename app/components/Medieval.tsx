"use client";

import { MedIeval } from "../../lib/fonts";

export default function MedievalFont({ children }: { children: React.ReactNode }) {
  return (
    <span className={MedIeval.className}>
      {children}
    </span>
  );
}