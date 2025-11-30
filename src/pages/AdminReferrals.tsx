import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, TrendingUp, DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  referral_code: string;
  referral_credits: number;
  total_referrals: number;
}

interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  bonus_amount: number;
  status: string;
  created_at: string;
  referrer: { email: string; full_name: string | null };
  referred: { email: string; full_name: string | null };
}

const AdminReferrals = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCredits: 0,
    totalReferrals: 0,
    activeReferrals: 0,
  });

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vous devez être connecté");
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!userRole) {
        toast.error("Accès refusé : administrateur uniquement");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadData();
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast.error("Erreur lors de la vérification des permissions");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Load all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("total_referrals", { ascending: false });

      if (profilesError) throw profilesError;

      // Load all referrals with related profiles
      const { data: referralsData, error: referralsError } = await supabase
        .from("referrals")
        .select(`
          *,
          referrer:profiles!referrals_referrer_id_fkey(email, full_name),
          referred:profiles!referrals_referred_id_fkey(email, full_name)
        `)
        .order("created_at", { ascending: false });

      if (referralsError) throw referralsError;

      setProfiles(profilesData || []);
      setReferrals(referralsData || []);

      // Calculate stats
      const totalCredits = profilesData?.reduce((sum, p) => sum + Number(p.referral_credits || 0), 0) || 0;
      const totalReferrals = referralsData?.length || 0;
      const activeReferrals = referralsData?.filter((r) => r.status === "active").length || 0;

      setStats({
        totalUsers: profilesData?.length || 0,
        totalCredits,
        totalReferrals,
        activeReferrals,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Erreur lors du chargement des données");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Tableau de bord Parrainages
            </h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous les parrainages de vos clients
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crédits Totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCredits}$</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parrainages</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parrainages Actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeReferrals}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Utilisateurs et Crédits</CardTitle>
            <CardDescription>
              Vue d'ensemble des crédits de parrainage de tous les utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Code Parrainage</TableHead>
                    <TableHead className="text-right">Crédits</TableHead>
                    <TableHead className="text-right">Total Parrainages</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.email}</TableCell>
                      <TableCell>{profile.full_name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{profile.referral_code}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {profile.referral_credits}$
                      </TableCell>
                      <TableCell className="text-right">{profile.total_referrals}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Referrals History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Parrainages</CardTitle>
            <CardDescription>
              Tous les parrainages effectués sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Parrain</TableHead>
                    <TableHead>Filleul</TableHead>
                    <TableHead className="text-right">Bonus</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        {new Date(referral.created_at).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {referral.referrer.full_name || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {referral.referrer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {referral.referred.full_name || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {referral.referred.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {referral.bonus_amount}$
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={referral.status === "active" ? "default" : "secondary"}
                        >
                          {referral.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReferrals;
