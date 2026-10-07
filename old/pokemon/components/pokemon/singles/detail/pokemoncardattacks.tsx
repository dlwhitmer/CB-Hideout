import StatRow from "../../../StatRow";

type Props = {
  attacks: any[];
};

export default function PokemonCardAbilities({ attacks }: Props) {
  if (!attacks || attacks.length === 0) {
    return null;
  }
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Attacks
      </h2>

      {attacks.map((attack, index) => (
        <div
          key={index}
          className="stat-rows "
        >
          <StatRow label="Name" value={attack.name} />
          <StatRow label="Damage" value={attack.damage} />
          <div className="attack-ability">
            <StatRow label="" value={attack.text} align="center" />
          </div>
        </div>
      ))}
    </section>
  );
}
