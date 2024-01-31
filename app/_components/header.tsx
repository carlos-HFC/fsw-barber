"use client";

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserCircle2Icon, UserIcon, XIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Header() {
  const { data, status } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

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

          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b py-8 px-5 border-secondary flex flex-row justify-between items-center space-y-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetClose asChild>
                <XIcon size={20} />
              </SheetClose>
            </SheetHeader>

            <div className="px-5">
              {status === 'authenticated'
                ? (
                  <div className="flex justify-between py-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={data.user?.image ?? ""} />
                        <AvatarFallback>{data.user?.name}</AvatarFallback>
                      </Avatar>
                      <h2 className="font-bold">{data.user?.name}</h2>
                    </div>

                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleLogout}
                    >
                      <LogOutIcon size={20} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 py-6">
                    <div className="flex items-center gap-2">
                      <UserCircle2Icon
                        size={40}
                        className="stroke-gray-400"
                      />
                      <h2 className="font-bold">Olá. Faça seu login!</h2>
                    </div>

                    <Button
                      variant="secondary"
                      className="font-bold gap-2 justify-normal"
                      onClick={handleLogin}
                    >
                      <LogInIcon size={16} />
                      Fazer login
                    </Button>
                  </div>
                )}

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="justify-normal gap-2"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={16} />
                    Início
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="justify-normal gap-2"
                  asChild
                >
                  <Link href="/bookings">
                    <CalendarIcon size={16} />
                    Agendamentos
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}