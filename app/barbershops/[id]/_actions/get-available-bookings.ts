"use server";

import { endOfDay, startOfDay } from "date-fns";

import { db } from "@/app/_lib/prisma";

interface GetAvailableBookingsParams {
  barbershopId: string;
  date: Date;
}

export async function getAvailableBookings(params: GetAvailableBookingsParams) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId: params.barbershopId,
      date: {
        lte: endOfDay(params.date),
        gte: startOfDay(params.date),
      }
    }
  });

  return bookings;
}