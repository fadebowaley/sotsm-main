import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import { env } from '@/env.mjs';


export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return parsedUrl.searchParams.get('callbackUrl') || baseUrl; // Return the callback URL or base URL if not present
      }
      if (parsedUrl.origin === baseUrl) {
        return url; // If the origin matches the base URL, return the URL
      }
      return baseUrl; // Fallback to the base URL
    },
  },

  providers: [
    // Credentials Provider
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any) {
        // Send credentials to the Node.js backend on port 3001
        const res = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Return the user object if login is successful
        } else {
          return null; // Return null if login fails
        }
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),

    // Facebook Provider
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID || '',
      clientSecret: env.FACEBOOK_CLIENT_SECRET || '',
    }),

    // GitHub Provider
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID || '',
      clientSecret: env.GITHUB_CLIENT_SECRET || '',
    }),

    // Twitter Provider
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID || '',
      clientSecret: env.TWITTER_CLIENT_SECRET || '',
    }),
  ],

};
