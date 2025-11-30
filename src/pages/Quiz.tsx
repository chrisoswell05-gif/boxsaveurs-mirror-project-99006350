import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import quizAllergies from "@/assets/quiz-allergies.jpg";
import quizYaourts from "@/assets/quiz-yaourts.jpg";
import quizFruitsLyophilises from "@/assets/quiz-fruits-lyophilises.jpg";
import quizFromages from "@/assets/quiz-fromages.jpg";
import quizLait from "@/assets/quiz-lait.jpg";
import quizChocolat from "@/assets/quiz-chocolat.jpg";

interface Question {
  id: number;
  question: string;
  options: string[];
  explanation: string;
  tags: string[];
  allowCustomInput?: boolean;
  image?: string;
}

interface BoxRecommendation {
  name: string;
  description: string;
  products: string[];
  price: string;
  matchScore: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Avez-vous des allergies ou intolérances alimentaires ?",
    options: [
      "Aucune allergie",
      "Intolérance au lactose",
      "Allergie aux noix ou fruits à coque",
      "Autre allergie (préciser ci-dessous)"
    ],
    explanation: "Nous adaptons nos box selon vos besoins alimentaires pour garantir votre plaisir sans compromis.",
    tags: ["aucune", "lactose", "noix", "autre"],
    allowCustomInput: true,
    image: quizAllergies
  },
  {
    id: 2,
    question: "Quels types de yaourts préférez-vous ?",
    options: [
      "Yaourts nature classiques",
      "Yaourts aux fruits",
      "Yaourts avec saveurs variées (vanille, caramel, etc.)",
      "Un assortiment de tous les types"
    ],
    explanation: "Nos yaourts artisanaux sont préparés avec soin et proposés dans une variété de saveurs délicieuses.",
    tags: ["nature", "fruits", "saveurs", "assortiment"],
    image: quizYaourts
  },
  {
    id: 3,
    question: "Êtes-vous intéressé par les fruits lyophilisés ?",
    options: [
      "Oui, j'adore les fruits lyophilisés",
      "Oui, pour les ajouter à mes yaourts",
      "Peut-être, je veux découvrir",
      "Non, je préfère les fruits frais"
    ],
    explanation: "Les fruits lyophilisés conservent toutes leurs saveurs et nutriments, parfaits pour accompagner vos produits laitiers.",
    tags: ["oui_lyophilise", "yaourt_topping", "decouverte", "non_lyophilise"],
    image: quizFruitsLyophilises
  },
  {
    id: 4,
    question: "Quel type de fromage vous intéresse ?",
    options: [
      "Fromages doux (type brie, camembert)",
      "Fromages affinés (type cheddar, comté)",
      "Fromages à pâte persillée (bleus)",
      "Tous types de fromages artisanaux"
    ],
    explanation: "Nos fromages artisanaux du terroir québécois offrent une palette de saveurs authentiques.",
    tags: ["doux", "affine", "bleu", "tous_fromages"],
    image: quizFromages
  },
  {
    id: 5,
    question: "Seriez-vous intéressé par le lait d'antan traditionnel ?",
    options: [
      "Oui, j'aime le lait traditionnel",
      "Oui, pour cuisiner et faire des recettes",
      "Je veux découvrir la différence",
      "Non, je ne consomme pas de lait"
    ],
    explanation: "Notre lait d'antan est produit de façon traditionnelle pour un goût authentique incomparable.",
    tags: ["oui_lait", "cuisine_lait", "decouverte_lait", "non_lait"],
    image: quizLait
  },
  {
    id: 6,
    question: "Aimez-vous le chocolat artisanal dans votre box ?",
    options: [
      "Oui, j'adore le chocolat !",
      "Oui, mais en petite quantité",
      "Uniquement du chocolat noir",
      "Non, je préfère d'autres produits"
    ],
    explanation: "Nos chocolats artisanaux sont fabriqués localement avec des ingrédients de qualité supérieure.",
    tags: ["oui_chocolat", "peu_chocolat", "noir_uniquement", "non_chocolat"],
    image: quizChocolat
  }
];

const boxRecommendations: BoxRecommendation[] = [
  {
    name: "LA BASE DU GOÛT",
    description: "Box bimensuel sans engagement - Parfaite pour découvrir nos produits",
    products: ["3 produits artisanaux inclus", "Yaourts avec saveurs", "Fromages du terroir", "Livraison offerte"],
    price: "39.90€",
    matchScore: 0
  },
  {
    name: "SAVEURS CACHÉES",
    description: "Box mensuel avec engagement 3 mois - Pour les amateurs réguliers",
    products: ["3 produits artisanaux inclus", "Sélection mensuelle variée", "Découverte de nouvelles saveurs", "Livraison offerte"],
    price: "39.90€",
    matchScore: 0
  },
  {
    name: "L'ANNÉE GOURMANDE",
    description: "Box mensuel avec engagement 12 mois - Pour les vrais passionnés",
    products: ["3 produits artisanaux inclus", "Engagement sur l'année", "Meilleur rapport qualité-prix", "Livraison offerte"],
    price: "39.90€",
    matchScore: 0
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(questions.length).fill(false));
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [customInputs, setCustomInputs] = useState<{[key: number]: string}>({});
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    // Vérifier si c'est une option "Autre" qui nécessite un champ personnalisé
    const currentQ = questions[currentQuestion];
    const isLastOption = answerIndex === currentQ.options.length - 1;
    const hasCustomInput = currentQ.allowCustomInput;
    
    if (hasCustomInput && isLastOption) {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
    
    // Enregistrer la réponse de l'utilisateur
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowCustomInput(false);
    } else {
      saveQuizResponses();
      setShowResult(true);
    }
  };

  const saveQuizResponses = async () => {
    try {
      const recommendations = getRecommendations();
      const topBox = recommendations[0];
      
      const response = {
        allergies: questions[0].options[userAnswers[0]],
        custom_allergies: customInputs[0] || null,
        yaourt_preference: questions[1].options[userAnswers[1]],
        fruits_lyophilises: questions[2].options[userAnswers[2]],
        fromage_preference: questions[3].options[userAnswers[3]],
        lait_preference: questions[4].options[userAnswers[4]],
        chocolat_preference: questions[5].options[userAnswers[5]],
        score: null,
        recommended_box: topBox.name,
        user_agent: navigator.userAgent
      };

      const { error } = await supabase
        .from('quiz_responses')
        .insert([response]);

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions(Array(questions.length).fill(false));
    setUserAnswers([]);
    setCustomInputs({});
    setShowCustomInput(false);
  };

  const getRecommendations = (): BoxRecommendation[] => {
    const recommendations = boxRecommendations.map(box => ({ ...box }));
    
    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedTag = question.tags[answerIndex];
      
      // Algorithme de scoring basé sur les tags et préférences
      recommendations.forEach(box => {
        // Box bimensuelle (LA BASE DU GOÛT) - pour découverte sans engagement
        if (box.name.includes("LA BASE")) {
          if (selectedTag === "decouverte" || selectedTag === "non_lyophilise" || selectedTag === "non_lait" || selectedTag === "non_chocolat") {
            box.matchScore += 3;
          }
          if (selectedTag === "aucune") {
            box.matchScore += 2;
          }
        }
        
        // Box mensuelle 3 mois (SAVEURS CACHÉES) - pour amateurs réguliers
        if (box.name.includes("SAVEURS CACHÉES")) {
          if (selectedTag === "assortiment" || selectedTag === "yaourt_topping" || selectedTag === "tous_fromages") {
            box.matchScore += 3;
          }
          if (selectedTag === "oui_lyophilise" || selectedTag === "saveurs" || selectedTag === "fruits") {
            box.matchScore += 2;
          }
          if (selectedTag === "aucune") {
            box.matchScore += 2;
          }
        }
        
        // Box annuelle (L'ANNÉE GOURMANDE) - pour passionnés engagés
        if (box.name.includes("L'ANNÉE")) {
          if (selectedTag === "oui_chocolat" || selectedTag === "oui_lait" || selectedTag === "cuisine_lait") {
            box.matchScore += 3;
          }
          if (selectedTag === "affine" || selectedTag === "decouverte_lait") {
            box.matchScore += 2;
          }
          if (selectedTag === "aucune") {
            box.matchScore += 2;
          }
        }
        
        // Pénalité pour intolérances/allergies
        if (selectedTag === "lactose" || selectedTag === "noix") {
          box.matchScore -= 1;
        }
      });
    });
    
    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  };

  const getScoreMessage = () => {
    return "Merci pour vos réponses ! Voici nos recommandations personnalisées selon vos préférences.";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Trouvez Votre Box Idéale
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Répondez à quelques questions pour recevoir des recommandations personnalisées
          </p>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8">
                  {questions[currentQuestion].image && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={questions[currentQuestion].image}
                        alt={questions[currentQuestion].question}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion + 1} sur {questions.length}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-6">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-8 text-foreground">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="space-y-4 mb-8">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                          selectedAnswer === null
                            ? "border-border hover:border-primary hover:bg-primary/5"
                            : selectedAnswer === index
                            ? "border-primary bg-primary/10"
                            : "border-border opacity-50"
                        }`}
                        whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      >
                        <span className="font-medium">{option}</span>
                      </motion.button>
                    ))}
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-muted rounded-lg"
                    >
                      <p className="text-sm text-muted-foreground">
                        {questions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}

                  {showCustomInput && selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Veuillez préciser votre allergie :
                      </label>
                      <input
                        type="text"
                        value={customInputs[currentQuestion] || ""}
                        onChange={(e) => {
                          const newInputs = {...customInputs};
                          newInputs[currentQuestion] = e.target.value;
                          setCustomInputs(newInputs);
                        }}
                        placeholder="Décrivez votre allergie alimentaire..."
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        maxLength={200}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum 200 caractères
                      </p>
                    </motion.div>
                  )}

                  {selectedAnswer !== null && (
                    <Button
                      onClick={handleNext}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {currentQuestion < questions.length - 1 ? "Question suivante" : "Voir les résultats"}
                    </Button>
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div className="text-6xl mb-6">
                      🧀
                    </div>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Vos recommandations personnalisées
                  </h2>
                  
                  <p className="text-xl mb-8 text-muted-foreground">
                    {getScoreMessage()}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">
                      Nos recommandations pour vous
                    </h3>
                    
                    {Object.keys(customInputs).length > 0 && (
                      <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="text-accent">⚠️</span> Vos allergies alimentaires :
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(customInputs).map(([questionIndex, value]) => (
                            value && (
                              <p key={questionIndex} className="text-sm text-muted-foreground">
                                • {value}
                              </p>
                            )
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          Nous prendrons en compte vos allergies lors de la préparation de votre box
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {getRecommendations().slice(0, 3).map((box, index) => (
                        <motion.div
                          key={box.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`p-6 rounded-lg border-2 ${
                            index === 0
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                                {box.name}
                                {index === 0 && (
                                  <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">
                                    Meilleur match
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {box.description}
                              </p>
                            </div>
                            <span className="text-2xl font-bold text-primary">
                              {box.price}
                            </span>
                          </div>
                          <div className="space-y-2 mb-4">
                            {box.products.map((product, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                <span className="text-sm text-foreground">{product}</span>
                              </div>
                            ))}
                          </div>
                          {index === 0 && (
                            <Button
                              onClick={() => window.location.href = "/#offrir"}
                              className="w-full bg-primary hover:bg-primary/90"
                            >
                              Commander cette box
                            </Button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="w-full"
                    >
                      Recommencer le quiz
                    </Button>
                    <Button
                      onClick={() => window.location.href = "/#offrir"}
                      variant="outline"
                      className="w-full"
                    >
                      Voir toutes nos box
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
