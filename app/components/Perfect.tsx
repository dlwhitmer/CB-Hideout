"use client";

import { Perfect } from "../../lib/fonts";

export default function PerfectText({ children }) {
  return (
    <span className={Perfect.className}>
      {children}
    </span>
  );
}
