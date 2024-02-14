import { Metadata } from 'next';

import { env } from "@/env";

export const sharedMetadata: Metadata = {
  title: {
    template: "%s - FSW Barber",
    default: "FSW Barber"
  },
  description: "Economize tempo e agende seu horário com as melhores barbearias através do nosso site.",
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s - FSW Barber",
      default: "FSW Barber"
    },
    description: 'Economize tempo e agende seu horário com as melhores barbearias através do nosso site.',
    images: {
      url: "/favicon/favicon-512x512.png",
      alt: 'FSW Barber Logo'
    },
  },
  openGraph: {
    type: "website",
    url: new URL(String(env.NEXT_BASE_URL)),
    title: {
      template: "%s - FSW Barber",
      default: "FSW Barber"
    },
    locale: 'pt_BR',
    siteName: 'FSW Barber',
    description: 'Economize tempo e agende seu horário com as melhores barbearias através do nosso site.',
    images: {
      url: "/favicon/favicon-512x512.png",
      alt: 'FSW Barber Logo'
    },
  },
  manifest: "/favicon/site.webmanifest",
  icons: {
    shortcut: '/shortcut-icon.png',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg'
    }
  },
  creator: "Carlos Faustino",
  keywords: ["FSW Barber", "React", "Typescript", "Next.js", "TailwindCSS"],
  authors: [
    {
      name: "Carlos Faustino",
      url: "https://github.com/carlos-hfc"
    }
  ],
  category: 'technology',
  metadataBase: new URL(String(env.NEXT_BASE_URL)),
  alternates: {
    canonical: new URL(String(env.NEXT_BASE_URL)),
  }
};