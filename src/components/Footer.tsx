import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-olive py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <img src={logo} alt="Box Saveurs de Ferme" className="h-16 w-16" />
            <p className="text-olive-foreground font-semibold">saveurs de ferme</p>
          </div>
          <div className="space-y-3">
            <a href="#contact" className="block text-olive-foreground hover:underline">
              Email: contact@boxsaveursdeferme.ca
            </a>
            <a href="#offrir" className="block text-olive-foreground hover:underline">
              Offrir
            </a>
            <a href="#abonner" className="block text-olive-foreground hover:underline">
              S'abonner
            </a>
          </div>
          <div className="space-y-3 text-olive-foreground">
            <a href="#cgv" className="block hover:underline">
              Conditions générales de vente
            </a>
            <a href="#confidentialite" className="block hover:underline">
              Politique de confidentialité
            </a>
            <a href="#livraison" className="block hover:underline">
              Conditions de Livraison
            </a>
            <a href="#mentions" className="block hover:underline">
              Mentions légales
            </a>
            <a href="#remboursement" className="block hover:underline">
              Remboursement
            </a>
          </div>
        </div>
        <div className="border-t border-olive-foreground/20 pt-8">
          <div className="flex flex-wrap gap-4 justify-center text-olive-foreground text-sm">
            <span>PARFAIT POUR OFFRIR</span>
            <span>•</span>
            <span>FRAICHEUR GARANTIE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
