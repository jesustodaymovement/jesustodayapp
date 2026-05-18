import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer, JesusToday</title>
        <meta
          name="description"
          content="Lees de disclaimer van JesusToday voor www.JesusToday.app en www.jesustoday.nl, inclusief intellectueel eigendom en aansprakelijkheid."
        />
        <link
          rel="canonical"
          href="https://storybrand-share-grace.lovable.app/disclaimer"
        />
      </Helmet>
      <Header />
      <main className="bg-cream pt-32 pb-24">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-4">
              <span className="text-gold">Disclaimer</span> voor www.JesusToday.app en www.jesustoday.nl
            </h1>
            <p className="text-muted-foreground mb-12">
              Op deze pagina vindt u de disclaimer van JesusToday, zoals deze
              beschikbaar is gesteld door JesusToday. In deze disclaimer geven
              wij aan onder welk voorbehoud wij de informatie op onze website
              aan u aanbieden.
            </p>

            <div className="space-y-10 text-anthracite/90">
              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Intellectueel eigendom
                </h2>
                <p className="mb-4">
                  Het gebruik van de informatie op deze website is gratis zolang
                  u deze informatie niet kopieert, verspreidt of op een andere
                  manier gebruikt of misbruikt. U mag de informatie op deze
                  website alleen hergebruiken volgens de regelingen van het
                  dwingend recht.
                </p>
                <p>
                  Zonder uitdrukkelijke schriftelijke toestemming van JesusToday
                  is het niet toegestaan tekst, fotomateriaal of andere
                  materialen op deze website her te gebruiken. Het intellectueel
                  eigendom berust bij JesusToday.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Geen garantie op juistheid
                </h2>
                <p className="mb-4 italic text-muted-foreground">
                  Indien van toepassing:
                </p>
                <p className="mb-4">
                  Voor de prijzen die op onze website staan, geldt dat wij
                  streven naar een zo zorgvuldig mogelijke weergave van de
                  realiteit en de bedoelde prijzen. Fouten die daarbij ontstaan
                  en herkenbaar zijn als programmeer dan wel typefouten, vormen
                  nooit een aanleiding om een contract dan wel overeenkomst met
                  JesusToday te mogen claimen of te veronderstellen.
                </p>
                <p className="mb-4">
                  JesusToday streeft naar een zo actueel mogelijke website.
                  Mocht ondanks deze inspanningen de informatie van of de inhoud
                  op deze website onvolledig en of onjuist zijn, dan kunnen wij
                  daarvoor geen aansprakelijkheid aanvaarden.
                </p>
                <p>
                  De informatie en/of producten op deze website worden
                  aangeboden zonder enige vorm van garantie en of aanspraak op
                  juistheid. Wij behouden ons het recht voor om deze materialen
                  te wijzigen, te verwijderen of opnieuw te plaatsen zonder
                  enige voorafgaande mededeling. JesusToday aanvaardt geen
                  aansprakelijkheid voor enige informatie waarnaar wij via
                  hyperlinks verwijzen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Wijzigingen
                </h2>
                <p>
                  Mocht deze disclaimer wijzigen, dan vindt u de meest recente
                  versie van de disclaimer van JesusToday op deze pagina.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Disclaimer;