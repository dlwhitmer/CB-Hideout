"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [yugiohId, setYugiohId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/yugioh/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        yugiohId,
        price,
        desc: description,
      }),
    });

    router.push("/admin/yugioh");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import Yu-Gi-Oh Card</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
        
        <input
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Yu-Gi-Oh Card ID"
          value={yugiohId}
          onChange={(e) => setYugiohId(e.target.value)}
        />

        <input
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Import Card
        </button>
      </form>
    </div>
  );
}
