import { Search, User, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src={logo} alt="Box Saveurs de Ferme" className="h-16 w-16 transition-transform duration-300 hover:scale-110" />
          <ul className="hidden md:flex items-center gap-6 text-foreground font-medium">
            <li><a href="/" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Accueil</a></li>
            <li><a href="#nos-box" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Nos Box</a></li>
            <li><a href="#a-propos" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">À propos</a></li>
            <li><a href="#faq" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">FAQ</a></li>
            <li><a href="#contact" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
            <User className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
            <ShoppingCart className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
