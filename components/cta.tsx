"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import DemoRequestForm from "@/components/demo-request-form"
import ContactForm from "@/components/contact-form"

export default function CTA() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <>
      <section id="cta" className="border-b border-border bg-gradient-to-b from-background to-background py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Prêt à transformer votre laboratoire?
          </h2>

          <p className="mt-4 text-lg text-foreground/60">
            Rejoignez des dizaines de laboratoires dentaires algériens qui font confiance à DentoBridge.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
              onClick={() => setIsFormOpen(true)}
            >
              Demander une démo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/5 bg-transparent"
              onClick={() => setIsContactFormOpen(true)}
            >
              Nous contacter
            </Button>
          </div>

          <p className="mt-6 text-sm text-foreground/50">
          Formation incluse • Accompagnement jusqu&apos;à la prise en main
          </p>
        </div>
      </div>
      </section>

      {/* Demo Request Form */}
      <DemoRequestForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        defaultPackage="unknown"
      />

      {/* Contact Form */}
      <ContactForm
        isOpen={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </>
  )
}
