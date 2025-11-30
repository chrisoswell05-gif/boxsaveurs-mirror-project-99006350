-- Créer la table pour stocker les réponses du quiz
CREATE TABLE public.quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Réponses aux questions
  allergies TEXT,
  custom_allergies TEXT,
  yaourt_preference TEXT,
  fruits_lyophilises TEXT,
  fromage_preference TEXT,
  lait_preference TEXT,
  chocolat_preference TEXT,
  
  -- Informations de contact (optionnelles)
  email TEXT,
  phone TEXT,
  name TEXT,
  
  -- Score et recommandations
  score INTEGER,
  recommended_box TEXT,
  
  -- Métadonnées
  user_agent TEXT,
  ip_address INET
);

-- Index pour recherche rapide
CREATE INDEX idx_quiz_responses_created_at ON public.quiz_responses(created_at DESC);
CREATE INDEX idx_quiz_responses_email ON public.quiz_responses(email) WHERE email IS NOT NULL;

-- Activer RLS
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (pour le quiz)
CREATE POLICY "Anyone can submit quiz responses"
  ON public.quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Politique pour que les administrateurs puissent voir toutes les réponses
-- Note: En production, vous devrez créer un système d'authentification admin
CREATE POLICY "Authenticated users can view all responses"
  ON public.quiz_responses
  FOR SELECT
  USING (true);

-- Commentaires pour documentation
COMMENT ON TABLE public.quiz_responses IS 'Stocke les réponses au quiz des clients pour personnaliser leurs box';
COMMENT ON COLUMN public.quiz_responses.custom_allergies IS 'Allergies personnalisées saisies par le client';
COMMENT ON COLUMN public.quiz_responses.recommended_box IS 'Box recommandée basée sur les réponses';
