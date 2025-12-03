"use client"

import { Card } from "@/components/ui/card"
import { Folder, MessageSquare, FileText, Workflow } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const benefits = [
  {
    icon: Folder,
    title: "Gestion centralisée",
    items: [
      "Toutes vos commandes au même endroit",
      "Historique complet et recherche rapide",
      "Suivi du statut en temps réel",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication directe",
    items: [
      "Échangez facilement avec vos dentistes",
      "Messagerie intégrée à chaque commande",
      "Plus besoin de WhatsApp ou Viber",
    ],
  },
  {
    icon: FileText,
    title: "Facturation en un clic",
    items: [
      "Générez vos factures instantanément",
      "Formats conformes aux normes algériennes",
      "Fini la paperasse manuelle",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Digital",
    items: [
      "Réceptionnez les scans d'empreintes en ligne",
      "Stockage organisé et sécurisé",
      "Plus besoin de clés USB ou emails",
    ],
  },
]

export default function Benefits() {
  // Autoplay plugin with pause on hover
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }) as any
  )

  // Render single benefit card
  const renderBenefitCard = (benefit: typeof benefits[0], index: number) => {
    const Icon = benefit.icon
    return (
      <Card
        key={index}
        className="border border-border bg-card p-8 transition-all duration-300 hover:shadow-md hover:border-[#F39C12]/30"
      >
        <div className="flex items-center gap-2">
          <div className="inline-flex flex-shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950 p-3">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-foreground">{benefit.title}</h3>
        </div>

        {/* Benefits List */}
        <ul className="space-y-3 mt-4">
          {benefit.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <span className="text-[#F39C12] font-bold mt-0.5">•</span>
              <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    )
  }

  return (
    <section id="features" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-lg text-foreground/60">Une solution complète pour gérer votre laboratoire dentaire</p>
        </div>

        {/* Desktop: Grid (4 columns, no carousel) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => renderBenefitCard(benefit, index))}
        </div>

        {/* Tablet: Carousel (2 items visible) */}
        <div className="hidden md:block lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {benefits.map((benefit, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  {renderBenefitCard(benefit, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>

        {/* Mobile: Carousel (1 item visible) */}
        <div className="block md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {benefits.map((benefit, index) => (
                <CarouselItem key={index}>
                  {renderBenefitCard(benefit, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
