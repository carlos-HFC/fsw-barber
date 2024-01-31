"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";

import { SideMenu } from "./side-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";

export function Header() {
  return (
    <Card>
      <CardContent className="px-5 py-6 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="FSW Barber"
          width={130}
          height={22}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
            >
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>
      </CardContent>
    </Card>
  );
}