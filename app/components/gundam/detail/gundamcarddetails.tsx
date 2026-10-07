"use client";
import { InsertGundamCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertGundamCard;
};
export default function GundamCardDetails({ product }: Props) {
  const trait = product.trait;
  let link: string[] = [];
  try {
    const parsed = JSON.parse(product.linkRefs as string);

    if (Array.isArray(parsed)) {
      link = parsed;
    } else if (typeof parsed === "string") {
      link = [parsed];
    }
  } catch {
    link = [product.linkRefs as string];
  }

  let keyword: string[] = [];
  try {
    const parsed = JSON.parse(product.keywordEffects as string);

    if (Array.isArray(parsed)) {
      keyword = parsed;
    } else if (typeof parsed === "string") {
      keyword = [parsed];
    }
  } catch {
    link = [product.keywordEffects as string];
  }

  
  const effect = product.effect;

  return (
    <section className="mb-6">
      <div className="stat-cat">
        <h2 className="stat-h2">Card Details</h2>
      </div>
      <div className="stat-rows divide-y divide-white">
        <StatRow label="Trait" value={trait} align="center" />
        <StatRow label="Keywords" value={keyword} align="center" />
        <StatRow label="Link Refs" value={link.length ? link.join(", ") : "None"} />
        <StatRow label="Card Effect" value={effect} align="center" />
      </div>
    </section>
  );
}
