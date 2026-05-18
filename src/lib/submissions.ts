import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const submissionSchema = z.object({
  type: z.enum(["contact", "vraag", "partner"]),
  name: z.string().trim().min(1, "Vul je naam in").max(100),
  email: z.string().trim().email("Geen geldig e-mailadres").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Vul een bericht in").max(2000),
  metadata: z.record(z.any()).optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export async function createSubmission(input: SubmissionInput) {
  const parsed = submissionSchema.parse(input);
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

  // Stuur notificatie en bevestiging (faalt stil, bericht is al opgeslagen)
  try {
    await supabase.functions.invoke("notify-submission", {
      body: { submissionId: id },
    });
  } catch (e) {
    console.warn("Notify failed", e);
  }

  return id;
}