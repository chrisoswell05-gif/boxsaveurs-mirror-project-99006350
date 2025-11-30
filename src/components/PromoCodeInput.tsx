import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tag, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromoCodeInputProps {
  onValidate: (code: string) => Promise<boolean>;
  onRemove: () => void;
  appliedCode: string | null;
  isValidating: boolean;
}

const PromoCodeInput = ({ onValidate, onRemove, appliedCode, isValidating }: PromoCodeInputProps) => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onValidate(code);
    if (success) {
      setCode("");
    }
  };

  return (
    <Card className="p-6 border-border/50 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-yellow" />
        <h3 className="text-lg font-semibold text-foreground">Code promo</h3>
      </div>

      <AnimatePresence mode="wait">
        {appliedCode ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow/10 to-yellow/5 rounded-lg border-2 border-yellow/30"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow/20 rounded-full">
                <Tag className="w-4 h-4 text-yellow-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">{appliedCode}</p>
                <p className="text-sm text-muted-foreground">Code appliqué avec succès</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="input"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onSubmit={handleSubmit}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Entrez votre code promo"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="flex-1"
              disabled={isValidating}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isValidating || !code.trim()}
              className="min-w-[100px]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validation...
                </>
              ) : (
                "Appliquer"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mt-3">
        Essayez <span className="font-semibold text-yellow">BIENVENUE10</span> ou{" "}
        <span className="font-semibold text-yellow">PROMO5</span>
      </p>
    </Card>
  );
};

export default PromoCodeInput;
