import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import contactHeaderImage from "@/assets/contact-header.jpg";

const contactSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email({ message: "Veuillez entrer une adresse email valide" }).max(255),
  phone: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
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

      reset();
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
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      
      {/* Header with Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={contactHeaderImage} 
          alt="Service client Box Saveurs de Ferme" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "serif" }}
          >
            Contactez-nous
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Nous répondons sous 24 Heures, notre service client est à disposition 7/7jours
          </p>
        </div>
      </div>

      <main className="flex-1 pt-8 pb-16" style={{ backgroundColor: "#EBE7A2" }}>
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Form Section Title */}
          <h2 className="text-lg font-normal mb-6" style={{ color: "#1a1a1a" }}>
            Formulaire de contact
          </h2>

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name and Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  {...register("name")}
                  className="w-full px-4 py-3 bg-transparent border focus:outline-none focus:border-[#5C4A36]"
                  style={{ 
                    borderColor: "#8B7355",
                    color: "#5C4A36",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mail *"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-transparent border focus:outline-none focus:border-[#5C4A36]"
                  style={{ 
                    borderColor: "#8B7355",
                    color: "#5C4A36",
                    borderRadius: "4px"
                  }}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                {...register("phone")}
                className="w-full px-4 py-3 bg-transparent border focus:outline-none focus:border-[#5C4A36]"
                style={{ 
                  borderColor: "#8B7355",
                  color: "#5C4A36",
                  borderRadius: "4px"
                }}
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                placeholder="Commentaire"
                rows={5}
                {...register("message")}
                className="w-full px-4 py-3 bg-transparent border focus:outline-none focus:border-[#5C4A36] resize-none"
                style={{ 
                  borderColor: "#8B7355",
                  color: "#5C4A36",
                  borderRadius: "4px"
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#5B7B5A" }}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
