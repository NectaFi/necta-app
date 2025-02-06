import { Hero } from "./_components/hero"
import CTASection from "./_components/cta"
import { FeaturesSection } from "./_components/features"
import { GettingStarted } from "./_components/getting-started"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <GettingStarted />
      <CTASection />
    </>
  )
}
