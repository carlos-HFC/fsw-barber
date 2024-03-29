import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { sharedMetadata } from "./shared-metadata";

import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Toaster } from "./_components/ui/sonner";

import { cn } from "./_lib/utils";
import { AuthProvider } from "./_providers/auth";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("dark flex flex-col relative min-h-screen", nunito.className)}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster
            className="pointer-events-auto"
            richColors
            duration={3000}
          />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
