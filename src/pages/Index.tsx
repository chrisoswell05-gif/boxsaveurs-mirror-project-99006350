import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ConceptSection from "@/components/ConceptSection";
import ProducersSection from "@/components/ProducersSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import GallerySection from "@/components/GallerySection";
import VideoTestimonialsSection from "@/components/VideoTestimonialsSection";
import ContactSection from "@/components/ContactSection";
import HighlightBar from "@/components/HighlightBar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <AboutSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeLeft" delay={0.1}>
        <ReviewsSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeRight" delay={0.1}>
        <ConceptSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <ProducersSection />
      </ScrollReveal>
      
      <ScrollReveal variant="scale" delay={0.1}>
        <HowItWorksSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <GallerySection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeLeft" delay={0.1}>
        <VideoTestimonialsSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <PricingSection />
      </ScrollReveal>
      
      <ScrollReveal variant="scale" delay={0.1}>
        <HighlightBar />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <ContactSection />
      </ScrollReveal>
      
      <Footer />
    </div>
  );
};

export default Index;
