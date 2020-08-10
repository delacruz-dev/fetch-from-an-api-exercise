import React from "react";
import App from "./app";
import { render } from "@testing-library/react";

describe("Pokémon app", () => {
  it("has a list of Pokémons including Bulbasaur", () => {
    const { getByText } = render(<App />);

    expect(getByText("bulbasaur")).toBeInTheDocument();
  });
});
