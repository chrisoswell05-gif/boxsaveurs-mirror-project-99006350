import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrderDialog } from "@/components/OrderDialog";

interface QuestionOption {
  value: string;
  label: string;
  score: { 
    base: number;
    cachees: number;
    annee: number;
  };
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  allowCustomInput?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Avez-vous des allergies ou intolérances alimentaires liées aux produits laitiers?",
    options: [
      { 
        value: "none", 
        label: "Aucune allergie", 
        score: { base: 2, cachees: 2, annee: 2 } 
      },
      { 
        value: "lactose", 
        label: "Intolérance au lactose", 
        score: { base: 3, cachees: 1, annee: 1 } 
      },
      { 
        value: "nuts", 
        label: "Allergie aux noix ou fruits à coque", 
        score: { base: 2, cachees: 2, annee: 1 } 
      },
      { 
        value: "other", 
        label: "Autre allergie (préciser ci-dessous)", 
        score: { base: 2, cachees: 1, annee: 1 } 
      }
    ],
    allowCustomInput: true
  },
  {
    id: 2,
    question: "À quelle fréquence consommez-vous des produits laitiers?",
    options: [
      { 
        value: "daily", 
        label: "Tous les jours", 
        score: { base: 1, cachees: 2, annee: 3 } 
      },
      { 
        value: "weekly", 
        label: "Plusieurs fois par semaine", 
        score: { base: 2, cachees: 2, annee: 2 } 
      },
      { 
        value: "occasionally", 
        label: "Occasionnellement", 
        score: { base: 3, cachees: 1, annee: 1 } 
      }
    ]
  },
  {
    id: 3,
    question: "Quel type de yaourt préférez-vous?",
    options: [
      { 
        value: "nature", 
        label: "Nature et simple", 
        score: { base: 2, cachees: 2, annee: 2 } 
      },
      { 
        value: "fruity", 
        label: "Aux fruits (mangue, fraise, pêche)", 
        score: { base: 2, cachees: 3, annee: 2 } 
      },
      { 
        value: "maple", 
        label: "À l'érable (saveur du terroir)", 
        score: { base: 1, cachees: 2, annee: 3 } 
      }
    ]
  },
  {
    id: 4,
    question: "Combien de personnes dans votre foyer?",
    options: [
      { 
        value: "1-2", 
        label: "1-2 personnes", 
        score: { base: 3, cachees: 2, annee: 1 } 
      },
      { 
        value: "3-4", 
        label: "3-4 personnes", 
        score: { base: 2, cachees: 3, annee: 2 } 
      },
      { 
        value: "5+", 
        label: "5 personnes ou plus", 
        score: { base: 1, cachees: 2, annee: 3 } 
      }
    ]
  },
  {
    id: 5,
    question: "Qu'est-ce qui vous attire le plus?",
    options: [
      { 
        value: "discovery", 
        label: "Découvrir de nouveaux produits", 
        score: { base: 3, cachees: 2, annee: 1 } 
      },
      { 
        value: "regularity", 
        label: "Avoir mes favoris régulièrement", 
        score: { base: 2, cachees: 3, annee: 2 } 
      },
      { 
        value: "commitment", 
        label: "M'engager sur le long terme pour le meilleur prix", 
        score: { base: 1, cachees: 2, annee: 3 } 
      }
    ]
  }
];

interface BoxRecommendation {
  name: string;
  description: string;
  price: string;
  type: 'base' | 'cachees' | 'annee';
  score?: number;
}

const boxDetails: Record<string, BoxRecommendation> = {
  base: {
    name: "LA BASE DU GOÛT",
    description: "Box bimensuelle sans engagement - Parfaite pour découvrir nos produits à votre rythme",
    price: "39.90€",
    type: 'base'
  },
  cachees: {
    name: "SAVEURS CACHÉES",
    description: "Box mensuelle avec engagement 3 mois - L'équilibre idéal entre régularité et découverte",
    price: "39.90€",
    type: 'cachees'
  },
  annee: {
    name: "L'ANNÉE GOURMANDE",
    description: "Box mensuelle avec engagement 12 mois - La meilleure valeur pour les passionnés du terroir",
    price: "39.90€",
    type: 'annee'
  }
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<BoxRecommendation | null>(null);
  const [customAllergy, setCustomAllergy] = useState("");

  const calculateResult = (): string => {
    const scores = { base: 0, cachees: 0, annee: 0 };
    
    answers.forEach((answer, index) => {
      const question = questions[index];
      const selectedOption = question.options.find(opt => opt.value === answer);
      if (selectedOption) {
        scores.base += selectedOption.score.base;
        scores.cachees += selectedOption.score.cachees;
        scores.annee += selectedOption.score.annee;
      }
    });

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sortedScores[0][0];
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await saveQuizResponses();
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const saveQuizResponses = async () => {
    try {
      const recommendedBoxType = calculateResult();
      const recommendedBox = boxDetails[recommendedBoxType];
      
      // Map answers to database columns
      const response = {
        allergies: answers[0] ? questions[0].options.find(o => o.value === answers[0])?.label : null,
        custom_allergies: answers[0] === 'other' ? customAllergy : null,
        yaourt_preference: answers[2] ? questions[2].options.find(o => o.value === answers[2])?.label : null,
        fruits_lyophilises: null,
        fromage_preference: null,
        lait_preference: answers[1] ? questions[1].options.find(o => o.value === answers[1])?.label : null,
        chocolat_preference: null,
        score: null,
        recommended_box: recommendedBox.name,
        user_agent: navigator.userAgent
      };

      const { data, error } = await supabase
        .from('quiz_responses')
        .insert([response])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        toast.error("Erreur lors de la sauvegarde de vos réponses");
      } else if (data) {
        setQuizResponseId(data.id);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleOrderClick = (box: BoxRecommendation) => {
    setSelectedBox(box);
    setOrderDialogOpen(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizResponseId(undefined);
    setCustomAllergy("");
  };

  const recommendedPlan = showResult ? calculateResult() : null;
  const recommendedBox = recommendedPlan ? boxDetails[recommendedPlan] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Quiz Content */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/30 to-background min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!showResult ? (
              <>
                <div className="text-center mb-8 animate-fade-in">
                  <Badge className="mb-4 bg-primary text-primary-foreground">
                    Question {currentQuestion + 1} sur {questions.length}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Trouvez Votre Box Idéale
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Répondez à quelques questions pour découvrir l'abonnement qui vous convient
                  </p>
                </div>

                <Card className="border-2 border-primary/20 animate-slide-up">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {questions[currentQuestion].question}
                    </CardTitle>
                    <CardDescription>
                      Sélectionnez l'option qui vous correspond le mieux
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers[currentQuestion] || ""}
                      onValueChange={handleAnswer}
                      className="space-y-4"
                    >
                      {questions[currentQuestion].options.map((option) => (
                        <div 
                          key={option.value} 
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label
                            htmlFor={option.value}
                            className="flex-1 cursor-pointer text-base"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {/* Custom allergy input */}
                    {questions[currentQuestion].allowCustomInput && 
                     answers[currentQuestion] === 'other' && (
                      <div className="mt-6 space-y-2">
                        <Label htmlFor="customAllergy">
                          Précisez votre allergie :
                        </Label>
                        <Input
                          id="customAllergy"
                          type="text"
                          value={customAllergy}
                          onChange={(e) => setCustomAllergy(e.target.value)}
                          placeholder="Décrivez votre allergie alimentaire..."
                          maxLength={200}
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum 200 caractères
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion]}
                      >
                        {currentQuestion === questions.length - 1 ? "Voir le résultat" : "Suivant"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <div className="text-center mb-8 animate-fade-in">
                  <Badge className="mb-4 bg-primary text-primary-foreground text-base px-6 py-2">
                    Votre Résultat
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Votre Box Idéale
                  </h1>
                </div>

                {recommendedBox && (
                  <Card className="border-2 border-primary mb-6 animate-slide-up">
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-3xl mb-2">
                        {recommendedBox.name}
                      </CardTitle>
                      <div className="text-5xl font-bold text-primary mb-2">
                        {recommendedBox.price}
                      </div>
                      <CardDescription className="text-lg">
                        {recommendedBox.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-4">
                        <Button 
                          size="lg" 
                          className="w-full text-lg py-6"
                          onClick={() => handleOrderClick(recommendedBox)}
                        >
                          Commander cette box
                        </Button>
                      </div>

                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold text-lg mb-4">Comparer toutes les box</h3>
                        <div className="space-y-3">
                          {Object.values(boxDetails).map((box) => (
                            <div 
                              key={box.type}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                box.type === recommendedPlan 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{box.name}</h4>
                                <span className="text-primary font-bold">{box.price}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {box.description}
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                                onClick={() => handleOrderClick(box)}
                              >
                                Commander
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={resetQuiz}
                  >
                    Recommencer le quiz
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {selectedBox && (
        <OrderDialog
          open={orderDialogOpen}
          onOpenChange={setOrderDialogOpen}
          boxName={selectedBox.name}
          boxPrice={selectedBox.price}
          boxDescription={selectedBox.description}
          quizResponseId={quizResponseId}
        />
      )}
    </div>
  );
};

export default Quiz;
