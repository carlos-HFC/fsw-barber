import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
  NEXT_BASE_URL: z.string().optional().default("http://localhost:3000")
});

export const env = envSchema.parse(process.env);