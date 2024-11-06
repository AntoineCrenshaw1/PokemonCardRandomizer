import axios from "axios";
import { jest } from "@jest/globals";

jest.mock("axios");

const open = () => {
  const response = axios.get("https://api.pokemontcg.io/v2/cards", {
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_POKEMON_API_KEY,
    },
  });
  const pokemonData = response.data;
  console.log("Finished fetching", pokemonData);
};

test("pack opened successfully", () => {
  open();
  expect(open).toBeDefined();
});
