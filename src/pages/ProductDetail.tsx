import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

interface ProductData {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      setLoading(true);
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          const productData = data.data.productByHandle;
          setProduct(productData);
          
          // Initialize selected options with first values
          const initialOptions: Record<string, string> = {};
          productData.options?.forEach((option: { name: string; values: string[] }) => {
            if (option.values.length > 0) {
              initialOptions[option.name] = option.values[0];
            }
          });
          setSelectedOptions(initialOptions);
        } else {
          setError("Produit non trouvé");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const getSelectedVariant = () => {
    if (!product) return null;
    
    return product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      );
    })?.node;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = getSelectedVariant();
    if (!variant) {
      toast.error("Veuillez sélectionner une variante");
      return;
    }

    if (!variant.availableForSale) {
      toast.error("Ce produit n'est pas disponible");
      return;
    }

    const cartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions,
    };

    addItem(cartItem);
    toast.success("Produit ajouté au panier", {
      position: "top-center",
    });
  };

  const selectedVariant = getSelectedVariant();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-muted-foreground">{error || "Produit non trouvé"}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              {images[selectedImage]?.node.url ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Aucune image
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-primary">
                {parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
                {selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>

            {/* Options */}
            {product.options && product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() => setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedOptions[option.name] === value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Availability */}
            {selectedVariant && (
              <div>
                {selectedVariant.availableForSale ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    En stock
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Rupture de stock
                  </Badge>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantité
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ajouter au panier
            </Button>

            {/* Description */}
            {product.description && (
              <div className="pt-6 border-t border-border">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Description
                </h2>
                {product.descriptionHtml ? (
                  <div
                    className="prose prose-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p className="text-muted-foreground">{product.description}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subscription Plans */}
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
