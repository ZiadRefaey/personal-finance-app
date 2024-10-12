import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub, Spotify],
  // pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
