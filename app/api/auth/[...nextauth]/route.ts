import { PrismaAdapter } from '@next-auth/prisma-adapter';

import NextAuth from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google';

import { db } from "@/app/_lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    })
  ]
});

export {
  handler as GET,
  handler as POST,
};