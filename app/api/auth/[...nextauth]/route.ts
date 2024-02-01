import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google';

import { db } from "@/app/_lib/prisma";
import { env } from "@/env";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        }
      };
    }
  }
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};