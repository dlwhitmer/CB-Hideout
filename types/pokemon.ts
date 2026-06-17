export interface PokemonProduct {
  id: number;
  pokemonId: string;
  game: string;
  category: string;
  name: string | null;
  setCode: string | null;
  setName: string | null;
  cardNumber: string | null;
  rarity: string | null;
  flavorText: string | null;
  supertype: string | null;
  subtypes: string | null;
  hp: string | null;
  types: string | null;
  artist: string | null;
  quantity: string | null;
  imageSmall: string | null;
  imageLarge: string | null;
  price: number | null;
  releaseDate: string | null;
  createdAt: string | null;
}

export interface PokemonApiCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  artist?: string;
  images?: {
    small: string;
    large: string;
  };
  set: {
    id: string;
    name: string;
    releaseDate: string;
  };
  number: string;
  rarity?: string;
  flavorText?: string;
}

export interface PokemonImportInput {
  pokemon_id: string;
  price?: number;
  flavor_text?: string;
}