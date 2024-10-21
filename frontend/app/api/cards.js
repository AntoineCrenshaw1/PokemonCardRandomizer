const fetchCards = async (req, res) => {
  try {
  const { query } = req;
  const pageSize = query.pageSize || 10;
  const page = query.page || 1;

  const apiUrl = `https://api.pokemontcg.io/v2/cards?pageSize=${pageSize}&page=${page}`;
  console.log(`Fetching from URL: ${apiUrl}`);

  const apiKey = process.env.local.REACT_APP_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  const response = await fetch(apiUrl, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(response.status).json({ error: 'Failed to fetch cards' });
  }
} catch (error) {
  console.error('Error fetching cards:', error);
  res.status(500).json({ error: error.message });
}};

export default fetchCards;
