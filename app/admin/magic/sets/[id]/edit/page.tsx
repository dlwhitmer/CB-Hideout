"use client";

import { useEffect, useState } from "react";
import { MagicSet } from "../../../../../../lib/db/schema";

export default function EditMagicSetsPage({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState<MagicSet | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/magic/sets/${params.id}`);
      const json = await res.json();
      setForm(json.data);
    }
    load();
  }, [params.id]);

  if (!form) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/magic/sets/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/magic/sets/${params.id}`;
  }

  return (
    <div>
      <h1>Edit Magic sets</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={form.setName}
          onChange={(e) => setForm({ ...form, setName: e.target.value })}
        />
       

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
