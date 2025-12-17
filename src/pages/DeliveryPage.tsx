import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Snowflake, MapPin, Clock, Package, AlertCircle } from "lucide-react";

const DeliveryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Conditions de Livraison
          </h1>
          
          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <Snowflake className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Transport Réfrigéré</h3>
              <p className="text-sm text-muted-foreground">Chaîne du froid garantie</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">2-7 jours ouvrables</h3>
              <p className="text-sm text-muted-foreground">Délai de livraison</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Partout au Canada</h3>
              <p className="text-sm text-muted-foreground">Livraison nationale</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                1. Zones de livraison
              </h2>
              <p>
                Box Saveurs de Ferme livre partout au Canada. Nos services de livraison couvrent :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Québec :</strong> Toutes les régions (délai : 2-4 jours ouvrables)</li>
                <li><strong>Ontario :</strong> Toutes les régions (délai : 3-5 jours ouvrables)</li>
                <li><strong>Provinces de l'Atlantique :</strong> Nouveau-Brunswick, Nouvelle-Écosse, Île-du-Prince-Édouard (délai : 4-6 jours ouvrables)</li>
                <li><strong>Provinces de l'Ouest :</strong> Manitoba, Saskatchewan, Alberta, Colombie-Britannique (délai : 5-7 jours ouvrables)</li>
              </ul>
              <p className="mt-4 text-sm bg-yellow/10 p-4 rounded-lg">
                <strong>Note :</strong> Les régions éloignées et les territoires du Nord peuvent nécessiter des délais supplémentaires. 
                Contactez-nous pour vérifier la disponibilité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                2. Délais de livraison
              </h2>
              <p>
                Les délais de livraison varient selon votre localisation et sont calculés en jours ouvrables 
                (du lundi au vendredi, hors jours fériés).
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="border border-border p-3 text-left">Région</th>
                      <th className="border border-border p-3 text-left">Délai estimé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Montréal et environs</td>
                      <td className="border border-border p-3">2-3 jours ouvrables</td>
                    </tr>
                    <tr className="bg-secondary/20">
                      <td className="border border-border p-3">Reste du Québec</td>
                      <td className="border border-border p-3">3-4 jours ouvrables</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Ontario</td>
                      <td className="border border-border p-3">3-5 jours ouvrables</td>
                    </tr>
                    <tr className="bg-secondary/20">
                      <td className="border border-border p-3">Provinces de l'Atlantique</td>
                      <td className="border border-border p-3">4-6 jours ouvrables</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Provinces de l'Ouest</td>
                      <td className="border border-border p-3">5-7 jours ouvrables</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Snowflake className="w-6 h-6" />
                3. Transport réfrigéré
              </h2>
              <p>
                La fraîcheur de nos produits est notre priorité absolue. Nous utilisons un système de 
                transport réfrigéré pour garantir la qualité de vos produits fermiers.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Emballages isothermes :</strong> Boîtes spécialement conçues pour maintenir la température</li>
                <li><strong>Packs de glace :</strong> Inclus dans chaque livraison pour assurer le froid</li>
                <li><strong>Suivi de température :</strong> Contrôle rigoureux tout au long du transport</li>
                <li><strong>Livraison express :</strong> Optimisation des trajets pour réduire le temps de transport</li>
              </ul>
              <p className="mt-4">
                <strong>Important :</strong> À réception, veuillez placer immédiatement les produits au réfrigérateur 
                pour préserver leur fraîcheur optimale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                4. Frais de livraison
              </h2>
              <p>
                Les frais de livraison sont calculés en fonction de votre localisation :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Québec :</strong> Livraison GRATUITE pour tous les abonnements</li>
                <li><strong>Ontario :</strong> 9,99$ par livraison</li>
                <li><strong>Provinces de l'Atlantique :</strong> 14,99$ par livraison</li>
                <li><strong>Provinces de l'Ouest :</strong> 19,99$ par livraison</li>
              </ul>
              <p className="mt-4 bg-yellow/10 p-4 rounded-lg">
                <strong>Offre spéciale :</strong> Livraison GRATUITE partout au Canada pour les abonnements 
                annuels "L'ANNÉE GOURMANDE" !
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6" />
                5. Suivi de commande
              </h2>
              <p>
                Une fois votre commande expédiée, vous recevrez un email contenant :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Le numéro de suivi de votre colis</li>
                <li>Un lien pour suivre votre livraison en temps réel</li>
                <li>La date de livraison estimée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                6. En cas de problème
              </h2>
              <p>
                Si vous rencontrez un problème avec votre livraison :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Colis non reçu :</strong> Contactez-nous dans les 48h suivant la date de livraison prévue</li>
                <li><strong>Produits endommagés :</strong> Prenez des photos et contactez-nous immédiatement</li>
                <li><strong>Chaîne du froid rompue :</strong> Signalez-le dans les 24h avec photos</li>
              </ul>
              <p className="mt-4">
                Notre équipe s'engage à résoudre tout problème de livraison dans les plus brefs délais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Contact</h2>
              <p>
                Pour toute question concernant la livraison :
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

export default DeliveryPage;
