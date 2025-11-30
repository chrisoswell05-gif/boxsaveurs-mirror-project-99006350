import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingDown, Coins } from "lucide-react";

const SavingsCalculator = () => {
  const monthlyPrice = 34.99;
  const yearlyPrice = 24.99;
  const monthsInYear = 12;
  
  const monthlyCost = monthlyPrice * monthsInYear;
  const yearlyCost = yearlyPrice * monthsInYear;
  const savings = monthlyCost - yearlyCost;
  const percentageSaved = Math.round((savings / monthlyCost) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-16"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-yellow/10 to-navy/5 border-yellow/20 shadow-lg">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow/20 rounded-full">
              <Coins className="w-6 h-6 text-yellow-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Calculateur d'économies annuelles
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Sans engagement */}
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Sans engagement</p>
              <p className="text-lg font-semibold text-foreground">{monthlyPrice}$ × 12 mois</p>
              <motion.p 
                className="text-3xl font-bold text-destructive mt-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {monthlyCost.toFixed(2)}$
              </motion.p>
            </div>

            {/* Arrow indicator */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <TrendingDown className="w-8 h-8 text-yellow" />
                <span className="text-sm font-semibold text-yellow">
                  Économisez
                </span>
              </motion.div>
            </div>

            {/* Formule 12 mois */}
            <div className="text-center p-4 bg-gradient-to-br from-yellow/10 to-navy/10 rounded-lg border-2 border-yellow/30">
              <p className="text-sm text-muted-foreground mb-2">Formule 12 mois</p>
              <p className="text-lg font-semibold text-foreground">{yearlyPrice}$ × 12 mois</p>
              <motion.p 
                className="text-3xl font-bold text-yellow mt-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                {yearlyCost.toFixed(2)}$
              </motion.p>
            </div>
          </div>

          {/* Savings highlight */}
          <motion.div 
            className="text-center p-6 bg-gradient-to-r from-yellow/20 via-yellow/10 to-navy/10 rounded-xl border-2 border-yellow/30"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Votre économie totale
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.p 
                className="text-5xl font-bold text-gradient-yellow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {savings.toFixed(0)}$
              </motion.p>
              <div className="text-left">
                <p className="text-xl font-bold text-yellow">{percentageSaved}%</p>
                <p className="text-sm text-muted-foreground">d'économie</p>
              </div>
            </div>
            <p className="text-sm text-foreground mt-4">
              En choisissant l'engagement 12 mois, vous économisez <span className="font-bold text-yellow">{savings.toFixed(0)}$</span> par an !
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SavingsCalculator;
