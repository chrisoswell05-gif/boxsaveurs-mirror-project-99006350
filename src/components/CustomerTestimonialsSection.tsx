import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Marie-Claire D.",
    location: "Montréal, QC",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Une découverte incroyable ! Les produits sont d'une fraîcheur exceptionnelle et le goût authentique me rappelle mon enfance à la ferme. Je suis abonnée depuis 6 mois et je ne peux plus m'en passer !",
    product: "Box L'Année Gourmande"
  },
  {
    id: 2,
    name: "Jean-François L.",
    location: "Québec, QC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Enfin des produits qui ont du goût ! Le fromage est exceptionnel et les yaourts sont crémeux à souhait. Ma famille attend chaque livraison avec impatience.",
    product: "Box Saveurs Cachées"
  },
  {
    id: 3,
    name: "Sophie B.",
    location: "Sherbrooke, QC",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "J'ai offert cette box à mes parents et ils sont ravis ! La qualité des produits est irréprochable et le service client est aux petits soins. Un vrai coup de cœur !",
    product: "Box La Base du Goût"
  },
  {
    id: 4,
    name: "Philippe M.",
    location: "Laval, QC",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "En tant que chef, je suis très exigeant sur la qualité des ingrédients. Ces produits fermiers sont exactement ce que je recherchais : authenticité et excellence.",
    product: "Box L'Année Gourmande"
  },
  {
    id: 5,
    name: "Isabelle R.",
    location: "Gatineau, QC",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "La meilleure décision que j'ai prise cette année ! Mes enfants adorent les produits laitiers et moi je suis rassurée par la provenance locale et la qualité bio.",
    product: "Box Saveurs Cachées"
  },
  {
    id: 6,
    name: "Marc-André T.",
    location: "Trois-Rivières, QC",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Livraison impeccable, produits frais et savoureux. Le rapport qualité-prix est excellent. Je recommande à tous les amateurs de bons produits du terroir !",
    product: "Box La Base du Goût"
  }
];

const CustomerTestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ce que nos clients <span className="text-primary">disent de nous</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les avis de notre communauté de gourmets satisfaits
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border/50 hover:border-primary/30 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Header with Photo */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/80 flex-grow mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Product Badge */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                    {testimonial.product}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-muted-foreground text-sm">Clients satisfaits</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-muted-foreground text-sm">Note moyenne</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground text-sm">Taux de satisfaction</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground text-sm">Fermes partenaires</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonialsSection;
