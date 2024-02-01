"use server";

import { endOfDay, startOfDay } from "date-fns";
import { cache } from "react";

import { db } from "../_lib/prisma";

interface GetAvailableBookingsParams {
  barbershopId: string;
  date: Date;
}

export const getAvailableBookings = cache(async (params: GetAvailableBookingsParams) => {
  const response = await db.booking.findMany({
    where: {
      barbershopId: params.barbershopId,
      date: {
        lte: endOfDay(params.date),
        gte: startOfDay(params.date),
      }
    }
  });

  return response;
});