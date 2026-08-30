"use client";

import { SquealerEmbossed } from "../../lib/fonts";

export default function SquealerEmbossedText({ children }) {
  return <span className={SquealerEmbossed.className}>{children}</span>;
}