import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

const STORAGE_KEY = "jt-lang";

const stored =
  typeof window !== "undefined"
    ? (localStorage.getItem(STORAGE_KEY) as "nl" | "en" | null)
    : null;

i18n
  .use(initReactI18next)
  .init({
    lng: stored ?? "nl",
    fallbackLng: false,
    resources: {
      en: { translation: en as Record<string, string> },
      nl: { translation: {} },
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