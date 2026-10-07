import { InsertRiftBoundSingle } from "../db/schema/riftbound_singles";

export function mapRiftboundSingleToDB(single: any): InsertRiftBoundSingle {
    return {
    id: single.id,
    riftboundId: single.riftboundId,

    name: single.name,
    cleanName: single.cleanName,
    num: single.num,

    energy: single.energy ?? null,
    might: single.might ?? null,
    power: single.power ?? null,

    type: single.type,
    supertype: single.supertype ?? null,
    rarity: single.rarity,

    domains: JSON.stringify(single.domains ?? []),

    text: single.text ?? "",
    rich: single.rich ?? "",
    flavour: single.flavour ?? "",

    set: single.set,
    setName: single.setName,

    tags: JSON.stringify(single.tags ?? []),

    artist: single.artist ?? "",
    tcgId: single.tcgId ?? "",

    imgUrl: single.imgUrl ?? "",
    img: single.img ?? "",

    orientation: single.orientation ?? "portrait",

    alt: single.alt ? 1 : 0,
    sig: single.sig ? 1 : 0,
    over: single.over ? 1 : 0
  };
}



