"use client";

import { Barbershop, Booking, Service } from "@prisma/client";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2Icon, XIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { BookingInfo } from "./booking-info";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { generateDayTimeList } from "../_helpers/hours";
import { cn } from "../_lib/utils";

import { getAvailableBookings } from "../data/get-available-bookings";
import { saveBooking } from "../data/save-booking";

interface ServiceItemProps {
  service: Service;
  isAuthenticated?: boolean;
  barbershop: Barbershop;
}

export function ServiceItem({ service, isAuthenticated, barbershop }: ServiceItemProps) {
  const { data } = useSession();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [availableBookings, setAvailableBookings] = useState<Booking[]>([]);

  useEffect(() => {
    refreshAvailableHours();
  }, [date]);

  const timeList = useMemo(() => {
    setHour("");

    if (!date) return [];

    const list = generateDayTimeList(date);

    return list.filter(time => {
      const [dateHour, dateMinute] = time.split(":");

      const booking = availableBookings.find(item => {
        const bookingHour = item.date.getHours(),
          bookingMinute = item.date.getMinutes();

        return bookingHour === Number(dateHour) && bookingMinute === Number(dateMinute);
      });

      return !Boolean(booking);
    });
  }, [date, availableBookings]);

  async function refreshAvailableHours() {
    if (!date) return;

    const dayBookings = await getAvailableBookings({
      barbershopId: barbershop.id,
      date
    });
    setAvailableBookings(dayBookings);
  }

  function handleBooking() {
    if (!isAuthenticated) return signIn("google");
  }

  function handleSelectHour(time: string) {
    setHour(prev => prev !== time ? time : "");
  }

  async function handleBookingSubmit() {
    setIsLoadingSubmit(true);

    try {
      if (!hour || !date || !isAuthenticated || !data?.user) return;

      const [dateHour, dateMinute] = hour.split(":");

      const newDate = setMinutes(setHours(date, Number(dateHour)), Number(dateMinute));

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        userId: data?.user.id,
        date: newDate
      });

      toast.success("Reserva Efetuada!", {
        description: `Sua reserva foi agendada para o dia ${format(newDate, "dd 'de' MMMM", { locale: ptBR })}`,
        action: {
          label: "Visualizar",
          onClick() {
            router.push("/bookings");
          }
        }
      });

      setIsOpen(false);

      setDate(undefined);
      setHour("");
    } catch (error) {
      toast.error("Erro ao efetuar reserva!", {
        description: `Sua reserva não foi agendada!`,
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-3 items-center">
          <div className="relative min-w-[110px] min-h-[110px] max-w-[110px] max-h-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-gray-400">
              {service.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-sm text-primary font-bold">
                {Number(service.price).toLocaleString('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>

              <Sheet
                open={isOpen}
                onOpenChange={setIsOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={handleBooking}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="overflow-hidden flex flex-col gap-0 divide-y divide-secondary last:*:!border-0">
                  <SheetHeader className="text-left py-6 px-5 flex flex-row justify-between items-center space-y-0">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                    <SheetClose asChild>
                      <XIcon size={20} />
                    </SheetClose>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={date}
                    onSelect={setDate}
                    fromDate={addDays(new Date(), 1)}
                    classNames={{
                      head_cell: "w-full capitalize",
                      cell: "!rounded-full",
                      day: "aspect-square !rounded-full",
                      day_selected: "!rounded-full !font-bold",
                      nav: "space-x-0 gap-3",
                      nav_button_previous: "w-8 h-8 relative inset-0 rounded-lg disabled:bg-transparent bg-secondary",
                      nav_button_next: "w-8 h-8 relative inset-0 rounded-lg disabled:bg-transparent bg-secondary",
                      caption: "capitalize justify-between",
                      root: "w-max px-5 py-6",
                    }}
                  />

                  {date && (
                    <div className="py-6 px-5 flex gap-3 overflow-x-auto scroll-hidden">
                      {timeList.map(time => (
                        <Button
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => handleSelectHour(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5">
                    <BookingInfo
                      barbershop={barbershop.name}
                      name={service.name}
                      price={Number(service.price)}
                      date={date && format(date, "dd 'de' MMMM", { locale: ptBR })}
                      hour={hour}
                    />
                  </div>

                  <SheetFooter className="px-5 flex-1 py-6">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!date || !hour || isLoadingSubmit}
                      className="gap-2"
                    >
                      <Loader2Icon className={cn("animate-spin", isLoadingSubmit ? "block" : "hidden")} />
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
