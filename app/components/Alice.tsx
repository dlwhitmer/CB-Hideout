"use client";

import { Alice } from "../../lib/fonts";

export default function AliceFont({ children }: { children: React.ReactNode }) {
  return (
    <span className={Alice.className}>
      {children}
    </span>
  );
}