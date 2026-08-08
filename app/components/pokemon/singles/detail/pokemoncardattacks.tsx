import StatRow from "../../../StatRow";

type Props = {
  attacks: any[];
};

export default function PokemonCardAbilities({ attacks }: Props) {
  if (!attacks || attacks.length === 0) {
    return null;
  }
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Attacks
      </h2>

      {attacks.map((attack, index) => (
        <div
          key={index}
          className="text-lg grid grid-cols-2 gap-2 mb-1 "
        >
          <StatRow label="Name" value={attack.name} />
          <StatRow label="Damage" value={attack.damage} />
          <div className="col-span-2">
            <StatRow label="" value={attack.text} align="center" />
          </div>
        </div>
      ))}
    </section>
  );
}
