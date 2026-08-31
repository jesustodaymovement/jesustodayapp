import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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
}

export async function createSubmission(input: CreateSubmissionOptions) {
  const { formName, extraFields, confirmationIntro, ...rest } = input;
  const parsed = submissionSchema.parse(rest);
  const id = crypto.randomUUID();

  const { error } = await supabase.from("submissions").insert({
    id,
    type: parsed.type,
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone || null,
    organization: parsed.organization || null,
    subject: parsed.subject || null,
    message: parsed.message,
    metadata: parsed.metadata ?? null,
  });
  if (error) throw error;

  const fields = [
    parsed.subject ? { label: "Onderwerp", value: parsed.subject } : null,
    parsed.phone ? { label: "Telefoon", value: parsed.phone } : null,
    parsed.organization ? { label: "Organisatie", value: parsed.organization } : null,
    ...(extraFields ?? []).filter((f) => f && f.value),
  ].filter(Boolean);

  // Notificatie naar het team, en bevestiging naar de inzender.
  // Faalt dit, dan blijft de inzending bewaard in het adminoverzicht.
  const submittedAt = new Date().toLocaleString("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const { error: emailError } = await supabase.functions.invoke("send-submission-emails", {
    body: {
      submissionId: id,
      formName,
      name: parsed.name,
      email: parsed.email,
      message: parsed.message,
      fields,
      submittedAt,
      confirmationIntro,
    },
  });
  if (emailError) console.warn("E-mail versturen mislukt", emailError);

  return id;
}
