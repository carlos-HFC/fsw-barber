import { MenuIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

        <Button variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </CardContent>
    </Card>
  );
}