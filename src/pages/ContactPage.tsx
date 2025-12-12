import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" })
    .optional(),
  email: z
    .string()
    .trim()
    .email({ message: "Veuillez entrer une adresse email valide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  phone: z
    .string()
    .trim()
    .optional(),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Le commentaire ne peut pas dépasser 2000 caractères" })
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: data.name || "",
            email: data.email,
            subject: "Message depuis le formulaire de contact",
            message: data.phone ? `Téléphone: ${data.phone}\n\n${data.message || ""}` : (data.message || ""),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      toast({
        title: "Message envoyé !",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });

      form.reset();
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EBE7A2" }}>
      <Navigation />
      
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-normal text-foreground mb-12">
            Contact
          </h1>

          <h2 className="text-lg font-normal text-foreground mb-8">Formulaire de contact</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nom"
                          {...field}
                          className="bg-transparent border border-foreground/40 rounded-none h-12 placeholder:text-foreground/60 focus:border-foreground"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="E-mail *"
                          {...field}
                          className="bg-transparent border border-foreground/40 rounded-none h-12 placeholder:text-foreground/60 focus:border-foreground"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Numéro de téléphone"
                        {...field}
                        className="bg-transparent border border-foreground/40 rounded-none h-12 placeholder:text-foreground/60 focus:border-foreground"
                        style={{ backgroundColor: "transparent" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Commentaire"
                        rows={4}
                        {...field}
                        className="bg-transparent border border-foreground/40 rounded-none placeholder:text-foreground/60 focus:border-foreground resize-none"
                        style={{ backgroundColor: "transparent" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#5B7B5A] hover:bg-[#4A6A49] text-white rounded-full px-8 py-3 h-auto font-normal"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
