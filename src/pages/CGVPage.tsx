import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CGVPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-navy mb-8">Conditions Générales de Vente</h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales de vente régissent les relations contractuelles entre 
              Box Saveurs de Ferme et ses clients dans le cadre de la vente de box de produits fermiers 
              par abonnement ou à l'unité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">2. Produits et Services</h2>
            <p>
              Box Saveurs de Ferme propose des box contenant des produits fermiers québécois : yaourts 
              artisanaux, fruits lyophilisés, fromages, lait et produits laitiers. Chaque box comprend 
              également un livret de recettes et une cuillère réutilisable.
            </p>
            <p>
              Les abonnements disponibles sont :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>La Base du Goût</strong> : Sans engagement, 34,99$/mois</li>
              <li><strong>Saveurs Cachées</strong> : Engagement 3 mois, 29,99$/mois + cadeau surprise</li>
              <li><strong>L'Année Gourmande</strong> : Engagement 12 mois, 24,99$/mois + cadeau surprise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">3. Commandes</h2>
            <p>
              Les commandes sont passées via notre site internet. La validation d'une commande implique 
              l'acceptation des présentes conditions générales de vente. Un email de confirmation est 
              envoyé après chaque commande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">4. Prix et Paiement</h2>
            <p>
              Les prix sont indiqués en dollars canadiens (CAD), toutes taxes comprises. Le paiement 
              s'effectue par carte bancaire de manière sécurisée. Pour les abonnements, le prélèvement 
              est effectué mensuellement à date anniversaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">5. Livraison</h2>
            <p>
              Les livraisons sont effectuées partout au Canada dans un délai de 2 à 7 jours ouvrables. 
              Les produits sont transportés en véhicule réfrigéré pour garantir leur fraîcheur. 
              Les frais de livraison sont inclus dans le prix de l'abonnement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">6. Résiliation</h2>
            <p>
              Pour les abonnements sans engagement, la résiliation peut être effectuée à tout moment 
              avant la date de renouvellement. Pour les abonnements avec engagement, la résiliation 
              anticipée entraîne le paiement des mensualités restantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">7. Contact</h2>
            <p>
              Pour toute question relative aux présentes conditions, vous pouvez nous contacter à :
            </p>
            <p className="font-medium">
              Email : contact@boxsaveursdeferme.ca<br />
              Adresse : 377 Boulevard Jacques Cartier E, Longueuil QC, J4L1E1
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGVPage;
