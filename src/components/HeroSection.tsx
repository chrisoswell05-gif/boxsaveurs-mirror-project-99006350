import heroBox from "@/assets/hero-box.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background py-16 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Authenticité, Plaisir, Découverte
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold">
            Chaque box, une nouvelle expérience gourmande
          </p>
          <p className="text-xl text-foreground">
            Une découverte sans engagement<br />
            <span className="text-2xl font-bold">24,99$/mois</span>
          </p>
          <div className="flex gap-4 pt-4">
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-lg px-8 py-6">
              J'essaie
            </Button>
            <Button className="bg-yellow text-yellow-foreground hover:bg-yellow/90 text-lg px-8 py-6">
              J'offre
            </Button>
          </div>
        </div>
        <div>
          <img 
            src={heroBox} 
            alt="Box Saveurs de Ferme avec produits artisanaux" 
            className="rounded-lg shadow-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
