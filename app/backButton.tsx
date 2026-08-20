"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="w-[110px] rounded-md bg-[#f8cc1b] text-black text-2xl">
      ⬅️ Back
    </button>
  );
}
