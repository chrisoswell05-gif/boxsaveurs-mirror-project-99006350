import ScrollReveal from "@/components/ScrollReveal";
import GiftMessageForm from "@/components/GiftMessageForm";
import { Gift } from "lucide-react";

const GiftOrderPage = () => {
  return (
    <>
      <ScrollReveal>
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          Offrez un coffret cadeau
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Faites plaisir à vos proches avec une box de produits artisanaux
        </p>
      </ScrollReveal>

      <ScrollReveal className="max-w-2xl mx-auto">
        <GiftMessageForm />
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="text-center mt-8 max-w-2xl mx-auto">
        <div className="bg-muted/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            🎁 Comment ça marche ?
          </h4>
          <p className="text-muted-foreground text-sm">
            Choisissez votre coffret, personnalisez votre message, et nous nous occupons du reste ! 
            Le destinataire recevra sa box avec une belle carte cadeau à la date de votre choix.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="mt-8 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg">1</span>
            </div>
            <h5 className="font-semibold text-foreground mb-1">Choisissez</h5>
            <p className="text-sm text-muted-foreground">Sélectionnez le coffret idéal</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg">2</span>
            </div>
            <h5 className="font-semibold text-foreground mb-1">Personnalisez</h5>
            <p className="text-sm text-muted-foreground">Ajoutez votre message</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg">3</span>
            </div>
            <h5 className="font-semibold text-foreground mb-1">On livre</h5>
            <p className="text-sm text-muted-foreground">À la date de votre choix</p>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
};

export default GiftOrderPage;
