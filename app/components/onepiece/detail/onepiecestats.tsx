import { InsertOnePieceCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props = {
  product: InsertOnePieceCard;
};

export default function OnePieceStats({ product }: Props) {
  const type = product.cardType?.trim().toLowerCase();

  let header = "";
  let rows: { label: string; value: any }[] = [];

  switch (type) {
    case "leader":
      header = "Leader";
      rows = [
        { label: "Power", value: product.cardPower },
        { label: "Life", value: product.life },
        { label: "Attribute", value: product.attribute },
        { label: "Subtypes", value: product.subTypes },
      ];
      break;
    case "character":
      header = "Character";
      rows = [
        { label: "Power", value: product.cardPower },
        { label: "Life", value: product.life },
        { label: "Attribute", value: product.attribute },
        { label: "Subtypes", value: product.subTypes },
      ];
      break;
    case "event":
      header = "Event";
      rows = [
        { label: "Cost", value: product.cardCost },
        { label: "Subtypes", value: product.subTypes },
      ];
      break;
    case "stage":
      header = "Stage";
      rows = [
        { label: "Cost", value: product.cardCost },
        { label: "Subtypes", value: product.subTypes },
      ];
      break;
    case "don!!":
      header = "Done!!";
      rows = [{ label: "Don Type", value: product.subTypes }];
      break;

      default:
        header="Unknown Card Type";
        rows=[];
  }

  return (
    <section>
      <div className="stat-cat">
        <span>
          <h2 className="stat-h2">{header}</h2>
        </span>
      </div>
      <div className="stat-rows">
        {rows.map((row,i)=>(
            <StatRow key={i} label={row.label} value={row.value}/>
        ))}
      </div>
    </section>
  );
}
