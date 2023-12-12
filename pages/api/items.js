// pages/api/items.js
import teams from 'mock/nba';

export default function handler(req, res) {
  const { query } = req;
  console.log("query", query)

  res.status(200).json(teams);
}
