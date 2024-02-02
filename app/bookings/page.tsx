import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { BookingItem } from "../_components/booking-item";
import { Header } from "../_components/header";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getBookingsByUser } from "../data/get-bookings-by-user";

export const revalidate = 0;

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/', RedirectType.replace);
  }

  const bookings = await getBookingsByUser({
    userId: session.user.id
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 space-y-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <section className="space-y-3">
          <h2 className="text-gray-400 uppercase font-bold text-sm">Confirmados</h2>

          {bookings.future.map(item => (
            <BookingItem
              key={item.id}
              booking={item}
            />
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-gray-400 uppercase font-bold text-sm">Finalizados</h2>

          {bookings.past.map(item => (
            <BookingItem
              key={item.id}
              booking={item}
              past
            />
          ))}
        </section>
      </div>
    </>
  );
}
