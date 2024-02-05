import { SmartphoneIcon } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { BarbershopInfo } from "@/app/_components/barbershop-info";
import { BarbershopTab } from "@/app/_components/barbershop-tab";
import { Button } from "@/app/_components/ui/button";
import { ServiceItem } from "@/app/_components/service-item";

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
    <div className="space-y-6 pb-12">
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5">
        <BarbershopTab />
      </div>

      <div className={cn("px-5 space-y-3", searchParams.tab === 'services' || !Object.hasOwn(searchParams, 'tab') ? 'block' : "hidden")}>
        {barbershop.services.map(service => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={Boolean(session?.user)}
          />
        ))}
      </div>

      <div className={cn("*:px-5 *:pb-6 *:border-b *:border-secondary last:*:border-none space-y-6", searchParams.tab === 'information' ? 'block' : "hidden")}>
        <div>
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Sobre nós</h2>

          <p className="text-sm leading-5">{barbershop.description}</p>
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

        <div className="flex flex-col items-center gap-2 *:flex *:items-center *:justify-between *:w-full *:text-sm">
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
      </div>
    </div>
  );
}