import { Helmet } from "react-helmet-async";
import { Video } from "lucide-react";
import { SubmissionForm } from "@/components/forms/SubmissionForm";

const OpwekkingGetuigenissenForm = () => {
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
                New Wine, op locatie
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
            <div className="rounded-2xl border border-anthracite/10 bg-white p-6 md:p-8 shadow-sm">
              <SubmissionForm
                type="locatie"
                formName="Getuigenis op locatie, New Wine"
                submitLabel="Ja, neem mijn verhaal op"
                successTitle="Gelukt, we komen naar je toe"
                successText="Dankjewel, iemand van het team zoekt je op om je verhaal op te nemen."
                confirmationIntro="Wat mooi dat je je verhaal wilt delen. Iemand van het JesusToday team neemt contact met je op om jouw getuigenis op te nemen."
                className="border-0 p-0 shadow-none md:p-0"
                metadata={{ event: 'New Wine' }}
                fields={[
                  { name: 'name', label: 'Je naam', required: true, placeholder: 'Voornaam Achternaam' },
                  { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'jij@voorbeeld.nl' },
                  { name: 'phone', label: 'Telefoonnummer', type: 'tel', required: true, placeholder: '06 12345678' },
                  { name: 'plaats', label: 'Waar kunnen we je vinden?', placeholder: 'Camping, tent of veld' },
                  {
                    name: 'message',
                    label: 'Waar gaat jouw verhaal over?',
                    type: 'textarea',
                    required: true,
                    rows: 4,
                    placeholder: 'In een paar regels...',
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OpwekkingGetuigenissenForm;