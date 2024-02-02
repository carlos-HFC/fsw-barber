"use server";

import { revalidatePath } from "next/cache";

import { db } from "../_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  date: Date;
  userId: string;
  serviceId: string;
}

export async function saveBooking(data: SaveBookingParams) {
  await db.booking.create({
    data
  });

  revalidatePath('/bookings');
}