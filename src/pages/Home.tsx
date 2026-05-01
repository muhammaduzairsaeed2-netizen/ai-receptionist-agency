import FloatingParticles from '../components/FloatingParticles'
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import ProblemSection from '../sections/ProblemSection'
import AIInActionSection from '../sections/AIInActionSection'
import HowItWorksSection from '../sections/HowItWorksSection'
import ServicesSection from '../sections/ServicesSection'
import AIFeaturesSection from '../sections/AIFeaturesSection'
import CaseStudySection from '../sections/CaseStudySection'
import CTASection from '../sections/CTASection'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <FloatingParticles />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <AIInActionSection />
        <HowItWorksSection />
        <ServicesSection />
        <AIFeaturesSection />
        <CaseStudySection />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}
