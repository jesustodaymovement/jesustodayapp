import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Video } from "lucide-react";

const OpwekkingGetuigenissenForm = () => {
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
              <div
                style={{ width: "100%", minHeight: 500 }}
                data-fillout-id="a54EnkWgjeus"
                data-fillout-embed-type="standard"
                data-fillout-inherit-parameters
                data-fillout-dynamic-resize
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OpwekkingGetuigenissenForm;