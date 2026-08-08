import StatRow from "../../../StatRow";

type Props = {
  product: any;
};


export default function YugiohCardStats({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <div className="text-center font-bold">
        <h2 className="text-xl">Card Stats</h2>
      </div>
      <div className="text-lg grid grid-cols-2 gap-1">
        {isLink && (
        <StatRow label="Link Rating" value={product.linkval} />

        )}
      </div>
    </section>
  );
}
