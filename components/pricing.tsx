"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import DemoRequestForm, { type PackageType } from "@/components/demo-request-form"

const pricingTiers = [
  {
    name: "Pack Starter",
    monthlyCredits: "50 crédits/mois",
    cta: "Choisir Starter",
    packageType: "starter" as PackageType,
    featured: false,
    pricing: {
      6: { original: 46000, launch: 23000, credits: 300, validity: "6 mois" },
      12: { original: 85000, launch: 42500, credits: 600, validity: "12 mois" },
    },
  },
  {
    name: "Pack Pro",
    monthlyCredits: "150 crédits/mois",
    cta: "Choisir Pro",
    packageType: "pro" as PackageType,
    featured: true,
    pricing: {
      6: { original: 120000, launch: 60000, credits: 900, validity: "6 mois" },
      12: { original: 220000, launch: 110000, credits: 1800, validity: "12 mois" },
    },
  },
  {
    name: "Pack Entreprise",
    monthlyCredits: "300 crédits/mois",
    cta: "Choisir Entreprise",
    packageType: "entreprise" as PackageType,
    featured: false,
    pricing: {
      6: { original: 200000, launch: 100000, credits: 1800, validity: "6 mois" },
      12: { original: 360000, launch: 180000, credits: 3600, validity: "12 mois" },
    },
  },
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<6 | 12>(6)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("unknown")

  const handlePackageSelect = (packageType: PackageType) => {
    setSelectedPackage(packageType)
    setIsFormOpen(true)
  }

  return (
    <>
      <section id="pricing" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Nos Forfaits</h2>
          <p className="mt-3 text-lg text-[#F39C12] font-semibold">Offre de lancement : -50% sur tous les packs</p>
        </div>

        <div className="mb-12 flex justify-center items-center gap-4">
          <span
            className={`text-sm font-medium transition-colors ${billingPeriod === 6 ? "text-foreground" : "text-foreground/60"}`}
          >
            6 mois
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 6 ? 12 : 6)}
            className="relative inline-flex h-10 w-16 items-center rounded-full bg-muted transition-colors"
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full bg-primary transition-transform duration-300 ${
                billingPeriod === 12 ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${billingPeriod === 12 ? "text-foreground" : "text-foreground/60"}`}
          >
            12 mois
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {pricingTiers.map((tier, index) => {
            const pricing = tier.pricing[billingPeriod]

            return (
              <Card
                key={index}
                className={`relative flex flex-col border transition-all duration-300 ${
                  tier.featured
                    ? "border-primary bg-gradient-to-br from-primary/5 to-card shadow-lg lg:scale-105 lg:z-10"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      POPULAIRE
                    </div>
                  </div>
                )}

                <div className="mb-4 pt-8 px-6">
                  <div className="inline-block rounded-full bg-[#F39C12]/20 px-3 py-1 text-xs font-semibold text-[#F39C12] mb-3">
                    {tier.monthlyCredits}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                </div>

                <div className="mb-4 px-6 flex items-center gap-2">
                  <div className="rounded-lg bg-destructive/10 px-3 py-1">
                    <span className="text-sm font-bold text-destructive">-50%</span>
                  </div>
                  <span className="text-xs text-foreground/60">Offre de lancement</span>
                </div>

                <div className="mb-6 px-6 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-foreground/60 line-through">
                      {pricing.original.toLocaleString("fr-FR")} DA
                    </span>
                    <span className="text-3xl font-bold text-foreground">{pricing.launch.toLocaleString("fr-FR")}</span>
                    <span className="text-foreground/60">DA</span>
                  </div>
                  <div className="text-sm text-foreground/60">
                    {pricing.credits.toLocaleString("fr-FR")} crédits • {pricing.validity}
                  </div>
                </div>

                <Button
                  className={`w-full mx-6 mb-6 transition-all mt-auto ${
                    tier.featured
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border border-primary bg-background text-primary hover:bg-primary/5"
                  }`}
                  style={{ width: "calc(100% - 3rem)" }}
                  onClick={() => handlePackageSelect(tier.packageType)}
                >
                  {tier.cta}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
      </section>

      {/* Demo Request Form with dynamic package selection */}
      <DemoRequestForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        defaultPackage={selectedPackage}
      />
    </>
  )
}
