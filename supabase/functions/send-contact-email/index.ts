import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Validation
    if (!name || name.length < 2 || name.length > 100) {
      throw new Error("Invalid name");
    }
    if (!email || !email.includes("@") || email.length > 255) {
      throw new Error("Invalid email");
    }
    if (!subject || subject.length < 3 || subject.length > 200) {
      throw new Error("Invalid subject");
    }
    if (!message || message.length < 10 || message.length > 2000) {
      throw new Error("Invalid message");
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service is not configured");
    }

    // Send email to business
    const businessEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Box Saveurs de Ferme <onboarding@resend.dev>",
        to: ["contact@boxsaveursdeferme.ca"],
        subject: `Nouveau message: ${subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!businessEmailResponse.ok) {
      const error = await businessEmailResponse.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email to business");
    }

    // Send confirmation email to customer
    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Box Saveurs de Ferme <onboarding@resend.dev>",
        to: [email],
        subject: "Nous avons bien reçu votre message",
        html: `
          <h1>Merci de nous avoir contactés, ${name} !</h1>
          <p>Nous avons bien reçu votre message concernant: <strong>${subject}</strong></p>
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          <br>
          <p><strong>Votre message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <br>
          <p>Cordialement,<br>L'équipe Box Saveurs de Ferme</p>
        `,
      }),
    });

    if (!confirmationEmailResponse.ok) {
      console.error("Failed to send confirmation email");
    }

    console.log("Emails sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
