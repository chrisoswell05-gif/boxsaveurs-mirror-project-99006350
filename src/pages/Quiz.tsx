import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[]; // Tags pour la recommandation
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
    question: "Quelle est votre connaissance des fromages artisanaux du Québec ?",
    options: [
      "Expert - Je connais bien les fromageries locales",
      "Amateur - J'aime découvrir de nouveaux fromages",
      "Débutant - Je commence à m'y intéresser",
      "Curieux - Je veux tout découvrir"
    ],
    correctAnswer: 1,
    explanation: "Nos box sont parfaites pour tous les niveaux de connaisseurs de fromages.",
    tags: ["expert", "amateur", "debutant", "decouverte"]
  },
  {
    id: 2,
    question: "Quel type de fromage préférez-vous ?",
    options: [
      "Fromages à pâte molle (Brie, Camembert)",
      "Fromages à pâte ferme (Cheddar, Gouda)",
      "Fromages à pâte persillée (Bleu, Roquefort)",
      "Un assortiment varié de tous les types"
    ],
    correctAnswer: 3,
    explanation: "Nos box offrent une belle variété de fromages pour satisfaire tous les goûts.",
    tags: ["molle", "ferme", "bleu", "variete"]
  },
  {
    id: 3,
    question: "Qu'est-ce qui vous attire le plus dans les produits laitiers artisanaux ?",
    options: [
      "Le goût authentique et unique",
      "La provenance locale et traçable",
      "La découverte de nouvelles saveurs",
      "La qualité supérieure des produits"
    ],
    correctAnswer: 0,
    explanation: "Nos fromages artisanaux allient authenticité, traçabilité et qualité exceptionnelle.",
    tags: ["authenticite", "tracabilite", "decouverte", "qualite"]
  },
  {
    id: 4,
    question: "Quelle quantité de fromage consommez-vous habituellement ?",
    options: [
      "Petit format - Pour découvrir plusieurs variétés",
      "Format généreux - Pour partager en famille",
      "Format dégustation - Pour des occasions spéciales",
      "Selon mes envies du moment"
    ],
    correctAnswer: 3,
    explanation: "Nous proposons différents formats de box pour répondre à tous les besoins.",
    tags: ["decouverte", "famille", "occasion", "flexible"]
  },
  {
    id: 5,
    question: "Comment comptez-vous déguster nos fromages ?",
    options: [
      "En plateau pour l'apéro entre amis",
      "Dans mes recettes du quotidien",
      "Pour offrir en cadeau gourmand",
      "Toutes ces occasions"
    ],
    correctAnswer: 3,
    explanation: "Nos fromages se prêtent parfaitement à toutes vos occasions de dégustation.",
    tags: ["aperitif", "cuisine", "cadeau", "polyvalent"]
  }
];

const boxRecommendations: BoxRecommendation[] = [
  {
    name: "Box Découverte Fromagère",
    description: "Parfaite pour découvrir la diversité de nos fromages artisanaux",
    products: ["4 fromages artisanaux variés", "1 beurre de ferme", "1 crème fraîche", "Guide de dégustation"],
    price: "45$",
    matchScore: 0
  },
  {
    name: "Box Gourmande Prestige",
    description: "Pour les vrais connaisseurs de fromages d'exception",
    products: ["5 fromages affinés premium", "1 yogourt artisanal", "1 fromage frais aux herbes", "Accompagnements suggérés"],
    price: "75$",
    matchScore: 0
  },
  {
    name: "Box Cadeau Saveurs Lactées",
    description: "Une sélection raffinée de nos meilleurs produits laitiers",
    products: ["4 fromages signature", "1 beurre d'exception", "1 crème épaisse", "Emballage cadeau soigné"],
    price: "65$",
    matchScore: 0
  },
  {
    name: "Box Surprise du Fromager",
    description: "Laissez-vous surprendre par la sélection du mois de notre maître fromager",
    products: ["Sélection mensuelle de fromages", "Produits laitiers de saison", "Nouveautés exclusives de nos fermes"],
    price: "55$",
    matchScore: 0
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(questions.length).fill(false));
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    // Enregistrer la réponse de l'utilisateur
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(Array(questions.length).fill(false));
    setUserAnswers([]);
  };

  const getRecommendations = (): BoxRecommendation[] => {
    const recommendations = boxRecommendations.map(box => ({ ...box }));
    
    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedTag = question.tags[answerIndex];
      
      // Algorithme de scoring basé sur les tags
      recommendations.forEach(box => {
        if (selectedTag === "variete" || selectedTag === "polyvalent" || selectedTag === "flexible") {
          if (box.name.includes("Découverte") || box.name.includes("Surprise")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "famille" || selectedTag === "occasion" || selectedTag === "expert") {
          if (box.name.includes("Gourmande") || box.name.includes("Prestige")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "cadeau" || selectedTag === "aperitif") {
          if (box.name.includes("Cadeau") || box.name.includes("Saveurs")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "decouverte" || selectedTag === "amateur") {
          if (box.name.includes("Surprise") || box.name.includes("Fromager")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "authenticite" || selectedTag === "qualite" || selectedTag === "tracabilite") {
          box.matchScore += 1;
        }
      });
    });
    
    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Parfait ! Vous êtes un expert des produits du terroir ! 🌟";
    if (percentage >= 80) return "Excellent ! Vous connaissez bien nos produits ! 🎉";
    if (percentage >= 60) return "Bien joué ! Vous êtes sur la bonne voie ! 👍";
    return "Pas mal ! Découvrez nos box pour en apprendre plus ! 📦";
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
            Quiz Saveurs de Ferme
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Testez vos connaissances sur nos produits artisanaux du Québec
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
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion + 1} sur {questions.length}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        Score: {score}/{answeredQuestions.filter(Boolean).length}
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
                            ? index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                              : "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : index === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : "border-border opacity-50"
                        }`}
                        whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {selectedAnswer !== null && (
                            <>
                              {index === questions[currentQuestion].correctAnswer && (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              )}
                              {selectedAnswer === index &&
                                index !== questions[currentQuestion].correctAnswer && (
                                  <XCircle className="w-6 h-6 text-red-600" />
                                )}
                            </>
                          )}
                        </div>
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
                      {score === questions.length ? "🏆" : score >= 4 ? "🎉" : "📦"}
                    </div>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Quiz terminé !
                  </h2>
                  
                  <div className="text-5xl font-bold text-primary mb-4">
                    {score}/{questions.length}
                  </div>
                  
                  <p className="text-xl mb-8 text-muted-foreground">
                    {getScoreMessage()}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">
                      Nos recommandations pour vous
                    </h3>
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
