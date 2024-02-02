import { cache } from "react";

import { db } from "../_lib/prisma";

interface GetBookingsByUserParams {
  userId: string;
}

export const getBookingsByUser = cache(async (params: GetBookingsByUserParams) => {
  const [past, future] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: params.userId,
        date: {
          lt: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      },
      orderBy: {
        date: "desc"
      }
    }),
    db.booking.findMany({
      where: {
        userId: params.userId,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      },
      orderBy: {
        date: "asc"
      }
    }),
  ]);

  return {
    past,
    future
  };
});