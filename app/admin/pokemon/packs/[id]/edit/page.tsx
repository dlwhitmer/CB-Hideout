"use client";

import { useEffect, useState } from "react";
import { PokemonPack } from "../../../../../../lib/db/schema";

export default function EditPokemonPackPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<PokemonPack | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/pokemon/packs/${params.id}`);
      const json = await res.json();
      setForm(json.data);
    }
    load();
  }, [params.id]);

  if (!form) return <div>Loading...</div>;
  const f = form; // ⭐ SAFE ALIAS — fixes the red underline

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/pokemon/packs/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(f),
    });

    window.location.href = `/admin/pokemon/packs/${params.id}`;
  }

  return (
    <div>
      <h1>Edit pokemon Pack</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={f.packName}
          onChange={(e) => setForm({ ...f, packName: e.target.value })}
        />

        <input
          value={f.setCode}
          onChange={(e) => setForm({ ...f, setCode: e.target.value })}
        />

        <input
          type="text"
          value={f.imageUrl ?? ""}
          onChange={(e) => setForm({ ...f, imageUrl: e.target.value })}
        />

        <input
          type="number"
          value={f.price}
          onChange={(e) => setForm({ ...f, price: Number(e.target.value) })}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
