"use client";

import { Barbershop, Service } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2Icon, XIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { generateDayTimeList } from "../_helpers/hours";
import { cn } from "../_lib/utils";

import { saveBooking } from "../barbershops/[id]/_actions/save-booking";

interface ServiceItemProps {
  service: Service;
  isAuthenticated?: boolean;
  barbershop: Barbershop;
}

export function ServiceItem({ service, isAuthenticated, barbershop }: ServiceItemProps) {
  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const timeList = useMemo(() => {
    setHour("");

    return date
      ? generateDayTimeList(date)
      : [];
  }, [date]);


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

      alert("Deu bom");
    } catch (error) {
      alert("Deu ruim");
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={handleBooking}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0 max-w-[370px] w-full overflow-hidden flex flex-col gap-0 divide-y divide-secondary last:*:!border-0">
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
                    fromDate={new Date()}
                    // className="rounded-"
                    classNames={{
                      head_cell: "w-full capitalize",
                      cell: "!rounded-full",
                      day: "aspect-square !rounded-full",
                      day_selected: "!rounded-full !font-bold",
                      button: "w-full",
                      nav: "space-x-0 gap-3",
                      nav_button_previous: "w-8 h-8 relative inset-0 rounded-lg disabled:bg-transparent bg-secondary",
                      nav_button_next: "w-8 h-8 relative inset-0 rounded-lg disabled:bg-transparent bg-secondary",
                      caption: "capitalize justify-between",
                      root: "w-max px-5 py-6",
                    }}
                  />

                  {date && (
                    <div className="py-6 px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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

                  <div className="py-6 px-5 ">
                    <Card>
                      <CardContent className="p-3 *:flex *:justify-between space-y-3 *:items-center">
                        <div>
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {Number(service.price).toLocaleString('pt-BR', {
                              style: "currency",
                              currency: "BRL"
                            })}
                          </h3>
                        </div>

                        {date && (
                          <div>
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div>
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm">
                              {hour}
                            </h4>
                          </div>
                        )}

                        <div>
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <h4 className="text-sm">
                            {barbershop.name}
                          </h4>
                        </div>
                      </CardContent>
                    </Card>
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
