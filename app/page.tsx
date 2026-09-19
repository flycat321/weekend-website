import HeroSection from "@/components/hero-section"
import ProductShowcase from "@/components/product-showcase"
import CarbonCalculator from "@/components/carbon-calculator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ValueProposition from "@/components/home/value-proposition"
import ProductsServices from "@/components/home/products-services"
import CommunitySection from "@/components/home/community-section"
import BrandStory from "@/components/home/brand-story"
import CtaSection from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ValueProposition />
        <ProductsServices />
        <ProductShowcase />
        <CarbonCalculator />
        <CommunitySection />
        <BrandStory />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
