import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gift, Heart, Calendar, Check, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";

const giftOptions = [
  {
    id: "discovery",
    title: "BOX DÉCOUVERTE",
    subtitle: "1 box unique",
    price: "39.99$",
    description: "Idéal pour une première découverte",
  },
  {
    id: "3months",
    title: "COFFRET 3 MOIS",
    subtitle: "3 box livrées mensuellement",
    price: "99.99$",
    description: "Le cadeau qui dure",
    isBestGift: true,
  },
  {
    id: "6months",
    title: "COFFRET 6 MOIS",
    subtitle: "6 box livrées mensuellement",
    price: "179.99$",
    description: "Pour les vrais gourmands",
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
  const selectedGiftOption = giftOptions.find(g => g.id === formData.selectedGift);

  return (
    <Card className="overflow-hidden border-border/50 bg-card shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow/10 via-yellow/5 to-transparent p-6 border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow/20 rounded-xl">
            <Heart className="w-6 h-6 text-yellow" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-foreground">
              Créez votre coffret cadeau
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Personnalisez chaque détail pour un cadeau unique
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Gift Selection */}
        <div className="space-y-4">
          <Label className="text-foreground font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow" />
            Choisissez votre coffret cadeau
          </Label>
          <RadioGroup
            value={formData.selectedGift}
            onValueChange={(value) => handleChange("selectedGift", value)}
            className="grid gap-4"
          >
            {giftOptions.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Label
                  htmlFor={gift.id}
                  className={`relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.selectedGift === gift.id
                      ? "border-yellow bg-yellow/5 shadow-md"
                      : "border-border/50 hover:border-yellow/50 hover:bg-muted/30"
                  } ${gift.isBestGift ? "ring-1 ring-yellow/30" : ""}`}
                >
                  {gift.isBestGift && (
                    <div className="absolute -top-3 left-4">
                      <span className="inline-flex items-center gap-1 text-xs bg-yellow text-yellow-foreground px-3 py-1 rounded-full font-semibold shadow-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={gift.id} id={gift.id} className="sr-only" />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.selectedGift === gift.id
                        ? "border-yellow bg-yellow"
                        : "border-muted-foreground/40"
                    }`}>
                      {formData.selectedGift === gift.id && (
                        <Check className="w-3.5 h-3.5 text-yellow-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{gift.title}</div>
                      <div className="text-sm text-muted-foreground">{gift.subtitle}</div>
                      <div className="text-xs text-muted-foreground/70 mt-0.5">{gift.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-foreground">{gift.price}</span>
                  </div>
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
          {errors.selectedGift && (
            <p className="text-sm text-destructive">{errors.selectedGift}</p>
          )}
        </div>

        {/* Delivery Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/50">
            <Gift className="w-4 h-4 text-primary" />
            <h5 className="font-semibold text-foreground">Informations de livraison</h5>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="text-foreground">
                Nom du destinataire <span className="text-destructive">*</span>
              </Label>
              <Input
                id="recipientName"
                placeholder="Marie Dupont"
                value={formData.recipientName}
                onChange={(e) => handleChange("recipientName", e.target.value)}
                className={`h-11 ${errors.recipientName ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.recipientName && (
                <p className="text-xs text-destructive">{errors.recipientName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientEmail" className="text-foreground">
                Email du destinataire <span className="text-destructive">*</span>
              </Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="marie@exemple.com"
                value={formData.recipientEmail}
                onChange={(e) => handleChange("recipientEmail", e.target.value)}
                className={`h-11 ${errors.recipientEmail ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.recipientEmail && (
                <p className="text-xs text-destructive">{errors.recipientEmail}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderName" className="text-foreground">
                Votre nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="senderName"
                placeholder="Jean Martin"
                value={formData.senderName}
                onChange={(e) => handleChange("senderName", e.target.value)}
                className={`h-11 ${errors.senderName ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.senderName && (
                <p className="text-xs text-destructive">{errors.senderName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Date de livraison <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                min={today}
                value={formData.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                className={`h-11 ${errors.deliveryDate ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.deliveryDate && (
                <p className="text-xs text-destructive">{errors.deliveryDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Message */}
        <div className="space-y-3">
          <Label htmlFor="message" className="text-foreground flex items-center gap-2">
            <Heart className="w-4 h-4 text-muted-foreground" />
            Votre message personnalisé
            <span className="text-xs text-muted-foreground">(optionnel)</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Écrivez un message personnel pour accompagner votre cadeau... Ex: Joyeux anniversaire ! J'espère que cette box te fera découvrir de délicieuses saveurs du terroir."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={`min-h-[140px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Ce message sera imprimé sur la carte cadeau
            </p>
            <span className={`text-xs font-medium ${charCount > 450 ? "text-yellow" : "text-muted-foreground"}`}>
              {charCount}/500
            </span>
          </div>
        </div>

        {/* Order Summary & Submit */}
        <div className="bg-muted/30 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Coffret sélectionné</span>
            <span className="font-medium text-foreground">
              {selectedGiftOption?.title || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              {selectedGiftOption?.price || "—"}
            </span>
          </div>
          
          <Button 
            type="submit" 
            variant="premium" 
            className="w-full h-12 text-base" 
            disabled={!formData.selectedGift}
          >
            <Gift className="w-5 h-5 mr-2" />
            Commander ce coffret cadeau
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GiftMessageForm;