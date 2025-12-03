import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ConceptSection from "@/components/ConceptSection";
import ProducersSection from "@/components/ProducersSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import QuizIntroSection from "@/components/QuizIntroSection";
import PricingSection from "@/components/PricingSection";
import GallerySection from "@/components/GallerySection";
import VideoTestimonialsSection from "@/components/VideoTestimonialsSection";
import ContactSection from "@/components/ContactSection";
import HighlightBar from "@/components/HighlightBar";
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
      <ProducersSection />
      <HowItWorksSection />
      <GallerySection />
      <VideoTestimonialsSection />
      <QuizIntroSection />
      <PricingSection />
      <HighlightBar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
