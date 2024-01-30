import { format } from "date-fns";

import { Header } from "./_components/header";
import { Search } from "./_components/search";

export default function Home() {
  return (
    <div>
      <Header />

      <section className="px-5 pt-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Olá Carlos!</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM")}
          </p>
        </div>

        <Search />
      </section>
    </div>
  );
}
