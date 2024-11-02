import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Spotify from "next-auth/providers/spotify";
import { createUser, getUser } from "./app/_lib/data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub, Spotify],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }: any) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser) await createUser(user.email, user.name);
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const user = await getUser(session.user.email);
      session.user.id = user.id;
      return session;
    },
  },
});
