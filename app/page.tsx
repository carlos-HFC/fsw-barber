import { Prisma } from "@prisma/client";
import { format } from "date-fns";

import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Header } from "./_components/header";
import { Search } from "./_components/search";

import { db } from "./_lib/prisma";

export default async function Home() {
  const barbershops = await db.barbershop.findMany() as typeof Prisma.BarbershopScalarFieldEnum[];

  return (
    <div>
      <Header />

      <section className="px-5 pt-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Olá Carlos!</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM")}
          </p>
        </div>

        <Search />

        <div className="mt-3">
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>

          <BookingItem />
        </div>

        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(item => (
              <BarbershopItem
                barbershop={item}
                key={item.id}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(item => (
              <BarbershopItem
                barbershop={item}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
