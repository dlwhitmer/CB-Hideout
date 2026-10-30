"use client";
import { useRouter } from "next/navigation";

export default function BackButtonToHome() {
  const router = useRouter();


  return (
<div className="pb-10 pointer-events-auto">
  <button
  onClick={() => {
    console.log("Back clicked");
    router.push('/');
  }}
  className="w-27.5 rounded-md bg-[#f8cc1b] text-black text-2xl"
>
  ⬅️ Back
</button>
</div>

  );
}

