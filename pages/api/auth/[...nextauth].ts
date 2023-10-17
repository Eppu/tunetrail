import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import type { Session } from 'next-auth';

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      // get scopes:
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
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        console.log('account is', account);
        token.id = account.id;
        token.accessToken = account.access_token;
      }
      console.log('token set to', token);
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      console.log('session is', session);
      session.user.accessToken = token.accessToken;
      console.log('session set to', session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
