"use client";

import { PokemonSingle } from "../../../../../lib/db/schema/pokemon_singles";
import PokemonCardHeader from "./pokemoncardheader";
import PokemonCardImage from "./polemoncardimage";
import PokemonCardStats from "./pokemoncardstats";
import PokemonCardAbilities from "./pokemoncardabilities";
import PokemonCardAttacks from "./pokemoncardattacks";
import PokemonCardPrices from "./pokemoncardprices";
import PokemonCollector from "./PokemonCollector";
import PokemonPurchaseInfo from "./pokemonpurchaseinfo";

type Props = {
  product: PokemonSingle;
};

export default function PokemonDisplay({ product }: Props) {
  const abilities = JSON.parse(product.abilities ?? "[]");
  const attacks = JSON.parse(product.attacks ?? "[]");
  return (
    <div className="image-top">
      <div className="display-image">
        <PokemonCardImage product={product} />
      </div>

      <div className=" display-stats">
        <PokemonCardHeader product={product} />
        <PokemonCardStats product={product} />
        <PokemonCardAbilities abilities={abilities} />
        <PokemonCardAttacks attacks={attacks} />
        <PokemonCardPrices product={product} />
        <PokemonCollector product={product} />
        <PokemonPurchaseInfo product={product} />
      </div>
    </div>
  );
}
