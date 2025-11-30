import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PromoCode {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  description: string | null;
}

export const usePromoCode = () => {
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validatePromoCode = async (code: string) => {
    if (!code.trim()) {
      toast({
        title: "Code requis",
        description: "Veuillez entrer un code promo",
        variant: "destructive",
      });
      return false;
    }

    setIsValidating(true);

    try {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", code.toUpperCase())
        .eq("is_active", true)
        .single();

      if (error || !data) {
        toast({
          title: "Code invalide",
          description: "Ce code promo n'existe pas ou a expiré",
          variant: "destructive",
        });
        setIsValidating(false);
        return false;
      }

      // Check if code has expired
      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        toast({
          title: "Code expiré",
          description: "Ce code promo a expiré",
          variant: "destructive",
        });
        setIsValidating(false);
        return false;
      }

      // Check if max uses reached
      if (data.max_uses && data.current_uses >= data.max_uses) {
        toast({
          title: "Code épuisé",
          description: "Ce code promo a atteint sa limite d'utilisation",
          variant: "destructive",
        });
        setIsValidating(false);
        return false;
      }

      setAppliedPromo({
        code: data.code,
        discount_type: data.discount_type as "percentage" | "fixed",
        discount_value: data.discount_value,
        description: data.description,
      });

      // Special message for referral codes
      if (data.code.startsWith('REF')) {
        toast({
          title: "Code de parrainage appliqué ! 🎉",
          description: "Ce code s'applique uniquement aux formules SAVEURS CACHÉES (3 mois) et L'ANNÉE GOURMANDE (12 mois)",
        });
      } else {
        toast({
          title: "Code appliqué !",
          description: data.description || `Réduction de ${data.discount_type === 'percentage' ? data.discount_value + '%' : data.discount_value + '$'} appliquée`,
        });
      }

      setIsValidating(false);
      return true;
    } catch (error) {
      console.error("Error validating promo code:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation du code",
        variant: "destructive",
      });
      setIsValidating(false);
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast({
      title: "Code retiré",
      description: "Le code promo a été retiré",
    });
  };

  const calculateDiscountedPrice = (originalPrice: number, planTitle: string): number => {
    if (!appliedPromo) return originalPrice;

    // If it's a referral code and the plan is "LA BASE DU GOÛT", don't apply discount
    if (appliedPromo.code.startsWith('REF') && planTitle === 'LA BASE DU GOÛT') {
      return originalPrice;
    }

    if (appliedPromo.discount_type === "percentage") {
      return originalPrice - (originalPrice * appliedPromo.discount_value) / 100;
    } else {
      return Math.max(0, originalPrice - appliedPromo.discount_value);
    }
  };

  return {
    appliedPromo,
    isValidating,
    validatePromoCode,
    removePromoCode,
    calculateDiscountedPrice,
  };
};
