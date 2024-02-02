import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";

import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Header } from "./_components/header";
import { Search } from "./_components/search";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { getBarbershops } from "./data/get-barbershops";
import { getBookingsByUser } from "./data/get-bookings-by-user";

export const revalidate = 1000 * 60 * 60;

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, bookings] = await Promise.all([
    getBarbershops(),
    session?.user
      ? getBookingsByUser({
        userId: session?.user.id
      })
      : undefined
  ]);

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

        {bookings?.future && (
          <div className="mt-3 space-y-3">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>

            <div className="overflow-x-auto flex gap-3 scroll-hidden">
              {bookings?.future?.map(item => (
                <BookingItem
                  key={item.id}
                  booking={item}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

          <div className="flex gap-4 overflow-x-auto scroll-hidden">
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

          <div className="flex gap-4 overflow-x-auto scroll-hidden">
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
