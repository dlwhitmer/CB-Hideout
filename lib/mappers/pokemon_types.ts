
export interface MappedPokemonCard {
  
  game: string;
  pokemonId: string;
  category: string;

  name: number | null;

  setCode: string;
  setName: string;

  cardNumber: string | null;
  rarity: string;
  
  flavorText: string;
  supertype: string;

  subtypes: string;

  hp: string;
  types: string | null;

  artist: string;
  imageSmall: string;

  imageLarge: string;
  price: number;

  releaseDate: string | null;
  createdAt: string;
}
