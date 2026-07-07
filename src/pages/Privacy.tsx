import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

type ListItem = string | { term: string; desc: string; sep?: string };
type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: ListItem[] };
type Section = { heading: string; blocks: Block[] };
type Content = {
  intro: string[];
  sections: Section[];
  updated: string;
};

const nl: Content = {
  intro: [
    'JesusToday is een activiteit van Stichting Cornerstone Ministries, gevestigd aan de Evert van de Beekstraat 1-53, 1118 CN Schiphol.',
    'Stichting Cornerstone Ministries is verantwoordelijk voor de verwerking van persoonsgegevens binnen het JesusToday-platform. In deze privacyverklaring leggen wij uit welke persoonsgegevens wij verwerken, waarom wij dat doen en welke rechten je hebt.',
    'Heb je vragen over deze privacyverklaring of over de verwerking van jouw persoonsgegevens? Neem dan contact met ons op via info@jesustoday.nl.',
  ],
  sections: [
    {
      heading: 'Welke persoonsgegevens verwerken wij?',
      blocks: [
        { type: 'p', text: 'Wij verwerken persoonsgegevens wanneer je gebruik maakt van het JesusToday-platform of wanneer je deze zelf aan ons verstrekt.' },
        { type: 'p', text: 'Afhankelijk van hoe je onze diensten gebruikt, kunnen wij de volgende persoonsgegevens verwerken:' },
        {
          type: 'ul',
          items: [
            'Voor- en achternaam',
            'E-mailadres',
            'Telefoonnummer (optioneel)',
            'Adresgegevens (indien nodig voor onze dienstverlening)',
            'Overige persoonsgegevens die je vrijwillig met ons deelt, bijvoorbeeld via een contactformulier of profiel',
            'De inhoud van jouw persoonlijke videoboodschap en eventuele daarbij behorende informatie',
          ],
        },
      ],
    },
    {
      heading: 'Bijzondere persoonsgegevens',
      blocks: [
        { type: 'p', text: 'Het JesusToday-platform en onze diensten zijn niet bedoeld voor kinderen jonger dan 16 jaar, tenzij zij toestemming hebben van een ouder of wettelijke vertegenwoordiger.' },
        { type: 'p', text: 'Wij kunnen niet controleren of een gebruiker daadwerkelijk 16 jaar of ouder is. Daarom raden wij ouders en wettelijke vertegenwoordigers aan betrokken te zijn bij de online activiteiten van hun kinderen.' },
        { type: 'p', text: 'Vermoed je dat wij zonder de vereiste toestemming persoonsgegevens van een minderjarige hebben verzameld? Neem dan contact met ons op via info@jesustoday.nl. Wij zullen deze gegevens zo spoedig mogelijk verwijderen.' },
      ],
    },
    {
      heading: 'Waarom verwerken wij jouw gegevens?',
      blocks: [
        { type: 'p', text: 'Wij verwerken jouw persoonsgegevens voor de volgende doelen:' },
        {
          type: 'ul',
          items: [
            'Reageren op vragen via het contactformulier',
            'Verzenden van nieuwsbrieven',
            'Contact met je opnemen (telefonisch of per e-mail) indien nodig',
            'Bijhouden van onze administratie',
            'Leveren van diensten en producten',
            'Het aanbieden en laten functioneren van het JesusToday platform, inclusief jouw persoonlijke videoboodschap',
          ],
        },
      ],
    },
    {
      heading: 'Op basis van welke grondslag verwerken wij jouw gegevens?',
      blocks: [
        { type: 'p', text: 'Volgens de Algemene Verordening Gegevensbescherming (AVG) mogen wij jouw persoonsgegevens alleen verwerken als daarvoor een geldige grondslag bestaat. Afhankelijk van het doel gebruiken wij de volgende grondslagen:' },
        {
          type: 'ul',
          items: [
            { term: 'Toestemming', desc: 'Voor het plaatsen van jouw videoboodschap, het versturen van nieuwsbrieven en andere verwerkingen waarvoor jouw toestemming is vereist.' },
            { term: 'Uitvoering van een overeenkomst', desc: 'Voor het aanmaken en beheren van jouw account, het aanbieden van het JesusToday-platform en het leveren van onze diensten.' },
            { term: 'Wettelijke verplichting', desc: 'Voor het voldoen aan wettelijke verplichtingen, zoals fiscale en administratieve bewaarplichten.' },
            { term: 'Gerechtvaardigd belang', desc: 'Voor het onderhouden van contact met gebruikers, het verbeteren en beveiligen van onze dienstverlening en het voorkomen van misbruik van het platform, waarbij wij altijd een zorgvuldige afweging maken tussen onze belangen en jouw privacy.' },
          ],
        },
        { type: 'p', text: 'Heb je toestemming gegeven voor een verwerking? Dan kun je deze toestemming op ieder moment intrekken. Dit heeft geen invloed op de rechtmatigheid van de verwerking die heeft plaatsgevonden vóór het intrekken van jouw toestemming.' },
      ],
    },
    {
      heading: 'Hoe lang bewaren wij jouw gegevens?',
      blocks: [
        { type: 'p', text: 'Wij bewaren jouw gegevens niet langer dan nodig is. Concreet betekent dit:' },
        {
          type: 'ul',
          items: [
            { term: 'Contactgegevens', desc: 'Zolang je video account actief is.' },
            { term: 'Nieuwsbriefgegevens', desc: 'totdat je je uitschrijft' },
            { term: 'Accountgegevens', desc: 'tot 4 jaar, of zolang je video account actief heb.' },
            { term: 'Administratieve gegevens (zoals donaties)', desc: '7 jaar (wettelijke verplichting)' },
            { term: 'Videoboodschappen', desc: 'zolang jouw account actief is of totdat je deze laat verwijderen.' },
          ],
        },
      ],
    },
    {
      heading: 'Gebruik van externe dienstverleners',
      blocks: [
        { type: 'p', text: 'Voor het aanbieden van onze diensten maken wij gebruik van externe dienstverleners die in opdracht van JesusToday persoonsgegevens kunnen verwerken. Wij kiezen deze partijen zorgvuldig en zorgen ervoor dat zij jouw gegevens passend beveiligen. Waar nodig sluiten wij met deze partijen een verwerkersovereenkomst of maken wij gebruik van andere passende privacywaarborgen.' },
        { type: 'p', text: 'Afhankelijk van de dienst die je gebruikt, kunnen wij onder andere samenwerken met de volgende partijen:' },
        {
          type: 'ul',
          items: [
            { term: 'Vimeo', sep: ' – ', desc: 'voor het veilig hosten, opslaan en afspelen van videoboodschappen.' },
            { term: 'Donorbox', sep: ' – ', desc: 'voor het verwerken van donaties.' },
            { term: 'Mailchimp', sep: ' – ', desc: 'voor het versturen van nieuwsbrieven en e-mailcommunicatie.' },
            { term: 'Fillout', sep: ' – ', desc: 'voor het verwerken van formulieren en aanvragen.' },
            { term: 'GlobalRize', sep: ' – ', desc: 'voor de beantwoording van geloofs- en vervolgvragen wanneer dit onderdeel uitmaakt van onze dienstverlening.' },
          ],
        },
        { type: 'p', text: 'Sommige van deze dienstverleners zijn gevestigd buiten de Europese Economische Ruimte (EER). In dat geval zorgen wij ervoor dat persoonsgegevens uitsluitend worden verwerkt met passende waarborgen, zoals de door de Europese Commissie goedgekeurde standaardcontractbepalingen (Standard Contractual Clauses).' },
      ],
    },
    {
      heading: 'Gebruik van videoboodschappen op social media',
      blocks: [
        { type: 'p', text: "Getuigenisvideo's worden uitsluitend op onze socialmediakanalen gepubliceerd wanneer de maker hiervoor vooraf expliciet toestemming heeft gegeven. Zonder deze toestemming plaatsen wij de video niet op social media." },
      ],
    },
    {
      heading: 'Cookies en analyse',
      blocks: [
        { type: 'p', text: 'Wij gebruiken cookies en vergelijkbare technieken om onze website goed te laten werken en om inzicht te krijgen in het gebruik van onze website.' },
        { type: 'p', text: 'Wij gebruiken:' },
        {
          type: 'ul',
          items: [
            { term: 'Functionele cookies', desc: 'deze zijn nodig om de website goed te laten functioneren.' },
            { term: 'Analytische cookies', desc: 'hiermee meten wij hoe bezoekers onze website gebruiken, zodat wij de website kunnen verbeteren. Hiervoor maken wij gebruik van Google Analytics.' },
            { term: 'Google Search Console', desc: 'hiermee krijgen wij inzicht in hoe onze website wordt gevonden via Google. Google Search Console plaatst geen cookies op onze website, maar verwerkt wel gegevens over zoekprestaties en websitegebruik.' },
          ],
        },
        { type: 'p', text: 'Wij richten analytische cookies zo privacyvriendelijk mogelijk in. Waar nodig vragen wij vooraf toestemming voor het plaatsen van cookies.' },
        { type: 'p', text: 'Je kunt cookies uitschakelen via je browserinstellingen. Ook kun je eerder opgeslagen cookies via je browser verwijderen.' },
      ],
    },
    {
      heading: 'Jouw rechten',
      blocks: [
        { type: 'p', text: 'Je hebt het recht om:' },
        {
          type: 'ul',
          items: [
            'Je gegevens in te zien',
            'Je gegevens te laten aanpassen',
            'Je gegevens te laten verwijderen',
            'Je toestemming in te trekken',
            'Bezwaar te maken tegen verwerking',
            'Verwerking te beperken',
            'Je gegevens over te laten dragen (dataportabiliteit)',
          ],
        },
        { type: 'p', text: 'Je kunt hiervoor een verzoek sturen naar info@jesustoday.nl.' },
        { type: 'p', text: 'Om misbruik te voorkomen kunnen wij je vragen om aanvullende informatie om je identiteit te bevestigen.' },
      ],
    },
    {
      heading: 'Klacht indienen',
      blocks: [
        { type: 'p', text: 'Heb je een klacht over hoe wij met jouw gegevens omgaan? Dan kun je contact met ons opnemen.' },
        { type: 'p', text: 'Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.' },
      ],
    },
    {
      heading: 'Beveiliging',
      blocks: [
        { type: 'p', text: 'Wij nemen passende maatregelen om jouw gegevens te beschermen tegen misbruik, verlies of onbevoegde toegang.' },
        { type: 'p', text: 'Denk je dat jouw gegevens niet goed beveiligd zijn? Neem dan contact met ons op via info@jesustoday.nl.' },
      ],
    },
    {
      heading: 'Wijzigingen',
      blocks: [
        { type: 'p', text: 'Wij mogen deze privacyverklaring aanpassen. De meest actuele versie is altijd beschikbaar op onze website.' },
      ],
    },
  ],
  updated: 'Laatst bijgewerkt: 7 juli 2026',
};

const en: Content = {
  intro: [
    'JesusToday is an activity of Stichting Cornerstone Ministries, located at Evert van de Beekstraat 1-53, 1118 CN Schiphol, the Netherlands.',
    'Stichting Cornerstone Ministries is responsible for the processing of personal data within the JesusToday platform. In this privacy statement we explain which personal data we process, why we do so and which rights you have.',
    'Do you have questions about this privacy statement or about the processing of your personal data? Please contact us at info@jesustoday.nl.',
  ],
  sections: [
    {
      heading: 'Which personal data do we process?',
      blocks: [
        { type: 'p', text: 'We process personal data when you use the JesusToday platform or when you provide it to us yourself.' },
        { type: 'p', text: 'Depending on how you use our services, we may process the following personal data:' },
        {
          type: 'ul',
          items: [
            'First and last name',
            'Email address',
            'Phone number (optional)',
            'Address details (if needed for our services)',
            'Other personal data you voluntarily share with us, for example via a contact form or profile',
            'The content of your personal video message and any accompanying information',
          ],
        },
      ],
    },
    {
      heading: 'Special categories of personal data',
      blocks: [
        { type: 'p', text: 'The JesusToday platform and our services are not intended for children under the age of 16, unless they have permission from a parent or legal guardian.' },
        { type: 'p', text: "We cannot verify whether a user is actually 16 years or older. We therefore advise parents and legal guardians to be involved in their children's online activities." },
        { type: 'p', text: 'Do you suspect that we have collected personal data of a minor without the required permission? Please contact us at info@jesustoday.nl. We will delete this data as soon as possible.' },
      ],
    },
    {
      heading: 'Why do we process your data?',
      blocks: [
        { type: 'p', text: 'We process your personal data for the following purposes:' },
        {
          type: 'ul',
          items: [
            'Responding to questions via the contact form',
            'Sending newsletters',
            'Contacting you (by phone or email) when necessary',
            'Maintaining our records',
            'Providing services and products',
            'Offering and operating the JesusToday platform, including your personal video message',
          ],
        },
      ],
    },
    {
      heading: 'On what legal basis do we process your data?',
      blocks: [
        { type: 'p', text: 'Under the General Data Protection Regulation (GDPR), we may only process your personal data if there is a valid legal basis for doing so. Depending on the purpose, we use the following legal bases:' },
        {
          type: 'ul',
          items: [
            { term: 'Consent', desc: 'For publishing your video message, sending newsletters and other processing for which your consent is required.' },
            { term: 'Performance of a contract', desc: 'For creating and managing your account, offering the JesusToday platform and delivering our services.' },
            { term: 'Legal obligation', desc: 'For complying with legal obligations, such as tax and administrative retention requirements.' },
            { term: 'Legitimate interest', desc: 'For maintaining contact with users, improving and securing our services and preventing misuse of the platform, whereby we always carefully weigh our interests against your privacy.' },
          ],
        },
        { type: 'p', text: 'Have you given consent for a processing activity? You can withdraw this consent at any time. This does not affect the lawfulness of the processing that took place before you withdrew your consent.' },
      ],
    },
    {
      heading: 'How long do we keep your data?',
      blocks: [
        { type: 'p', text: 'We do not keep your data longer than necessary. In concrete terms this means:' },
        {
          type: 'ul',
          items: [
            { term: 'Contact details', desc: 'As long as your video account is active.' },
            { term: 'Newsletter data', desc: 'until you unsubscribe' },
            { term: 'Account data', desc: 'up to 4 years, or as long as your video account is active.' },
            { term: 'Administrative data (such as donations)', desc: '7 years (legal obligation)' },
            { term: 'Video messages', desc: 'as long as your account is active or until you have them removed.' },
          ],
        },
      ],
    },
    {
      heading: 'Use of external service providers',
      blocks: [
        { type: 'p', text: 'To provide our services, we use external service providers who may process personal data on behalf of JesusToday. We select these parties carefully and ensure that they protect your data appropriately. Where necessary, we conclude a data processing agreement with these parties or use other appropriate privacy safeguards.' },
        { type: 'p', text: 'Depending on the service you use, we may work with the following parties, among others:' },
        {
          type: 'ul',
          items: [
            { term: 'Vimeo', sep: ' – ', desc: 'for securely hosting, storing and playing video messages.' },
            { term: 'Donorbox', sep: ' – ', desc: 'for processing donations.' },
            { term: 'Mailchimp', sep: ' – ', desc: 'for sending newsletters and email communication.' },
            { term: 'Fillout', sep: ' – ', desc: 'for processing forms and requests.' },
            { term: 'GlobalRize', sep: ' – ', desc: 'for answering faith-related and follow-up questions when this is part of our services.' },
          ],
        },
        { type: 'p', text: 'Some of these service providers are located outside the European Economic Area (EEA). In that case, we ensure that personal data is only processed with appropriate safeguards, such as the Standard Contractual Clauses approved by the European Commission.' },
      ],
    },
    {
      heading: 'Use of video messages on social media',
      blocks: [
        { type: 'p', text: 'Testimony videos are only published on our social media channels when the creator has given explicit prior consent. Without this consent, we do not post the video on social media.' },
      ],
    },
    {
      heading: 'Cookies and analytics',
      blocks: [
        { type: 'p', text: 'We use cookies and similar techniques to make our website work properly and to gain insight into how our website is used.' },
        { type: 'p', text: 'We use:' },
        {
          type: 'ul',
          items: [
            { term: 'Functional cookies', desc: 'these are needed to make the website function properly.' },
            { term: 'Analytical cookies', desc: 'these allow us to measure how visitors use our website, so that we can improve it. For this we use Google Analytics.' },
            { term: 'Google Search Console', desc: 'this gives us insight into how our website is found via Google. Google Search Console does not place cookies on our website, but does process data about search performance and website use.' },
          ],
        },
        { type: 'p', text: 'We set up analytical cookies as privacy-friendly as possible. Where necessary, we ask for prior consent to place cookies.' },
        { type: 'p', text: 'You can disable cookies via your browser settings. You can also delete previously stored cookies via your browser.' },
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        { type: 'p', text: 'You have the right to:' },
        {
          type: 'ul',
          items: [
            'View your data',
            'Have your data corrected',
            'Have your data deleted',
            'Withdraw your consent',
            'Object to processing',
            'Restrict processing',
            'Have your data transferred (data portability)',
          ],
        },
        { type: 'p', text: 'You can send a request for this to info@jesustoday.nl.' },
        { type: 'p', text: 'To prevent misuse, we may ask you for additional information to confirm your identity.' },
      ],
    },
    {
      heading: 'Filing a complaint',
      blocks: [
        { type: 'p', text: 'Do you have a complaint about how we handle your data? Then you can contact us.' },
        { type: 'p', text: 'You also have the right to file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).' },
      ],
    },
    {
      heading: 'Security',
      blocks: [
        { type: 'p', text: 'We take appropriate measures to protect your data against misuse, loss or unauthorized access.' },
        { type: 'p', text: 'Do you think your data is not properly secured? Please contact us at info@jesustoday.nl.' },
      ],
    },
    {
      heading: 'Changes',
      blocks: [
        { type: 'p', text: 'We may amend this privacy statement. The most current version is always available on our website.' },
      ],
    },
  ],
  updated: 'Last updated: 7 July 2026',
};

const EMAIL = 'info@jesustoday.nl';

function renderText(text: string) {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={`mailto:${EMAIL}`} className="text-gold hover:underline">
          {EMAIL}
        </a>
      )}
    </Fragment>
  ));
}

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const content = i18n.language === 'en' ? en : nl;

  return (
    <>
      <Helmet>
        <title>{t('Privacyverklaring, JesusToday')}</title>
        <meta name="description" content={t('Lees hoe JesusToday omgaat met jouw persoonsgegevens, welke gegevens we verwerken en welke rechten je hebt.')} />
        <meta property="og:title" content={t('Privacyverklaring, JesusToday')} />
        <meta property="og:description" content={t('Lees hoe JesusToday omgaat met jouw persoonsgegevens.')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesustoday.app/privacy" />
        <link rel="canonical" href="https://jesustoday.app/privacy" />
        <meta name="twitter:title" content={t('Privacyverklaring, JesusToday')} />
        <meta name="twitter:description" content={t('Lees hoe JesusToday omgaat met jouw persoonsgegevens.')} />
        <html lang={i18n.language} />
      </Helmet>
      <Header />
      <main className="bg-cream pt-32 pb-24">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-anthracite mb-6">
              {t('Privacy')}
              <span className="text-gold">{t('verklaring')}</span>
            </h1>
            <div className="space-y-3 mb-12">
              {content.intro.map((p, i) => (
                <p key={i} className="text-muted-foreground">
                  {renderText(p)}
                </p>
              ))}
            </div>

            <div className="prose prose-lg max-w-none space-y-10 text-anthracite/90">
              {content.sections.map((section, si) => (
                <section key={si}>
                  <h2 className="text-2xl font-bold text-anthracite mb-3">
                    {section.heading}
                  </h2>
                  {section.blocks.map((block, bi) =>
                    block.type === 'p' ? (
                      <p key={bi} className="mb-4 last:mb-0">
                        {renderText(block.text)}
                      </p>
                    ) : (
                      <ul key={bi} className="list-disc pl-6 space-y-1 mb-4">
                        {block.items.map((item, ii) => (
                          <li key={ii}>
                            {typeof item === 'string' ? (
                              renderText(item)
                            ) : (
                              <>
                                <span className="font-semibold text-anthracite">
                                  {item.term}
                                </span>
                                {item.sep ?? ': '}
                                {renderText(item.desc)}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </section>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-12">
              {content.updated}
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;