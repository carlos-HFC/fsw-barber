import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";

import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Search } from "./_components/search";

import { authOptions } from "./_lib/auth";

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
      <section className="py-6 lg:pt-0 space-y-6 lg:space-y-10">
        <div className="lg:h-[460px] lg:py-16 relative">
          <div className="lg:bg-home absolute inset-0 -z-10 bg-cover saturate-0 brightness-[.05] bg-[center_top_-70px]" />

          <div className="container px-5 h-full flex flex-col gap-6 lg:*:w-1/3 lg:justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl">
                Olá, <strong className="font-bold">{session?.user.name ?? "Faça seu login"}!</strong>
              </h2>
              <p className="first-letter:capitalize text-sm">
                {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>

            <Search />

            {(bookings?.future && bookings?.future?.length > 0) && (
              <div className="space-y-3">
                <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>

                <div className="overflow-x-auto flex gap-3 lg:gap-4 scroll-hidden">
                  {bookings?.future?.map(item => (
                    <BookingItem
                      key={item.id}
                      booking={item}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container px-5">
          <h2 className="text-xs lg:text-xl uppercase text-gray-400 lg:text-white font-bold mb-3 lg:mb-4">Recomendados</h2>

          <div className="flex gap-4 overflow-x-auto scroll-hidden lg:*:min-w-56">
            {barbershops?.map(item => (
              <BarbershopItem
                barbershop={item}
                key={item.id}
              />
            ))}
          </div>
        </div>

        <div className="container px-5">
          <h2 className="text-xs lg:text-xl uppercase text-gray-400 lg:text-white font-bold mb-3 lg:mb-4">Populares</h2>

          <div className="flex gap-4 overflow-x-auto scroll-hidden lg:*:min-w-56">
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
