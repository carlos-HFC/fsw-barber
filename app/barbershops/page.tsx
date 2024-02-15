import { Metadata } from "next";
import { redirect } from "next/navigation";

import { BarbershopItem } from "../_components/barbershop-item";
import { Header } from "../_components/header";
import { Search } from "../_components/search";

import { searchBarbershop } from '../data/search-barbershop';

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

export async function generateMetadata(props: BarbershopPageProps): Promise<Metadata> {
  return {
    title: `Resultado da busca por ${props.searchParams.search}`,
    openGraph: {
      title: `Resultado da busca por ${props.searchParams.search}`,
    },
    twitter: {
      title: `Resultado da busca por ${props.searchParams.search}`,
    }
  };
}

export default async function BarbershopPage({ searchParams }: BarbershopPageProps) {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await searchBarbershop(searchParams.search);

  return (
    <div className="px-5 py-6 lg:py-10 space-y-6 container">
      <div className="w-1/3">
        <Search defaultValues={{ search: searchParams.search }} />
      </div>

      <div className="space-y-3">
        <h1 className="text-gray-400 lg:text-white font-bold uppercase text-xs lg:text-xl">
          Resultados para <q>{searchParams.search}</q>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {barbershops.map(item => (
            <BarbershopItem
              key={item.id}
              barbershop={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
