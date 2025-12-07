import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const orderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  customerEmail: z
    .string()
    .trim()
    .email({ message: "Veuillez entrer une adresse email valide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  customerPhone: z
    .string()
    .max(20, { message: "Le téléphone ne peut pas dépasser 20 caractères" })
    .optional()
    .or(z.literal("")),
  addressLine1: z
    .string()
    .trim()
    .min(5, { message: "L'adresse doit contenir au moins 5 caractères" })
    .max(200, { message: "L'adresse ne peut pas dépasser 200 caractères" }),
  addressLine2: z
    .string()
    .max(200, { message: "Le complément ne peut pas dépasser 200 caractères" })
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .min(2, { message: "La ville doit contenir au moins 2 caractères" })
    .max(100, { message: "La ville ne peut pas dépasser 100 caractères" }),
  postalCode: z
    .string()
    .trim()
    .min(3, { message: "Le code postal doit contenir au moins 3 caractères" })
    .max(10, { message: "Le code postal ne peut pas dépasser 10 caractères" }),
  country: z
    .string()
    .trim()
    .min(2, { message: "Le pays doit contenir au moins 2 caractères" })
    .max(100, { message: "Le pays ne peut pas dépasser 100 caractères" }),
  customerNotes: z
    .string()
    .max(1000, { message: "Les notes ne peuvent pas dépasser 1000 caractères" })
    .optional()
    .or(z.literal("")),
});

type OrderFormData = z.infer<typeof orderSchema>;

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

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: "Canada",
      customerNotes: ""
    },
  });

  const getSubscriptionType = (boxName: string): string => {
    if (boxName.includes("LA BASE")) return "bimensuel";
    if (boxName.includes("SAVEURS CACHÉES")) return "mensuel_3_mois";
    if (boxName.includes("L'ANNÉE")) return "annuel";
    return "mensuel";
  };

  const onSubmit = async (data: OrderFormData) => {
    setLoading(true);

    try {
      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone || null,
          address_line1: data.addressLine1,
          address_line2: data.addressLine2 || null,
          city: data.city,
          postal_code: data.postalCode,
          country: data.country,
          box_name: boxName,
          box_price: boxPrice,
          subscription_type: getSubscriptionType(boxName),
          quiz_response_id: quizResponseId || null,
          customer_notes: data.customerNotes || null,
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
          customerName: data.customerName,
          customerEmail: data.customerEmail,
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
      
      form.reset();
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Informations personnelles
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jean.dupont@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 514 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Adresse de livraison
              </h3>
              
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse *</FormLabel>
                    <FormControl>
                      <Input placeholder="12 Rue de la Ferme" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complément d'adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Appartement, bâtiment, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville *</FormLabel>
                      <FormControl>
                        <Input placeholder="Montréal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code postal *</FormLabel>
                      <FormControl>
                        <Input placeholder="H2X 1Y4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Customer Notes */}
            <FormField
              control={form.control}
              name="customerNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes ou instructions spéciales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Allergies, préférences de livraison, etc."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
