import conceptImage from "@/assets/concept-image.jpg";

const ConceptSection = () => {
  return (
    <section className="bg-background py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <img 
              src={conceptImage} 
              alt="Produits artisanaux de la box" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">NOTRE CONCEPT</h2>
            <p className="text-foreground leading-relaxed">
              l'idée d'un gourmand passionné de la consommation des produit bio et naturelle en collaboration avec des producteurs locaux et nos chef cuisinier. nous partageons notre savoir-faire artisanal qui reconnecte les gens avec ce qu'il y a de plus simple et de plus vrai des produits laitiers authentiques, naturels et savoureux.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-foreground">Vous trouverez dans votre box :</p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Du yaourt de ferme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Du frommage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Des fruits lyophilise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Un guide de recette</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Du lait</span>
                </li>
              </ul>
              <p className="text-foreground font-medium pt-2">
                Tout cela grâce aux savoirs-faire Quebecois et canadien !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
