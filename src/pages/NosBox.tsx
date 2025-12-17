import { Outlet, Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Gift, Package, Sparkles, Mail, Star, Snowflake } from "lucide-react";
import heroBox from "@/assets/hero-box.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const NosBox = () => {
  const location = useLocation();
  const isGiftPage = location.pathname.includes("/cadeau");

  const bannerItems = [
    { text: "contact@boxsaveursdeferme.ca", icon: Mail },
    { text: "+30 avis", icon: Star },
    { text: "Fraîcheur garantie", icon: Snowflake }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Scrolling Banner */}
      <div className="bg-yellow text-yellow-foreground py-2 overflow-hidden">
        <div className="relative flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {bannerItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <span key={index} className="flex items-center">
                      <span className="px-8 text-sm font-medium flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {item.text}
                      </span>
                      <span className="text-yellow-foreground/60">•</span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hero Banner Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src={heroBox} 
            alt="Nos Box" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/90" />
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-20 -right-20 w-96 h-96 bg-yellow/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto relative z-10 px-6 py-20">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow" />
              <span className="text-yellow font-medium text-sm uppercase tracking-widest">
                Produits artisanaux
              </span>
              <Sparkles className="w-5 h-5 text-yellow" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-foreground text-center mb-6">
              Nos Box Saveurs de Ferme
            </h1>
            <p className="text-lg md:text-xl text-navy-foreground/80 text-center max-w-2xl mx-auto leading-relaxed">
              Découvrez nos formules d'abonnement ou offrez une box gourmande à vos proches
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex justify-center mt-10">
              <div className="bg-background/10 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-xl">
                <div className="flex gap-2">
                  <a
                    href="https://boxsaveursdeferme.com/products/box-par-abonnement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      !isGiftPage
                        ? "bg-yellow text-yellow-foreground shadow-yellow"
                        : "text-navy-foreground/90 hover:bg-white/10"
                    }`}
                  >
                    <Package className={`w-5 h-5 transition-transform duration-300 ${!isGiftPage ? "" : "group-hover:scale-110"}`} />
                    <span>S'abonner</span>
                    {!isGiftPage && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-yellow/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </a>
                  <Link
                    to="/nos-box/cadeau"
                    className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isGiftPage
                        ? "bg-yellow text-yellow-foreground shadow-yellow"
                        : "text-navy-foreground/90 hover:bg-white/10"
                    }`}
                  >
                    <Gift className={`w-5 h-5 transition-transform duration-300 ${isGiftPage ? "" : "group-hover:scale-110"}`} />
                    <span>Offrir une box</span>
                    {isGiftPage && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-yellow/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
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