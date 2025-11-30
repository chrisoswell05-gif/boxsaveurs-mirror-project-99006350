import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ConceptSection from "@/components/ConceptSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ReviewsSection />
      <ConceptSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
