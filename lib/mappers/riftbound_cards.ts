import { InsertRiftBoundCard } from "../db/schema/riftbound_cards"

export function mapRiftBoundCardToDB(card: any): InsertRiftBoundCard{
    return{
 
  riftboundId: card.riftboundId,

  name: card.name,
  cleanName: card.cleanName,
  num: card.num,

  energy: card.energy ?? null,
  might: card.might ?? null,
  power: card.power ?? null,

  type: card.type,
  supertype: card.supertype ?? null,
  rarity: card.rarity,

  domains: JSON.stringify(card.domains ?? []),

  text: card.text ?? "",
  rich: card.rich ?? "",
  flavour: card.flavour ?? "",

  set: card.set,
  setName: card.setName,

  tags: JSON.stringify(card.tags ?? []),

  artist: card.artist ?? "",
  tcgId: card.tcgId ?? "",

  imgUrl: card.imgUrl ?? "",
  img: card.img ?? "",

  orientation: card.orientation ?? "portrait",

  alt: card.alt ? 1 : 0,
  sig: card.sig ? 1 : 0,
  over: card.over ? 1 : 0
}};
 
 