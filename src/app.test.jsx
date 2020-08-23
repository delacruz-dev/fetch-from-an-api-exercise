import React from "react";
import App from "./app";
import { render, screen } from "@testing-library/react";
import data from "./data.json";

describe("Pokémon app", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("shows a list of Pokémons retrieved from an API", async () => {
    // Modificamos el comportamiento de la función fetch
    // para que devuelva los resultados que nos interesan, en lugar
    // de ejecutarse
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });

    render(<App />);

    // Comprobamos que se han obtenido los resultados utilizando fetch
    expect(window.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Comprobamos que la aplicación renderiza la colección de resultados proporcionada por el mock
    for (let pokemon of data.results) {
      expect(
        await screen.findByText(new RegExp(`${pokemon.name}\\b`, "i"))
      ).toBeInTheDocument();
    }
  });

  it("shows an error message when there's a network error", async () => {
    // Modificamos el comportamiento de la función fetch para que devuelva un error de conexión
    window.fetch.mockRejectedValueOnce(
      new TypeError("Network connection lost")
    );

    render(<App />);

    // Comprobamos que se han obtenido los resultados utilizando fetch
    expect(window.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Comprobamos que se muestra un error controlado
    expect(
      await screen.findByText(
        "There was a network error. Please try again in a few seconds."
      )
    ).toBeInTheDocument();
  });

  it("shows an error message when there's a server error", async () => {
    // Modificamos el comportamiento de la función fetch para que devuelva un error HTTP 500
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<App />);

    // Comprobamos que se han obtenido los resultados utilizando fetch
    expect(window.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Comprobamos que se muestra un error controlado
    expect(
      await screen.findByText("There was a server error.")
    ).toBeInTheDocument();
  });

  it("shows an error message when there's a service not found error", async () => {
    // Modificamos el comportamiento de la función fetch para que devuelva un error HTTP 404
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<App />);

    // Comprobamos que se han obtenido los resultados utilizando fetch
    expect(window.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon"
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // Comprobamos que se muestra un error controlado
    expect(
      await screen.findByText("The requested resource was a not found.")
    ).toBeInTheDocument();
  });
});
