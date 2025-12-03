"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">© {currentYear} DentoBridge. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Instagram
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
