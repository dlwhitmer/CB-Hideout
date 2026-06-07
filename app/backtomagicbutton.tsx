"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/magic")}
      className="bg-[#000]/30 w-[100px] border-2 border-[gray]/80"
    >
      Back
    </button>
  );
}