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
    question: "Avez-vous des allergies ou intolérances aux produits laitiers ?",
    options: [
      "Aucune allergie",
      "Intolérance au lactose",
      "Allergie aux produits laitiers de vache",
      "Autre (préciser ci-dessous)"
    ],
    correctAnswer: 0,
    explanation: "Nous adaptons nos box selon vos besoins alimentaires pour garantir votre plaisir sans compromis.",
    tags: ["aucune", "lactose", "vache", "autre"],
    allowCustomInput: true
  },
  {
    id: 2,
    question: "Avez-vous des allergies à certains fruits (souvent présents dans les confitures et accompagnements) ?",
    options: [
      "Aucune allergie aux fruits",
      "Allergie aux fruits à coque (noix, amandes, noisettes)",
      "Allergie aux fruits rouges (fraises, framboises)",
      "Autre allergie aux fruits (préciser ci-dessous)"
    ],
    correctAnswer: 0,
    explanation: "Certaines de nos box peuvent contenir des confitures ou accompagnements aux fruits. Nous prenons en compte vos allergies.",
    tags: ["aucune_fruits", "noix", "fruits_rouges", "autre_fruits"],
    allowCustomInput: true
  },
  {
    id: 3,
    question: "Quel type de fromage préférez-vous dans votre box ?",
    options: [
      "Fromages doux et crémeux",
      "Fromages corsés et affinés",
      "Fromages persillés (bleus)",
      "Un mélange de tous les types"
    ],
    correctAnswer: 3,
    explanation: "Nous composons nos box avec une variété équilibrée selon vos préférences.",
    tags: ["doux", "corse", "bleu", "variete"]
  },
  {
    id: 4,
    question: "Quelle taille de box vous conviendrait le mieux ?",
    options: [
      "Petite box (2-3 fromages) - Pour découvrir",
      "Box moyenne (4-5 fromages) - Pour partager",
      "Grande box (6+ fromages) - Pour les gourmands",
      "Je ne sais pas encore"
    ],
    correctAnswer: 1,
    explanation: "Nous proposons différents formats adaptés à chaque besoin et occasion.",
    tags: ["petite", "moyenne", "grande", "flexible"]
  },
  {
    id: 5,
    question: "Quelle fréquence de livraison préférez-vous ?",
    options: [
      "Une fois par mois",
      "Tous les deux mois",
      "Livraison unique (cadeau)",
      "Je verrai selon mes besoins"
    ],
    correctAnswer: 0,
    explanation: "Nos abonnements sont flexibles et s'adaptent à votre rythme de consommation.",
    tags: ["mensuel", "bimensuel", "unique", "flexible"]
  },
  {
    id: 6,
    question: "Pour quelle occasion souhaitez-vous cette box ?",
    options: [
      "Consommation personnelle régulière",
      "Cadeau pour un proche",
      "Recevoir des invités",
      "Découvrir les produits du terroir"
    ],
    correctAnswer: 0,
    explanation: "Chaque box est soigneusement préparée pour s'adapter à toutes vos occasions.",
    tags: ["personnel", "cadeau", "reception", "decouverte"]
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
        // Taille de box
        if (selectedTag === "petite" && box.name.includes("Découverte")) {
          box.matchScore += 3;
        }
        if (selectedTag === "moyenne" && box.name.includes("Surprise")) {
          box.matchScore += 3;
        }
        if (selectedTag === "grande" && box.name.includes("Gourmande")) {
          box.matchScore += 3;
        }
        
        // Type de fromages
        if (selectedTag === "doux" && box.name.includes("Découverte")) {
          box.matchScore += 2;
        }
        if (selectedTag === "corse" && box.name.includes("Gourmande")) {
          box.matchScore += 2;
        }
        if (selectedTag === "variete" || selectedTag === "flexible") {
          if (box.name.includes("Surprise")) {
            box.matchScore += 2;
          }
        }
        
        // Occasion
        if (selectedTag === "cadeau") {
          if (box.name.includes("Cadeau") || box.name.includes("Saveurs")) {
            box.matchScore += 3;
          }
        }
        if (selectedTag === "reception" && box.name.includes("Prestige")) {
          box.matchScore += 2;
        }
        if (selectedTag === "personnel" || selectedTag === "decouverte") {
          box.matchScore += 1;
        }
        
        // Fréquence
        if (selectedTag === "unique" && box.name.includes("Cadeau")) {
          box.matchScore += 2;
        }
        if (selectedTag === "mensuel" || selectedTag === "bimensuel") {
          if (box.name.includes("Surprise") || box.name.includes("Découverte")) {
            box.matchScore += 2;
          }
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
