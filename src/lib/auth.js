// src/lib/auth.ts

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// const users = [
//   {
//     id: "1",
//     username: "harshit",
//     password: "secret123",
//   },
//   {
//     id: "2",
//     username: "ashish",
//     password: "password456",
//   },
// ];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = users.find(
    //       (u) =>
    //         u.username === credentials?.username &&
    //         u.password === credentials?.password
    //     );

    //     if (user) {
    //       return { id: user.id, name: user.username };
    //     }
    //     return null;
    //   },
    // }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔹 NextAuth redirect:", { url, baseUrl });
      return baseUrl;
    },
  },
};
