import { SmartphoneIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { getServerSession } from "next-auth";

import { BarbershopInfo } from "@/app/_components/barbershop-info";
import { BarbershopTab } from "@/app/_components/barbershop-tab";
import { ServiceItem } from "@/app/_components/service-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

import { WEEKDAYS } from "@/app/_constants";
import { convertMinutesToHours } from "@/app/_helpers/hours";
import { authOptions } from "@/app/_lib/auth";
import { cn } from "@/app/_lib/utils";

import { getOneBarbershop } from "@/app/data/get-one-barbershop";

interface BarbershopsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    tab: string;
  };
}

export const revalidate = 100 * 60 * 60;

export async function generateMetadata(props: BarbershopsPageProps): Promise<Metadata> {
  const barbershop = await getOneBarbershop(props.params.id);

  return {
    title: barbershop.name,
    openGraph: {
      title: barbershop.name,
    },
    twitter: {
      title: barbershop.name,
    }
  };
}

export default async function BarbershopsPage({ params, searchParams }: BarbershopsPageProps) {
  const session = await getServerSession(authOptions);

  const barbershop = await getOneBarbershop(params.id);

  return (
    <div className="space-y-6 lg:space-y-0 pb-12 lg:pb-24 lg:container lg:px-5 lg:pt-10 lg:grid lg:grid-cols-[65%_auto] lg:gap-10">
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 lg:hidden">
        <BarbershopTab />
      </div>

      <div className={cn("px-5 lg:px-0 lg:col-start-1 grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5", searchParams.tab === 'services' || !Object.hasOwn(searchParams, 'tab') ? 'grid' : "hidden")}>
        {barbershop.services.map(service => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={Boolean(session?.user)}
          />
        ))}
      </div>

      <div className={cn("*:px-5 *:pb-6 lg:*:px-0 lg:p-5 lg:*:pb-5 *:border-b *:border-secondary first:*:pb-0 last:*:pb-0 first:*:border-none last:*:border-none space-y-6 lg:space-y-5 lg:bg-card lg:block lg:row-start-1 lg:row-end-3 lg:h-max lg:col-start-2 rounded-2xl", searchParams.tab === 'information' ? 'block' : "hidden")}>
        <div className="relative hidden lg:block">
          <Image
            src="/map.png"
            alt={barbershop.name}
            width={1658}
            height={1038}
            className="rounded-lg"
          />

          <div className="absolute bottom-5 left-0 w-full px-5">
            <Card>
              <CardContent className="p-3 flex gap-3 items-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                  />

                  <AvatarFallback>{barbershop.name}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="font-bold">{barbershop.name}</h2>
                  <address className="text-xs not-italic truncate">{barbershop.address}</address>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xs lg:text-sm uppercase text-gray-400 lg:text-white font-bold mb-3">Sobre nós</h2>

          <p className="text-sm lg:text-gray-400 leading-5">{barbershop.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between first:*:flex first:*:items-center first:*:gap-2">
            <div>
              <SmartphoneIcon />
              <p className="text-sm">{barbershop.phone1}</p>
            </div>

            <Button variant="secondary">
              Copiar
            </Button>
          </div>

          <div className="flex items-center justify-between first:*:flex first:*:items-center first:*:gap-2">
            <div>
              <SmartphoneIcon />
              <p className="text-sm">{barbershop.phone2}</p>
            </div>

            <Button variant="secondary">
              Copiar
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 *:flex *:items-center *:justify-between *:w-full *:text-sm pb-0 max-lg:border-none">
          {WEEKDAYS.map((item, i) => (
            <div>
              <span className="text-gray-400">{item}</span>
              <span>
                {!barbershop.weekdays.includes(i.toString())
                  ? "Fechado"
                  : `${convertMinutesToHours(barbershop.hourStart)} - ${convertMinutesToHours(barbershop.hourEnd)}`}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex justify-between items-center flex-wrap !py-5">
          <p>Em parceria com</p>
          <Image
            src="/logo.png"
            alt="Logo FSW Barber"
            width={130}
            height={22}
          />
        </div>
      </div>
    </div>
  );
}