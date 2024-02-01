import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Header } from "./_components/header";
import { Search } from "./_components/search";

import { getBarbershops } from "./data/get-barbershops";

export const revalidate = 1000 * 60 * 60;

export default async function Home() {
  const barbershops = await getBarbershops();

  return (
    <div>
      <Header />

      <section className="px-5 py-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Olá Carlos!</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
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
            {barbershops?.map(item => (
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
            {barbershops?.map(item => (
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
