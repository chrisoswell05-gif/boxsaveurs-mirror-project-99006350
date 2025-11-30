import { Search, User, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src={logo} alt="Box Saveurs de Ferme" className="h-16 w-16" />
          <ul className="hidden md:flex items-center gap-6 text-foreground font-medium">
            <li><a href="/" className="hover:text-primary transition-colors">Accueil</a></li>
            <li><a href="#nos-box" className="hover:text-primary transition-colors">Nos Box</a></li>
            <li><a href="#a-propos" className="hover:text-primary transition-colors">À propos</a></li>
            <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <User className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
