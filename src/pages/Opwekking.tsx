import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Megaphone, Mail, Globe } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const drogredenen = [
  "Je bent nu druk, volgende keer heb je meer tijd.",
  "Jouw verhaal is privé, dat hou je voor jezelf.",
  "Jouw verhaal is niet bijzonder, daar bereik je niemand mee.",
  "Je stem klinkt raar, je ziet er niet goed uit, en zo verder.",
];

const Opwekking = () => {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://server.fillout.com/embed/v1/"]'
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

        <link rel="canonical" href="https://storybrand-share-grace.lovable.app/aanmeldenopwekking2026" />
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

            <div className="rounded-2xl border border-anthracite/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-anthracite mb-2">
                Laat je gegevens achter
              </h2>
              <p className="text-anthracite/70 mb-6">
                Om jou te helpen hebben we je gegevens nodig zodat we contact
                met je kunnen opnemen. Doe mee, laat je niet tegenhouden.
              </p>
              <div
                style={{ width: "100%", minHeight: 500 }}
                data-fillout-id="e2Mxh5GW7qus"
                data-fillout-embed-type="standard"
                data-fillout-inherit-parameters
                data-fillout-dynamic-resize
              />
            </div>

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