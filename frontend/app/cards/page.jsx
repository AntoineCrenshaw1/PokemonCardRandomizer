"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import _ from "lodash"; // Import Lodash

const PackOpener = () => {
  const [cards, setCards] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packOpened, setPackOpened] = useState(false);

  const openPack = async () => {
    try {
      setLoading(true);
      setPackOpened(true);
      setError(null);
      console.log("Started fetching");

      const response = await axios.get(
        "https://api.pokemontcg.io/v2/cards/?pageSize=1",
        {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_POKEMON_API_KEY, // Using environment variable for API key
          },
        }
      );

      const pokemonData = response.data;
      console.log("Finished fetching", pokemonData);

      if (pokemonData && pokemonData.data) {
        setCards(pokemonData.data); // Set the array of cards
      } else {
        setError("Failed to open pack");
      }
    } catch (err) {
      setError("An error occurred while fetching the cards");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Opening pack on load");
    openPack();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="mx-auto">
      <div className="flex flex-col container pt-[1rem] gap-x-8 gap-y-10">
        <Image
          src="https://fontmeme.com/permalink/241022/66b5d31e6e4029ef486dcf845b71d7f5.png"
          alt="Pokemon Trading Cards Pack Opening"
          width={550}
          height={550}
          className="mx-auto"
        />
        <p className="mx-auto">Click below to open a pack</p>
        <button disabled={loading} onClick={openPack}>
          Open Pack
        </button>
        {packOpened && (
          <div className="card-container mx-auto">
            {_.map(cards, (pokemon, index) => (
              <div key={pokemon.id || index} className="card">
                {pokemon.images?.large ? (
                  <Image
                    src={pokemon.images.large}
                    width={350}
                    height={350}
                    alt={pokemon.name}
                  />
                ) : (
                  <Image
                    src="https://dummyimage.com/300"
                    width={300}
                    height={300}
                    alt="Placeholder"
                  />
                )}
                <h3>Name: {pokemon.name}</h3>
                <p> Rarity: {pokemon.rarity || "Unknown"}</p>
                <p> Type(s): {pokemon.types}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackOpener;
