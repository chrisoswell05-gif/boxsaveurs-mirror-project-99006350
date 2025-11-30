import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Veuillez entrer une adresse email valide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onNewsletterSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: data.email }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Déjà inscrit",
            description: "Cet email est déjà inscrit à notre newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Inscription réussie !",
          description: "Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières actualités.",
        });
        reset();
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-navy py-12 px-6">
      <div className="container mx-auto">
        <div className="mb-12 pb-12 border-b border-yellow/30">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-navy-foreground mb-3">
              Restez Informés de Nos Nouveautés
            </h3>
            <p className="text-navy-foreground/80 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et découvrir nos nouveaux produits
            </p>
            
            <form onSubmit={handleSubmit(onNewsletterSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                  className="w-full bg-white/10 border-white/30 text-navy-foreground placeholder:text-navy-foreground/50 focus:border-yellow transition-all"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-yellow text-sm mt-1 text-left">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow text-yellow-foreground hover:bg-yellow/90 font-semibold transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  "Inscription..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    S'inscrire
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <img src={logo} alt="Box Saveurs de Ferme" className="h-16 w-16" />
            <p className="text-navy-foreground font-semibold">saveurs de ferme</p>
          </div>
          <div className="space-y-3">
            <a href="#contact" className="block text-navy-foreground hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Email: contact@boxsaveursdeferme.ca
            </a>
            <a href="#offrir" className="block text-navy-foreground hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Offrir
            </a>
            <a href="#abonner" className="block text-navy-foreground hover:text-yellow transition-all duration-300 hover:translate-x-2">
              S'abonner
            </a>
          </div>
          <div className="space-y-3 text-navy-foreground">
            <a href="#cgv" className="block hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Conditions générales de vente
            </a>
            <a href="#confidentialite" className="block hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Politique de confidentialité
            </a>
            <a href="#livraison" className="block hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Conditions de Livraison
            </a>
            <a href="#mentions" className="block hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Mentions légales
            </a>
            <a href="#remboursement" className="block hover:text-yellow transition-all duration-300 hover:translate-x-2">
              Remboursement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
