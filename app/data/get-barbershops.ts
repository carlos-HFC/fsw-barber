import { cache } from "react";

import { db } from "../_lib/prisma";

export const getBarbershops = cache(async () => {
  const response = await db.barbershop.findMany();

  return response;
});