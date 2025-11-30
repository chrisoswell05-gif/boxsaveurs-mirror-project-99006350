import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuizIntroSection = () => {
  return (
    <section id="quiz-intro" className="bg-gradient-to-b from-background to-muted py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quelle Box est Faite Pour Vous ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Répondez à notre quiz pour découvrir la box idéale selon vos goûts, 
            vos besoins et vos préférences alimentaires
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 bg-card border-2 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Pourquoi faire le quiz ?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Recommandations personnalisées</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des suggestions adaptées à vos préférences
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Allergies prises en compte</p>
                      <p className="text-sm text-muted-foreground">
                        Indiquez vos allergies pour des box adaptées
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Format idéal</p>
                      <p className="text-sm text-muted-foreground">
                        Trouvez la taille et la fréquence qui vous conviennent
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Rapide et amusant</p>
                      <p className="text-sm text-muted-foreground">
                        Seulement 6 questions, 2 minutes chrono !
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧀</div>
                  <p className="text-lg font-semibold text-foreground mb-2">
                    6 questions simples
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pour trouver votre box idéale
                  </p>
                </div>
                
                <Link to="/quiz" className="w-full">
                  <Button 
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Commencer le Quiz
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center">
                  ⏱️ Moins de 2 minutes • 🎯 Résultats personnalisés
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Ou{" "}
            <a 
              href="#offrir" 
              className="text-primary hover:underline font-semibold"
            >
              passez directement aux offres
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizIntroSection;
