import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boxName: string;
  boxPrice: string;
  boxDescription: string;
  quizResponseId?: string;
}

export const OrderDialog = ({
  open,
  onOpenChange,
  boxName,
  boxPrice,
  boxDescription,
  quizResponseId
}: OrderDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "France",
    customerNotes: ""
  });

  const getSubscriptionType = (boxName: string): string => {
    if (boxName.includes("LA BASE")) return "bimensuel";
    if (boxName.includes("SAVEURS CACHÉES")) return "mensuel_3_mois";
    if (boxName.includes("L'ANNÉE")) return "annuel";
    return "mensuel";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.customerEmail || !formData.addressLine1 || 
        !formData.city || !formData.postalCode) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);

    try {
      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone || null,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2 || null,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country,
          box_name: boxName,
          box_price: boxPrice,
          subscription_type: getSubscriptionType(boxName),
          quiz_response_id: quizResponseId || null,
          customer_notes: formData.customerNotes || null,
          user_agent: navigator.userAgent,
          status: 'pending',
          payment_status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          boxName: boxName,
          boxPrice: boxPrice,
          boxDescription: boxDescription,
          orderId: orderData.id
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't block the order if email fails
      }

      toast.success("Commande enregistrée avec succès ! Vous allez recevoir un email de confirmation.");
      
      // Reset form
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "France",
        customerNotes: ""
      });
      
      onOpenChange(false);
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Commander votre box</DialogTitle>
          <DialogDescription>
            {boxName} - {boxPrice}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Informations personnelles
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nom complet *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  required
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Téléphone</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Adresse de livraison
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Adresse *</Label>
              <Input
                id="addressLine1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
                required
                placeholder="12 Rue de la Ferme"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine2">Complément d'adresse</Label>
              <Input
                id="addressLine2"
                value={formData.addressLine2}
                onChange={(e) => setFormData({...formData, addressLine2: e.target.value})}
                placeholder="Appartement, bâtiment, etc."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                  placeholder="Paris"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  required
                  placeholder="75001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Pays *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          <div className="space-y-2">
            <Label htmlFor="customerNotes">Notes ou instructions spéciales</Label>
            <Textarea
              id="customerNotes"
              value={formData.customerNotes}
              onChange={(e) => setFormData({...formData, customerNotes: e.target.value})}
              placeholder="Allergies, préférences de livraison, etc."
              rows={3}
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Confirmer la commande"
              )}
            </Button>
          </DialogFooter>

          <p className="text-xs text-muted-foreground text-center">
            En confirmant votre commande, vous acceptez nos conditions générales de vente.
            Vous recevrez un email de confirmation avec les détails de paiement.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
