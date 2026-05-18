import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings2 } from 'lucide-react';

const STORAGE_KEY = 'jt_cookie_consent_v1';

type Consent = {
  necessary: true;
  functional: boolean;
  analytical: boolean;
  decidedAt: string;
};

const defaultConsent: Consent = {
  necessary: true,
  functional: false,
  analytical: false,
  decidedAt: '',
};

function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: c }));
}

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>(defaultConsent);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setDraft(existing);
    }

    const handleOpen = () => {
      setDraft(readConsent() ?? defaultConsent);
      setSettingsOpen(true);
    };
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  const save = (c: Omit<Consent, 'decidedAt'>) => {
    const finalC: Consent = { ...c, decidedAt: new Date().toISOString() };
    writeConsent(finalC);
    setDraft(finalC);
    setVisible(false);
    setSettingsOpen(false);
  };

  const acceptAll = () =>
    save({ necessary: true, functional: true, analytical: true });
  const rejectAll = () =>
    save({ necessary: true, functional: false, analytical: false });

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-toestemming"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[100] bg-white border border-anthracite/15 rounded-2xl shadow-2xl p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-anthracite mb-1">
                Wij gebruiken cookies
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                JesusToday gebruikt technische, functionele en analytische
                cookies om de website goed te laten werken en te verbeteren. Lees
                meer in onze{' '}
                <a href="/privacy" className="text-gold hover:underline">
                  privacyverklaring
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="hero"
              size="sm"
              onClick={acceptAll}
              className="flex-1"
            >
              Alles accepteren
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={rejectAll}
              className="flex-1"
            >
              Alleen noodzakelijk
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(true)}
              aria-label="Cookie-instellingen openen"
            >
              <Settings2 className="w-4 h-4" />
              Instellen
            </Button>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie-instellingen</DialogTitle>
            <DialogDescription>
              Kies per categorie welke cookies je toestaat. Je keuze kun je later
              altijd aanpassen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-cream border border-anthracite/10">
              <div>
                <h3 className="font-semibold text-anthracite">
                  Noodzakelijke cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Onmisbaar voor de technische werking van de website. Altijd
                  actief.
                </p>
              </div>
              <Switch checked disabled aria-label="Noodzakelijke cookies, altijd aan" />
            </div>

            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-cream border border-anthracite/10">
              <div>
                <h3 className="font-semibold text-anthracite">
                  Functionele cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Onthouden bijvoorbeeld jouw voorkeursinstellingen voor extra
                  gebruiksgemak.
                </p>
              </div>
              <Switch
                checked={draft.functional}
                onCheckedChange={(v) =>
                  setDraft((d) => ({ ...d, functional: v }))
                }
                aria-label="Functionele cookies toestaan"
              />
            </div>

            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-cream border border-anthracite/10">
              <div>
                <h3 className="font-semibold text-anthracite">
                  Analytische cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Helpen ons de website te optimaliseren. Maken geen inbreuk op
                  je privacy.
                </p>
              </div>
              <Switch
                checked={draft.analytical}
                onCheckedChange={(v) =>
                  setDraft((d) => ({ ...d, analytical: v }))
                }
                aria-label="Analytische cookies toestaan"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" onClick={rejectAll}>
              Alleen noodzakelijk
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() =>
                save({
                  necessary: true,
                  functional: draft.functional,
                  analytical: draft.analytical,
                })
              }
            >
              Voorkeuren opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event('open-cookie-settings'));
};