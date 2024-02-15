"use client";

import { Barbershop, Booking, Service } from "@prisma/client";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2Icon, SmartphoneIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { BookingInfo } from "./booking-info";
import * as Alert from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import * as Sheet from "./ui/sheet";

import { cn } from "../_lib/utils";
import { cancelBooking } from "../data/cancel-booking";

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

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCancelBooking() {
    setIsLoading(true);

    try {
      await cancelBooking({
        bookingId: booking.id
      });

      toast.success("Reserva cancelada com sucesso!");

      setIsOpen(false);
    } catch (error) {
      toast.error("Erro ao cancelar reserva");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet.Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Sheet.SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="flex justify-between">
            <div className="space-y-2 p-3">
              <Badge variant={past ? "secondary" : "default"}>
                {past ? "Finalizado" : "Confirmado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>{booking.service.name}</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col odd:*:text-sm even:*:text-2xl border-l border-secondary min-w-24">
              <p className="capitalize">{bookingDate.month}</p>
              <p>{bookingDate.day}</p>
              <p>{bookingDate.hour}</p>
            </div>
          </CardContent>
        </Card>
      </Sheet.SheetTrigger>

      <Sheet.SheetContent className="flex flex-col">
        <Sheet.SheetHeader className="text-left border-b py-6 px-5 border-secondary flex flex-row justify-between items-center space-y-0">
          <Sheet.SheetTitle>Informações da Reserva</Sheet.SheetTitle>
          <Sheet.SheetClose asChild>
            <XIcon size={20} />
          </Sheet.SheetClose>
        </Sheet.SheetHeader>

        <div className="px-5 space-y-6">
          <div className="relative h-48 w-full">
            <Image
              src="/map.png"
              fill
              className="object-cover"
              alt={booking.barbershop.name}
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-3 items-center">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={booking.barbershop.imageUrl}
                      alt={booking.barbershop.name}
                    />

                    <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <address className="text-xs not-italic truncate">{booking.barbershop.address}</address>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-3">
            <Badge variant={past ? "secondary" : "default"}>
              {past ? "Finalizado" : "Confirmado"}
            </Badge>

            <BookingInfo
              barbershop={booking.barbershop.name}
              name={booking.service.name}
              price={Number(booking.service.price)}
              date={`${bookingDate.day} de ${bookingDate.month}`}
              hour={bookingDate.hour}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between first:*:flex first:*:items-center first:*:gap-2">
              <div>
                <SmartphoneIcon />
                <p className="text-sm">(11) 1234-5678</p>
              </div>

              <Button variant="outline">
                Copiar
              </Button>
            </div>

            <div className="flex items-center justify-between first:*:flex first:*:items-center first:*:gap-2">
              <div>
                <SmartphoneIcon />
                <p className="text-sm">(11) 1234-5678</p>
              </div>

              <Button variant="outline">
                Copiar
              </Button>
            </div>
          </div>
        </div>

        <Sheet.SheetFooter className="flex-row gap-3 flex-1 px-5 py-6 items-end">
          <Sheet.SheetClose asChild>
            <Button
              className="w-full"
              variant="secondary"
            >
              Voltar
            </Button>
          </Sheet.SheetClose>

          <Alert.AlertDialog>
            <Alert.AlertDialogTrigger asChild>
              <Button
                className="w-full"
                variant="destructive"
                disabled={past || isLoading}
              >
                Cancelar reserva
              </Button>
            </Alert.AlertDialogTrigger>

            <Alert.AlertDialogContent className="w-4/5 rounded-2xl border-0">
              <Alert.AlertDialogHeader>
                <Alert.AlertDialogTitle>
                  Cancelar Reserva
                </Alert.AlertDialogTitle>
                <Alert.AlertDialogDescription>
                  Tem certeza que deseja cancelar esse agendamento?
                </Alert.AlertDialogDescription>
              </Alert.AlertDialogHeader>

              <Alert.AlertDialogFooter className="flex-row *:m-0 gap-3">
                <Alert.AlertDialogCancel className="w-full">
                  Voltar
                </Alert.AlertDialogCancel>
                <Alert.AlertDialogAction
                  className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0"
                  onClick={handleCancelBooking}
                >
                  <Loader2Icon className={cn("animate-spin", isLoading ? "block" : "hidden")} />

                  Confirmar
                </Alert.AlertDialogAction>
              </Alert.AlertDialogFooter>
            </Alert.AlertDialogContent>
          </Alert.AlertDialog>
        </Sheet.SheetFooter>
      </Sheet.SheetContent>
    </Sheet.Sheet>
  );
}
