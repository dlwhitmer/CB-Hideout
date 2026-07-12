"use client";

import { useEffect, useState } from "react";
import { MagicPack } from "../../../../../lib/db/schema";

export default function MagicPackDetail({ params }: { params: { id: string } }) {
  const [pack, setPack] = useState<MagicPack | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/magic/packs/${params.id}`);
      const json = await res.json();
      setPack(json.data);
    }
    load();
  }, [params.id]);

  if (!pack) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pack.packName}</h1>
      <p>Pack Code: {pack.setCode}</p>
      <p>Price: ${pack.price}</p>
      <p>Quantity: ${pack.quantity}</p>

      <a href={`/admin/magic/packs/${pack.id}/edit`}>Edit</a>
    </div>
  );
}
