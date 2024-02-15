import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { BookingItem } from "../_components/booking-item";

import { authOptions } from "../_lib/auth";

import { getBookingsByUser } from "../data/get-bookings-by-user";

export const metadata = {
  title: "Meus agendamentos",
  openGraph: {
    title: "Meus agendamentos",
  },
  twitter: {
    title: "Meus agendamentos",
  }
};

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/', RedirectType.replace);
  }

  const bookings = await getBookingsByUser({
    userId: session.user.id
  });

  return (
    <div className="px-5 py-6 lg:py-10 space-y-6 container max-w-[968px]">
      <h1 className="text-xl lg:text-2xl font-bold">Agendamentos</h1>

      {bookings.future.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-gray-400 uppercase font-bold text-sm">Confirmados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookings.future.map(item => (
              <BookingItem
                key={item.id}
                booking={item}
              />
            ))}
          </div>
        </section>
      )}

      {bookings.past.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-gray-400 uppercase font-bold text-sm">Finalizados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookings.past.map(item => (
              <BookingItem
                key={item.id}
                booking={item}
                past
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
