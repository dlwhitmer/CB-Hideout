"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PokemonSingle } from "../../../../../../lib/db/schema/pokemon";

export default function EditPokemonSinglePage() {
  const { id } = useParams();
  const [form, setForm] = useState<PokemonSingle | null>(null);

  console.log("EDIT PAGE PARAM ID:", id);

  useEffect(() => {
    if (!id) return; // prevents undefined fetch

    async function load() {
      const res = await fetch(`/api/pokemon/singles/${id}`);
      const json = await res.json();
      setForm(json.data);
    }
    load();
  }, [id]);

  if (!id) return <div>Loading ID...</div>;
  if (!form) return <div>Loading card...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/pokemon/singles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/pokemon/singles`;
  }

  return (
    <div>
      <h1>Edit Pokemon Single</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
  <input
    className="border p-2 rounded"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />

  <input
    className="border p-2 rounded"
    value={form.setName}
    onChange={(e) => setForm({ ...form, setName: e.target.value })}
  />

  <input
    className="border p-2 rounded"
    value={form.rarity}
    onChange={(e) => setForm({ ...form, rarity: e.target.value })}
  />

  <input
  className="border p-2 rounded"
  type="text"
  value={`$${form.price.toFixed(2)}`}
  onChange={(e) => {
    // Remove $ and commas
    const raw = e.target.value.replace(/[^0-9.]/g, "");

    // Convert to number
    const num = parseFloat(raw);

    setForm({ ...form, price: isNaN(num) ? 0 : num });
  }}
/>

  <button
    type="submit"
    className="bg-blue-600 text-white p-2 rounded"
  >
    Save
  </button>
</form>

    </div>
  );
}
