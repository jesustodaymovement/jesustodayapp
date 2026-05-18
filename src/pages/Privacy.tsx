import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacyverklaring, JesusToday</title>
        <meta
          name="description"
          content="Lees hoe JesusToday omgaat met jouw persoonsgegevens, welke gegevens we verwerken en welke rechten je hebt."
        />
        <link
          rel="canonical"
          href="https://storybrand-share-grace.lovable.app/privacy"
        />
      </Helmet>
      <Header />
      <main className="bg-cream pt-32 pb-24">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-4">
              Privacy<span className="text-gold">verklaring</span>
            </h1>
            <p className="text-muted-foreground mb-12">
              JesusToday is een activiteit van Light &amp; Feed B.V., Robertus
              Nurksweg 11, 2033 AA Haarlem. Hierna te noemen "JesusToday".
              JesusToday is verantwoordelijk voor de verwerking van
              persoonsgegevens zoals weergegeven in deze privacyverklaring.
            </p>

            <div className="prose prose-lg max-w-none space-y-10 text-anthracite/90">
              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Persoonsgegevens die wij verwerken
                </h2>
                <p className="mb-4">
                  JesusToday verwerkt persoonsgegevens als je gebruik maakt van
                  de website JesusToday en/of omdat je deze zelf aan ons stuurt.
                </p>
                <p className="mb-4">
                  Nederlandse wetgeving schrijft voor wat we hierbij moeten doen
                  en vertellen. Daarom is deze verklaring formeler opgesteld dan
                  we eigenlijk zouden willen. Begrijp je de tekst niet, of heb
                  je er een vraag over, neem dan even contact met ons op. Dan
                  proberen we het je uit te leggen.
                </p>
                <p className="mb-4">
                  Waar in vet vervolg van de tekst gesproken wordt over
                  'persoonsgegevens' worden de gegevens bedoeld die via
                  "JesusToday" worden verwerkt.
                </p>
                <p className="mb-3">
                  Hieronder een overzicht van de persoonsgegevens die wij
                  verwerken:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Jouw voor- en achternaam</li>
                  <li>Jouw mailadres</li>
                  <li>Telefoonnummer (optioneel)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Bijzondere en/of gevoelige persoonsgegevens die wij verwerken
                </h2>
                <p>
                  Onze website en/of dienst heeft niet de intentie gegevens te
                  verzamelen over websitebezoekers die jonger zijn dan 16 jaar.
                  We kunnen echter niet controleren of een bezoeker ouder dan 16
                  is. Wij raden ouders dan ook aan betrokken te zijn bij de
                  online activiteiten van hun kinderen, om zo te voorkomen dat
                  er gegevens over kinderen verzameld worden zonder ouderlijke
                  toestemming. Als je er van overtuigd bent dat wij zonder die
                  toestemming persoonlijke gegevens hebben verzameld over je
                  kind, neem dan contact met ons op via{' '}
                  <a
                    href="mailto:info@JesusToday.nl"
                    className="text-gold hover:underline"
                  >
                    info@JesusToday.nl
                  </a>
                  , dan verwijderen wij deze informatie.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Met welk doel en op basis van welke grondslag wij
                  persoonsgegevens verwerken
                </h2>
                <p className="mb-3">
                  JesusToday verwerkt je persoonsgegevens voor de volgende
                  doelen:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Om te reageren op een vraag via het contactformulier</li>
                  <li>Het verzenden van onze nieuwsbrief</li>
                  <li>
                    Je te kunnen bellen of e-mailen indien dit nodig is om onze
                    dienstverlening uit te kunnen voeren
                  </li>
                  <li>Het bijhouden van relatieadministratie</li>
                  <li>Het afleveren van goederen en diensten</li>
                  <li>
                    Het verzorgen van het JesusToday platform en beschikbaar
                    maken van jouw persoonlijke videoboodschap
                  </li>
                </ul>
                <p>
                  Waar nodig vraagt JesusToday toestemming voor het verwerken
                  van jouw persoonsgegevens. Wij vragen je altijd om toestemming
                  voor het plaatsen van jouw persoonlijke videoboodschap. Deze
                  toestemming tot het verwerken van persoonsgegevens kan te
                  allen tijde ingetrokken worden. Je kunt gebruik maken van jouw
                  recht tot inzage, aanpassen of verwijderen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Hoe lang we persoonsgegevens bewaren
                </h2>
                <p>
                  Betrokkenen die gedurende meer dan 7 jaar geen materiële of
                  immateriële betrokkenheid hebben gehad bij JesusToday, worden
                  in het daaropvolgende kalenderjaar uit ons systeem verwijderd.
                  Het ontvangen van (digitale) nieuwsbrieven via een
                  JesusToday-account, het doen van een donatie, of deelname aan
                  een online evenement wordt eveneens beschouwd als
                  betrokkenheid.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Delen van persoonsgegevens met derden
                </h2>
                <p className="mb-4">
                  JesusToday verkoopt je gegevens niet aan derden en verstrekt
                  deze uitsluitend indien dit nodig is voor ons contact met jou
                  of om te voldoen aan een wettelijke verplichting. Met
                  bedrijven die je gegevens verwerken in onze opdracht, sluiten
                  wij een verwerkersovereenkomst om te zorgen voor eenzelfde
                  niveau van beveiliging en vertrouwelijkheid van jouw gegevens.
                  JesusToday blijft verantwoordelijk voor deze verwerkingen.
                </p>
                <p className="mb-4">
                  De huidige subverwerker is Vimeo, de privacyvoorwaarden worden{' '}
                  <a
                    href="https://vimeo.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    hier
                  </a>{' '}
                  getoond. De subverwerkers kunnen van tijd tot tijd wijzigen.
                </p>
                <p>
                  De persoonlijke videoboodschap die je op het platform van
                  JesusToday upload, wordt op een afgesloten gedeelte van het
                  platform Vimeo geplaatst en getoond op de website van
                  JesusToday.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Cookies, of vergelijkbare technieken, die wij gebruiken
                </h2>
                <p className="mb-4">
                  JesusToday gebruikt technische en functionele cookies en
                  analytische cookies die geen inbreuk maken op je privacy. Een
                  cookie is een klein tekstbestand dat bij het eerste bezoek aan
                  deze website wordt opgeslagen op je computer, tablet of
                  smartphone. De cookies die wij gebruiken zijn noodzakelijk
                  voor de technische werking van de website en je gebruiksgemak.
                  Ze zorgen ervoor dat de website naar behoren werkt en kunnen
                  bijvoorbeeld je voorkeursinstellingen onthouden. Ook kunnen
                  wij hiermee onze website optimaliseren. Je kunt je afmelden
                  voor cookies door je internetbrowser zo in te stellen dat deze
                  geen cookies meer opslaat. Daarnaast kun je ook alle
                  informatie die eerder is opgeslagen via de instellingen van je
                  browser verwijderen.
                </p>
                <p>
                  JesusToday maakt geen gebruik van profiling: dat wil zeggen op
                  basis van analyse van in de organisatie aanwezige kennis
                  nieuwe potentiële relaties benaderen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Gegevens inzien, aanpassen of verwijderen
                </h2>
                <p className="mb-4">
                  Je hebt het recht om je opgeslagen persoonsgegevens in te
                  zien, te corrigeren of te verwijderen. Daarnaast heb je het
                  recht om je eventuele toestemming voor de gegevensverwerking
                  in te trekken of bezwaar te maken tegen de verwerking van je
                  persoonsgegevens door JesusToday.
                </p>
                <p className="mb-4">
                  Je kunt een verzoek tot inzage, correctie, verwijdering van je
                  persoonsgegevens of verzoek tot intrekking van je toestemming
                  of bezwaar op de verwerking van je persoonsgegevens sturen
                  naar{' '}
                  <a
                    href="mailto:info@JesusToday.nl"
                    className="text-gold hover:underline"
                  >
                    info@JesusToday.nl
                  </a>
                  .
                </p>
                <p className="mb-4">
                  Om er zeker van te zijn dat het verzoek tot inzage door jou is
                  gedaan, vragen we je een kopie van je identiteitsbewijs met
                  het verzoek mee te sturen. Maak in deze kopie je pasfoto, MRZ
                  (machine readable zone, de strook met nummers onderaan het
                  paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart.
                  Dit ter bescherming van je privacy. We reageren zo snel
                  mogelijk, maar binnen drie weken, op je verzoek.
                </p>
                <p>
                  JesusToday wil je er ook op wijzen dat je de mogelijkheid hebt
                  om een klacht in te dienen bij de nationale toezichthouder, de
                  Autoriteit Persoonsgegevens. Dat kan via{' '}
                  <a
                    href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    deze link
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-anthracite mb-3">
                  Hoe wij persoonsgegevens beveiligen
                </h2>
                <p className="mb-4">
                  JesusToday neemt de bescherming van je gegevens serieus en
                  neemt passende maatregelen om misbruik, verlies, onbevoegde
                  toegang, ongewenste openbaarmaking en ongeoorloofde wijziging
                  tegen te gaan. Als je de indruk hebt dat je gegevens niet goed
                  beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan
                  contact op via{' '}
                  <a
                    href="mailto:info@jesustoday.nl"
                    className="text-gold hover:underline"
                  >
                    info@jesustoday.nl
                  </a>
                  .
                </p>
                <p>
                  JesusToday houdt het recht om het privacybeleid te wijzigen.
                  Je kunt te allen tijde het actuele privacybeleid van
                  JesusToday inzien via de website.
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

export default Privacy;