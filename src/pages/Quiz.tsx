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
  tags: string[];
  allowCustomInput?: boolean; // Pour permettre un champ texte libre
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
    correctAnswer: 0,
    explanation: "Nous adaptons nos box selon vos besoins alimentaires pour garantir votre plaisir sans compromis.",
    tags: ["aucune", "lactose", "noix", "autre"],
    allowCustomInput: true
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
    correctAnswer: 3,
    explanation: "Nos yaourts artisanaux sont préparés avec soin et proposés dans une variété de saveurs délicieuses.",
    tags: ["nature", "fruits", "saveurs", "assortiment"]
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
    correctAnswer: 2,
    explanation: "Les fruits lyophilisés conservent toutes leurs saveurs et nutriments, parfaits pour accompagner vos produits laitiers.",
    tags: ["oui_lyophilise", "yaourt_topping", "decouverte", "non_lyophilise"]
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
    correctAnswer: 3,
    explanation: "Nos fromages artisanaux du terroir québécois offrent une palette de saveurs authentiques.",
    tags: ["doux", "affine", "bleu", "tous_fromages"]
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
    correctAnswer: 0,
    explanation: "Notre lait d'antan est produit de façon traditionnelle pour un goût authentique incomparable.",
    tags: ["oui_lait", "cuisine_lait", "decouverte_lait", "non_lait"]
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
    correctAnswer: 0,
    explanation: "Nos chocolats artisanaux sont fabriqués localement avec des ingrédients de qualité supérieure.",
    tags: ["oui_chocolat", "peu_chocolat", "noir_uniquement", "non_chocolat"]
  }
];

const boxRecommendations: BoxRecommendation[] = [
  {
    name: "Box Découverte Gourmande",
    description: "Un assortiment complet pour découvrir tous nos produits",
    products: ["3 yaourts avec saveurs", "1 fromage artisanal", "Fruits lyophilisés", "1 chocolat artisanal"],
    price: "45$",
    matchScore: 0
  },
  {
    name: "Box Laitière Traditionnelle",
    description: "Focus sur nos produits laitiers d'exception",
    products: ["4 yaourts saveurs variées", "1 lait d'antan", "2 fromages artisanaux", "Fruits lyophilisés"],
    price: "55$",
    matchScore: 0
  },
  {
    name: "Box Plaisir Sucré",
    description: "Pour les amateurs de douceurs artisanales",
    products: ["3 yaourts aux fruits", "2 chocolats artisanaux", "Fruits lyophilisés", "1 fromage doux"],
    price: "50$",
    matchScore: 0
  },
  {
    name: "Box Complète du Terroir",
    description: "Notre sélection la plus complète",
    products: ["5 yaourts variés", "2 fromages affinés", "1 lait d'antan", "2 chocolats", "Fruits lyophilisés"],
    price: "75$",
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
      setShowCustomInput(false);
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
    setCustomInputs({});
    setShowCustomInput(false);
  };

  const getRecommendations = (): BoxRecommendation[] => {
    const recommendations = boxRecommendations.map(box => ({ ...box }));
    
    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedTag = question.tags[answerIndex];
      
      // Algorithme de scoring basé sur les tags
      recommendations.forEach(box => {
        // Préférences yaourts
        if (selectedTag === "saveurs" || selectedTag === "assortiment") {
          if (box.name.includes("Découverte") || box.name.includes("Complète")) {
            box.matchScore += 3;
          }
        }
        if (selectedTag === "fruits") {
          if (box.name.includes("Plaisir")) {
            box.matchScore += 2;
          }
        }
        
        // Fruits lyophilisés
        if (selectedTag === "oui_lyophilise" || selectedTag === "yaourt_topping") {
          box.matchScore += 2; // Toutes les box en contiennent
        }
        
        // Fromages
        if (selectedTag === "tous_fromages" || selectedTag === "affine") {
          if (box.name.includes("Complète") || box.name.includes("Laitière")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "doux") {
          if (box.name.includes("Plaisir") || box.name.includes("Découverte")) {
            box.matchScore += 2;
          }
        }
        
        // Lait d'antan
        if (selectedTag === "oui_lait" || selectedTag === "cuisine_lait") {
          if (box.name.includes("Laitière") || box.name.includes("Complète")) {
            box.matchScore += 3;
          }
        }
        
        // Chocolat
        if (selectedTag === "oui_chocolat") {
          if (box.name.includes("Plaisir") || box.name.includes("Complète")) {
            box.matchScore += 2;
          }
        }
        if (selectedTag === "peu_chocolat") {
          if (box.name.includes("Découverte")) {
            box.matchScore += 2;
          }
        }
        
        // Pas de lactose - privilégier boxes avec alternatives
        if (selectedTag === "lactose") {
          box.matchScore -= 1;
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
