"use client";

import { Squealer } from "../../lib/fonts";

export default function SquealerText({ children }) {
  return <span className={Squealer.className}>{children}</span>;
}
