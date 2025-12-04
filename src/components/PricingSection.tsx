import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBox from "@/assets/hero-box.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import SavingsCalculator from "@/components/SavingsCalculator";
import PromoCodeInput from "@/components/PromoCodeInput";
import GiftMessageForm from "@/components/GiftMessageForm";
import { usePromoCode } from "@/hooks/usePromoCode";
import { Star, Gift } from "lucide-react";

const PricingSection = () => {
  const { appliedPromo, isValidating, validatePromoCode, removePromoCode, calculateDiscountedPrice } = usePromoCode();
  
  const plans = [
    {
      title: "LA BASE DU GOÛT",
      subtitle: "Box bimensuel",
      engagement: "sans engagement",
      price: "34.99$",
      features: [
        "3 produits inclus",
        "Yaourt de ferme",
        "Fromage artisanal",
        "Fruits lyophilisés",
        "Guide de recettes",
        "Livraison offerte"
      ],
      isBestOffer: false,
      badge: "Flexible",
      badgeColor: "bg-muted text-muted-foreground",
    },
    {
      title: "SAVEURS CACHÉES",
      subtitle: "Box mensuel engagement",
      engagement: "3 mois",
      price: "29.99$",
      features: [
        "3 produits inclus",
        "Yaourt de ferme",
        "Fromage artisanal",
        "Fruits lyophilisés",
        "Lait authentique",
        "Guide de recettes",
        "Livraison offerte"
      ],
      isBestOffer: false,
      badge: "Populaire",
      badgeColor: "bg-primary text-primary-foreground",
    },
    {
      title: "L'ANNÉE GOURMANDE",
      subtitle: "Box mensuel engagement 12 mois",
      engagement: "",
      price: "24.99$",
      features: [
        "3 produits inclus",
        "Yaourt de ferme",
        "Fromage artisanal premium",
        "Fruits lyophilisés",
        "Lait authentique",
        "Guide de recettes exclusif",
        "Livraison offerte",
        "Cadeaux surprises"
      ],
      isBestOffer: true,
      badge: "Meilleure valeur",
      badgeColor: "bg-yellow text-yellow-foreground",
    },
  ];

  const giftOptions = [
    {
      title: "BOX DÉCOUVERTE",
      subtitle: "Cadeau unique",
      price: "39.99$",
      features: [
        "1 box complète",
        "Yaourt de ferme",
        "Fromage artisanal",
        "Fruits lyophilisés",
        "Guide de recettes",
        "Carte cadeau personnalisée",
        "Livraison offerte"
      ],
    },
    {
      title: "COFFRET 3 MOIS",
      subtitle: "3 box livrées mensuellement",
      price: "99.99$",
      features: [
        "3 box complètes",
        "Produits variés chaque mois",
        "Guide de recettes",
        "Carte cadeau personnalisée",
        "Emballage cadeau premium",
        "Livraison offerte"
      ],
      isBestGift: true,
    },
    {
      title: "COFFRET 6 MOIS",
      subtitle: "6 box livrées mensuellement",
      price: "179.99$",
      features: [
        "6 box complètes",
        "Produits variés chaque mois",
        "Guide de recettes exclusif",
        "Carte cadeau personnalisée",
        "Emballage cadeau premium",
        "Surprise exclusive",
        "Livraison offerte"
      ],
    },
  ];

  return (
    <section id="nos-box" className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">
            Nos formules
          </h2>
          <p className="text-center text-foreground mb-8">
            Choisissez votre abonnement et bénéficiez de nos offres exclusives
          </p>
        </ScrollReveal>

        <Tabs defaultValue="subscription" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
            <TabsTrigger value="subscription" className="text-sm font-semibold">
              Les box Saveurs de Ferme
            </TabsTrigger>
            <TabsTrigger value="gift" className="text-sm font-semibold">
              <Gift className="w-4 h-4 mr-2" />
              Offrir une box
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscription">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <Card className={`overflow-visible hover-lift shadow-md hover:shadow-xl h-full relative ${
                    plan.isBestOffer 
                      ? 'border-2 border-yellow shadow-yellow' 
                      : 'border-border/50'
                  }`}>
                    {plan.isBestOffer && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-yellow to-yellow/90 text-yellow-foreground px-6 py-2 rounded-full shadow-yellow flex items-center gap-2 whitespace-nowrap">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-sm uppercase tracking-wide">
                            Meilleure Offre
                          </span>
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    )}
                    {plan.engagement !== "sans engagement" && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="bg-gradient-to-br from-navy to-navy/90 text-navy-foreground px-3 py-1 rounded-full shadow-navy text-xs font-semibold">
                          Éligible parrainage
                        </div>
                      </div>
                    )}
                    <div className="p-6 space-y-4 h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                          {plan.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                      </div>
                      <div className="relative overflow-hidden rounded-lg group">
                        <img 
                          src={heroBox} 
                          alt="Box Saveurs de Ferme" 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {appliedPromo ? (
                            <>
                              <span className={calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title) !== parseFloat(plan.price.replace('$', '')) ? "line-through text-muted-foreground text-lg mr-2" : ""}>
                                {plan.price}
                              </span>
                              {calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title) !== parseFloat(plan.price.replace('$', '')) && (
                                <span className="text-yellow">
                                  {calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title).toFixed(2)}$
                                </span>
                              )}
                            </>
                          ) : (
                            plan.price
                          )}
                        </p>
                        {appliedPromo && calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title) !== parseFloat(plan.price.replace('$', '')) && (
                          <p className="text-xs text-yellow font-semibold mt-1">
                            Code {appliedPromo.code} appliqué
                          </p>
                        )}
                        {appliedPromo && appliedPromo.code.startsWith('REF') && plan.title === 'LA BASE DU GOÛT' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Code non applicable à cette formule
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-foreground">{plan.subtitle}</p>
                      {plan.engagement && (
                        <p className="text-sm text-muted-foreground">{plan.engagement}</p>
                      )}
                      <ul className="space-y-2 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="text-foreground flex items-start gap-2">
                            <span className="text-yellow mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </li>
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
            
            <ScrollReveal delay={0.3} className="max-w-md mx-auto mt-12">
              <PromoCodeInput
                onValidate={(code) => validatePromoCode(code)}
                onRemove={removePromoCode}
                appliedCode={appliedPromo?.code || null}
                isValidating={isValidating}
              />
              <p className="text-xs text-center text-muted-foreground mt-3">
                💡 Les codes de parrainage sont valables uniquement pour les formules avec engagement (3 mois et 12 mois)
              </p>
            </ScrollReveal>
            
            <SavingsCalculator />
          </TabsContent>

          <TabsContent value="gift">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {giftOptions.map((gift, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <Card className={`overflow-visible hover-lift shadow-md hover:shadow-xl h-full relative ${
                    gift.isBestGift 
                      ? 'border-2 border-yellow shadow-yellow' 
                      : 'border-border/50'
                  }`}>
                    {gift.isBestGift && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-yellow to-yellow/90 text-yellow-foreground px-6 py-2 rounded-full shadow-yellow flex items-center gap-2 whitespace-nowrap">
                          <Gift className="w-4 h-4" />
                          <span className="font-bold text-sm uppercase tracking-wide">
                            Cadeau idéal
                          </span>
                          <Gift className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <div className="p-6 space-y-4 h-full flex flex-col">
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                        {gift.title}
                      </h3>
                      <div className="relative overflow-hidden rounded-lg group">
                        <img 
                          src={heroBox} 
                          alt="Box Cadeau Saveurs de Ferme" 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{gift.price}</p>
                      <p className="font-semibold text-foreground">{gift.subtitle}</p>
                      <ul className="space-y-2 flex-grow">
                        {gift.features.map((feature, idx) => (
                          <li key={idx} className="text-foreground flex items-start gap-2">
                            <span className="text-yellow mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="premium" className="w-full">
                        <Gift className="w-4 h-4 mr-2" />
                        Offrir ce cadeau
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3} className="mt-12 max-w-2xl mx-auto">
              <GiftMessageForm />
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="text-center mt-8 max-w-2xl mx-auto">
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  🎁 Comment ça marche ?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Choisissez votre coffret, personnalisez votre message ci-dessus, et nous nous occupons du reste ! 
                  Le destinataire recevra sa box avec une belle carte cadeau à la date de votre choix.
                </p>
              </div>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
        
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
