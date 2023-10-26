export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonList = {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonListItem[];
};
