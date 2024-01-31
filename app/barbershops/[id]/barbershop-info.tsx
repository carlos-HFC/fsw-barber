"use client";

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/app/_components/ui/button";

import { Barbershop } from "@/app/@types";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();

  function handleGoHome() {
    router.push("/");
  }

  return (
    <div>
      <div className="h-64 relative w-full">
        <Button
          size="icon"
          variant="outline"
          className="z-10 absolute top-6 left-6"
          onClick={handleGoHome}
        >
          <ChevronLeftIcon size={20} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-10 absolute top-6 right-6"
        >
          <MenuIcon size={20} />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="px-5 pt-3 pb-6 space-y-2 border-b border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2 !mt-3">
          <MapPinIcon className="stroke-primary" size={16} />
          <address className="text-sm not-italic">{barbershop.address}</address>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="stroke-primary" size={16} />
          <p className="text-sm not-italic">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
}
