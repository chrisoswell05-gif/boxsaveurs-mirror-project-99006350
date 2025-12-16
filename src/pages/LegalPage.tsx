import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-navy mb-8">Mentions Légales</h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">1. Informations sur l'Entreprise</h2>
            <p>
              <strong>Raison sociale :</strong> Box Saveurs de Ferme<br />
              <strong>Siège social :</strong> 377 Boulevard Jacques Cartier E, Longueuil QC, J4L1E1<br />
              <strong>Email :</strong> contact@boxsaveursdeferme.ca<br />
              <strong>Directeur de la publication :</strong> Chris Oswell
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">2. Hébergement</h2>
            <p>
              Le site boxsaveursdeferme.ca est hébergé par Lovable.<br />
              Les données sont stockées de manière sécurisée sur des serveurs conformes aux normes 
              de protection des données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">3. Propriété Intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur le site boxsaveursdeferme.ca (textes, images, logos, 
              graphismes, icônes, vidéos) est la propriété exclusive de Box Saveurs de Ferme ou de 
              ses partenaires et est protégé par les lois canadiennes et internationales relatives 
              à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation non autorisée de tout 
              ou partie du contenu est strictement interdite et constitue une contrefaçon sanctionnée 
              par la loi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">4. Responsabilité</h2>
            <p>
              Box Saveurs de Ferme s'efforce d'assurer l'exactitude et la mise à jour des informations 
              diffusées sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, la précision 
              ou l'exhaustivité des informations mises à disposition.
            </p>
            <p>
              Box Saveurs de Ferme décline toute responsabilité pour tout dommage résultant d'une 
              intrusion frauduleuse d'un tiers ayant entraîné une modification des informations 
              présentes sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">5. Liens Hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d'autres sites internet. Box Saveurs de Ferme 
              n'exerce aucun contrôle sur ces sites et n'assume aucune responsabilité quant à leur 
              contenu ou aux pratiques de confidentialité qu'ils appliquent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">6. Droit Applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit canadien. En cas de litige, 
              les tribunaux québécois seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy mb-4">7. Contact</h2>
            <p>
              Pour toute question concernant les mentions légales du site :
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

export default LegalPage;
