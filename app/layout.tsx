import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { ParallaxProvider } from "@/components/providers/parallax-provider"
import { getAllStructuredData } from "@/lib/structured-data"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dentobridge.com'),

  title: {
    default: 'DentoBridge | Gestion de Laboratoire Dentaire en Algérie',
    template: '%s | DentoBridge'
  },

  description: 'Plateforme SaaS de gestion de laboratoire dentaire pour l\'Algérie. Facturation en un clic, réception de scans en ligne, communication intégrée avec les dentistes. Packages Silver Smile et Gold Crown.',

  keywords: [
    'laboratoire dentaire Algérie',
    'gestion laboratoire dentaire',
    'logiciel dentaire Algérie',
    'prothésiste dentaire Algérie',
    'facturation laboratoire dentaire',
    'SaaS dentaire',
    'logiciel dentaire DZ',
    'gestion cabinet dentaire Alger',
    'prothèse dentaire Algérie'
  ],

  authors: [{ name: 'DentoBridge' }],
  creator: 'DentoBridge',
  publisher: 'DentoBridge',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: '/',
    languages: {
      'fr-DZ': '/',
      'fr': '/',
      'x-default': '/',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: '/',
    siteName: 'DentoBridge',
    title: 'DentoBridge | Gestion de Laboratoire Dentaire en Algérie',
    description: 'Plateforme SaaS de gestion de laboratoire dentaire pour l\'Algérie. Facturation en un clic, réception de scans, communication intégrée.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DentoBridge - Plateforme de gestion pour laboratoires dentaires en Algérie',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DentoBridge | Gestion de Laboratoire Dentaire',
    description: 'Digitalisez votre laboratoire dentaire en Algérie. Facturation automatique, scans en ligne, communication intégrée.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getAllStructuredData()),
          }}
        />

        <SmoothScrollProvider>
          <ParallaxProvider>
            {children}
            <Analytics />
            <Toaster />
          </ParallaxProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
