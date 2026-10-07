"use client";

import { PokemonCard } from "../../../../../lib/db/schema/pokemon_cards";
import PokemonCardImage from "./pokemoncardsimage";
import PokemonCardsHeader from "./pokemoncardsheader";
import PokemonCardsStats from "./pokemoncardsstats";
import PokemonCardsAbilities from "./pokemoncardsabilities";
import PokemonCardsAttacks from "./pokemoncardsattacks";
import PokemonCollector from "./pokemoncollectorinfo";
import PokemonCardDescription from "./pokemoncardsdesc";

type Props = {
  product: PokemonCard;
};

export default function PokemonCardsDisplay({ product }: Props) {
  const abilities = JSON.parse(product.abilities ?? "[]");
  const attacks = JSON.parse(product.attacks ?? "[]");
  return (
    <div className="image-top">
      <div className="display-image">
        <PokemonCardImage product={product} />
      </div>

      <div className=" display-stats">
        <PokemonCardsHeader product={product} />
        <PokemonCardDescription product={product} />
        <PokemonCollector product={product} />
        <PokemonCardsStats product={product} />
        <PokemonCardsAbilities abilities={abilities} />
        <PokemonCardsAttacks attacks={attacks} />
        <PokemonCollector product={product} />
      </div>
    </div>
  );
}
