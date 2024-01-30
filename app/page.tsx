import { format } from "date-fns";
import { Header } from "./_components/header";

export default function Home() {
  return (
    <div>
      <Header />

      <section className="px-5 space-y-5">
        <div>
          <h2 className="text-xl font-bold">Olá Carlos!</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM")}
          </p>
        </div>


      </section>
    </div>
  );
}
