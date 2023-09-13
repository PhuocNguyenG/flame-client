import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // All expired after 30 day
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "sign-in-flame",
      name: "Flame account",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (!user) {
          return null;
        }
        // Any object returned will be saved in `user` property of the JWT
        return user;
      },
    }),
    CredentialsProvider({
      id: "register-flame", 
      name: "Flame account",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (credentials.confirmPassword !== credentials.password) {
          return null;
        }
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (!user) {
          return null;
        }
        // Any object returned will be saved in `user` property of the JWT
        return user;
      },
    }),
  ],
  theme: {
    colorScheme: "auto",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      // user: {
      //   name: 'Phước Nguyễn',
      //   email: 'nguyenphuock18@gmail.com',
      //   image: 'https://lh3.googleusercontent.com/a/AAcHTte9HB2vp9pgkGZFPnhLhZWM48y5No0lYkByu2DDMFYnm2c=s96-c'
      // },
      // expires: '2023-10-06T02:22:32.343Z',
      // accessToken: 'ya29.a0AfB_byDQLyQ7yLdV3BNmj-oPPYJ5Msp8ETV9ul41BPicSGjtclY1rSRDo6HcTsWzZ3ujWJLF0lWVVcgHlq-byqj5drKwdQDfsIZjoMsN0tMVfi5snpyqM-pQ491jUgzgHe4oOX1Qw0wIhyOLysdoAu-0-l4cZh5Z7PAYiQaCgYKAT8SARESFQHsvYls3SxdpOS1CxPgmgJ_BN7acw0173'

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
