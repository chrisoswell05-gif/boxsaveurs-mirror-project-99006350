import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, User, Package, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: role } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!role) {
      toast.error("Accès refusé. Vous n'êtes pas administrateur.");
      navigate('/');
      return;
    }

    setIsAdmin(true);
    fetchResponses();
  };

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

  const exportToCSV = () => {
    if (responses.length === 0) {
      toast.error("Aucune donnée à exporter");
      return;
    }

    // En-têtes du CSV
    const headers = [
      'Date',
      'Nom',
      'Email',
      'Allergies',
      'Allergies personnalisées',
      'Préférence yaourts',
      'Fruits lyophilisés',
      'Préférence fromages',
      'Préférence lait',
      'Préférence chocolat',
      'Box recommandée'
    ];

    // Convertir les données en lignes CSV
    const csvRows = [
      headers.join(','), // Ligne d'en-tête
      ...responses.map(response => [
        `"${formatDate(response.created_at)}"`,
        `"${response.name || 'N/A'}"`,
        `"${response.email || 'N/A'}"`,
        `"${response.allergies || 'N/A'}"`,
        `"${response.custom_allergies || 'N/A'}"`,
        `"${response.yaourt_preference || 'N/A'}"`,
        `"${response.fruits_lyophilises || 'N/A'}"`,
        `"${response.fromage_preference || 'N/A'}"`,
        `"${response.lait_preference || 'N/A'}"`,
        `"${response.chocolat_preference || 'N/A'}"`,
        `"${response.recommended_box || 'N/A'}"`
      ].join(','))
    ];

    // Créer le contenu CSV
    const csvContent = csvRows.join('\n');
    
    // Créer un Blob avec encodage UTF-8 avec BOM pour Excel
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quiz-responses-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${responses.length} réponse(s) exportée(s) avec succès`);
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
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
            </div>
            
            <div>
              <Button
                onClick={exportToCSV}
                disabled={responses.length === 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Exporter en CSV
              </Button>
            </div>
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
                      <p className="text-sm font-semibold mb-1">Box recommandée</p>
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
