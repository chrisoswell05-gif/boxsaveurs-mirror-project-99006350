import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ReviewsSection = () => {
  const reviews = [
    { name: "Sophie Martin", review: "Bonjour, cela fait plusieurs mois que je suis abonnée à Box Saveurs de Ferme et je suis ravie ! Les produits sont toujours frais et délicieux." },
    { name: "Marie Dubois", review: "Une découverte fantastique ! Chaque box est une surprise gourmande. Les fromages sont exceptionnels." },
    { name: "Julie Tremblay", review: "J'adore le concept ! Cela me permet de découvrir des producteurs locaux que je n'aurais jamais connus autrement." },
    { name: "Catherine Roy", review: "Les yaourts sont absolument délicieux. Ma famille attend chaque livraison avec impatience !" },
  ];

  return (
    <section className="bg-cream py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          LES AVIS DE NOS ABONNÉES
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            ))}
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" fillOpacity={0.5} />
          </div>
          <span className="text-foreground font-semibold">4,5/5</span>
          <span className="text-muted-foreground">98 avis</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 bg-card space-y-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-foreground">{review.name}</p>
              <p className="text-muted-foreground text-sm">{review.review}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="text-primary font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Voir tous les avis
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
