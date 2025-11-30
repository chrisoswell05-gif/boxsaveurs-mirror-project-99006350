import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  customerName: string;
  customerEmail: string;
  boxName: string;
  boxPrice: string;
  boxDescription: string;
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, boxName, boxPrice, boxDescription, orderId }: OrderConfirmationRequest = await req.json();

    console.log("Sending order confirmation email to:", customerEmail);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Box Saveurs de Ferme <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Confirmation de commande - ${boxName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1e3a5f; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .box-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f4b223; }
              .price { font-size: 24px; font-weight: bold; color: #f4b223; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
              .button { display: inline-block; background-color: #f4b223; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🧀 Merci pour votre commande !</h1>
              </div>
              <div class="content">
                <p>Bonjour ${customerName},</p>
                
                <p>Nous avons bien reçu votre commande et nous vous en remercions !</p>
                
                <div class="box-details">
                  <h2 style="margin-top: 0; color: #1e3a5f;">Détails de votre commande</h2>
                  <p><strong>Box commandée :</strong> ${boxName}</p>
                  <p><strong>Description :</strong> ${boxDescription}</p>
                  <p class="price">${boxPrice}</p>
                  <p style="font-size: 12px; color: #666;">Numéro de commande : ${orderId}</p>
                </div>
                
                <h3>Prochaines étapes</h3>
                <ol>
                  <li>Vous allez recevoir un email séparé avec les instructions de paiement</li>
                  <li>Une fois le paiement reçu, nous préparerons votre box avec soin</li>
                  <li>Votre box sera livrée à l'adresse que vous avez indiquée</li>
                </ol>
                
                <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                
                <div style="text-align: center;">
                  <a href="mailto:contact@boxsaveursdeferme.com" class="button">
                    Nous contacter
                  </a>
                </div>
              </div>
              <div class="footer">
                <p><strong>Box Saveurs de Ferme</strong></p>
                <p>Le terroir français livré chez vous</p>
                <p style="font-size: 12px;">Cet email de confirmation a été envoyé automatiquement, merci de ne pas y répondre.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Customer email sent successfully:", customerEmailResponse);

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Box Saveurs de Ferme <onboarding@resend.dev>",
      to: ["contact@boxsaveursdeferme.com"], // Replace with actual business email
      subject: `Nouvelle commande - ${boxName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1e3a5f; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .order-info { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 Nouvelle commande reçue !</h2>
              </div>
              <div class="content">
                <div class="order-info">
                  <p><strong>Numéro de commande :</strong> ${orderId}</p>
                  <p><strong>Client :</strong> ${customerName}</p>
                  <p><strong>Email :</strong> ${customerEmail}</p>
                  <p><strong>Box :</strong> ${boxName}</p>
                  <p><strong>Prix :</strong> ${boxPrice}</p>
                </div>
                <p>Un email de confirmation a été envoyé au client.</p>
                <p>Connectez-vous à votre backend pour voir tous les détails de la commande et gérer le traitement.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Business email sent successfully:", businessEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        customerEmailId: customerEmailResponse.data?.id,
        businessEmailId: businessEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
