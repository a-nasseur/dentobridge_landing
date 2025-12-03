"use client"

import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"

const modules = [
  "Gestion des commandes",
  "Communication directe avec les dentistes",
  "Facturation automatique",
  "Suivi en temps réel",
  "Rapports et statistiques",
  "Stockage de documents",
  "Support par email et prioritaire",
  "Intégration personnalisée",
]

export default function Modules() {
  return (
    <section className="border-b border-border bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tous les modules disponibles
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            Accédez à l&apos;ensemble de nos fonctionnalités sur tous nos forfaits
          </p>
        </div>

        <Card className="border border-border bg-card p-8 sm:p-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#F39C12] flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">{module}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/60">
            Les différences entre les forfaits résident dans le nombre de crédits mensuels, le stockage et le niveau de
            support.
          </p>
        </div>
      </div>
    </section>
  )
}
