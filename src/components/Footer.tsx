import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Facebook, Instagram, Twitter, Youtube, MapPin, Phone } from "lucide-react";
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

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/boxsaveursdeferme", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/boxsaveursdeferme", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/boxsaveurs", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@boxsaveursdeferme", label: "YouTube" },
];

const legalLinks = [
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/livraison", label: "Conditions de livraison" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/remboursement", label: "Politique de remboursement" },
];

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/nos-box/commande", label: "Nos Box" },
  { href: "/nos-box/cadeau", label: "Offrir une Box" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

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
    <footer className="bg-navy">
      {/* Newsletter Section */}
      <div className="border-b border-yellow/20">
        <div className="container mx-auto px-6 py-12">
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
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Box Saveurs de Ferme" className="h-14 w-14" />
              <div>
                <p className="text-navy-foreground font-bold text-lg">Box Saveurs</p>
                <p className="text-navy-foreground/70 text-sm">de Ferme</p>
              </div>
            </div>
            <p className="text-navy-foreground/80 text-sm leading-relaxed">
              Des produits fermiers du Québec livrés directement chez vous. Savourez l'authenticité de nos terroirs.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-yellow hover:text-yellow-foreground transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-navy-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-navy-foreground font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-navy-foreground/80 hover:text-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-navy-foreground font-semibold text-lg mb-4">Informations légales</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-navy-foreground/80 hover:text-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-navy-foreground font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contact@boxsaveursdeferme.ca" 
                  className="text-navy-foreground/80 hover:text-yellow transition-colors text-sm"
                >
                  contact@boxsaveursdeferme.ca
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+14185551234" 
                  className="text-navy-foreground/80 hover:text-yellow transition-colors text-sm"
                >
                  +1 (418) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow mt-0.5 flex-shrink-0" />
                <span className="text-navy-foreground/80 text-sm">
                  Québec, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-yellow/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-navy-foreground/60 text-sm">
              © {new Date().getFullYear()} Box Saveurs de Ferme. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-navy-foreground/60">
              <a href="/cgv" className="hover:text-yellow transition-colors">CGV</a>
              <span>•</span>
              <a href="/confidentialite" className="hover:text-yellow transition-colors">Confidentialité</a>
              <span>•</span>
              <a href="/mentions-legales" className="hover:text-yellow transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
