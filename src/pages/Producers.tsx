import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Heart } from "lucide-react";

interface Producer {
  id: number;
  name: string;
  region: string;
  story: string;
  specialties: string[];
  image: string;
  awards?: string[];
}

const producers: Producer[] = [
  {
    id: 1,
    name: "Fromagerie des Cantons",
    region: "Estrie, Québec",
    story: "Depuis trois générations, la famille Bergeron perpétue la tradition fromagère québécoise. Leur passion pour l'excellence et le respect du terroir se retrouve dans chacun de leurs fromages artisanaux, élaborés avec le lait de leurs propres vaches.",
    specialties: [
      "Cheddar vieilli 5 ans",
      "Tomme des Cantons",
      "Bleu d'Estrie",
      "Raclette artisanale"
    ],
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800",
    awards: ["Prix Caseus 2023", "Meilleur cheddar du Québec"]
  },
  {
    id: 2,
    name: "Ferme Laitière Saint-Laurent",
    region: "Montérégie, Québec",
    story: "Établie en 1952, notre ferme familiale se distingue par son engagement envers le bien-être animal et les pratiques durables. Nos fromages frais et notre crème épaisse sont reconnus pour leur onctuosité exceptionnelle et leur goût authentique.",
    specialties: [
      "Brie de la ferme",
      "Camembert artisanal",
      "Fromage frais aux herbes",
      "Crème épaisse fermière"
    ],
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800",
    awards: ["Certification biologique", "Ferme certifiée bien-être animal"]
  },
  {
    id: 3,
    name: "Les Artisans du Lait",
    region: "Charlevoix, Québec",
    story: "Notre fromagerie boutique allie tradition et innovation. Inspirés par les méthodes ancestrales européennes et les saveurs du Québec, nous créons des fromages uniques qui racontent l'histoire de notre belle région de Charlevoix.",
    specialties: [
      "Migneron de Charlevoix",
      "Hercule de Charlevoix",
      "Fleurmier",
      "Ciel de Charlevoix"
    ],
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800",
    awards: ["Prix du public 2023", "Médaille d'or - Fromages fins"]
  },
  {
    id: 4,
    name: "Bergerie du Plateau",
    region: "Laurentides, Québec",
    story: "Spécialisés dans les fromages de brebis, nous élevons notre troupeau avec soin dans les magnifiques paysages des Laurentides. Notre approche artisanale et notre respect du rythme naturel des saisons donnent naissance à des fromages d'une finesse remarquable.",
    specialties: [
      "Feta de brebis",
      "Tomme de brebis affinée",
      "Ricotta fraîche",
      "Bleu de brebis"
    ],
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=800",
    awards: ["Meilleur fromage de brebis 2023"]
  },
  {
    id: 5,
    name: "Fromagerie Terroir & Tradition",
    region: "Bas-Saint-Laurent, Québec",
    story: "Notre mission est de préserver et valoriser les techniques fromagères traditionnelles tout en cultivant l'innovation. Chaque meule est façonnée à la main et affinée avec patience dans nos caves naturelles, pour révéler toute la complexité des saveurs.",
    specialties: [
      "Gruyère du Québec",
      "Comté artisanal",
      "Munster fermier",
      "Reblochon québécois"
    ],
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800",
    awards: ["Grand Prix des fromages 2022", "Certification AOC"]
  },
  {
    id: 6,
    name: "Laiterie des Îles",
    region: "Îles-de-la-Madeleine, Québec",
    story: "Nichée au cœur des Îles-de-la-Madeleine, notre laiterie profite d'un terroir unique influencé par l'air marin. Cette particularité confère à nos fromages des notes subtiles et une personnalité incomparable qui fait voyager les papilles.",
    specialties: [
      "Pied-de-Vent",
      "Tomme des Îles",
      "Beurre salé des Îles",
      "Fromage à pâte molle"
    ],
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=800",
    awards: ["Saveur unique des Îles", "Prix terroir maritime"]
  }
];

const Producers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Nos Producteurs Partenaires
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les artisans passionnés qui façonnent les meilleurs fromages et produits laitiers du Québec
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {producers.map((producer, index) => (
            <motion.div
              key={producer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={producer.image}
                    alt={producer.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {producer.name}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {producer.region}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {producer.story}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-foreground">Spécialités :</h4>
                    <div className="flex flex-wrap gap-2">
                      {producer.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {producer.awards && producer.awards.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        <div className="flex flex-wrap gap-2">
                          {producer.awards.map((award, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-muted-foreground italic"
                            >
                              {award}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 p-8 bg-muted rounded-lg max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Envie de découvrir ces trésors du terroir ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Recevez une sélection de fromages et produits laitiers de nos producteurs partenaires directement chez vous
          </p>
          <a
            href="/#offrir"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Découvrir nos box
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Producers;
