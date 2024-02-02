"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { db } from "../_lib/prisma";

interface CancelBookingParams {
  bookingId: string;
}

export const cancelBooking = cache(async ({ bookingId }: CancelBookingParams) => {
  await db.booking.delete({
    where: {
      id: bookingId
    }
  });

  revalidatePath('/bookings');
});