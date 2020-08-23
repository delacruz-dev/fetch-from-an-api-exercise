import React from "react";
import PokemonListItem from "./pokemon-list-item";
import { getPokemons } from "./services/pokemons";

export default function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [errorState, setErrorState] = React.useState({ hasErrors: false });

  React.useEffect(() => {
    getPokemons().then(setPokemons).catch(handleError);
  }, []);

  function handleError(err) {
    setErrorState({ hasErrors: true, message: err.message });
  }

  return (
    <section>
      {errorState.hasErrors && <div>{errorState.message}</div>}
      {pokemons.map((item) => (
        <PokemonListItem key={item.name} name={item.name} />
      ))}
    </section>
  );
}
