import StatRow from "../../../StatRow";

type Props = {
  abilities: any[];
};

export default function PokemonCardAbilities({ abilities }: Props) {
  if (!abilities || abilities.length === 0) {
    return null;
  }
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-xl underline text-center font-bold mb-2">
        Abilities
      </h2>

      {abilities.map((ability, index) => (
        <div
          key={index}
          className="text-lg grid grid-cols-2 gap-1">
          <StatRow label="Name" value={ability.name} />
          <StatRow label="Type" value={ability.type} />
          <div className="col-span-2">
            <StatRow label="" value={ability.text} align="center" />
          </div>
        </div>
      ))}
    </section>
  );
}
