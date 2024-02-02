"use client";

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserCircle2Icon, XIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export function SideMenu() {
  const { data, status } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <SheetContent>
      <SheetHeader className="text-left border-b py-6 px-5 border-secondary flex flex-row justify-between items-center space-y-0">
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
  );
}