import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema for welcome email request
const welcomeEmailSchema = z.object({
  email: z.string()
    .email("Adresse email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères")
    .trim(),
  fullName: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim()
    .optional()
    .default(""),
  referralCode: z.string()
    .min(6, "Le code de parrainage doit contenir au moins 6 caractères")
    .max(20, "Le code de parrainage ne peut pas dépasser 20 caractères")
    .regex(/^[A-Z0-9]+$/, "Le code de parrainage doit contenir uniquement des lettres majuscules et des chiffres")
    .trim(),
});

type WelcomeEmailRequest = z.infer<typeof welcomeEmailSchema>;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = welcomeEmailSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Données invalides", 
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, fullName, referralCode } = validationResult.data;

    console.log("Sending welcome email to:", email);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #1a3a5c 0%, #2d5a8c 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffd700;
      margin-bottom: 10px;
    }
    .header-subtitle {
      color: #ffffff;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #1a3a5c;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.8;
    }
    .referral-box {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
    .referral-label {
      font-size: 14px;
      color: #1a3a5c;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .referral-code {
      font-size: 36px;
      font-weight: bold;
      color: #1a3a5c;
      letter-spacing: 3px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
    }
    .referral-subtitle {
      font-size: 14px;
      color: #1a3a5c;
      margin-top: 10px;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #ffd700;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .info-title {
      font-weight: 600;
      color: #1a3a5c;
      margin-bottom: 10px;
      font-size: 18px;
    }
    .info-text {
      color: #555;
      font-size: 15px;
      margin: 8px 0;
    }
    .benefits-list {
      margin: 20px 0;
      padding-left: 0;
    }
    .benefit-item {
      display: flex;
      align-items: start;
      margin-bottom: 15px;
    }
    .benefit-icon {
      color: #ffd700;
      font-size: 20px;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .benefit-text {
      color: #555;
      font-size: 15px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #1a3a5c 0%, #2d5a8c 100%);
      color: #ffffff;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      box-shadow: 0 4px 15px rgba(26, 58, 92, 0.3);
    }
    .footer {
      background-color: #1a3a5c;
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
      font-size: 14px;
    }
    .footer-link {
      color: #ffd700;
      text-decoration: none;
    }
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #ffd700, transparent);
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎁 Box Saveurs de Ferme</div>
      <div class="header-subtitle">Bienvenue dans la famille !</div>
    </div>
    
    <div class="content">
      <div class="greeting">
        Bienvenue ${fullName || 'chez nous'} ! 🎉
      </div>
      
      <p class="message">
        Nous sommes ravis de vous accueillir dans la communauté <strong>Box Saveurs de Ferme</strong>. 
        Vous faites maintenant partie d'une famille qui valorise l'authenticité, la qualité et le soutien 
        aux producteurs locaux.
      </p>
      
      <div class="referral-box">
        <div class="referral-label">Votre Code de Parrainage</div>
        <div class="referral-code">${referralCode}</div>
        <div class="referral-subtitle">
          Partagez ce code et gagnez des crédits !
        </div>
      </div>
      
      <div class="info-box">
        <div class="info-title">💰 Comment ça marche ?</div>
        <div class="info-text">
          Partagez votre code <strong>${referralCode}</strong> avec vos amis et votre famille. 
          Lorsqu'ils s'inscrivent avec votre code et prennent un abonnement avec engagement 
          (3 mois ou 12 mois), vous recevez tous les deux <strong>10$ de crédit</strong> !
        </div>
      </div>

      <div class="divider"></div>

      <div class="info-title" style="text-align: center; margin-bottom: 20px;">
        🌟 Vos avantages membres
      </div>
      
      <div class="benefits-list">
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text">
            <strong>Produits fermiers authentiques</strong> livrés directement chez vous
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text">
            <strong>Soutien aux producteurs locaux</strong> et à l'agriculture durable
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text">
            <strong>Économies substantielles</strong> avec nos formules d'abonnement
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text">
            <strong>Programme de parrainage généreux</strong> pour partager avec vos proches
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('/auth/v1', '')}/" class="cta-button">
          Découvrir nos Box
        </a>
      </div>
      
      <p class="message" style="margin-top: 30px; font-size: 14px; color: #777; text-align: center;">
        Vous avez des questions ? N'hésitez pas à nous contacter. 
        Notre équipe est là pour vous ! 🌾
      </p>
    </div>
    
    <div class="footer">
      <p style="margin-bottom: 10px; font-size: 16px; font-weight: 600;">Box Saveurs de Ferme</p>
      <p style="margin: 5px 0;">Des produits authentiques directement de nos fermes partenaires</p>
      <p style="margin-top: 15px;">
        <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('/auth/v1', '')}/" class="footer-link">
          Visitez notre site
        </a>
        •
        <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('/auth/v1', '')}/profile" class="footer-link">
          Mon compte
        </a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Box Saveurs de Ferme <onboarding@resend.dev>",
      to: [email],
      subject: `Bienvenue chez Box Saveurs de Ferme ! 🎁 Votre code: ${referralCode}`,
      html: emailHtml,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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
