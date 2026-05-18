import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { z } from "zod";
import { Megaphone, Mail, Phone, Globe, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
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
  day: z.enum(["zaterdag", "zondag"], {
    errorMap: () => ({ message: "Kies een dag" }),
  }),
  testimony: z
    .string()
    .trim()
    .min(10, "Geef een korte omschrijving (minimaal 10 tekens)")
    .max(1000, "Maximaal 1000 tekens"),
});

const drogredenen = [
  "Je bent nu druk, volgende keer heb je meer tijd.",
  "Jouw verhaal is privé, dat hou je voor jezelf.",
  "Jouw verhaal is niet bijzonder, daar bereik je niemand mee.",
  "Je stem klinkt raar, je ziet er niet goed uit, en zo verder.",
];

const Opwekking = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    day: "" as "" | "zaterdag" | "zondag",
    testimony: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

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
      subject: "Aanmelding getuigenisvideo Opwekking",
      message: `Ja, ik wil een video maken tijdens Opwekking.\n\nBeschikbaar op: ${day}\n\nKorte omschrijving getuigenis:\n${testimony}\n\nNeem contact met me op via ${phone} of ${email}.`,
      metadata: { first_name, last_name, day, testimony, source: "opwekking-page" },
    });
    setSubmitting(false);
    if (error) {
      toast.error("Er ging iets mis, probeer het opnieuw.");
      return;
    }
    setDone(true);
    toast.success("Aanmelding ontvangen, we nemen snel contact met je op.");
  };

  return (
    <>
      <Helmet>
        <title>Opwekking, laat je getuigenis opnemen, JesusToday</title>
        <meta
          name="description"
          content="Meld je aan om tijdens Opwekking jouw getuigenisvideo te laten opnemen door het JesusToday team."
        />
        <meta property="og:title" content="Opwekking, laat je getuigenis opnemen, JesusToday" />
        <meta property="og:description" content="Meld je aan voor het opnemen van jouw getuigenisvideo tijdens Opwekking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/aanmeldenopwekking2026" />
        <meta name="twitter:title" content="Opwekking, laat je getuigenis opnemen, JesusToday" />
        <meta name="twitter:description" content="Meld je aan voor het opnemen van jouw getuigenisvideo tijdens Opwekking." />
      </Helmet>
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-cream">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(250,209,80,0.25)" }}
            >
              <Megaphone className="w-4 h-4" style={{ color: "#b9930a" }} />
              <span className="text-anthracite text-sm font-medium">Opwekking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-6 leading-tight">
              Ja, ik wil een <span style={{ color: "#fad150" }}>video maken</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wat mooi dat je je aanmeldt. Wij gaan je helpen om een impactvolle
              getuigenisvideo te maken.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 max-w-3xl space-y-8">
            <div className="rounded-2xl border border-anthracite/10 bg-cream/60 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-anthracite mb-3">
                Goed om vooraf te weten
              </h2>
              <p className="text-anthracite/80 leading-relaxed mb-4">
                Jouw verhaal gaat mensenlevens veranderen, en dat is iets wat de
                vijand van God niet wil. Hij zal je daarom bestoken met allerlei
                drogredenen waarom je dit toch niet moet doen. Een paar voorbeelden:
              </p>
              <ul className="space-y-2 text-anthracite/80 list-disc pl-5 mb-4">
                {drogredenen.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="text-anthracite/80 leading-relaxed">
                Maar jouw authentieke verhaal doet er weldegelijk toe en wij gaan
                je helpen, zodat jij een gezegend Jezus-getuige bent. Gehoorzaam
                aan Zijn 'Grote opdracht'.
              </p>
            </div>

            {done ? (
              <div className="rounded-2xl border border-anthracite/10 bg-cream/60 p-8 text-center space-y-4">
                <CheckCircle2
                  className="w-12 h-12 mx-auto"
                  style={{ color: "#fad150" }}
                  aria-hidden="true"
                />
                <h2 className="text-2xl font-bold text-anthracite">
                  Bedankt voor je aanmelding
                </h2>
                <p className="text-anthracite/80">
                  We nemen zo snel mogelijk contact met je op.
                </p>
                <div className="pt-4 text-anthracite/70 text-sm leading-relaxed">
                  <p>Hartelijke groet en zegen namens het JesusToday Team</p>
                  <p className="mt-2 flex flex-col gap-1 items-center">
                    <a className="hover:underline" href="mailto:info@jesustoday.nl">info@jesustoday.nl</a>
                    <a className="hover:underline" href="tel:+31683559808">06,83559808</a>
                    <a className="hover:underline" href="https://www.jesustoday.nl" target="_blank" rel="noopener">www.jesustoday.nl</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-anthracite/10 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-anthracite mb-2">
                  Laat je gegevens achter
                </h2>
                <p className="text-anthracite/70 mb-6">
                  Om jou te helpen hebben we je gegevens nodig zodat we contact
                  met je kunnen opnemen. Doe mee, laat je niet tegenhouden.
                </p>
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">Voornaam</Label>
                      <Input
                        id="first_name"
                        value={form.first_name}
                        onChange={update("first_name")}
                        autoComplete="given-name"
                        required
                      />
                      {errors.first_name && (
                        <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="last_name">Achternaam</Label>
                      <Input
                        id="last_name"
                        value={form.last_name}
                        onChange={update("last_name")}
                        autoComplete="family-name"
                        required
                      />
                      {errors.last_name && (
                        <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        autoComplete="tel"
                        required
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mailadres</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        autoComplete="email"
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="day">Op welke dag ben je beschikbaar?</Label>
                    <Select
                      value={form.day}
                      onValueChange={(value) =>
                        setForm((f) => ({ ...f, day: value as "zaterdag" | "zondag" }))
                      }
                    >
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Kies een dag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zaterdag">Zaterdag</SelectItem>
                        <SelectItem value="zondag">Zondag</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.day && (
                      <p className="text-sm text-red-600 mt-1">{errors.day}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="testimony">
                      Korte omschrijving van jouw getuigenis
                    </Label>
                    <Textarea
                      id="testimony"
                      value={form.testimony}
                      onChange={update("testimony")}
                      rows={5}
                      placeholder="In een paar zinnen, waar gaat jouw getuigenis over?"
                      required
                    />
                    {errors.testimony && (
                      <p className="text-sm text-red-600 mt-1">{errors.testimony}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto text-neutral-900 font-semibold"
                    style={{ backgroundColor: "#fad150" }}
                  >
                    {submitting ? "Bezig met versturen..." : "Meld mij aan"}
                  </Button>
                </form>
              </div>
            )}

            <div className="rounded-2xl border border-anthracite/10 bg-cream/60 p-6 md:p-8">
              <h2 className="text-lg font-bold text-anthracite mb-4">
                Liever direct contact?
              </h2>
              <ul className="space-y-2 text-anthracite/80">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <a className="hover:underline" href="mailto:info@jesustoday.nl">
                    info@jesustoday.nl
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <a className="hover:underline" href="tel:+31683559808">
                    06,83559808
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <a
                    className="hover:underline"
                    href="https://www.jesustoday.nl"
                    target="_blank"
                    rel="noopener"
                  >
                    www.jesustoday.nl
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Opwekking;