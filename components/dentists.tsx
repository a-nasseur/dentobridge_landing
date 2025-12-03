"use client"

import { useState } from "react"
import { Copy, Link2, MessageCircle, Send, Share2, Check } from "lucide-react"
import {
  FacebookMessengerShareButton,
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Share option component for the Sheet (div to avoid button nesting)
const ShareOption = ({
  icon: Icon,
  label,
  onClick,
  className = "",
}: {
  icon: typeof MessageCircle
  label: string
  onClick?: () => void
  className?: string
}) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-3 rounded-xl p-4 transition-all cursor-pointer hover:scale-105 active:scale-95 ${className}`}
    role="button"
    tabIndex={0}
    aria-label={`Partager via ${label}`}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick?.()
      }
    }}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-current/10">
      <Icon className="h-7 w-7" />
    </div>
    <span className="text-xs font-semibold text-center">{label}</span>
  </div>
)

export default function Dentists() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  // Share configuration
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://dentobridge.com"
  const shareTitle = "DentoBridge - Outil de gestion pour prothésistes dentaires"
  const shareMessage = "J'ai découvert DentoBridge, un outil de gestion pour prothésistes. Regarde :"
  const telegramMessage = "👆 J'ai découvert DentoBridge, un outil de gestion pour prothésistes"

  // Web Share API handler with fallback to Sheet
  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
        // Only open sheet if it's not a cancellation
        if (error instanceof Error && error.name !== "AbortError") {
          setIsSheetOpen(true)
        }
      }
    } else {
      // Fallback: Open Sheet
      setIsSheetOpen(true)
    }
  }

  // Handle SMS share (native mobile)
  const handleSMSShare = () => {
    const smsBody = `${shareMessage} ${shareUrl}`
    const smsUrl = `sms:?body=${encodeURIComponent(smsBody)}`
    window.location.href = smsUrl
    setIsSheetOpen(false)
  }

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => {
        setLinkCopied(false)
        setIsSheetOpen(false)
      }, 1500)
    } catch (error) {
      console.error("Failed to copy link:", error)
    }
  }

  return (
    <section id="dentists" className="border-b border-border bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Dentistes, Parlez-en à vos Techniciens !
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Vous travaillez avec un laboratoire dentaire ? Partagez DentoBridge
            et simplifiez votre collaboration au quotidien.
          </p>
        </div>

        {/* Call-to-Action Card */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-12">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Main message */}
            <div className="mb-8 text-center">
              <h3 className="mb-3 text-2xl font-semibold text-foreground">
                Aidez-nous à améliorer la collaboration dentiste-technicien
              </h3>
              <p className="text-muted-foreground">
                Partagez DentoBridge avec votre laboratoire dentaire en un clic.
                Ensemble, simplifions la communication et améliorons la qualité
                de vos prothèses.
              </p>
            </div>

            {/* Single Share Button with Sheet */}
            <div className="flex justify-center">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <Button
                  onClick={handleShare}
                  size="lg"
                  className="group gap-2 px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
                >
                  <Share2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Partager DentoBridge
                </Button>

                <SheetContent
                  side="bottom"
                  className="mx-auto max-w-md rounded-t-3xl border-t-0 px-6 pb-8 pt-2"
                >
                  {/* Handle bar */}
                  <div className="mb-6 flex justify-center">
                    <div className="h-1.5 w-12 rounded-full bg-muted" />
                  </div>

                  <SheetHeader className="text-center">
                    <SheetTitle className="text-xl font-bold">
                      Partager DentoBridge
                    </SheetTitle>
                    <SheetDescription className="text-sm">
                      Choisissez votre application préférée
                    </SheetDescription>
                  </SheetHeader>

                  {/* Share options grid - optimized mobile layout */}
                  <div className="mt-8 grid grid-cols-3 gap-3 pb-2">
                    {/* WhatsApp */}
                    <WhatsappShareButton
                      url={shareUrl}
                      title={shareMessage}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ShareOption
                        icon={MessageCircle}
                        label="WhatsApp"
                        className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
                      />
                    </WhatsappShareButton>

                    {/* Facebook Messenger */}
                    <FacebookMessengerShareButton
                      url={shareUrl}
                      appId=""
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ShareOption
                        icon={MessageCircle}
                        label="Messenger"
                        className="bg-[#0084FF]/10 text-[#0084FF] hover:bg-[#0084FF]/20"
                      />
                    </FacebookMessengerShareButton>

                    {/* Viber */}
                    <ViberShareButton
                      url={shareUrl}
                      title={shareMessage}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ShareOption
                        icon={MessageCircle}
                        label="Viber"
                        className="bg-[#7360F2]/10 text-[#7360F2] hover:bg-[#7360F2]/20"
                      />
                    </ViberShareButton>

                    {/* Telegram */}
                    <TelegramShareButton
                      url={shareUrl}
                      title={telegramMessage}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <ShareOption
                        icon={Send}
                        label="Telegram"
                        className="bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20"
                      />
                    </TelegramShareButton>

                    {/* SMS */}
                    <ShareOption
                      icon={MessageCircle}
                      label="SMS"
                      onClick={handleSMSShare}
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    />

                    {/* Copy Link */}
                    <ShareOption
                      icon={linkCopied ? Check : Link2}
                      label={linkCopied ? "Copié !" : "Copier"}
                      onClick={handleCopyLink}
                      className={`${
                        linkCopied
                          ? "bg-green-500/10 text-green-500"
                          : "bg-accent/10 text-accent hover:bg-accent/20"
                      }`}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Additional info */}
            <div className="mt-8 border-t border-border pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Votre recommandation compte ! Aidez vos techniciens dentaires à
                découvrir une plateforme qui transformera votre collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
