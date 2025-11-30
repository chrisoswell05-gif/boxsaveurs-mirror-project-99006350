import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, User, Package, AlertCircle } from "lucide-react";

interface QuizResponse {
  id: string;
  created_at: string;
  allergies: string;
  custom_allergies: string | null;
  yaourt_preference: string;
  fruits_lyophilises: string;
  fromage_preference: string;
  lait_preference: string;
  chocolat_preference: string;
  score: number;
  recommended_box: string;
  email: string | null;
  name: string | null;
}

const AdminQuizResponses = () => {
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="text-muted-foreground">Chargement des réponses...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Réponses au Quiz
          </h1>
          <p className="text-muted-foreground">
            Consultez les préférences des clients pour personnaliser leurs box
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {responses.length} réponse{responses.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </motion.div>

        <div className="space-y-6">
          {responses.map((response, index) => (
            <motion.div
              key={response.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(response.created_at)}
                      </span>
                    </div>

                    {response.name && (
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{response.name}</span>
                      </div>
                    )}

                    {response.email && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {response.email}
                      </p>
                    )}

                    <div className="flex items-start gap-2 mb-4">
                      <Package className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Box recommandée :
                        </p>
                        <p className="text-primary font-bold">
                          {response.recommended_box}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-1">Score:</p>
                      <Badge variant="outline">{response.score}/6</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground mb-3">
                      Préférences du client :
                    </h4>

                    {response.allergies && (
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium">Allergies:</p>
                          <p className="text-sm text-muted-foreground">
                            {response.allergies}
                          </p>
                          {response.custom_allergies && (
                            <p className="text-sm text-accent mt-1">
                              ⚠️ {response.custom_allergies}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Yaourts:</span>{" "}
                        <span className="text-muted-foreground">
                          {response.yaourt_preference}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Fruits lyophilisés:</span>{" "}
                        <span className="text-muted-foreground">
                          {response.fruits_lyophilises}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Fromages:</span>{" "}
                        <span className="text-muted-foreground">
                          {response.fromage_preference}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Lait d'antan:</span>{" "}
                        <span className="text-muted-foreground">
                          {response.lait_preference}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Chocolat:</span>{" "}
                        <span className="text-muted-foreground">
                          {response.chocolat_preference}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {responses.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                Aucune réponse au quiz pour le moment.
              </p>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminQuizResponses;
