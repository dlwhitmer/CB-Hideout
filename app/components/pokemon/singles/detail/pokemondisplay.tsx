"use client";

import { PokemonSingle } from "../../../../../lib/db/schema/pokemon";
import PokemonCardHeader from "./pokemoncardheader";
import PokemonCardImage from "./polemoncardimage";
import PokemonCardStats from "./pokemoncardstats";
import PokemonCardAbilities from "./pokemoncardabilities";
import PokemonCardAttacks from "./pokemoncardattacks";
import PokemonCardPrices from "./pokemoncardprices";
import PokemonCollector from "./PokemonCollector";

type Props = {
  product: PokemonSingle;
};

export default function PokemonDisplay({ product }: Props) {
  const abilities = JSON.parse(product.abilities ?? "[]");
  const attacks = JSON.parse(product.attacks ?? "[]");
  return (
    <div className="flex gap-8 items-start justify-center">
      <div className="w-[320px] sticky top-[125px] self-start">
        <PokemonCardImage product={product} />
      </div>

      <div className=" w-[800px] rounded shadow p-4">
        <PokemonCardHeader product={product} />
        <PokemonCardStats product={product} />
        <PokemonCardAbilities abilities={abilities} />
        <PokemonCardAttacks attacks={attacks} />
        <PokemonCardPrices product={product}/>
        <PokemonCollector product={product}/>
      </div>
    </div>
  );
}
