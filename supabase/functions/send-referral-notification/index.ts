import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema for referral notification request
const referralNotificationSchema = z.object({
  referrerEmail: z.string()
    .email("Adresse email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères")
    .trim(),
  referrerName: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim(),
  referredName: z.string()
    .min(2, "Le nom du filleul doit contenir au moins 2 caractères")
    .max(100, "Le nom du filleul ne peut pas dépasser 100 caractères")
    .trim(),
  referralCode: z.string()
    .min(6, "Le code de parrainage doit contenir au moins 6 caractères")
    .max(20, "Le code de parrainage ne peut pas dépasser 20 caractères")
    .regex(/^[A-Z0-9]+$/, "Le code de parrainage doit contenir uniquement des lettres majuscules et des chiffres")
    .trim(),
  bonusAmount: z.number()
    .min(0, "Le montant du bonus doit être positif")
    .max(1000, "Le montant du bonus ne peut pas dépasser 1000$"),
});

type ReferralNotificationRequest = z.infer<typeof referralNotificationSchema>;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = referralNotificationSchema.safeParse(body);
    
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

    const { referrerEmail, referrerName, referredName, referralCode, bonusAmount } = validationResult.data;

    console.log("Sending referral notification to:", referrerEmail);

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
    }
    .highlight-box {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
    .bonus-amount {
      font-size: 48px;
      font-weight: bold;
      color: #1a3a5c;
      margin: 10px 0;
    }
    .bonus-label {
      font-size: 18px;
      color: #1a3a5c;
      font-weight: 600;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #ffd700;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .info-label {
      font-weight: 600;
      color: #1a3a5c;
      margin-bottom: 5px;
    }
    .info-value {
      color: #555;
      font-size: 16px;
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
    .emoji {
      font-size: 24px;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎁 Box Saveurs de Ferme</div>
      <div class="header-subtitle">Programme de Parrainage</div>
    </div>
    
    <div class="content">
      <div class="greeting">
        Félicitations ${referrerName} ! <span class="emoji">🎉</span>
      </div>
      
      <p class="message">
        Excellente nouvelle ! <strong>${referredName}</strong> vient de s'inscrire en utilisant votre code de parrainage 
        <strong>${referralCode}</strong>.
      </p>
      
      <div class="highlight-box">
        <div class="bonus-label">Vous avez gagné</div>
        <div class="bonus-amount">${bonusAmount}$</div>
        <div class="bonus-label">de crédit</div>
      </div>
      
      <div class="info-box">
        <div class="info-label">💰 Vos crédits totaux</div>
        <p class="info-value">
          Vos crédits sont disponibles dans votre profil et peuvent être utilisés 
          sur vos prochaines commandes d'abonnements avec engagement (3 mois ou 12 mois).
        </p>
      </div>
      
      <div class="info-box">
        <div class="info-label">🤝 Continuez à parrainer !</div>
        <p class="info-value">
          Plus vous parrainez d'amis, plus vous gagnez de crédits. 
          Chaque parrainage réussi vous rapporte ${bonusAmount}$ supplémentaires !
        </p>
      </div>
      
      <div style="text-align: center;">
        <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('/auth/v1', '')}/profile" class="cta-button">
          Voir mon profil
        </a>
      </div>
      
      <p class="message" style="margin-top: 30px; font-size: 14px; color: #777;">
        Merci de faire partie de notre communauté et de partager votre amour 
        pour les produits fermiers authentiques ! <span class="emoji">🌾</span>
      </p>
    </div>
    
    <div class="footer">
      <p>Box Saveurs de Ferme</p>
      <p>Des produits authentiques directement de nos fermes partenaires</p>
      <p>
        <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('/auth/v1', '')}/" class="footer-link">
          Visitez notre site
        </a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Box Saveurs de Ferme <onboarding@resend.dev>",
      to: [referrerEmail],
      subject: `🎉 ${referredName} a utilisé votre code de parrainage !`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-referral-notification function:", error);
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
