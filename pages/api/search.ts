import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, getCsrfToken } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.accessToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const accessToken = session.accessToken;

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Use the Spotify Web API to search for artists or tracks.
  // The type of search is determined by the type parameter.
  // Allowed values: "album", "artist", "playlist", "track", "show", "episode", "audiobook"
  const { query, type } = req.query;

  // Get 10 results based on the search query and type¨
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=10`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
