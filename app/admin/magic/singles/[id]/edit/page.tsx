"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MagicSingle } from "../../../../../../lib/db/schema/magic";

export default function EditMagicSinglePage() {
  const { id } = useParams();
  const [form, setForm] = useState<MagicSingle | null>(null);

  console.log("EDIT PAGE PARAM ID:", id);

  useEffect(() => {
    if (!id) return; // prevents undefined fetch

    async function load() {
      const res = await fetch(`/api/magic/singles/${id}`);
      const json = await res.json();
      setForm(json.data);
    }

    load();
  }, [id]);

  if (!id) return <div>Loading ID...</div>;
  if (!form) return <div>Loading card...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/magic/singles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/magic/singles/${id}`;
  }

  return (
    <div>
      <h1>Edit Magic Single</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          value={form.set_name}
          onChange={e => setForm({ ...form, set_name: e.target.value })}
        />

        <input
          value={form.rarity}
          onChange={e => setForm({ ...form, rarity: e.target.value })}
        />

        <input
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
