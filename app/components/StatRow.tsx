import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
  align?: "left" | "center" | "right";
};

export default function StatRow({
  label,
  value,
  align = "center",
}: Props) {
  if (!value) return null;

  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`gap-x-10 sm:gap-x-10 md:gap-x-20 grid grid-cols-[1fr_3fr] ${alignment[align]}`}>
      <div className="text-[var(--dplbltext)] font-semibold">
        {label}
      </div>

      <div className="text-[var(--dpvtext)] font-semibold leading-relaxed">
        {value}
      </div>
    </div>
  );
}