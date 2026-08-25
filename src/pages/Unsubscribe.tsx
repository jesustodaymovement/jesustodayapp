import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Loader2, MailX, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const FUNCTIONS_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/handle-email-unsubscribe`;

type State = 'loading' | 'confirm' | 'already' | 'invalid' | 'success' | 'error';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [state, setState] = useState<State>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setState('invalid');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${FUNCTIONS_URL}?token=${encodeURIComponent(token)}`);
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok || data?.valid === false) {
          setState(data?.alreadyUnsubscribed || data?.already_unsubscribed ? 'already' : 'invalid');
          return;
        }
        setEmail(data?.email ?? null);
        setState(data?.alreadyUnsubscribed || data?.already_unsubscribed ? 'already' : 'confirm');
      } catch {
        if (!cancelled) setState('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirm = async () => {
    setBusy(true);
    try {
      const res = await fetch(FUNCTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    } finally {
      setBusy(false);
    }
  };

  const content = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Even controleren...
          </div>
        );
      case 'confirm':
        return (
          <>
            <h1 className="mb-4 text-3xl font-bold text-anthracite">Afmelden voor e-mails</h1>
            <p className="mb-8 text-muted-foreground">
              {email
                ? `Wil je ${email} afmelden voor e-mails van JesusToday?`
                : 'Wil je je afmelden voor e-mails van JesusToday?'}
            </p>
            <Button variant="hero" size="lg" onClick={confirm} disabled={busy}>
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <MailX className="h-5 w-5" />}
              Ja, meld me af
            </Button>
          </>
        );
      case 'already':
        return (
          <>
            <h1 className="mb-4 text-3xl font-bold text-anthracite">Je bent al afgemeld</h1>
            <p className="text-muted-foreground">
              Dit e-mailadres ontvangt geen e-mails meer van JesusToday.
            </p>
          </>
        );
      case 'success':
        return (
          <>
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
              <CheckCircle2 className="h-7 w-7 text-gold" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-anthracite">Je bent afgemeld</h1>
            <p className="text-muted-foreground">
              Dankjewel, we sturen je geen e-mails meer. Je bent altijd welkom om terug te komen.
            </p>
          </>
        );
      default:
        return (
          <>
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-anthracite">Deze link werkt niet meer</h1>
            <p className="text-muted-foreground">
              Gebruik de link uit de meest recente e-mail, of mail ons op info@jesustoday.nl.
            </p>
          </>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Afmelden voor e-mails, JesusToday</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Meld je af voor e-mails van JesusToday." />
      </Helmet>
      <Header />
      <main>
        <section className="bg-cream pb-24 pt-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-xl rounded-2xl border border-border/50 bg-background p-8 text-center shadow-card md:p-12">
              {content()}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Unsubscribe;
