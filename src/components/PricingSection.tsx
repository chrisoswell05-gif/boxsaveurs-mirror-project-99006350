import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroBox from "@/assets/hero-box.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const PricingSection = () => {
  const plans = [
    {
      title: "LA BASE DU GOÛT",
      subtitle: "Box bimensuel",
      engagement: "sans engagement",
      price: "29.99$",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
    {
      title: "SAVEURS CACHÉES",
      subtitle: "Box mensuel engagement",
      engagement: "3 mois",
      price: "24.99$",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
    {
      title: "L'ANNÉE GOURMANDE",
      subtitle: "Box mensuel engagement 12 mois",
      engagement: "",
      price: "19.99$",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
  ];

  return (
    <section className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">
            Nos formules
          </h2>
          <p className="text-center text-foreground mb-12">
            Choisissez votre abonnement et bénéficiez de nos offres exclusives
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <Card className="overflow-hidden hover-lift border-border/50 shadow-md hover:shadow-xl h-full">
                <div className="p-6 space-y-4 h-full flex flex-col">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                    {plan.title}
                  </h3>
                  <div className="relative overflow-hidden rounded-lg group">
                    <img 
                      src={heroBox} 
                      alt="Box Saveurs de Ferme" 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                  <p className="font-semibold text-foreground">{plan.subtitle}</p>
                  {plan.engagement && (
                    <p className="text-sm text-muted-foreground">{plan.engagement}</p>
                  )}
                  <ul className="space-y-2 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-foreground">{feature}</li>
                    ))}
                  </ul>
                  <Button variant="premium" className="w-full">
                    {plan.engagement === "sans engagement" 
                      ? "Sans engagement" 
                      : plan.engagement === "3 mois"
                      ? "Abonnement 3 mois"
                      : "Abonnement 12 mois"}
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.5} className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Rejoignez l'aventure et recevez des produit artisanaux authentiques dans chaque box pour vous faire découvrir l'univers du terroir
          </h3>
          <Button variant="accent" className="text-lg px-8 py-4 font-semibold">
            Je rejoins ...
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;
