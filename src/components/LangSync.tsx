import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ALL_LANGS, langFromPath, localizePath, toNlPath, isLocalizable } from '@/lib/routes';

const BASE = 'https://jesustoday.app';
const HREFLANG: Record<string, string> = { nl: 'nl', en: 'en', es: 'es', fil: 'fil' };

/**
 * Houdt taal en URL gelijk:
 * - de taal in de URL bepaalt de websitetaal
 * - interne links krijgen automatisch het adres in de huidige taal
 * - canonical en hreflang per pagina
 */
export const LangSync = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const urlLang = langFromPath(pathname);
  const current = (i18n.language || 'en').split('-')[0];

  useEffect(() => {
    if (urlLang && urlLang !== current) i18n.changeLanguage(urlLang);
  }, [urlLang, current, i18n]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      const lang = (i18n.language || 'en').split('-')[0];
      const target = localizePath(href, lang);
      if (target === href) return;
      e.preventDefault();
      e.stopPropagation();
      navigate(target);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate, i18n]);

  const nl = toNlPath(pathname);
  if (!isLocalizable(nl)) return null;
  const self = localizePath(pathname, urlLang ?? current);

  return (
    <Helmet>
      <link rel="canonical" href={`${BASE}${self === '/' ? '/' : self}`} />
      <meta property="og:url" content={`${BASE}${self}`} />
      {ALL_LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={HREFLANG[l]} href={`${BASE}${localizePath(nl, l)}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${nl}`} />
    </Helmet>
  );
};
