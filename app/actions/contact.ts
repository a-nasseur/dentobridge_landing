"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Subject type mapping for email subject
const subjectMap: Record<string, string> = {
  general: "Question générale",
  support: "Support technique",
  partenariat: "Demande de partenariat",
  reclamation: "Réclamation",
  autre: "Autre",
};

export interface ContactFormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  sujet: "general" | "support" | "partenariat" | "reclamation" | "autre";
  sujetPersonnalise?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactFormResponse> {
  console.log("Sending contact email in action", data);
  try {
    // Validate required fields
    if (
      !data.nom ||
      !data.prenom ||
      !data.email ||
      !data.message ||
      !data.sujet
    ) {
      return {
        success: false,
        error: "Tous les champs requis doivent être remplis",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Adresse email invalide",
      };
    }

    // Get subject text
    const subjectText =
      data.sujet === "autre" && data.sujetPersonnalise
        ? data.sujetPersonnalise
        : subjectMap[data.sujet] || "Contact";

    // Format email body
    const emailBody = `
Nouveau message depuis le formulaire de contact DentoBridge

Informations du contact:
- Nom: ${data.nom}
- Prénom: ${data.prenom}
- Téléphone: ${data.telephone}
- Email: ${data.email}
- Sujet: ${subjectText}

Message:
${data.message}
    `.trim();

    console.log("Email body", emailBody);

    // Send email using Resend
    const result = await resend.emails.send({
      from: "No reply <no-reply@cool2scan.com>",
      to: ["a.nasseur.dev@gmail.com", "dr.chettouh@gmail.com"],
      subject: `Contact DentoBridge - ${subjectText}`,
      text: emailBody,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        success: false,
        error:
          "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      error:
        "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
    };
  }
}
