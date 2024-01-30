import { Prisma } from "@prisma/client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
  barbershop: typeof Prisma.BarbershopScalarFieldEnum;
}

export function BarbershopItem(props: BarbershopItemProps) {
  return (
    <Card className="min-w-44 w-44 rounded-2xl">
      <CardContent className="flex flex-col h-full p-1">
        <div className="relative w-full h-40">
          <div className="absolute top-1 left-1 z-10">
            <Badge
              className="px-2 py-1 gap-1 bg-dark-purple/70 backdrop-blur-[3px]"
            >
              <StarIcon
                size={12}
                className="fill-primary text-primary"
              />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>

          <Image
            src={props.barbershop.imageUrl}
            alt={props.barbershop.name}
            fill
            sizes="100vw"
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="p-2 flex flex-col flex-1 gap-1">
          <h2 className="font-bold">{props.barbershop.name}</h2>
          <address className="text-sm text-gray-400 not-italic overflow-hidden truncate flex-1">{props.barbershop.address}</address>

          <Button
            variant="secondary"
            className="mt-2"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}