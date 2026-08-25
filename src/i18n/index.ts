import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fil from "./locales/fil.json";

const STORAGE_KEY = "jt-lang";

export const SUPPORTED_LANGS = ["en", "nl", "es", "fil"] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];

const stored =
  typeof window !== "undefined"
    ? (localStorage.getItem(STORAGE_KEY) as AppLang | null)
    : null;

const initial: AppLang =
  stored && (SUPPORTED_LANGS as readonly string[]).includes(stored) ? stored : "en";

i18n
  .use(initReactI18next)
  .init({
    lng: initial,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    // Dutch is the source language of the keys, so an untranslated key already
    // renders Dutch. Spanish and Filipino fall back to English instead.
    fallbackLng: { es: ["en"], fil: ["en"], default: [] },
    resources: {
      en: { translation: en as Record<string, string> },
      nl: { translation: {} },
      es: { translation: es as Record<string, string> },
      fil: { translation: fil as Record<string, string> },
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
    parseMissingKeyHandler: (key) => key,
    react: { useSuspense: false },
  });

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
    try {
      localStorage.setItem(STORAGE_KEY, lng);
    } catch {}
  });
}

export default i18n;
