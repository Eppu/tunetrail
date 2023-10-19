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
    // We're allowed to use a combination of 5 total seeds (artists, genres, and tracks)
    const seedArtists = '4gzpq5DPGxSnKTe4SA8HAU,3hozsZ9hqNq7CoBGYNlFTz';
    // const seedGenres = 'rock'; // Genre seeds are only needed if artists and tracks are not provided.
    const seedTracks = '6P2Y4KnF2x8uwZV2cZWA8t,7iMQChXFK33TS49QWhE4tt,4Oih3RDrSFg3afaOphBVuy';
    // const seedTracks = '6P2Y4KnF2x8uwZV2cZWA8t,7iMQChXFK33TS49QWhE4tt,4Oih3RDrSFg3afaOphBVuy,3VMK6tAjOT4INvBdZOtB9J,4PTtFQIiFtNNbbX4Ym5RCD,5hiZJE6Fg14Wao6EJ0KUC8';

    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      params: {
        seed_artists: seedArtists,
        // seed_genres: seedGenres,
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
