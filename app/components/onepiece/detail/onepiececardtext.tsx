import { InsertOnePieceCard } from "../../../../lib/db/schema";
import StatRow from "../../StatRow";

type Props={
    product: InsertOnePieceCard
};

function extractMain(text: string) {
  const match = text.match(/\[Main\]\s*(.*)/);
  return match ? match[1].trim() : null;
}

function extractTrigger(text: string) {
  const match = text.match(/\[Trigger\]\s*(.*)/);
  return match ? match[1].trim() : null;
}

function extractKeywords(text: string) {
  const matches = text.match(/\[(Rush|Blocker|Banish|Double Attack|DON!!.*?|On Play|When Attacking)\]/g);
  return matches ? matches.map(k => k.replace(/\[|\]/g, "")) : [];
}
function extractDon(text: string) {
  const match = text.match(/\[DON!!.*?\]/);
  return match ? match[0].replace(/\[|\]/g, "") : null;
}



export default function OnePieceCardText({product}:Props){
    const text=product.cardText;
    const main=extractMain(text);
    const trigger=extractTrigger(text);
    const keywords=extractKeywords(text);
    const don=extractDon(text);

    const rows=[
        main &&{label: "Main Effect",value:main},
        trigger &&{label:"Trigger",value:trigger},
        keywords.length> 0 && {label:"Keywords",value: keywords.join(", ")},
        don && {label:"Don!! Requirement", value:don},
    ].filter(Boolean);

    return(
        <section>
            <div className="stat-cat">
            <h2 className="stat-h2">Card Text</h2>
            </div>
            <div className="stat-rows">
                {rows.map((row,i)=>(
                    <StatRow key={i} label={row.label} value={row.value}/>
                ))}
            </div>
        </section>
    )
}