"use client";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();

  return (
    <div className="pb-10 pointer-events-auto">
      <button
        onClick={() => {
          console.log("Back clicked");
          router.push("/magic/singles");
        }}
        className="w-27.5 rounded-2xl bg-[#fbf2c4] border-3  text-black"
      >
        <div className="flex items-center justify-center gap-2 h-10">
          <span className="text-xl">⬅️</span>

          <div className="flex flex-col items-center justify-center text-sm">
            <span>Back To</span>
            <span>Singles</span>
          </div>
        </div>
      </button>
    </div>
  );
}
