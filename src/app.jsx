import React from "react";
import PokemonListItem from "./pokemon-list-item";
import { getPokemons } from "./services/pokemons";

export default function App() {
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  return (
    <section>
      {pokemons.map((item) => (
        <PokemonListItem key={item.name} name={item.name} />
      ))}
    </section>
  );
}
