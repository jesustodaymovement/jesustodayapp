import { useEffect, useRef } from 'react';

/**
 * Publieke Cloudflare Turnstile sitekey. Deze mag in de code staan.
 * Zolang deze leeg is wordt de widget overgeslagen en beschermen de andere
 * lagen (honeypot, snelheidslimiet, linkcheck, spamscore) de formulieren.
 */
export const TURNSTILE_SITE_KEY = '';

export const isTurnstileEnabled = () => TURNSTILE_SITE_KEY.length > 0;

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('turnstile_script_failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('turnstile_script_failed'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
  className?: string;
  /** Donkere achtergrond, gebruik het lichte thema */
  theme?: 'light' | 'dark' | 'auto';
}

export const TurnstileWidget = ({ onToken, className, theme = 'light' }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!isTurnstileEnabled()) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const turnstile = (window as any).turnstile;
        if (!turnstile) return;
        widgetId.current = turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          appearance: 'interaction-only',
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      })
      .catch(() => {
        // Script geblokkeerd, laat het formulier werken op de andere lagen.
        onTokenRef.current('');
      });

    return () => {
      cancelled = true;
      const turnstile = (window as any).turnstile;
      if (turnstile && widgetId.current) {
        try {
          turnstile.remove(widgetId.current);
        } catch {
          // widget was al opgeruimd
        }
      }
    };
  }, [theme]);

  if (!isTurnstileEnabled()) return null;

  return <div ref={containerRef} className={className} aria-hidden="true" />;
};

/** Vraagt een nieuw token op na een mislukte verzending. */
export function resetTurnstile() {
  const turnstile = (window as any)?.turnstile;
  try {
    turnstile?.reset();
  } catch {
    // niets te resetten
  }
}
