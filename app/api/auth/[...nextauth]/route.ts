import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google';

import { db } from "@/app/_lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    })
  ]
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};