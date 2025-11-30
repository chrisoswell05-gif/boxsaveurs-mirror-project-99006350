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
    question: "Quelle est la principale caractéristique des produits Saveurs de Ferme ?",
    options: [
      "Produits importés",
      "Produits locaux et artisanaux",
      "Produits industriels",
      "Produits surgelés"
    ],
    correctAnswer: 1,
    explanation: "Nos produits sont 100% locaux et artisanaux, directement des fermes du Québec.",
    tags: ["local", "artisanal", "qualite"]
  },
  {
    id: 2,
    question: "Quel type de produits préférez-vous découvrir ?",
    options: [
      "Fromages et produits laitiers",
      "Confitures et produits sucrés",
      "Viandes et charcuteries",
      "Un peu de tout"
    ],
    correctAnswer: 3,
    explanation: "Nos box offrent une variété équilibrée de tous ces délices du terroir.",
    tags: ["fromages", "sucre", "viandes", "variete"]
  },
  {
    id: 3,
    question: "Quelle est votre priorité lors du choix de produits ?",
    options: [
      "Le goût authentique",
      "La traçabilité et l'origine",
      "La découverte de nouveautés",
      "Le rapport qualité-prix"
    ],
    correctAnswer: 0,
    explanation: "Nos produits privilégient le goût authentique, directement de nos producteurs passionnés.",
    tags: ["authenticite", "tracabilite", "decouverte", "prix"]
  },
  {
    id: 4,
    question: "Quel format de box vous intéresse le plus ?",
    options: [
      "Box découverte (petite quantité, grande variété)",
      "Box gourmande (quantités généreuses)",
      "Box thématique (focus sur un type de produit)",
      "Box surprise (sélection du chef)"
    ],
    correctAnswer: 3,
    explanation: "Nous proposons différents formats pour répondre à tous les besoins.",
    tags: ["decouverte", "gourmande", "thematique", "surprise"]
  },
  {
    id: 5,
    question: "Pour quelle occasion souhaitez-vous utiliser la box ?",
    options: [
      "Consommation personnelle régulière",
      "Offrir en cadeau",
      "Recevoir des invités",
      "Toutes ces occasions"
    ],
    correctAnswer: 3,
    explanation: "Nos box sont parfaites pour toutes les occasions grâce à leur présentation soignée.",
    tags: ["personnel", "cadeau", "reception", "polyvalent"]
  }
];

const boxRecommendations: BoxRecommendation[] = [
  {
    name: "Box Découverte du Terroir",
    description: "Parfaite pour découvrir la diversité de nos producteurs locaux",
    products: ["3 fromages artisanaux", "2 confitures maison", "1 miel local", "1 charcuterie"],
    price: "45$",
    matchScore: 0
  },
  {
    name: "Box Gourmande Premium",
    description: "Pour les vrais amateurs de produits d'exception",
    products: ["5 fromages affinés", "3 terrines artisanales", "2 miels rares", "1 bouteille de cidre"],
    price: "75$",
    matchScore: 0
  },
  {
    name: "Box Cadeau Prestige",
    description: "Une sélection raffinée pour faire plaisir",
    products: ["Panier cadeau", "4 fromages premium", "3 confitures artisanales", "1 sirop d'érable"],
    price: "65$",
    matchScore: 0
  },
  {
    name: "Box Surprise du Chef",
    description: "Laissez-vous surprendre par notre sélection mensuelle",
    products: ["Sélection variée du mois", "Produits de saison", "Nouveautés exclusives"],
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
        if (selectedTag === "variete" || selectedTag === "polyvalent") {
          if (box.name.includes("Découverte") || box.name.includes("Surprise")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "gourmande" || selectedTag === "reception") {
          if (box.name.includes("Gourmande") || box.name.includes("Premium")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "cadeau") {
          if (box.name.includes("Cadeau") || box.name.includes("Prestige")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "decouverte" || selectedTag === "surprise") {
          if (box.name.includes("Surprise")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "authenticite" || selectedTag === "local") {
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
