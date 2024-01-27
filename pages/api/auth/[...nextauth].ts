import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import type { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

const SPOTIFY_REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const { data } = await axios.post(
      SPOTIFY_REFRESH_TOKEN_URL,
      {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      // get scopes, quite extensive for now:
      // user-read-email
      // user-read-private
      // playlist-read-private
      // playlist-modify-public
      // user-top-read
      // user-read-recently-played
      authorization: `https://accounts.spotify.com/authorize?scope=user-read-email%20user-read-private%20playlist-read-private%20playlist-modify-public%20user-top-read%20user-read-recently-played`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account: any; user: any }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      console.log('session is:', session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
