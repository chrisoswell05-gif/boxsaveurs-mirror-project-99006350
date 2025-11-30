import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroBox from "@/assets/hero-box.jpg";

const PricingSection = () => {
  const plans = [
    {
      title: "LA BASE DU GOÛT",
      subtitle: "Box bimensuel",
      engagement: "sans engagement",
      price: "39.90 €",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
    {
      title: "SAVEURS CACHÉES",
      subtitle: "Box mensuel engagement",
      engagement: "3 mois",
      price: "39.90 €",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
    {
      title: "L'ANNÉE GOURMANDE",
      subtitle: "Box mensuel engagement 12 mois",
      engagement: "",
      price: "39.90 €",
      features: ["-3 produits inclus", "-livraison offerte"],
    },
  ];

  return (
    <section className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          Nos formules
        </h2>
        <p className="text-center text-foreground mb-12">
          Choisissez votre abonnement et bénéficiez de nos offres exclusives
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                  {plan.title}
                </h3>
                <img 
                  src={heroBox} 
                  alt="Box Saveurs de Ferme" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                <p className="font-semibold text-foreground">{plan.subtitle}</p>
                {plan.engagement && (
                  <p className="text-sm text-muted-foreground">{plan.engagement}</p>
                )}
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-foreground">{feature}</li>
                  ))}
                </ul>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95">
                  {plan.engagement === "sans engagement" 
                    ? "Sans engagement" 
                    : plan.engagement === "3 mois"
                    ? "Abonnement 3 mois"
                    : "Abonnement 12 mois"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Rejoignez l'aventure et recevez des produit artisanaux authentiques dans chaque box pour vous faire découvrir l'univers du terroir
          </h3>
          <Button className="bg-yellow text-yellow-foreground hover:bg-yellow/90 text-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95">
            Je rejoins ...
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
