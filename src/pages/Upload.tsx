import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Download, Video, QrCode, Share2, Shield, Clock, Heart, ArrowRight, Camera, Users, Mail, HelpCircle, Quote } from 'lucide-react';
import promoCard from '@/assets/jt-promo-card.jpg';

const APP_STORE_URL = 'https://apps.apple.com/nl/app/jesus-today/id1623308816';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.mxapps.jesustoday';

type Platform = 'ios' | 'android' | 'other';

const detectPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
};

const AppleBadge = ({ primary = false }: { primary?: boolean }) => {
  const { t } = useTranslation();
  return (
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-3 rounded-2xl transition-all duration-300 ${
      primary
        ? 'bg-gold text-anthracite px-7 py-4 shadow-gold hover:scale-105'
        : 'bg-anthracite/10 text-anthracite border border-anthracite/20 px-5 py-3 hover:bg-anthracite/20'
    }`}
    aria-label={t('Download in de App Store')}
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
    <div className="text-left leading-tight">
      <span className="block text-xs opacity-70">{t('Download in de')}</span>
      <span className="block font-semibold text-base">App Store</span>
    </div>
  </a>
  );
};

const GoogleBadge = ({ primary = false }: { primary?: boolean }) => {
  const { t } = useTranslation();
  return (
  <a
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-3 rounded-2xl transition-all duration-300 ${
      primary
        ? 'bg-gold text-anthracite px-7 py-4 shadow-gold hover:scale-105'
        : 'bg-anthracite/10 text-anthracite border border-anthracite/20 px-5 py-3 hover:bg-anthracite/20'
    }`}
    aria-label={t('Download in Google Play')}
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
    <div className="text-left leading-tight">
      <span className="block text-xs opacity-70">{t('Ontvang in')}</span>
      <span className="block font-semibold text-base">Google Play</span>
    </div>
  </a>
  );
};

const StoreButtons = ({ platform }: { platform: Platform }) => {
  if (platform === 'ios') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <AppleBadge primary />
        <GoogleBadge />
      </div>
    );
  }
  if (platform === 'android') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <GoogleBadge primary />
        <AppleBadge />
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <AppleBadge primary />
      <GoogleBadge primary />
    </div>
  );
};

const getSteps = (t: (key: string) => string) => [
  {
    icon: Download,
    number: '01',
    title: t('Download de app'),
    description: t('Gratis beschikbaar in de App Store en Google Play. Maak een account aan in minder dan een minuut.'),
  },
  {
    icon: Video,
    number: '02',
    title: t('Neem jouw verhaal op'),
    description: t('Een korte video direct in de app. Geen ervaring nodig, we helpen je met simpele vragen om je verhaal te vormen.'),
  },
  {
    icon: Share2,
    number: '03',
    title: t('Deel via een QR-code'),
    description: t('Je ontvangt een unieke QR-code en kaartjes. Deel jouw verhaal in het dagelijks leven of op social media.'),
  },
];

const getFaqs = (t: (key: string) => string) => [
  { icon: Heart, q: t('Is de app gratis?'), a: t('Ja, JesusToday is volledig gratis te downloaden en te gebruiken.') },
  { icon: Clock, q: t('Hoe lang duurt het?'), a: t('In ongeveer 5 minuten heb je jouw verhaal opgenomen en gedeeld.') },
  { icon: Shield, q: t('Wat gebeurt er met mijn video?'), a: t('Je bepaalt zelf wat je deelt. Wij gaan zorgvuldig om met jouw verhaal en privacy.') },
];

const getReviews = (t: (key: string) => string) => [
  {
    quote: t('Jezus heeft mijn leven veranderd. En iedereen mag dat horen.'),
    name: 'Daniel',
  },
  {
    quote: t('Ik hou ervan om andere mensen te inspireren. Hoe kan dat beter dan vertellen wat ik zelf ontdekt heb over Jezus.'),
    name: 'Sam',
  },
];

const Upload = () => {
  const [platform, setPlatform] = useState<Platform>('other');
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith('en');
  const vimeoId = isEnglish ? '1044611232' : '947358616';
  const steps = getSteps(t);
  const faqs = getFaqs(t);
  const reviews = getReviews(t);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('Upload jouw verhaal, JesusToday')}</title>
        <meta
          name="description"
          content={t('Deel jouw verhaal over Jezus in 3 simpele stappen. Eenvoudig, veilig en gratis via JesusToday.')}
        />
        <meta property="og:title" content={t('Upload jouw verhaal, JesusToday')} />
        <meta property="og:description" content={t('Deel jouw verhaal over Jezus in 3 simpele stappen.')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jesustoday.app/upload" />

        <link rel="canonical" href="https://jesustoday.app/upload" />
        <meta name="twitter:title" content={t('Upload jouw verhaal, JesusToday')} />
        <meta name="twitter:description" content={t('Deel jouw verhaal over Jezus in 3 simpele stappen.')} />
      </Helmet>

      <Header />
      <main className="overflow-hidden">
        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <span className="inline-block px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-anthracite text-sm font-medium mb-6">
                  {t('Zo deel je jouw verhaal')}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-anthracite leading-tight mb-6">
                  {t('Jouw verhaal, in')} <span className="text-gold">{t('3 stappen')}</span> {t('gedeeld')}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                  {t('Download de JesusToday app, neem in een paar minuten jouw verhaal op en deel het met mensen om je heen via een eigen QR-code.')}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <StoreButtons platform={platform} />
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <p className="text-sm text-muted-foreground mt-6">{t('Gratis, voor iPhone en Android.')}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-warm-white mb-4">
                  {t('Zo')} <span className="text-gold">{t('werkt het')}</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-warm-white/70 mb-16 max-w-2xl mx-auto">
                  {t('In drie eenvoudige stappen sta jouw verhaal online.')}
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <ScrollReveal key={step.number} delay={150 + i * 100}>
                    <div className="relative h-full p-8 rounded-2xl bg-anthracite-light border border-warm-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                      <span className="absolute -top-4 -right-2 text-6xl font-bold text-gold/15 font-heading">
                        {step.number}
                      </span>
                      <div className="relative w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mb-6 shadow-gold">
                        <step.icon className="w-7 h-7 text-anthracite" />
                      </div>
                      <h3 className="text-xl font-semibold text-warm-white mb-3">{step.title}</h3>
                      <p className="text-warm-white/70 leading-relaxed">{step.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={400}>
                <div className="mt-16 max-w-3xl mx-auto">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-anthracite-light shadow-card border border-warm-white/10">
                    <iframe
                      key={vimeoId}
                      src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder={0}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
title={t('Zo werkt JesusToday')}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* APP PREVIEW */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-anthracite leading-tight">
                    {t('Alles wat je nodig hebt, in')} <span className="text-gold">{t('één app')}</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('Opnemen, uploaden en delen vanaf je telefoon. Je krijgt eenvoudige stappen die je helpen jouw verhaal helder en persoonlijk te vertellen.')}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {[t('Begeleide vragen om je verhaal vorm te geven'), t('Direct opnemen vanuit de app'), t('Eigen QR-code voor in het dagelijks leven')].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-anthracite">
                        <QrCode className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream shadow-card">
                  <img
                    src={promoCard}
alt={t('JesusToday promokaartje met QR-code, voor- en achterkant')}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-warm-white mb-12">
                  {t('Goed om te')} <span className="text-gold">{t('weten')}</span>
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-6">
                {faqs.map((f, i) => (
                  <ScrollReveal key={f.q} delay={100 + i * 100}>
                    <div className="p-6 rounded-2xl bg-anthracite-light border border-warm-white/10 h-full">
                      <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                        <f.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="text-lg font-semibold text-warm-white mb-2">{f.q}</h3>
                      <p className="text-warm-white/70 leading-relaxed">{f.a}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HELP & DRAAIDAGEN */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="h-full p-8 md:p-10 rounded-2xl bg-background border border-border/50 shadow-card">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center mb-6">
                    <Camera className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-anthracite mb-4">
                    {t('Wij komen ook langs voor draaidagen')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('We organiseren draaidagen binnen kerken en organisaties en komen graag langs om jouw getuigenis vast te leggen, of om te helpen met het samenstellen en opnemen van getuigenissen van meerdere mensen.')}
                  </p>
                  <ul className="space-y-2 mb-6 text-anthracite">
                    <li className="flex items-start gap-3"><Users className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" /><span>{t('Draaidagen in kerken en organisaties')}</span></li>
                    <li className="flex items-start gap-3"><Video className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" /><span>{t('Hulp bij opnemen en monteren')}</span></li>
                    <li className="flex items-start gap-3"><Heart className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" /><span>{t('Persoonlijke begeleiding bij jouw verhaal')}</span></li>
                  </ul>
                  <a href="mailto:info@jesustoday.nl?subject=Draaidag%20aanvragen" className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                    <Mail className="w-5 h-5" /> info@jesustoday.nl
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="h-full p-8 md:p-10 rounded-2xl bg-background border border-border/50 shadow-card">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center mb-6">
                    <HelpCircle className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-anthracite mb-4">
                    {t('Liever je video op een andere manier delen?')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('Geen probleem. Wil je jouw video liever via WeTransfer, e-mail of een ander kanaal sturen, of heb je hulp nodig bij het opnemen? Neem contact met ons op, we denken graag met je mee.')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="mailto:info@jesustoday.nl?subject=Hulp%20bij%20mijn%20verhaal" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-anthracite px-5 py-3 font-semibold shadow-gold hover:scale-105 transition-all">
                      <Mail className="w-5 h-5" /> {t('Stuur ons een mail')}
                    </a>
                    <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-anthracite/10 text-anthracite border border-anthracite/20 px-5 py-3 font-semibold hover:bg-anthracite/20 transition-all">
                      {t('Naar contactpagina')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-24 bg-anthracite">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-warm-white mb-4">
                  {t('Verhalen van')} <span className="text-gold">{t('gelovigen')}</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-center text-warm-white/70 mb-12 max-w-2xl mx-auto">
                  {t('Waarom anderen hun verhaal delen via JesusToday.')}
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8">
                {reviews.map((r, i) => (
                  <ScrollReveal key={r.name} delay={150 + i * 100}>
                    <figure className="relative h-full p-8 md:p-10 rounded-2xl bg-anthracite-light border border-warm-white/10">
                      <Quote className="w-9 h-9 text-gold mb-5" aria-hidden />
                      <blockquote className="text-xl md:text-2xl text-warm-white leading-relaxed font-medium">
                        "{r.quote}"
                      </blockquote>
                      <figcaption className="mt-6 text-warm-white/70 font-semibold">{r.name}</figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-cream relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-3xl" aria-hidden />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-6">
                  {t('Klaar om te')} <span className="text-gold">{t('beginnen?')}</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-lg text-muted-foreground mb-10">
                  {t('Download de app en deel jouw verhaal vandaag nog.')}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <StoreButtons platform={platform} />
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="mt-10">
                  <Link to="/verhalen-over-jezus" className="inline-flex items-center gap-2 text-anthracite hover:text-gold transition-colors font-medium">
                    {t('Eerst andere verhalen bekijken')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Upload;