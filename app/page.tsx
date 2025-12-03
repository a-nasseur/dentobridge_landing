import Header from "@/components/header"
import Hero from "@/components/hero"
import Problems from "@/components/problems"
import Benefits from "@/components/benefits"
import Dentists from "@/components/dentists"
import Pricing from "@/components/pricing"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problems />
      <Benefits />
      <Dentists />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
