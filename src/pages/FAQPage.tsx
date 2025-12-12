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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Des questions ?
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              La réponse peut s'y trouver 👇🏻
            </p>

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
