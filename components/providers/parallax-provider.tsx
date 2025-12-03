"use client"

import { ParallaxProvider as ScrollParallaxProvider } from "react-scroll-parallax"

interface ParallaxProviderProps {
  children: React.ReactNode
}

/**
 * Wrapper component for react-scroll-parallax provider
 * Enables parallax effects throughout the application
 */
export function ParallaxProvider({ children }: ParallaxProviderProps) {
  return <ScrollParallaxProvider>{children}</ScrollParallaxProvider>
}
