import { Outlet, Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Package } from "lucide-react";
import heroBox from "@/assets/hero-box.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const NosBox = () => {
  const location = useLocation();
  const isGiftPage = location.pathname.includes("/cadeau");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Banner Section */}
      <section className="relative bg-gradient-to-br from-navy to-navy/90 py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroBox} 
            alt="Nos Box" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/60" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-foreground text-center mb-4">
              Nos Box Saveurs de Ferme
            </h1>
            <p className="text-lg text-navy-foreground/80 text-center max-w-2xl mx-auto">
              Découvrez nos formules d'abonnement ou offrez une box à vos proches
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center mt-8">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-1">
                <div className="flex gap-2">
                  <Link
                    to="/nos-box/commande"
                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
                      !isGiftPage
                        ? "bg-yellow text-yellow-foreground shadow-lg"
                        : "text-navy-foreground/80 hover:bg-background/20"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    S'abonner
                  </Link>
                  <Link
                    to="/nos-box/cadeau"
                    className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
                      isGiftPage
                        ? "bg-yellow text-yellow-foreground shadow-lg"
                        : "text-navy-foreground/80 hover:bg-background/20"
                    }`}
                  >
                    <Gift className="w-5 h-5" />
                    Offrir une box
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <main className="py-16 px-6">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NosBox;
