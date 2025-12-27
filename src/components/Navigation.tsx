import { Search, User, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import logo from "@/assets/logo.png";
import CartDrawer from "@/components/CartDrawer";
import { Input } from "@/components/ui/input";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

const Navigation = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ShopifyProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await fetchProducts(10, `title:*${searchQuery}*`);
        setSearchResults(results);
      } catch (error) {
        console.error("Erreur de recherche:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const handleProductClick = (handle: string) => {
    navigate(`/product/${handle}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <nav className="bg-background border-b border-border py-4 px-6 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src={logo} alt="Box Saveurs de Ferme" className="h-16 w-16 transition-transform duration-300 hover:scale-110" />
          <ul className="hidden md:flex items-center gap-6 text-foreground font-medium">
            <li><a href="/" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Accueil</a></li>
            <li><a href="/nos-box" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Nos Box</a></li>
            <li><a href="/a-propos" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">À propos</a></li>
            <li><a href="/faq" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">FAQ</a></li>
            <li><a href="/contact" className="relative hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button 
              onClick={() => navigate("/admin/referrals")}
              className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95 bg-primary/20"
              title="Administration"
            >
              <Shield className="w-5 h-5 text-primary" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {isSearchOpen ? <X className="w-5 h-5 text-foreground" /> : <Search className="w-5 h-5 text-foreground" />}
          </button>
          <button 
            onClick={handleUserClick}
            className={`p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${user ? 'bg-yellow/20' : ''}`}
          >
            <User className="w-5 h-5 text-foreground" />
          </button>
          <CartDrawer />
        </div>
      </div>

      {/* Barre de recherche */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-lg z-50">
          <div className="container mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
                autoFocus
              />
            </div>
            
            {/* Résultats de recherche */}
            {searchQuery.length >= 2 && (
              <div className="mt-4">
                {isSearching ? (
                  <p className="text-muted-foreground text-center py-4">Recherche en cours...</p>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <div
                        key={product.node.id}
                        onClick={() => handleProductClick(product.node.handle)}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      >
                        {product.node.images.edges[0]?.node.url && (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{product.node.title}</h4>
                          <p className="text-primary font-semibold">
                            {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} {product.node.priceRange.minVariantPrice.currencyCode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">Aucun produit trouvé pour "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
