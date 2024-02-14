"use client";

import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SideMenu } from "./side-menu";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();

  function handleGoHome() {
    router.push("/");
  }

  return (
    <div>
      <div className="h-64 absolute top-0 w-full lg:relative lg:h-[480px] lg:rounded-lg">
        <Button
          size="icon"
          variant="outline"
          className="z-10 absolute top-6 left-6 lg:hidden"
          onClick={handleGoHome}
        >
          <ChevronLeftIcon size={20} />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="z-10 absolute top-6 right-6 lg:hidden"
            >
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover lg:rounded-lg"
        />
      </div>

      <div className="px-5 lg:px-0 pt-48 lg:pt-5 pb-6 lg:pb-0 space-y-2 lg:space-y-0 border-b lg:border-b-0 border-secondary lg:grid lg:grid-cols-2 gap-3">
        <h1 className="text-xl font-bold lg:text-3xl">{barbershop.name}</h1>
        <div className="flex items-center gap-2 !mt-3 lg:!mt-0 lg:col-start-1">
          <MapPinIcon className="stroke-primary" size={16} />
          <address className="text-sm not-italic">{barbershop.address}</address>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <StarIcon className="stroke-primary" size={16} />
          <p className="text-sm not-italic">5,0 (899 avaliações)</p>
        </div>

        <div className="lg:flex items-center justify-center gap-2 col-start-2 row-start-1 row-end-3 flex-col w-max rounded-lg justify-self-end bg-card px-5 py-2.5">
          <span className="flex items-center gap-2 text-xl">
            <StarIcon className="stroke-primary fill-primary" size={20} />
            5,0
          </span>
          <p className="text-xs">899 avaliações</p>
        </div>
      </div>
    </div>
  );
}
