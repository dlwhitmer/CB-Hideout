"use client";

import { useEffect, useState } from "react";
import { MagicPack } from "../../../../../../lib/db/schema";

export default function EditMagicPackPage({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState<MagicPack | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/magic/packs/${params.id}`);
      const json = await res.json();
      setForm(json.data);
    }
    load();
  }, [params.id]);

  if (!form) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/magic/packs/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/magic/packs/${params.id}`;
  }

  return (
    <div>
      <h1>Edit Magic Packs</h1>

      <form onSubmit={handleSubmit}>
  <input
    value={form.packName}
    onChange={(e) => setForm({ ...form, packName: e.target.value })}
  />

  <input
    value={form.setCode}
    onChange={(e) => setForm({ ...form, setCode: e.target.value })}
  />

  <input
    type="text"
    value={form.imageUrl ?? ""}
    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
  />

  <input
    type="number"
    value={form.price}
    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
  />

  <input
    type="number"
    value={form.quantity}
    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
  />

  <button type="submit">Save</button>
</form>

    </div>
  );
}
