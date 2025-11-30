import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Gift } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/logo.png";

const authSchema = z.object({
  email: z.string().email("Email invalide").max(255),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").max(100),
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100).optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Get referral code from URL if present
    const refCode = searchParams.get("ref");
    if (refCode) {
      setReferralCode(refCode.toUpperCase());
      setIsLogin(false); // Switch to signup mode if referral code present
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validationData: any = { email, password };
      if (!isLogin) {
        validationData.fullName = fullName;
      }
      
      authSchema.parse(validationData);

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Erreur de connexion",
              description: "Email ou mot de passe incorrect",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erreur",
              description: error.message,
              variant: "destructive",
            });
          }
          setLoading(false);
          return;
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Compte existant",
              description: "Cet email est déjà utilisé. Connectez-vous plutôt.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erreur",
              description: error.message,
              variant: "destructive",
            });
          }
          setLoading(false);
          return;
        }

        // Send welcome email in background
        if (data.user) {
          setTimeout(async () => {
            try {
              // Fetch the user's profile to get referral code
              const { data: profile } = await supabase
                .from('profiles')
                .select('referral_code')
                .eq('id', data.user!.id)
                .single();

              if (profile) {
                await supabase.functions.invoke('send-welcome-email', {
                  body: {
                    email: email,
                    fullName: fullName || email.split('@')[0],
                    referralCode: profile.referral_code,
                  },
                });
              }
            } catch (emailError) {
              console.error("Error sending welcome email:", emailError);
            }
          }, 2000);
        }

        // Apply referral bonus if code provided
        if (referralCode.trim() && data.user) {
          try {
            const { error: referralError } = await supabase.rpc('apply_referral_bonus', {
              referrer_code: referralCode.toUpperCase(),
              new_user_id: data.user.id,
            });

            if (!referralError) {
              // Send notification email to referrer
              setTimeout(async () => {
                try {
                  // Fetch referrer profile
                  const { data: referrerProfile } = await supabase
                    .from('profiles')
                    .select('email, full_name')
                    .eq('referral_code', referralCode.toUpperCase())
                    .single();

                  if (referrerProfile) {
                    await supabase.functions.invoke('send-referral-notification', {
                      body: {
                        referrerEmail: referrerProfile.email,
                        referrerName: referrerProfile.full_name || 'Parrain',
                        referredName: fullName || email.split('@')[0],
                        referralCode: referralCode.toUpperCase(),
                        bonusAmount: 10,
                      },
                    });
                  }
                } catch (emailError) {
                  console.error("Error sending referral email:", emailError);
                }
              }, 1000);

              toast({
                title: "🎉 Bonus de parrainage !",
                description: "Vous et votre parrain avez reçu 10$ de crédit chacun !",
              });
            }
          } catch (error) {
            console.error("Error applying referral:", error);
          }
        }

        toast({
          title: "Compte créé !",
          description: "Bienvenue sur Box Saveurs de Ferme !",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-background to-cream-dark flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Box Saveurs de Ferme" className="h-16 mb-4" />
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isLogin
              ? "Connectez-vous à votre compte"
              : "Rejoignez la communauté Box Saveurs de Ferme"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="bg-gradient-to-r from-yellow/10 to-yellow/5 p-4 rounded-lg border border-yellow/30">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-yellow" />
                <Label htmlFor="referralCode" className="text-sm font-semibold">
                  Code de parrainage (optionnel)
                </Label>
              </div>
              <Input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="CODE12345"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Obtenez 10$ de crédit si vous avez un code de parrainage !
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="premium"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Chargement...
              </>
            ) : isLogin ? (
              "Se connecter"
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? "Pas encore de compte ? Inscrivez-vous"
              : "Déjà un compte ? Connectez-vous"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
