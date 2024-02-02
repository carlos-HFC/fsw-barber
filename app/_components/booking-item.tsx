import { Barbershop, Booking, Service } from "@prisma/client";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface BookingItemProps {
  booking: Booking & {
    service: Service;
    barbershop: Barbershop;
  };
  past?: boolean;
}

setDefaultOptions({
  locale: ptBR
});

function splitDate(date: Date) {
  const month = format(date, "MMMM");
  const day = format(date, "dd");
  const hour = format(date, "HH:mm");

  return { day, month, hour };
}

export function BookingItem({ booking, past }: Readonly<BookingItemProps>) {
  const bookingDate = splitDate(booking.date);

  return (
    <Card>
      <CardContent className="flex justify-between">
        <div className="space-y-2 p-3">
          <Badge variant={past ? "secondary" : "default"}>
            {past ? "Finalizado" : "Confirmado"}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={booking.service.imageUrl} />

              <AvatarFallback>{booking.service.name}</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col odd:*:text-sm even:*:text-2xl border-l border-secondary min-w-28">
          <p>{bookingDate.month}</p>
          <p>{bookingDate.day}</p>
          <p>{bookingDate.hour}</p>
        </div>
      </CardContent>
    </Card>
  );
}
