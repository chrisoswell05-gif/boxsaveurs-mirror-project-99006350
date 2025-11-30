import heroBackground from "@/assets/hero-background.png";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/70 to-navy/60 z-10" />
        <img 
          src={heroBackground} 
          alt="Box Saveurs de Ferme avec produits artisanaux" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Authenticité, Plaisir, Découverte
          </h1>
          <p className="text-3xl md:text-4xl text-yellow font-semibold mb-4 drop-shadow-lg">
            Chaque box, une nouvelle expérience gourmande
          </p>
          <p className="text-2xl text-white mb-8 drop-shadow-lg">
            Découvrez nos produits fermiers authentiques<br />
            <span className="text-3xl font-bold text-yellow">À partir de 24,99$/mois</span>
          </p>
          <div className="flex gap-4">
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
              J'essaie
            </Button>
            <Button className="bg-yellow text-yellow-foreground hover:bg-yellow/90 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
              J'offre
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
