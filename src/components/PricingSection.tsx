import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroBox from "@/assets/hero-box.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { Star, Gift, Package, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      title: "LA BASE DU GOÛT",
      price: "34.99$",
      badge: "Flexible",
      badgeColor: "bg-muted text-muted-foreground",
    },
    {
      title: "SAVEURS CACHÉES",
      price: "29.99$",
      badge: "Populaire",
      badgeColor: "bg-primary text-primary-foreground",
    },
    {
      title: "L'ANNÉE GOURMANDE",
      price: "24.99$",
      badge: "Meilleure valeur",
      badgeColor: "bg-yellow text-yellow-foreground",
      isBestOffer: true,
    },
  ];

  return (
    <section id="nos-box" className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">
            Nos formules
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Découvrez nos box et choisissez l'offre qui vous convient
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <Card className={`p-6 text-center relative hover-lift ${
                plan.isBestOffer 
                  ? 'border-2 border-yellow shadow-yellow' 
                  : 'border-border/50'
              }`}>
                {plan.isBestOffer && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-yellow text-yellow-foreground px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Meilleure Offre
                    </div>
                  </div>
                )}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                  {plan.title}
                </h3>
                <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                <p className="text-sm text-muted-foreground">/mois</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/nos-box/commande">
              <Button variant="premium" size="lg" className="gap-2">
                <Package className="w-5 h-5" />
                S'abonner
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/nos-box/cadeau">
              <Button variant="outline" size="lg" className="gap-2 border-yellow text-yellow hover:bg-yellow/10">
                <Gift className="w-5 h-5" />
                Offrir une box
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5} className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Rejoignez l'aventure et recevez des produits artisanaux authentiques
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chaque box vous fait découvrir l'univers du terroir avec des yaourts de ferme, 
            fromages artisanaux, fruits lyophilisés et bien plus encore !
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;
