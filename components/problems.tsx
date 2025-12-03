"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, Clock, BarChart3 } from "lucide-react"
import { Parallax } from "react-scroll-parallax"
import Image from "next/image"

const problems = [
  {
    icon: AlertCircle,
    title: "Gestion désorganisée",
    description: "Bons de commande papier, commandes notées un peu partout > aucun workflow clair pour suivre vos travaux",
  },
  {
    icon: Clock,
    title: "Communication inefficace",
    description: "Un dentiste appelle pour une modification, un autre envoie sur WhatsApp > impossible de tout suivre sans rien oublier",
  },
  {
    icon: BarChart3,
    title: "Comptabilité laborieuse",
    description: "Calculs à la main, erreurs de saisie, oublis de facturation > de l'argent qui s'évapore",
  },
]

export default function Problems() {
  return (
    <section id="problems" className="border-b border-border bg-gradient-to-b from-background to-background/50 py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Les défis des laboratoires dentaires
          </h2>
          <p className="mt-4 text-lg text-foreground/60">Nous comprenons vos enjeux quotidiens</p>
        </div>

        {/* 3-Column Layout: Left Image | Center Cards | Right Image - Responsive */}
        <div className="grid grid-cols-[1.2fr_1.6fr_1.2fr] lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-12 items-center">
          {/* Left Image - Gestion with Parallax (larger on mobile, overlapping) */}
          <div className="flex justify-center items-center -mr-4 sm:-mr-6 md:-mr-8 lg:mr-0">
            <Parallax translateY={[-60, 60]} className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-sm lg:max-w-md">
              <div className="relative aspect-square w-full">
                <Image
                  src="/Gestion_500.png"
                  alt="Tableau de bord DentoBridge montrant la gestion centralisée des commandes de laboratoire dentaire"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </Parallax>
          </div>

          {/* Center Column - Vertical Stack of 3 Cards */}
          <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <Card
                  key={index}
                  className="border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-destructive/30"
                >
                  <div className="mb-1.5 flex items-center gap-2.5">
                    <div className="inline-flex flex-shrink-0 rounded-lg bg-destructive/10 p-2">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">{problem.title}</h3>
                  </div>

                  {/* Content */}
                  <p className="text-sm sm:text-base text-foreground/70 leading-snug">{problem.description}</p>
                </Card>
              )
            })}
          </div>

          {/* Right Image - Facturation with Parallax (larger on mobile, overlapping) */}
          <div className="flex justify-center items-center -ml-4 sm:-ml-6 md:-ml-8 lg:ml-0">
            <Parallax translateY={[60, -60]} className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-sm lg:max-w-md">
              <div className="relative aspect-square w-full">
                <Image
                  src="/Facturation_500.png"
                  alt="Interface de facturation automatique DentoBridge conforme aux normes algériennes"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
