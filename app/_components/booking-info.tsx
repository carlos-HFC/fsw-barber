import { Card, CardContent } from "./ui/card";

interface BookingInfoProps {
  name: string;
  price: number;
  date?: string;
  hour?: string;
  barbershop: string;
}

export function BookingInfo(props: Readonly<BookingInfoProps>) {
  return (
    <Card>
      <CardContent className="p-3 *:flex *:justify-between space-y-3 *:items-center">
        <div>
          <h2 className="font-bold">{props.name}</h2>
          <h3 className="font-bold text-sm">
            {props.price.toLocaleString('pt-BR', {
              style: "currency",
              currency: "BRL"
            })}
          </h3>
        </div>

        {props.date && (
          <div>
            <h3 className="text-gray-400 text-sm">Data</h3>
            <h4 className="text-sm">
              {props.date}
            </h4>
          </div>
        )}

        {props.hour && (
          <div>
            <h3 className="text-gray-400 text-sm">Horário</h3>
            <h4 className="text-sm">
              {props.hour}
            </h4>
          </div>
        )}

        <div>
          <h3 className="text-gray-400 text-sm">Barbearia</h3>
          <h4 className="text-sm">
            {props.barbershop}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
