import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Package } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

interface ShopifyProductsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

const ShopifyProductsSection = ({ 
  title = "Nos produits", 
  subtitle = "Découvrez notre sélection de produits artisanaux",
  limit = 10 
}: ShopifyProductsSectionProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts(limit);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Impossible de charger les produits");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [limit]);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error("Produit non disponible");
      return;
    }

    // Get selling plan if product requires subscription
    const sellingPlan = product.node.sellingPlanGroups?.edges?.[0]?.node?.sellingPlans?.edges?.[0]?.node;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
      sellingPlanId: sellingPlan?.id,
    });

    toast.success("Ajouté au panier", {
      description: product.node.title,
    });
  };

  if (error) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">
            {title}
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            {subtitle}
          </p>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="w-full h-48 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun produit disponible</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              const isSubscription = product.node.requiresSellingPlan;

              return (
                <ScrollReveal key={product.node.id} delay={index * 0.1}>
                  <Card className="overflow-hidden hover-lift border-border/50 h-full flex flex-col">
                    <Link to={`/product/${product.node.handle}`} className="block">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </Link>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      
                      {product.node.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
                          {product.node.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold text-foreground">
                            {parseFloat(price.amount).toFixed(2)}$
                          </span>
                          {isSubscription && (
                            <span className="text-sm text-muted-foreground">/mois</span>
                          )}
                        </div>
                        {isSubscription && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Abonnement
                          </span>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full gap-2"
                        variant="premium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Ajouter au panier
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopifyProductsSection;
