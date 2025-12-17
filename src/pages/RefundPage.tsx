import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Politique de Remboursement
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Principe général</h2>
              <p>
                En raison de la nature périssable de nos produits alimentaires, les remboursements sont soumis 
                à des conditions strictes afin de garantir la qualité et la sécurité alimentaire de nos box.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Délai de réclamation</h2>
              <p>
                Toute réclamation concernant votre commande doit être effectuée dans un délai de <strong>48 heures</strong> suivant 
                la réception de votre box. Passé ce délai, aucune demande de remboursement ne pourra être acceptée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Conditions de remboursement</h2>
              <p>Un remboursement peut être accordé dans les cas suivants :</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Produits endommagés à la réception (avec photos à l'appui)</li>
                <li>Produits manquants dans la box</li>
                <li>Erreur de notre part sur le contenu de la box</li>
                <li>Problème de chaîne du froid avéré (produits non réfrigérés à l'arrivée)</li>
                <li>Non-livraison de la commande</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Cas non éligibles au remboursement</h2>
              <p>Les situations suivantes ne donnent pas droit à un remboursement :</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Changement d'avis après réception</li>
                <li>Préférences gustatives non satisfaites</li>
                <li>Absence lors de la livraison entraînant un retour du colis</li>
                <li>Adresse de livraison erronée fournie par le client</li>
                <li>Réclamation effectuée après le délai de 48 heures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Procédure de demande de remboursement</h2>
              <p>Pour effectuer une demande de remboursement, veuillez suivre les étapes suivantes :</p>
              <ol className="list-decimal pl-6 space-y-3 mt-4">
                <li>
                  <strong>Contacter notre service client</strong> par email à contact@boxsaveursdeferme.ca 
                  dans les 48 heures suivant la réception.
                </li>
                <li>
                  <strong>Fournir les informations suivantes :</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Numéro de commande</li>
                    <li>Description détaillée du problème</li>
                    <li>Photos des produits concernés (si applicable)</li>
                  </ul>
                </li>
                <li>
                  <strong>Attendre notre réponse</strong> dans un délai de 24 à 48 heures ouvrables.
                </li>
                <li>
                  Si la demande est acceptée, le remboursement sera effectué sous <strong>5 à 10 jours ouvrables</strong> 
                  sur le mode de paiement original.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Annulation d'abonnement</h2>
              <p>
                Pour les abonnements, l'annulation doit être effectuée au moins <strong>7 jours avant</strong> la date 
                de renouvellement pour éviter la facturation du mois suivant.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>LA BASE DU GOÛT (sans engagement) :</strong> Annulation possible à tout moment</li>
                <li><strong>SAVEURS CACHÉES (3 mois) :</strong> Engagement minimum de 3 mois requis</li>
                <li><strong>L'ANNÉE GOURMANDE (12 mois) :</strong> Engagement minimum de 12 mois requis</li>
              </ul>
              <p className="mt-4">
                Pour les formules avec engagement, aucun remboursement ne sera accordé en cas d'annulation 
                anticipée, sauf circonstances exceptionnelles évaluées au cas par cas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Remboursement partiel</h2>
              <p>
                Dans certains cas, un remboursement partiel ou un avoir peut être proposé en fonction 
                de la nature du problème rencontré. Cette décision est prise au cas par cas par notre 
                service client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Contact</h2>
              <p>
                Pour toute question concernant notre politique de remboursement, n'hésitez pas à nous contacter :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Email :</strong> contact@boxsaveursdeferme.ca</li>
                <li><strong>Adresse :</strong> 377 Boulevard Jacques Cartier E, Longueuil QC, J4L1E1</li>
              </ul>
            </section>

            <p className="text-sm text-muted-foreground mt-8 pt-8 border-t">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPage;
