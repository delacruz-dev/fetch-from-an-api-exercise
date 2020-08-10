import * as React from "react";
// import { getPokemons } from "./services/pokemons";
// import { Pokemon } from "./services/types";
import PokemonListItem from "./pokemon-list-item";
import data from "./data.json";

export default function App() {
  // const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  // React.useEffect(() => {
  //   getPokemons().then(setPokemons);
  // }, []);

  return (
    <section>
      {data.results.map((item) => (
        <PokemonListItem key={item.name} name={item.name} />
      ))}
    </section>
  );
}
