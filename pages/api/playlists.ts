import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// import { getUsersPlaylists } from '../../lib/spotify';
// import { Session } from 'next-auth';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = (await getSession({ req })) as Session & {
//     accessToken: string;
//   };
//   if (!session) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return;
//   }

//   console.log('got session');
//   try {
//     console.log('getting playlists');
//     const playlists = await getUsersPlaylists(session.accessToken);
//     console.log('got playlists');
//     console.log('playlists'), res.status(200).json(playlists);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const accessToken = (session.user as { accessToken: string }).accessToken; // Please don't do this. I'll fix it later.

  console.log('accessToken', accessToken);

  // Use the Spotify Web API to fetch the user's playlists
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response', response);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
