import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-navy mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">1. Collecte des Données</h2>
            <p>
              Box Saveurs de Ferme collecte les données personnelles suivantes lors de votre inscription 
              et de vos commandes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison</li>
              <li>Préférences alimentaires et allergies (via notre quiz)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">2. Utilisation des Données</h2>
            <p>
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Traiter et livrer vos commandes</li>
              <li>Personnaliser le contenu de vos box selon vos préférences</li>
              <li>Vous envoyer des communications relatives à votre abonnement</li>
              <li>Améliorer nos services et votre expérience client</li>
              <li>Vous informer de nos offres promotionnelles (avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">3. Protection des Données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
              personnelles contre tout accès non autorisé, modification, divulgation ou destruction. 
              Vos données de paiement sont traitées de manière sécurisée par nos partenaires de paiement 
              certifiés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">4. Partage des Données</h2>
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nos partenaires de livraison pour l'acheminement de vos commandes</li>
              <li>Nos prestataires de paiement pour le traitement sécurisé des transactions</li>
              <li>Les autorités compétentes si la loi l'exige</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">5. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation, analyser 
              le trafic et personnaliser le contenu. Vous pouvez configurer votre navigateur pour 
              refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus fonctionner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">6. Vos Droits</h2>
            <p>
              Conformément à la loi sur la protection des renseignements personnels, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit de suppression de vos données</li>
              <li>Droit de retirer votre consentement à tout moment</li>
              <li>Droit de porter plainte auprès de l'autorité compétente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">7. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question concernant notre politique de confidentialité :
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

export default PrivacyPage;
