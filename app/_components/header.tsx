"use client";

import { CalendarIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { SideMenu } from "./side-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";

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
      <CardContent className="px-5 py-6 flex items-center justify-between container">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Barber"
            width={130}
            height={22}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {status === 'authenticated'
            ? (
              <>
                <Button
                  variant="ghost"
                  className="justify-normal gap-2"
                  asChild
                >
                  <Link href="/bookings">
                    <CalendarIcon size={16} />
                    Agendamentos
                  </Link>
                </Button>

                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-9">
                      <AvatarImage src={data.user?.image ?? ""} />
                      <AvatarFallback>{data.user?.name}</AvatarFallback>
                    </Avatar>
                    <h2 className="font-bold">{data.user?.name}</h2>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                  >
                    <LogOutIcon size={16} />
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="font-bold gap-2 justify-normal"
                onClick={handleLogin}
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}
        </div>

        <div className="block lg:hidden">
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
        </div>
      </CardContent>
    </Card>
  );
}