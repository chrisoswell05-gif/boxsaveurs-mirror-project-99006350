import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { Copy, Gift, LogOut, Users, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  referral_code: string;
  referral_credits: number;
  total_referrals: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        // Fetch profile after we have session
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate("/");
  };

  const copyReferralCode = () => {
    if (profile) {
      const referralUrl = `${window.location.origin}/auth?ref=${profile.referral_code}`;
      navigator.clipboard.writeText(referralUrl);
      toast({
        title: "Copié !",
        description: "Le lien de parrainage a été copié",
      });
    }
  };

  const copyCode = () => {
    if (profile) {
      navigator.clipboard.writeText(profile.referral_code);
      toast({
        title: "Code copié !",
        description: "Partagez-le avec vos amis",
      });
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="p-8 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Bonjour, {profile.full_name || user?.email}!
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-yellow/10 to-yellow/5 border-yellow/30">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow/20 rounded-full">
                    <DollarSign className="w-5 h-5 text-yellow-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Crédits</p>
                    <p className="text-2xl font-bold text-foreground">
                      {profile.referral_credits}$
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-navy/10 to-navy/5 border-navy/30">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-navy/20 rounded-full">
                    <Users className="w-5 h-5 text-navy-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parrainages</p>
                    <p className="text-2xl font-bold text-foreground">
                      {profile.total_referrals}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Gift className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Code</p>
                    <p className="text-xl font-bold text-foreground font-mono">
                      {profile.referral_code}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Referral Section */}
          <Card className="p-8 shadow-lg bg-gradient-to-br from-yellow/5 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow/20 rounded-full">
                <Gift className="w-6 h-6 text-yellow-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Programme de parrainage
                </h2>
                <p className="text-muted-foreground">
                  Parrainez vos amis et gagnez 10$ chacun !
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-background rounded-lg border-2 border-yellow/30">
                <p className="text-sm text-muted-foreground mb-3">
                  Votre code de parrainage
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 p-4 bg-gradient-to-r from-yellow/10 to-yellow/5 rounded-lg border border-yellow/20">
                    <p className="text-2xl font-bold text-center font-mono tracking-wider text-foreground">
                      {profile.referral_code}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={copyCode}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copier
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Ou partagez ce lien
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-lg overflow-hidden">
                    <p className="text-sm text-foreground truncate">
                      {`${window.location.origin}/auth?ref=${profile.referral_code}`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyReferralCode}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copier le lien
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow/10 via-yellow/5 to-transparent p-6 rounded-lg border border-yellow/20">
                <h3 className="font-semibold text-foreground mb-3">
                  Comment ça marche ?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow">1.</span>
                    Partagez votre code ou lien avec vos amis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow">2.</span>
                    Ils s'inscrivent avec votre code
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow">3.</span>
                    Vous recevez tous les deux 10$ de crédit !
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
