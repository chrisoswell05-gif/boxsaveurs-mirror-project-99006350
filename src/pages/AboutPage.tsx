import { motion } from "framer-motion";
import { Heart, Leaf, Users, Award, MapPin, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import quebecFarmImage from "@/assets/quebec-farm.jpg";
const AboutPage = () => {
  const values = [{
    icon: Heart,
    title: "Passion",
    description: "Chaque box est préparée avec amour et attention aux détails"
  }, {
    icon: Leaf,
    title: "Authenticité",
    description: "Des produits 100% naturels issus de fermes locales"
  }, {
    icon: Users,
    title: "Communauté",
    description: "Nous soutenons les producteurs locaux et leurs familles"
  }, {
    icon: Award,
    title: "Qualité",
    description: "Sélection rigoureuse des meilleurs produits artisanaux"
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-yellow/20 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Notre Histoire
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-foreground mb-6">
              À Propos de <span className="text-yellow">Box Saveurs de Ferme</span>
            </h1>
            <p className="text-lg text-navy-foreground/80">
              Une aventure gourmande née de la passion pour les produits authentiques 
              et le désir de reconnecter les familles avec le terroir.
            </p>
          </motion.div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="hsl(var(--background))" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              {/* Image à gauche */}
              <motion.div className="lg:w-1/2 flex-shrink-0" initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-yellow/20 to-primary/10 rounded-3xl blur-2xl" />
                  <img alt="Ferme québécoise avec vaches et récoltes fraîches" className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl" src="/lovable-uploads/c05b504c-5179-4ce7-9777-8b4e2748b0d5.jpg" />
                </div>
              </motion.div>

              {/* Texte à droite */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Salut, ravi de vous rencontrer!!!
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Vous êtes-vous déjà demandé d'où viennent les saveurs authentiques que nous mettons dans votre box ?
                  Nous aimerions vous partager quelques secrets.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  De la terre riche qui nourrit nos cultures aux soins attentifs donnés à chaque animal, 
                  chaque produit que nous sélectionnons raconte une histoire de patience et de passion. 
                  Derrière chaque pot de yaourt, chaque bouteille de lait ou chaque fromage affiné, 
                  il y a le savoir-faire de producteurs locaux du Québec qui perpétuent des traditions 
                  avec amour et respect de la nature.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Notre mission est simple : vous offrir, chez vous, le goût vrai et sincère de la ferme, 
                  tel qu'il devrait toujours être. Parce que savourer des produits fermiers, ce n'est pas 
                  seulement manger, c'est aussi redécouvrir un lien avec la terre et avec ceux qui la cultivent.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
              <motion.div className="flex-shrink-0" whileHover={{
              scale: 1.05
            }} transition={{
              duration: 0.3
            }}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-yellow/30 to-primary/20 rounded-full blur-xl" />
                  <img alt="Chris Oswell - CEO" className="relative w-56 h-56 rounded-full object-cover shadow-2xl border-4 border-yellow" src="/lovable-uploads/8fc08bef-2fdf-489e-aa15-7eafd90e318b.jpg" />
                </div>
              </motion.div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Chris Oswell</h2>
                  <p className="text-primary font-medium">CEO</p>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg italic border-l-4 border-yellow pl-4">
                    "Chez Saveurs de Ferme, nous croyons que chaque produit doit raconter une histoire : 
                    celle d'un terroir, d'un savoir-faire et d'un engagement pour la qualité."
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    Notre promesse : du goût, de l'authenticité et une petite dose de bonheur dans chaque box.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Québec, Canada</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident chacune de nos actions
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => <ScrollReveal key={index}>
                <motion.div whileHover={{
              y: -8,
              scale: 1.02
            }} className="bg-card p-6 rounded-2xl shadow-lg border border-border text-center h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              </ScrollReveal>)}
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="py-20 px-6 bg-navy">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-navy-foreground mb-6">Notre Mission</h2>
              <p className="text-xl text-navy-foreground/90 leading-relaxed mb-8">
                Reconnecter les familles avec les saveurs authentiques du terroir en leur offrant 
                chaque mois une sélection de produits artisanaux soigneusement choisis auprès 
                de nos producteurs locaux passionnés.
              </p>
              <motion.a href="/nos-box" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="inline-flex items-center gap-2 bg-yellow text-navy font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                Découvrir nos box
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AboutPage;