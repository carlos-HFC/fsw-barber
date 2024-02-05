import { db } from "../_lib/prisma";

export async function searchBarbershop(name?: string) {
  return await db.barbershop.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    }
  });
}