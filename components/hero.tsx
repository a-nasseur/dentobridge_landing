"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, BarChart3, MessageSquare } from "lucide-react"
import DemoRequestForm from "@/components/demo-request-form"

export default function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white py-12 sm:py-24">
      {/* Subtle accent circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 w-fit">
              <p className="text-sm font-semibold text-accent">La solution digitale pour votre laboratoire dentaire</p>
            </div>

            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
              Gérez votre laboratoire dentaire en toute simplicité
            </h1>

            <p className="text-balance text-lg text-foreground/70 mb-8 leading-relaxed">
              Gestion centralisée, communication directe, facturation automatisée et réception de scans en ligne.
              Digitalisez vos opérations et concentrez-vous sur votre métier.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
                onClick={() => setIsFormOpen(true)}
              >
                Demander une démo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="#pricing" scroll={false} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent gap-2 group"
                >
                  Voir les tarifs
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <p className="text-sm text-foreground/60 mb-6">✓ Accompagnement & support inclus • Configuration rapide</p>

            {/* Feature highlights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/70">
                  Réceptionnez les scans d&apos;empreintes directement en ligne
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/70">Facturation instantanée conforme aux normes algériennes</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/70">Communication intégrée - fini WhatsApp et les E-mails</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative hidden lg:block">
            {/* Dashboard Card */}
            <div className="relative bg-white rounded-xl shadow-2xl border border-border overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-primary-foreground">DentoBridge Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/30" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      <p className="text-xs font-medium text-foreground/60">Commandes</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">24</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <p className="text-xs font-medium text-foreground/60">Messages</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">8</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <p className="text-xs font-semibold text-foreground/60 mb-3">Activité récente</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-xs text-foreground/70">Nouvelle commande #1245</span>
                      <span className="text-xs font-medium text-accent">+15000 DA</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-xs text-foreground/70">Paiement reçu</span>
                      <span className="text-xs font-medium text-accent">+50000 DA</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-xs text-foreground/70">Livraison confirmée</span>
                      <span className="text-xs font-medium text-foreground/60">15:30</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button */}
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-2 rounded-lg transition-colors">
                  Nouvelle facturation
                </button>
              </div>
            </div>

            {/* Floating accent element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
      </section>

      {/* Demo Request Form */}
      <DemoRequestForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        defaultPackage="unknown"
      />
    </>
  )
}
