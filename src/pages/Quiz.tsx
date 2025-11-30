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
    explanation: "Nos produits sont 100% locaux et artisanaux, directement des fermes du Québec."
  },
  {
    id: 2,
    question: "À quelle fréquence recevez-vous une nouvelle box ?",
    options: [
      "Chaque semaine",
      "Tous les 3 mois",
      "Chaque mois",
      "À la demande"
    ],
    correctAnswer: 2,
    explanation: "Vous recevez une nouvelle box gourmande chaque mois avec des produits différents."
  },
  {
    id: 3,
    question: "Quel type de produits peut-on trouver dans une box ?",
    options: [
      "Seulement des légumes",
      "Seulement des produits laitiers",
      "Fromages, confitures, miel, et plus",
      "Seulement des viandes"
    ],
    correctAnswer: 2,
    explanation: "Chaque box contient une variété de produits : fromages, confitures, miel, et bien d'autres délices artisanaux."
  },
  {
    id: 4,
    question: "Quel est l'avantage principal de s'abonner ?",
    options: [
      "Prix réduit permanent",
      "Découverte mensuelle sans engagement",
      "Livraison gratuite à vie",
      "Double quantité de produits"
    ],
    correctAnswer: 1,
    explanation: "L'abonnement vous permet de découvrir de nouveaux produits chaque mois sans engagement à long terme."
  },
  {
    id: 5,
    question: "D'où proviennent les produits de la box ?",
    options: [
      "Europe",
      "États-Unis",
      "Fermes locales du Québec",
      "Asie"
    ],
    correctAnswer: 2,
    explanation: "Tous nos produits proviennent de fermes locales du Québec pour garantir fraîcheur et qualité."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
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
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Découvrir nos box
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
