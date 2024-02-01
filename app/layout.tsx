import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "./_components/footer";

import { cn } from "./_lib/utils";
import { AuthProvider } from "./_providers/auth";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("dark flex flex-col relative min-h-screen", inter.className)}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
