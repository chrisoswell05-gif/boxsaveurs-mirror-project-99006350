import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SavingsCalculator from "@/components/SavingsCalculator";
import PromoCodeInput from "@/components/PromoCodeInput";
import { OrderDialog } from "@/components/OrderDialog";
import { usePromoCode } from "@/hooks/usePromoCode";
import { Star, Check, Truck, Shield, RefreshCw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

interface Plan {
  title: string;
  subtitle: string;
  engagement: string;
  price: string;
  monthlyLabel: string;
  features: string[];
  isBestOffer: boolean;
  badge: string;
  badgeColor: string;
  gradientFrom: string;
  gradientTo: string;
  checkoutUrl?: string;
  imageUrl?: string;
  variantId?: string;
}

const OrderPage = () => {
  const { appliedPromo, isValidating, validatePromoCode, removePromoCode, calculateDiscountedPrice } = usePromoCode();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    price: string;
    features: string[];
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback plans in case Shopify fails
  const fallbackPlans: Plan[] = [
    {
      title: "LA BASE DU GOÛT",
      subtitle: "Box bimensuel",
      engagement: "sans engagement",
      price: "34.99$",
      monthlyLabel: "/mois",
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
      gradientFrom: "from-slate-50",
      gradientTo: "to-slate-100",
      checkoutUrl: "https://boxsaveursdeferme.com/products/box-par-abonnement",
    },
    {
      title: "SAVEURS CACHÉES",
      subtitle: "Box mensuel engagement",
      engagement: "3 mois",
      price: "29.99$",
      monthlyLabel: "/mois",
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
      gradientFrom: "from-primary/5",
      gradientTo: "to-primary/10",
      checkoutUrl: "https://boxsaveursdeferme.com/checkouts/cn/hWN6WcLmZk9MiV8JgJM89KAD/fr-ca",
    },
    {
      title: "L'ANNÉE GOURMANDE",
      subtitle: "Box mensuel engagement 12 mois",
      engagement: "",
      price: "24.99$",
      monthlyLabel: "/mois",
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
      gradientFrom: "from-yellow/5",
      gradientTo: "to-yellow/15",
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(10);
        
        if (products.length === 0) {
          setPlans(fallbackPlans);
          return;
        }

        // Transform Shopify products to plan format
        const shopifyPlans: Plan[] = products.map((product, index) => {
          const node = product.node;
          const price = parseFloat(node.priceRange.minVariantPrice.amount);
          const currency = node.priceRange.minVariantPrice.currencyCode === 'CAD' ? '$' : node.priceRange.minVariantPrice.currencyCode;
          const firstVariant = node.variants.edges[0]?.node;
          const imageUrl = node.images.edges[0]?.node?.url;

          // Parse features from description or use defaults
          const descriptionLines = node.description?.split(/[•\n]/).filter(line => line.trim()) || [];
          const features = descriptionLines.length > 0 
            ? descriptionLines.slice(0, 8).map(line => line.trim())
            : ["Produits de ferme", "Livraison offerte"];

          // Determine styling based on position
          const isBestOffer = index === products.length - 1 || node.title.toLowerCase().includes('année') || node.title.toLowerCase().includes('premium');
          
          let badge = "Flexible";
          let badgeColor = "bg-muted text-muted-foreground";
          let gradientFrom = "from-slate-50";
          let gradientTo = "to-slate-100";
          let engagement = "sans engagement";

          if (isBestOffer) {
            badge = "Meilleure valeur";
            badgeColor = "bg-yellow text-yellow-foreground";
            gradientFrom = "from-yellow/5";
            gradientTo = "to-yellow/15";
            engagement = "";
          } else if (index === 1 || node.title.toLowerCase().includes('populaire')) {
            badge = "Populaire";
            badgeColor = "bg-primary text-primary-foreground";
            gradientFrom = "from-primary/5";
            gradientTo = "to-primary/10";
            engagement = "3 mois";
          }

          return {
            title: node.title.toUpperCase(),
            subtitle: node.handle.includes('abonnement') ? 'Box par abonnement' : 'Box mensuel',
            engagement,
            price: `${price.toFixed(2)}${currency}`,
            monthlyLabel: "/mois",
            features,
            isBestOffer,
            badge,
            badgeColor,
            gradientFrom,
            gradientTo,
            checkoutUrl: `https://boxsaveursdeferme.com/products/${node.handle}`,
            imageUrl,
            variantId: firstVariant?.id,
          };
        });

        setPlans(shopifyPlans.length > 0 ? shopifyPlans : fallbackPlans);
      } catch (error) {
        console.error('Failed to load Shopify products:', error);
        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    // If plan has a checkout URL, redirect directly
    if (plan.checkoutUrl) {
      window.open(plan.checkoutUrl, '_blank');
      return;
    }
    
    const finalPrice = appliedPromo 
      ? calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title).toFixed(2) + '$'
      : plan.price;
    
    setSelectedPlan({
      title: plan.title,
      price: finalPrice,
      features: plan.features
    });
    setOrderDialogOpen(true);
  };

  const benefits = [
    { icon: Truck, text: "Livraison gratuite" },
    { icon: Shield, text: "Satisfait ou remboursé" },
    { icon: RefreshCw, text: "Annulation facile" },
  ];

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sélectionnez l'abonnement qui vous convient et recevez chaque mois des produits frais de nos fermes partenaires
          </p>
          
          {/* Benefits Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <benefit.icon className="w-4 h-4 text-yellow" />
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Chargement des formules...</span>
        </div>
      ) : (
        <div className={`grid gap-6 lg:gap-8 max-w-6xl mx-auto ${plans.length === 1 ? 'md:grid-cols-1 max-w-md' : plans.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-3'}`}>
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <Card className={`relative overflow-visible h-full flex flex-col transition-all duration-300 ${
                  plan.isBestOffer 
                    ? 'border-2 border-yellow shadow-xl shadow-yellow/20 scale-[1.02]' 
                    : 'border-border/50 hover:border-primary/30 hover:shadow-lg'
                }`}>
                  {/* Best Offer Badge */}
                  {plan.isBestOffer && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <motion.div 
                        className="bg-gradient-to-r from-yellow to-yellow/90 text-yellow-foreground px-5 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold text-sm uppercase tracking-wide">
                          Meilleure Offre
                        </span>
                        <Star className="w-4 h-4 fill-current" />
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Referral Badge */}
                  {plan.engagement !== "sans engagement" && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gradient-to-br from-navy to-navy/90 text-navy-foreground px-3 py-1 rounded-full shadow-md text-xs font-semibold">
                        Éligible parrainage
                      </div>
                    </div>
                  )}

                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo} p-6 ${plan.isBestOffer ? 'pt-8' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary uppercase tracking-wide mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                    {plan.engagement && (
                      <p className="text-xs text-muted-foreground/70 mt-1">{plan.engagement}</p>
                    )}
                    
                    {/* Price Display */}
                    <div className="mt-4">
                      {appliedPromo ? (
                        <div className="flex items-baseline gap-2">
                          <span className={calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title) !== parseFloat(plan.price.replace('$', '')) ? "line-through text-muted-foreground text-lg" : "text-3xl font-bold text-foreground"}>
                            {plan.price}
                          </span>
                          {calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title) !== parseFloat(plan.price.replace('$', '')) && (
                            <span className="text-3xl font-bold text-yellow">
                              {calculateDiscountedPrice(parseFloat(plan.price.replace('$', '')), plan.title).toFixed(2)}$
                            </span>
                          )}
                          <span className="text-muted-foreground text-sm">{plan.monthlyLabel}</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground text-sm">{plan.monthlyLabel}</span>
                        </div>
                      )}
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
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden group">
                    <img 
                      src={plan.imageUrl || '/lovable-uploads/8fc08bef-2fdf-489e-aa15-7eafd90e318b.jpg'} 
                      alt={plan.title} 
                      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Features List */}
                  <div className="p-6 flex-grow flex flex-col">
                    <ul className="space-y-3 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                        >
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-yellow/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-yellow" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button 
                      variant={plan.isBestOffer ? "premium" : "default"}
                      className={`w-full mt-6 ${plan.isBestOffer ? '' : 'bg-primary hover:bg-primary/90'}`}
                      size="lg"
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {plan.engagement === "sans engagement" 
                        ? "Commander sans engagement" 
                        : plan.engagement === "3 mois"
                        ? "S'abonner 3 mois"
                        : "S'abonner maintenant"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      )}
      
      {/* Promo Code Section */}
      <ScrollReveal delay={0.3}>
        <div className="max-w-md mx-auto mt-16 p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
          <h4 className="font-semibold text-foreground text-center mb-4">Avez-vous un code promo ?</h4>
          <PromoCodeInput
            onValidate={(code) => validatePromoCode(code)}
            onRemove={removePromoCode}
            appliedCode={appliedPromo?.code || null}
            isValidating={isValidating}
          />
          <p className="text-xs text-center text-muted-foreground mt-4">
            💡 Les codes de parrainage sont valables uniquement pour les formules avec engagement
          </p>
        </div>
      </ScrollReveal>
      
      <SavingsCalculator />

      {selectedPlan && (
        <OrderDialog
          open={orderDialogOpen}
          onOpenChange={setOrderDialogOpen}
          boxName={selectedPlan.title}
          boxPrice={selectedPlan.price}
          boxDescription={selectedPlan.features.join(', ')}
        />
      )}
    </>
  );
};

export default OrderPage;
