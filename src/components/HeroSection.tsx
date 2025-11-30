import heroBox from "@/assets/hero-box.jpg";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <section ref={ref} className="bg-background py-16 px-6 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-6 z-10 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Authenticité, Plaisir, Découverte
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold">
            Chaque box, une nouvelle expérience gourmande
          </p>
          <p className="text-xl text-foreground">
            Une découverte sans engagement<br />
            <span className="text-2xl font-bold">24,99$/mois</span>
          </p>
          <div className="flex gap-4 pt-4">
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              J'essaie
            </Button>
            <Button className="bg-yellow text-yellow-foreground hover:bg-yellow/90 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              J'offre
            </Button>
          </div>
        </motion.div>
        <motion.div 
          style={{ y, opacity }}
          className="relative z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <img 
            src={heroBox} 
            alt="Box Saveurs de Ferme avec produits artisanaux" 
            className="rounded-lg shadow-2xl w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
