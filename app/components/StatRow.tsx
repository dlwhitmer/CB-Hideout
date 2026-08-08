import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
  align?: "left" | "center" | "right";
};

export default function StatRow({
  label,
  value,
  align = "left",
}: Props) {

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <p className={alignment[align]}>
      <span className="text-[var(--dplbltext)] pl-10 font-semibold">
        {label}
      </span>{" "}
      <span className="text-[var(--dpvtext)] font-semibold">
        {value}
      </span>
    </p>
  );
}