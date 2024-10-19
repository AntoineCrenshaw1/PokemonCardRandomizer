import { useState } from 'react';
import IMAGE from 'next/image';

const PackOpener = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const openPack = async () => {
    const response = await fetch('/api/cards');
    const data = await response.json();
    if (response.ok) {
      setCards(data.data);
    } else {
      console.error('Failed to open pack', data.error);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <h1>Pokemon Card Pack Opener</h1>

        {loading && <p>Opening Pack...</p>}

        {!loading && (
        <button disabled={loading} onClick={openPack}>
         Open Pack
        </button>
        )}

        {cards.length > 0 && (
        <div className="card-container">
        {cards.map((card) => (
            <div key={card.id} className="card">
              <IMAGE src={card.images.small} alt={card.name} />
              <h3>{card.name}</h3>
              <p>Rarity: {card.rarity || 'Unknown'}</p>
              </div>
          ))}
        </div>
        )}

        <style jsx>{`
          .card-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          .card {
            text-align: center;
            border: 1px solid #ddd;
            padding: 10px;
            transition: transform 0.2s;
          }
          .card:hover {
            transform: scale(1.05);
          }
          img {
            width: 150px;
          }
        `}</style>
      </div>
    </>
  );
}

export default PackOpener;
