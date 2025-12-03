"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Provides smooth scrolling experience using Lenis
 * Automatically respects user's prefers-reduced-motion preference
 * Intercepts anchor link clicks for smooth animated scrolling
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Skip smooth scrolling if user prefers reduced motion
      return
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Animation frame loop for smooth scroll
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor link clicks for smooth animated scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.href) {
        const url = new URL(link.href)

        // Check if it's an anchor link (starts with #)
        if (url.hash && url.pathname === window.location.pathname) {
          e.preventDefault()
          e.stopPropagation()

          const targetId = url.hash.slice(1) // Remove the # symbol
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            // Update URL without scrolling
            window.history.pushState({}, "", url.hash)

            // Use Lenis scrollTo for smooth animated scroll
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            })
          }
        }
      }
    }

    // Add click event listener to document with capture phase
    document.addEventListener("click", handleAnchorClick, true)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick, true)
    }
  }, [])

  return <>{children}</>
}
