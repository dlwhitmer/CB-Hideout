export type PokemonSingleWithPrinting = {
  id: number;
  pokemonId: string;
  name: string;
  imageSmall: string;
  quantity: number;

  setCode: string | null;
  rarity: string | null;
  price: number | null;
};
