"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import DemoRequestForm from "@/components/demo-request-form"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="#"
              scroll={false}
              onClick={handleLogoClick}
              className="flex items-center"
            >
              {/* Mobile: optimized smaller logo */}
              <Image
                src="/Logo_Vertical_40.png"
                alt="DentoBridge Logo"
                width={60}
                height={40}
                priority
                className="h-8 w-auto sm:hidden"
              />
              {/* Desktop: higher quality logo */}
              <Image
                src="/Logo_Vertical_80.png"
                alt="DentoBridge Logo"
                width={120}
                height={80}
                priority
                className="hidden h-10 w-auto sm:block md:h-12"
              />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="#features"
                scroll={false}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Fonctionnalités
              </Link>
              <Link
                href="#dentists"
                scroll={false}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Dentistes
              </Link>
              <Link
                href="#pricing"
                scroll={false}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Tarification
              </Link>
            </nav>

            {/* CTA Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsFormOpen(true)}
            >
              <span className="hidden sm:inline">Demander une démo</span>
              <span className="sm:hidden">Démo</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Demo Request Form */}
      <DemoRequestForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        defaultPackage="unknown"
      />
    </>
  )
}
