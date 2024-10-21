"use client";
import { useState } from "react";
import IMAGE from "next/image";
import React from "react";

interface Card {
  id: string;
  name: string;
  rarity?: string;
  images: {
    small: string;
  };
}

const PackOpener = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openPack = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/cards");
      const data: Card[] = await response.json();
      if (response.ok) {
        setCards(data);
      } else {
        setError("Failed to open pack");
      }
    } catch (err) {
      setError("An error occurred while fetching the cards");
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <h1>Pokemon Card Pack Opener</h1>
        <button disabled={loading} onClick={openPack}>
          {loading ? "Loading..." : "Open Pack"}
        </button>
        {error && <p className="error">{error}</p>}
        <div className="card-container">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <IMAGE src={card.images.small} alt={card.name} />
              <h3>{card.name}</h3>
              <p>Rarity: {card.rarity || "Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PackOpener;
