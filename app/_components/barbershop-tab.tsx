"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";

export function BarbershopTab() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = searchParams.get("tab");

  function handleChangeTab(tab: string) {
    const urlParams = new URLSearchParams();

    urlParams.set('tab', tab);

    router.replace(`${pathname}?${urlParams.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={tab === 'services' || !tab ? "default" : "outline"}
        onClick={() => handleChangeTab('services')}
      >
        Serviços
      </Button>
      <Button
        onClick={() => handleChangeTab('information')}
        variant={tab === 'information' ? "default" : "outline"}
      >
        Informações
      </Button>
    </div>
  );
}
