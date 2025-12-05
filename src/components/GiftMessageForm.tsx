import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gift, Heart, Calendar, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const giftOptions = [
  {
    id: "discovery",
    title: "BOX DÉCOUVERTE",
    subtitle: "1 box unique",
    price: "39.99$",
  },
  {
    id: "3months",
    title: "COFFRET 3 MOIS",
    subtitle: "3 box livrées mensuellement",
    price: "99.99$",
    isBestGift: true,
  },
  {
    id: "6months",
    title: "COFFRET 6 MOIS",
    subtitle: "6 box livrées mensuellement",
    price: "179.99$",
  },
];

const giftMessageSchema = z.object({
  selectedGift: z.string().min(1, "Veuillez sélectionner un coffret"),
  recipientName: z.string().trim().min(1, "Le nom du destinataire est requis").max(100),
  recipientEmail: z.string().trim().email("Email invalide").max(255),
  senderName: z.string().trim().min(1, "Votre nom est requis").max(100),
  deliveryDate: z.string().min(1, "La date de livraison est requise"),
  message: z.string().trim().max(500, "Le message ne doit pas dépasser 500 caractères"),
});

type GiftMessageFormData = z.infer<typeof giftMessageSchema>;

const GiftMessageForm = () => {
  const [formData, setFormData] = useState<GiftMessageFormData>({
    selectedGift: "",
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    deliveryDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GiftMessageFormData, string>>>({});
  const [charCount, setCharCount] = useState(0);

  const handleChange = (field: keyof GiftMessageFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "message") {
      setCharCount(value.length);
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = giftMessageSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof GiftMessageFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof GiftMessageFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const selectedGiftOption = giftOptions.find(g => g.id === formData.selectedGift);
    toast.success("Commande cadeau enregistrée !", {
      description: `${selectedGiftOption?.title} - ${selectedGiftOption?.price}`,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="p-6 border-border/50 bg-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow/20 rounded-full">
          <Heart className="w-5 h-5 text-yellow" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-foreground">
            Offrez une box Saveurs de Ferme
          </h4>
          <p className="text-sm text-muted-foreground">
            Sélectionnez votre coffret et personnalisez votre message
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gift Selection */}
        <div className="space-y-3">
          <Label className="text-foreground font-semibold">
            Choisissez votre coffret cadeau *
          </Label>
          <RadioGroup
            value={formData.selectedGift}
            onValueChange={(value) => handleChange("selectedGift", value)}
            className="grid gap-3"
          >
            {giftOptions.map((gift) => (
              <Label
                key={gift.id}
                htmlFor={gift.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.selectedGift === gift.id
                    ? "border-yellow bg-yellow/10"
                    : "border-border/50 hover:border-yellow/50"
                } ${gift.isBestGift ? "ring-1 ring-yellow/30" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={gift.id} id={gift.id} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.selectedGift === gift.id
                      ? "border-yellow bg-yellow"
                      : "border-muted-foreground"
                  }`}>
                    {formData.selectedGift === gift.id && (
                      <Check className="w-3 h-3 text-yellow-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{gift.title}</span>
                      {gift.isBestGift && (
                        <span className="text-xs bg-yellow text-yellow-foreground px-2 py-0.5 rounded-full">
                          Populaire
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{gift.subtitle}</span>
                  </div>
                </div>
                <span className="font-bold text-foreground">{gift.price}</span>
              </Label>
            ))}
          </RadioGroup>
          {errors.selectedGift && (
            <p className="text-xs text-destructive">{errors.selectedGift}</p>
          )}
        </div>

        <div className="border-t border-border/50 pt-6">
          <h5 className="font-semibold text-foreground mb-4">Informations de livraison</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="text-foreground">
                Nom du destinataire *
              </Label>
              <Input
                id="recipientName"
                placeholder="Marie Dupont"
                value={formData.recipientName}
                onChange={(e) => handleChange("recipientName", e.target.value)}
                className={errors.recipientName ? "border-destructive" : ""}
              />
              {errors.recipientName && (
                <p className="text-xs text-destructive">{errors.recipientName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientEmail" className="text-foreground">
                Email du destinataire *
              </Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="marie@exemple.com"
                value={formData.recipientEmail}
                onChange={(e) => handleChange("recipientEmail", e.target.value)}
                className={errors.recipientEmail ? "border-destructive" : ""}
              />
              {errors.recipientEmail && (
                <p className="text-xs text-destructive">{errors.recipientEmail}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="senderName" className="text-foreground">
                Votre nom *
              </Label>
              <Input
                id="senderName"
                placeholder="Jean Martin"
                value={formData.senderName}
                onChange={(e) => handleChange("senderName", e.target.value)}
                className={errors.senderName ? "border-destructive" : ""}
              />
              {errors.senderName && (
                <p className="text-xs text-destructive">{errors.senderName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date de livraison souhaitée *
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                min={today}
                value={formData.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                className={errors.deliveryDate ? "border-destructive" : ""}
              />
              {errors.deliveryDate && (
                <p className="text-xs text-destructive">{errors.deliveryDate}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Votre message personnalisé
          </Label>
          <Textarea
            id="message"
            placeholder="Écrivez un message personnel pour accompagner votre cadeau... Ex: Joyeux anniversaire ! J'espère que cette box te fera découvrir de délicieuses saveurs du terroir."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={`min-h-[120px] resize-none ${errors.message ? "border-destructive" : ""}`}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            {errors.message ? (
              <p className="text-xs text-destructive">{errors.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Optionnel - Ce message sera imprimé sur la carte cadeau
              </p>
            )}
            <span className={`text-xs ${charCount > 450 ? "text-yellow" : "text-muted-foreground"}`}>
              {charCount}/500
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">
              {giftOptions.find(g => g.id === formData.selectedGift)?.price || "—"}
            </span>
          </div>
          <Button type="submit" variant="premium" className="w-full" disabled={!formData.selectedGift}>
            <Gift className="w-4 h-4 mr-2" />
            Commander ce coffret cadeau
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          <Gift className="w-4 h-4 inline mr-1" />
          Le destinataire recevra un email de notification le jour de la livraison avec votre message personnalisé.
        </p>
      </div>
    </Card>
  );
};

export default GiftMessageForm;
