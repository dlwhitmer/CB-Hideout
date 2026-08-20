import StatRow from "../../../StatRow";

type Props = {
  abilities: any[];
};

export default function PokemonCardAbilities({ abilities }: Props) {
  if (!abilities || abilities.length === 0) {
    return null;
  }
  return (
    <section className="stat-section">
      <h2 className="stat-cat">
        Abilities
      </h2>

      {abilities.map((ability, index) => (
        <div
          key={index}
          className="stat-rows">
          <StatRow label="Name" value={ability.name} />
          <StatRow label="Type" value={ability.type} />
          <div className="attack-ability">
            <StatRow label="" value={ability.text} align="center" />
          </div>
        </div>
      ))}
    </section>
  );
}
