import ScrollReveal from "@/components/ScrollReveal";
import GiftMessageForm from "@/components/GiftMessageForm";
import PricingSection from "@/components/PricingSection";
import ShopifyProductsSection from "@/components/ShopifyProductsSection";
import { Gift, Heart, Package, Truck } from "lucide-react";
import { motion } from "framer-motion";

const GiftOrderPage = () => {
  const steps = [
    {
      icon: Package,
      number: "1",
      title: "Choisissez",
      description: "Sélectionnez le coffret idéal pour votre proche"
    },
    {
      icon: Heart,
      number: "2",
      title: "Personnalisez",
      description: "Ajoutez un message personnel touchant"
    },
    {
      icon: Truck,
      number: "3",
      title: "On livre",
      description: "À la date de votre choix, avec amour"
    }
  ];

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 bg-yellow/10 text-yellow-foreground px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Gift className="w-4 h-4 text-yellow" />
            <span className="text-sm font-medium text-foreground">Idée cadeau originale</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Offrez un coffret cadeau
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Faites plaisir à vos proches avec une sélection de produits artisanaux de nos fermes locales
          </p>
        </div>
      </ScrollReveal>

      {/* Steps Section */}
      <ScrollReveal delay={0.1}>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="bg-card border border-border/50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-yellow/30 h-full">
                <div className="relative inline-flex mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow/20 to-yellow/10 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-yellow" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-navy text-navy-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </div>
                </div>
                <h5 className="font-semibold text-foreground mb-2">{step.title}</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Pricing Section */}
      <PricingSection />

      {/* Shopify Products Section */}
      <ShopifyProductsSection 
        title="Nos box à offrir" 
        subtitle="Choisissez le coffret parfait pour votre proche"
      />

      {/* Form Section */}
      <ScrollReveal delay={0.2} className="max-w-2xl mx-auto">
        <GiftMessageForm />
      </ScrollReveal>

      {/* Info Section */}
      <ScrollReveal delay={0.3} className="mt-12 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-navy/5 to-navy/10 rounded-2xl p-8 border border-navy/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Une expérience cadeau inoubliable
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Votre proche recevra un email élégant le jour de la livraison avec votre message personnalisé. 
                La box sera livrée avec une belle carte cadeau imprimée et un emballage soigné. 
                Un cadeau qui fait plaisir et qui a du sens !
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
};

export default GiftOrderPage;