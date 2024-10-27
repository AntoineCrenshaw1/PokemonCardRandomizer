"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import _ from "lodash"; // Import Lodash
import { motion } from "framer-motion";

const PackOpener = () => {
  const [cards, setCards] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [packOpened, setPackOpened] = useState(false);

  // Define rarity weights
  const rarityWeights = {
    Common: 0.6,
    Uncommon: 0.3,
    Rare: 0.08,
    "Rare Holo": 0.05,
    "Rare Ultra": 0.03,
    "Ultra Rare": 0.02,
  };

  // Helper function to get weighted random cards
  const getWeightedRandomCards = (cards, numCards) => {
    const groupedCards = _.groupBy(cards, "rarity");

    // Select cards based on rarity probabilities
    let selectedCards = [];
    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      const rarityGroup = groupedCards[rarity] || [];
      const count = Math.round(weight * numCards); // Number of cards to pick per rarity
      selectedCards = [...selectedCards, ..._.sampleSize(rarityGroup, count)];
    }
    return _.shuffle(selectedCards).slice(0, numCards); // Randomize selection and limit to numCards
  };

  const close = () => {
    setPackOpened(false);
    setCards([]);
  };

  const open = async () => {
    try {
      setLoading(true);
      setPackOpened(true);
      setError(null);
      console.log("Started fetching");

      const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_POKEMON_API_KEY, // Using environment variable for API key
        },
      });

      const pokemonData = response.data;
      console.log("Finished fetching", pokemonData);

      if (pokemonData) {
        const randomCards = getWeightedRandomCards(pokemonData.data, 10); // Select 10 random cards
        setCards(randomCards);
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="btn btn-danger"
          onClick={() => (packOpened ? close() : open())}
        >
          Open Pack
        </motion.button>
        {packOpened && !loading && (
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
                <p>Type(s): {pokemon.types?.join(", ") || "Unknown"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackOpener;
