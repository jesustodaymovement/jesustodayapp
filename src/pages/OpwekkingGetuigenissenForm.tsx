import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  first_name: z.string().trim().min(1, "Vul je voornaam in").max(80),
  last_name: z.string().trim().min(1, "Vul je achternaam in").max(80),
  phone: z
    .string()
    .trim()
    .min(6, "Vul een geldig telefoonnummer in")
    .max(20)
    .regex(/^[0-9 +\-()]+$/, "Alleen cijfers, spaties en + - ( )"),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  day: z.enum(["donderdag", "vrijdag", "zaterdag", "zondag", "maandag"], {
    errorMap: () => ({ message: "Kies een dag" }),
  }),
  testimony: z
    .string()
    .trim()
    .min(10, "Geef een korte omschrijving (minimaal 10 tekens)")
    .max(1000, "Maximaal 1000 tekens"),
});

const OpwekkingGetuigenissenForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    day: "" as "" | "donderdag" | "vrijdag" | "zaterdag" | "zondag" | "maandag",
    testimony: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { first_name, last_name, phone, email, day, testimony } = parsed.data;
    const { error } = await supabase.from("submissions").insert({
      type: "opwekking",
      name: `${first_name} ${last_name}`,
      email,
      phone,
      subject: "Getuigenis aanmelding op locatie Opwekking",
      message: `Aanmelding op locatie tijdens Opwekking.\n\nDag: ${day}\n\nKorte omschrijving getuigenis:\n${testimony}\n\nContact via ${phone} of ${email}.`,
      metadata: {
        first_name,
        last_name,
        day,
        testimony,
        source: "opwekkinggetuigenissenform",
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error("Er ging iets mis, probeer het opnieuw.");
      return;
    }
    setDone(true);
    toast.success("Aanmelding ontvangen, we komen zo bij je langs.");
  };

  return (
    <>
      <Helmet>
        <title>Getuigenisformulier Opwekking, JesusToday</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Aanmeldformulier op locatie tijdens Opwekking om jouw getuigenis te laten opnemen door het JesusToday team."
        />
      </Helmet>
      <main className="min-h-screen bg-cream">
        <section className="pt-16 pb-12">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(250,209,80,0.25)" }}
            >
              <Video className="w-4 h-4" style={{ color: "#b9930a" }} />
              <span className="text-anthracite text-sm font-medium">
                Opwekking, op locatie
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-anthracite mb-4 leading-tight">
              Laat hier jouw <span style={{ color: "#fad150" }}>getuigenis</span> opnemen
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Wat mooi dat je hier bent. Vul je gegevens in en wij komen jouw
              verhaal opnemen.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            {done ? (
              <div className="rounded-2xl border border-anthracite/10 bg-white p-8 text-center space-y-4 shadow-sm">
                <CheckCircle2
                  className="w-12 h-12 mx-auto"
                  style={{ color: "#fad150" }}
                  aria-hidden="true"
                />
                <h2 className="text-2xl font-bold text-anthracite">
                  Bedankt voor je aanmelding
                </h2>
                <p className="text-anthracite/80">
                  We komen zo snel mogelijk bij je langs op locatie.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-anthracite/10 bg-white p-6 md:p-8 shadow-sm">
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">Voornaam</Label>
                      <Input id="first_name" value={form.first_name} onChange={update("first_name")} autoComplete="given-name" required />
                      {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="last_name">Achternaam</Label>
                      <Input id="last_name" value={form.last_name} onChange={update("last_name")} autoComplete="family-name" required />
                      {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" required />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mailadres</Label>
                      <Input id="email" type="email" value={form.email} onChange={update("email")} autoComplete="email" required />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="day">Op welke dag ben je hier?</Label>
                    <Select value={form.day} onValueChange={(value) => setForm((f) => ({ ...f, day: value as typeof form.day }))}>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Kies een dag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="donderdag">Donderdag</SelectItem>
                        <SelectItem value="vrijdag">Vrijdag</SelectItem>
                        <SelectItem value="zaterdag">Zaterdag</SelectItem>
                        <SelectItem value="zondag">Zondag</SelectItem>
                        <SelectItem value="maandag">Maandag</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.day && <p className="text-sm text-red-600 mt-1">{errors.day}</p>}
                  </div>
                  <div>
                    <Label htmlFor="testimony">Korte omschrijving van jouw getuigenis</Label>
                    <Textarea id="testimony" value={form.testimony} onChange={update("testimony")} rows={5} placeholder="In een paar zinnen, waar gaat jouw getuigenis over?" required />
                    {errors.testimony && <p className="text-sm text-red-600 mt-1">{errors.testimony}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-neutral-900 font-semibold"
                    style={{ backgroundColor: "#fad150" }}
                  >
                    {submitting ? "Bezig met versturen..." : "Meld mij aan"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default OpwekkingGetuigenissenForm;