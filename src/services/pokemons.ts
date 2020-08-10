import { Pokemon } from "./types";

export async function getPokemons(): Promise<Pokemon[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const { results } = await response.json();
  return results;
}
