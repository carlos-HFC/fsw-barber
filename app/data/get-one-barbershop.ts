import { cache } from "react";

import { db } from "../_lib/prisma";

export const getOneBarbershop = cache(async (id: string) => {
  const response = await db.barbershop.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      services: true
    }
  });

  return response;
});