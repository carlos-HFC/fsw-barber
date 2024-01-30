import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingItem() {
  return (
    <Card>
      <CardContent className="flex justify-between">
        <div className="space-y-2 p-3">
          <Badge className="bg-dark-purple text-primary hover:bg-dark-purple">Confirmado</Badge>

          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col odd:*:text-sm even:*:text-2xl border-l border-secondary px-6">
          <p>Fevereiro</p>
          <p>06</p>
          <p>09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
