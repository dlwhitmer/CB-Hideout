"use client";

import { useEffect, useState } from "react";

// ✅ Interface goes here
interface User {
  name: string;
}

export default function CartClient({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  console.log("User ID:", userId);
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    }

    loadUser();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-bold text-white">
        Welcome:&nbsp;{user ? user.name : "Loading..."}&nbsp; to your Cart
      </h1>
    </div>
  );
}
