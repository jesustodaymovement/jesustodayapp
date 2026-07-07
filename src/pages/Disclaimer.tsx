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
        <meta property="og:title" content="Disclaimer, JesusToday" />
        <meta property="og:description" content="Disclaimer van JesusToday, inclusief intellectueel eigendom en aansprakelijkheid." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storybrand-share-grace.lovable.app/disclaimer" />

        <link rel="canonical" href="https://storybrand-share-grace.lovable.app/disclaimer" />
        <meta name="twitter:title" content="Disclaimer, JesusToday" />
        <meta name="twitter:description" content="Disclaimer van JesusToday." />
      </Helmet>
      <Header />
      <main className="bg-cream pt-32 pb-24">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-4">
              <span className="text-gold">Disclaimer</span> JesusToday
            </h1>
            <p className="text-muted-foreground mb-12">
              Deze disclaimer is van toepassing op het gebruik van de websites{' '}
              <a href="https://www.jesustoday.app" className="text-gold hover:underline">www.jesustoday.app</a>{' '}
              en{' '}
              <a href="https://www.jesustoday.nl" className="text-gold hover:underline">www.jesustoday.nl</a>,
              beheerd door JesusToday (onderdeel van Stichting Cornerstone Ministries).
              Door gebruik te maken van deze website ga je akkoord met deze
              disclaimer.
            </p>

            <div className="space-y-10 text-anthracite/90">
              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Gebruik van de website
                </h2>
                <p className="mb-4">
                  De informatie op deze website is uitsluitend bedoeld voor
                  algemene informatiedoeleinden. Gebruik van de website en de
                  informatie daarop is volledig op eigen risico.
                </p>
                <p>
                  Wij doen ons best om de inhoud actueel en correct te houden,
                  maar kunnen niet garanderen dat alle informatie altijd
                  volledig, juist of up-to-date is.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Aansprakelijkheid
                </h2>
                <p className="mb-4">
                  Voor zover wettelijk toegestaan is JesusToday niet
                  aansprakelijk voor:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>schade die voortvloeit uit het gebruik van deze website</li>
                  <li>schade als gevolg van onjuiste of onvolledige informatie</li>
                  <li>indirecte schade, zoals gevolgschade, gederfde winst of gemiste kansen</li>
                </ul>
                <p>
                  Deze beperking geldt niet in geval van opzet of grove
                  nalatigheid van JesusToday.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Gebruikerscontent
                </h2>
                <p>
                  Het gebruik van de informatie op deze website is gratis zolang
                  u deze informatie niet kopieert, verspreidt of op een andere
                  manier gebruikt of misbruikt. U mag de informatie op deze
                  website alleen hergebruiken volgens de regelingen van het
                  dwingend recht.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Intellectueel eigendom
                </h2>
                <p className="mb-4">
                  Alle rechten van intellectueel eigendom met betrekking tot
                  deze website berusten bij JesusToday, tenzij anders vermeld.
                </p>
                <p className="mb-4">
                  Het is toegestaan om de inhoud van deze website te bekijken en
                  te gebruiken voor persoonlijk, niet-commercieel gebruik.
                </p>
                <p>
                  Het is niet toegestaan om zonder voorafgaande schriftelijke
                  toestemming van JesusToday materiaal van deze website te
                  kopiëren, verspreiden of op andere wijze te gebruiken.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Indien van toepassing
                </h2>
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
                  enige voorafgaande melding. JesusToday aanvaardt geen
                  aansprakelijkheid voor enige informatie waarnaar wij via
                  hyperlinks verwijzen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Externe links
                </h2>
                <p>
                  Deze website kan links bevatten naar externe websites.
                  JesusToday heeft geen controle over de inhoud van deze
                  websites en is niet verantwoordelijk of aansprakelijk voor de
                  inhoud of werking daarvan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Wijzigingen
                </h2>
                <p>
                  JesusToday behoudt zich het recht voor om deze disclaimer op
                  elk moment te wijzigen. De meest actuele versie is altijd
                  beschikbaar op deze pagina.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Toepasselijk recht
                </h2>
                <p>
                  Op deze website en deze disclaimer is het Nederlands recht van
                  toepassing.
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