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
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🥛</span>
                  <div>
                    <strong>Yaourts artisanaux</strong>
                    <p className="text-sm text-muted-foreground">Nature, fruité à la fraise, à l'érable... Des saveurs authentiques et variées</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🧀</span>
                  <div>
                    <strong>Fromage du terroir</strong>
                    <p className="text-sm text-muted-foreground">Sélection de fromages artisanaux locaux</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🥛</span>
                  <div>
                    <strong>Lait d'antan ou au chocolat</strong>
                    <p className="text-sm text-muted-foreground">Souvent avec crème onctueuse pour plus de gourmandise</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🍓</span>
                  <div>
                    <strong>Fruits lyophilisés</strong>
                    <p className="text-sm text-muted-foreground">Pour sublimer vos créations culinaires</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📖</span>
                  <div>
                    <strong>Guide de recettes</strong>
                    <p className="text-sm text-muted-foreground">Découvrez de nouvelles façons de savourer nos produits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🥄</span>
                  <div>
                    <strong>Cuillère bambou ou inox</strong>
                    <p className="text-sm text-muted-foreground">Un accessoire durable et élégant</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <strong>Petit cadeau surprise</strong>
                    <p className="text-sm text-muted-foreground">Une petite attention pour égayer votre dégustation</p>
                  </div>
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
