import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import contactHeaderImage from "@/assets/contact-header.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Qu'est-ce que la box Saveurs de Ferme ?",
    answer: "Chaque mois selon votre abonnement, vous recevez un assortiment fermier : yaourt, fromage, lait pasteurisé, fruits lyophilisés, guide de recette, une cuillère et une surprise exclusive."
  },
  {
    question: "Comment fonctionne l'abonnement ?",
    answer: "Vous choisissez la formule qui vous convient (bimensuel, mensuelle, annuelle). Le paiement se fait à l'avance, et votre box est livrée automatiquement chaque mois. L'abonnement se renouvelle automatiquement, mais vous pouvez le résilier à tout moment en respectant le type d'abonnement depuis votre compte ou en nous écrivant."
  },
  {
    question: "Quels types de produits vais-je recevoir ?",
    answer: "Nos produits varient selon les saisons et la production fermière. Vous pouvez recevoir : différents yaourts (nature ou aux saveurs variées), fromages de caractère ou doux, fruits lyophilisés (pour grignoter sainement ou ajouter aux recettes), une bouteille de lait fermier pasteurisé (chocolat ou d'antan avec crème), et toujours une petite surprise gourmande ou utile."
  },
  {
    question: "Est-ce que les produits sont locaux ?",
    answer: "Oui 90% de nos produits proviennent directement de producteurs québécois passionnés, en circuit court, afin de soutenir l'agriculture locale."
  },
  {
    question: "Puis-je personnaliser ma box ?",
    answer: "Pour le moment, nos box sont pré-sélectionnées par notre équipe afin de vous faire découvrir de nouvelles saveurs chaque mois. Nous travaillons à proposer à l'avenir des options de personnalisation (sans lactose, choix de saveurs, etc.)."
  },
  {
    question: "Comment se passe la livraison ?",
    answer: "Nous livrons partout au Canada par transport réfrigéré ou colis protégé. Les délais de livraison varient entre 2 à 7 jours ouvrables selon la région. Vous recevez un numéro de suivi par courriel dès l'expédition."
  },
  {
    question: "Et si je ne suis pas chez moi lors de la livraison ?",
    answer: "Le transporteur laisse généralement un avis de passage avec instructions. Nos produits sont emballés pour conserver leur fraîcheur pendant le transport, mais nous recommandons de les récupérer rapidement."
  },
  {
    question: "Puis-je offrir une box en cadeau ?",
    answer: "Oui 🎁 ! Vous pouvez offrir un abonnement cadeau en choisissant l'option \"Offrir\" lors de votre commande. Le destinataire recevra la box sans facture, accompagnée d'un petit mot personnalisé."
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Pour des raisons d'hygiène et de sécurité, les produits alimentaires ne peuvent être retournés. En cas de produit endommagé ou défectueux, contactez-nous dans les 48h suivant la réception afin que nous trouvions une solution (remplacement ou remboursement partiel)."
  },
  {
    question: "Comment puis-je vous contacter ?",
    answer: "Courriel : contact@boxsaveursdeferme.ca"
  }
];

const contactSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email({ message: "Veuillez entrer une adresse email valide" }).max(255),
  phone: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: data.name || "",
            email: data.email,
            subject: "Message depuis le formulaire de contact",
            message: data.phone ? `Téléphone: ${data.phone}\n\n${data.message || ""}` : (data.message || ""),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      toast({
        title: "Message envoyé !",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });

      reset();
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      
      {/* Header with Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={contactHeaderImage} 
          alt="Service client Box Saveurs de Ferme" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "serif" }}
          >
            Contactez-nous
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Nous répondons sous 24 Heures, notre service client est à disposition 7/7jours
          </p>
        </div>
      </div>

      <main className="flex-1 pt-8 pb-16 bg-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              {/* Form Section Title */}
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Nous sommes heureux de vous aider !
              </h2>
              <p className="mb-6 text-muted-foreground">
                Des questions ? Notre équipe répond en 24H.
              </p>

              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name and Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nom"
                      {...register("name")}
                      className="w-full px-4 py-3 bg-white/50 border border-border rounded focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="E-mail *"
                      {...register("email")}
                      className="w-full px-4 py-3 bg-white/50 border border-border rounded focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    {...register("phone")}
                    className="w-full px-4 py-3 bg-white/50 border border-border rounded focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder="Commentaire"
                    rows={5}
                    {...register("message")}
                    className="w-full px-4 py-3 bg-white/50 border border-border rounded focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  Questions fréquentes
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-border rounded-lg px-4 bg-white/50"
                    >
                      <AccordionTrigger className="text-left py-4 hover:no-underline text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* FAQ */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  FAQ
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Vous avez une question rapide ?
                </p>
                <Link 
                  to="/faq" 
                  className="underline hover:opacity-80 transition-opacity text-primary"
                >
                  Consultez notre FAQ pour une réponse rapide
                </Link>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Adresse
                </h3>
                <p className="text-muted-foreground">
                  377 Boulevards jacques cartier E, Longueuil QC, J4L1E1
                </p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Email
                </h3>
                <a 
                  href="mailto:Contact@boxsaveursdeferme.ca"
                  className="hover:opacity-80 transition-opacity text-muted-foreground hover:text-primary"
                >
                  Contact@boxsaveursdeferme.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
