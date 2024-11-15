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

  // Helper function to get cards by specified rarity counts
  const getRandomPack = (cards) => {
    const groupedCards = _.groupBy(cards, "rarity");

    // Select cards to meet the required pack composition
    const selectedCards = [
      ..._.sampleSize(groupedCards["Common"] || [], 4),       // 4 common cards
      ..._.sampleSize(groupedCards["Uncommon"] || [], 3),     // 3 uncommon cards
      ..._.sampleSize(groupedCards["Rare Holo"] || [], 2),    // 2 foils
      ..._.sampleSize(groupedCards["Rare"] || [], 1),         // 1 rare
    ];

    return _.shuffle(selectedCards).slice(0, 10); // Shuffle and limit to 10 cards
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
        const randomCards = getRandomPack(pokemonData.data); // Get 10 cards according to the pack rules
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <div className="spinner"></div>;

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
        <Image
          src="https://images.pokemontcg.io/ex1/logo.png"
          alt="Ruby & Sapphire Logo"
          width={200}
          height={200}
          className="mx-auto"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="btn btn-danger"
          onClick={() => (packOpened ? close() : open())}
        >
          Open New Pack
        </motion.button>
        {packOpened && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="card-container"
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="card"
              >
                <Image
                  src={card.images.large}
                  alt={card.name}
                  width={300}
                  height={300}
                />
                <h3>{card.name}</h3>
                <p>Rarity: {card.rarity || "Unknown"}</p>
                <p>Set: {card.set.series}</p>
                <p>Type: {card.types.join(",")}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PackOpener;
