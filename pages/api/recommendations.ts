import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const accessToken = (session.user as { accessToken: string }).accessToken; // Please don't do this. I'll fix it later.

  try {
    // Define the request parameters for getting song recommendations
    const seedArtists = '4NHQUGzhtTLFvgF5SZesLK'; // Example artist ID
    const seedGenres = 'rock'; // Example genre
    const seedTracks = '0c6xIDDpzE81m2q797ordA'; // Example track ID

    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      params: {
        seed_artists: seedArtists,
        seed_genres: seedGenres,
        seed_tracks: seedTracks,
        limit: 10, // You can adjust the number of recommendations
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const recommendations = response.data;
      res.status(200).json(recommendations);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch recommendations' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
