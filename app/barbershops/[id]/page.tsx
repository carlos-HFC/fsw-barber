import { BarbershopInfo } from "@/app/_components/barbershop-info";
import { ServiceItem } from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";

import { db } from "@/app/_lib/prisma";

interface BarbershopsPageProps {
  params: {
    id: string;
  };
}

export default async function BarbershopsPage({ params }: BarbershopsPageProps) {
  const barbershop = await db.barbershop.findUniqueOrThrow({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  });

  return (
    <div className="space-y-6">
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 space-y-6">
        <div className="flex items-center gap-2">
          <Button>
            Serviços
          </Button>
          <Button variant="outline">
            Informações
          </Button>
        </div>

        {barbershop.services.map(service => (
          <ServiceItem
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}