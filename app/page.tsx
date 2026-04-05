import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProblemsSection from '@/components/sections/ProblemsSection'
import SolutionSection from '@/components/sections/SolutionSection'
import TrustSignalsSection from '@/components/sections/TrustSignalsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import DemoSection from '@/components/sections/DemoSection'
import PrivacySection from '@/components/sections/PrivacySection'
import ValidationSection from '@/components/sections/ValidationSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <main className="bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <TrustSignalsSection />
        <HowItWorksSection />
        <DemoSection />
        <PrivacySection />
        <ValidationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
