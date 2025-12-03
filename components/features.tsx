"use client"

import { Card } from "@/components/ui/card"
import { FolderOpen, MessageSquare, ReceiptText, Clock } from "lucide-react"

const features = [
  {
    icon: FolderOpen,
    title: "Gestion centralisée",
    description: "Toutes vos commandes au même endroit",
  },
  {
    icon: MessageSquare,
    title: "Communication directe",
    description: "Échangez facilement avec vos dentistes",
  },
  {
    icon: ReceiptText,
    title: "Facturation en un clic",
    description: "Générez vos factures instantanément",
  },
  {
    icon: Clock,
    title: "Suivi en temps réel",
    description: "Suivez l'avancement de chaque commande",
  },
]

export default function Features() {
  return (
    <section id="features" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            Outils puissants conçus spécifiquement pour les laboratoires dentaires algériens
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:border-blue-300"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="inline-flex rounded-lg bg-blue-50 p-3 transition-colors group-hover:bg-blue-100 flex-shrink-0">
                    <Icon className="h-6 w-6 text-[#2563eb]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground pt-0.5">{feature.title}</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed ml-16">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
