"use client";

import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
  service: Service;
  isAuthenticated?: boolean;
}

export function ServiceItem({ service, isAuthenticated }: ServiceItemProps) {
  function handleBooking() {
    if (!isAuthenticated) return signIn("google");
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
              <Button
                variant="secondary"
                onClick={handleBooking}
              >
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
