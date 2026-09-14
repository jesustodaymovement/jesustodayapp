import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { detectSpam } from "@/lib/spam-guard";

export const SUBMISSION_TYPES = [
  "contact",
  "vraag",
  "partner",
  "opwekking",
  "locatie",
  "reactie",
] as const;

export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

export const submissionSchema = z.object({
  type: z.enum(SUBMISSION_TYPES),
  name: z.string().trim().min(1, "Vul je naam in").max(100),
  email: z.string().trim().email("Geen geldig e-mailadres").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Vul een bericht in").max(2000),
  metadata: z.record(z.any()).optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export interface CreateSubmissionOptions extends SubmissionInput {
  /** Human readable form name used in the notification email */
  formName: string;
  /** Extra label/value pairs shown in the notification email */
  extraFields?: { label: string; value?: string }[];
  /** Optional custom first paragraph of the confirmation email */
  confirmationIntro?: string;
  /** Hidden honeypot field value */
  honeypot?: string;
  /** Milliseconds between opening and submitting the form */
  elapsedMs?: number;
}

/**
 * Verstuurt een inzending via de beveiligde serverroute. Opslaan en mailen
 * gebeurt daar, na het spamfilter en de snelheidslimiet. Spam wordt stil
 * geweigerd, de bezoeker ziet altijd een gewone bevestiging.
 */
export async function createSubmission(input: CreateSubmissionOptions) {
  const { formName, extraFields, confirmationIntro, honeypot, elapsedMs, ...rest } = input;
  const parsed = submissionSchema.parse(rest);

  // Eerste controle in de browser, dezelfde regels lopen daarna op de server.
  const spamReason = detectSpam({
    name: parsed.name,
    email: parsed.email,
    subject: parsed.subject,
    message: parsed.message,
    honeypot,
    elapsedMs,
  });
  if (spamReason) {
    return null;
  }

  const { data, error } = await supabase.functions.invoke("submit-form", {
    body: {
      type: parsed.type,
      formName,
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || undefined,
      organization: parsed.organization || undefined,
      subject: parsed.subject || undefined,
      message: parsed.message,
      metadata: parsed.metadata,
      extraFields,
      confirmationIntro,
      honeypot,
      elapsedMs,
    },
  });

  if (error) throw error;
  if ((data as any)?.error) throw new Error((data as any).error);

  return ((data as any)?.id as string | undefined) ?? null;
}
