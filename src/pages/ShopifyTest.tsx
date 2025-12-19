import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ShopifyTest = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(10);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">Shopify API Test</h1>
            <p className="text-muted-foreground mb-8">Testing connection to Shopify Storefront API</p>

            {/* Connection Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Connection Status
                  {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                  {!loading && !error && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {!loading && error && <XCircle className="h-5 w-5 text-destructive" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading && <p className="text-muted-foreground">Connecting to Shopify...</p>}
                {!loading && !error && (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">✓ Successfully connected to Shopify Storefront API</p>
                    <p className="text-muted-foreground">Found {products.length} product(s)</p>
                  </div>
                )}
                {!loading && error && (
                  <p className="text-destructive">{error}</p>
                )}
              </CardContent>
            </Card>

            {/* Products Grid */}
            {!loading && !error && (
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Products</h2>
                {products.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No products found in your Shopify store.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {products.map((product) => (
                      <Card key={product.node.id} className="overflow-hidden">
                        {product.node.images.edges[0]?.node && (
                          <div className="aspect-video bg-muted">
                            <img
                              src={product.node.images.edges[0].node.url}
                              alt={product.node.images.edges[0].node.altText || product.node.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-lg">{product.node.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary">
                              {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                              {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {product.node.variants.edges.length} variant(s)
                            </span>
                          </div>
                          {product.node.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.node.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopifyTest;
