import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout,
    clearCart 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Panier vide", {
        description: "Ajoutez des articles à votre panier avant de passer à la caisse.",
      });
      return;
    }

    try {
      const checkoutUrl = await createCheckout();
      console.log('Checkout URL received:', checkoutUrl);
      
      if (checkoutUrl) {
        // Open in new tab
        const newWindow = window.open(checkoutUrl, '_blank');
        
        if (newWindow) {
          setIsOpen(false);
          clearCart();
          toast.success("Redirection vers le paiement", {
            description: "Une nouvelle fenêtre s'est ouverte pour finaliser votre commande.",
          });
        } else {
          // Popup blocked - provide direct link
          toast.error("Fenêtre bloquée par le navigateur", {
            description: "Veuillez autoriser les popups ou cliquez sur le lien ci-dessous.",
            action: {
              label: "Ouvrir",
              onClick: () => window.location.href = checkoutUrl,
            },
          });
        }
      } else {
        toast.error("Erreur lors de la création du panier", {
          description: "Veuillez réessayer ou nous contacter si le problème persiste.",
        });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Erreur lors du paiement", {
        description: error instanceof Error ? error.message : "Veuillez réessayer ou nous contacter.",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110 active:scale-95 relative">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-yellow text-yellow-foreground">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Panier</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Votre panier est vide" : `${totalItems} article${totalItems !== 1 ? 's' : ''} dans votre panier`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Votre panier est vide</p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  Découvrez nos box et ajoutez-les à votre panier
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground">
                            {item.variantTitle}
                          </p>
                        )}
                        <p className="font-semibold text-primary mt-1">
                          {parseFloat(item.price.amount).toFixed(2)} {item.price.currencyCode === 'CAD' ? '$' : item.price.currencyCode}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fixed checkout section */}
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {totalPrice.toFixed(2)} $
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Création du panier...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Passer à la caisse
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => {
                    clearCart();
                    toast.success("Panier vidé");
                  }}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vider le panier
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Paiement sécurisé via Shopify
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
