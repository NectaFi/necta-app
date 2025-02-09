import { Hero } from "./_components/hero";
import CTASection from "./_components/cta";
import { FeaturesSection } from "./_components/features";
import { GettingStarted } from "./_components/getting-started";
import { FAQ } from "./_components/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <GettingStarted />
      <CTASection />
      <FAQ />
    </>
  );
}
