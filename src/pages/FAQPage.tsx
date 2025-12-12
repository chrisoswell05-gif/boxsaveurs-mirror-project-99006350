import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const faqItems = [
  {
    question: "Qu'est-ce que Box Saveurs de Ferme ?",
    answer: "Box Saveurs de Ferme est un service d'abonnement mensuel qui vous livre des produits fermiers de qualité directement chez vous. Chaque box contient une sélection de yaourts aux saveurs variées, des fruits lyophilisés, du fromage artisanal, du lait frais et bien plus encore."
  },
  {
    question: "Quand ma box sera-t-elle livrée ?",
    answer: "Les box sont expédiées au début de chaque mois. Vous recevrez un email de confirmation avec le numéro de suivi dès que votre box sera en route. La livraison prend généralement 2 à 5 jours ouvrables selon votre localisation."
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace client. Pour les formules avec engagement (3 mois ou 12 mois), des frais peuvent s'appliquer en cas d'annulation anticipée. La formule sans engagement peut être annulée sans frais."
  },
  {
    question: "Les produits sont-ils adaptés aux personnes allergiques ?",
    answer: "Nos produits contiennent du lait et peuvent contenir des traces de fruits à coque. Si vous avez des allergies spécifiques, nous vous recommandons de nous contacter avant de souscrire à un abonnement afin que nous puissions vous conseiller au mieux."
  },
  {
    question: "Comment fonctionne le programme de parrainage ?",
    answer: "Chaque client dispose d'un code de parrainage unique. Lorsqu'un ami utilise votre code pour s'abonner à une formule avec engagement, vous recevez tous les deux 10$ de crédit sur votre prochain paiement. Les crédits sont cumulables !"
  },
  {
    question: "Puis-je offrir une box en cadeau ?",
    answer: "Absolument ! Nous proposons des options de box cadeau. Vous pouvez choisir la durée de l'abonnement et personnaliser un message pour le destinataire. La box sera envoyée directement à l'adresse de votre choix avec votre message personnalisé."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), les cartes de débit et PayPal. Tous les paiements sont sécurisés et cryptés."
  },
  {
    question: "D'où proviennent vos produits ?",
    answer: "Tous nos produits proviennent de fermes locales et d'artisans de confiance. Nous travaillons en direct avec nos producteurs pour garantir la fraîcheur et la qualité de chaque produit. Découvrez nos producteurs partenaires dans la section 'À propos'."
  },
  {
    question: "Comment conserver les produits de ma box ?",
    answer: "Dès réception, nous vous recommandons de placer les produits laitiers (yaourts, lait, fromage) au réfrigérateur. Les fruits lyophilisés peuvent être conservés à température ambiante dans un endroit sec. Chaque produit est accompagné d'instructions de conservation spécifiques."
  },
  {
    question: "Comment vous contacter ?",
    answer: "Vous pouvez nous contacter via notre formulaire de contact sur le site, par email à contact@boxsaveursdeferme.ca, ou via nos réseaux sociaux. Notre équipe vous répondra dans les 24 à 48 heures ouvrables."
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
              FAQ
            </h1>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background border border-border/30 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-6 bg-background rounded-lg border border-border/30">
              <p className="text-muted-foreground">
                Vous n'avez pas trouvé la réponse à votre question ? {" "}
                <a href="/contact" className="text-primary hover:text-navy underline">
                  Contactez-nous
                </a>
                , nous serons ravis de vous aider !
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
