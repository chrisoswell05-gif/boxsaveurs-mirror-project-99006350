import ScrollReveal from "@/components/ScrollReveal";
import { Card } from "@/components/ui/card";
import { MapPin, Award, Heart } from "lucide-react";

const producers = [
  {
    name: "Ferme Bellevue",
    specialty: "Yaourts artisanaux",
    location: "Montérégie, Québec",
    description: "Depuis 3 générations, la famille Tremblay produit des yaourts crémeux à partir du lait de leurs vaches élevées en pâturage.",
    icon: "🥛",
  },
  {
    name: "Fromagerie du Terroir",
    specialty: "Fromages affinés",
    location: "Charlevoix, Québec",
    description: "Maître fromager depuis 25 ans, Pierre crée des fromages uniques inspirés des traditions européennes et québécoises.",
    icon: "🧀",
  },
  {
    name: "Les Vergers Enchantés",
    specialty: "Fruits lyophilisés",
    location: "Laurentides, Québec",
    description: "Spécialistes de la lyophilisation, ils préservent toute la saveur et les nutriments des fruits cueillis à maturité.",
    icon: "🍓",
  },
  {
    name: "Laiterie Tradition",
    specialty: "Lait d'antan & chocolat",
    location: "Lanaudière, Québec",
    description: "Un lait onctueux comme autrefois, avec cette crème naturelle qui remonte à la surface. Un goût d'enfance retrouvé.",
    icon: "🥛",
  },
];

const ProducersSection = () => {
  return (
    <section id="producteurs" className="bg-cream py-16 px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              NOS PRODUCTEURS PARTENAIRES
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Derrière chaque produit de votre box, il y a des artisans passionnés qui perpétuent 
              un savoir-faire authentique. Découvrez ceux qui font la différence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {producers.map((producer, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full p-6 hover-lift border-border/50 hover:border-yellow/50 transition-all duration-300 bg-background">
                <div className="text-center space-y-4">
                  <div className="text-5xl mb-4">{producer.icon}</div>
                  <h3 className="font-bold text-lg text-foreground">{producer.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-yellow">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">{producer.specialty}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{producer.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {producer.description}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-navy/10 text-navy px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-yellow fill-yellow" />
              <span className="font-medium">
                100% de nos producteurs sont Québécois et Canadiens
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProducersSection;
