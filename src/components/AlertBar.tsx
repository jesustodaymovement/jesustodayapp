import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Megaphone, X } from "lucide-react";

const STORAGE_KEY = "jt-opwekking-bar-dismissed";

export const AlertBar = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (!visible) {
      root.style.setProperty("--alert-h", "0px");
      body.style.paddingTop = "";
      return;
    }
    const update = () => {
      const el = document.getElementById("jt-alert-bar");
      const h = el ? el.offsetHeight : 0;
      root.style.setProperty("--alert-h", `${h}px`);
      body.style.paddingTop = `${h}px`;
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      root.style.setProperty("--alert-h", "0px");
      body.style.paddingTop = "";
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div
      id="jt-alert-bar"
      className="fixed top-0 left-0 right-0 z-[60] w-full"
      style={{ backgroundColor: "#fad150" }}
      role="region"
      aria-label={t("Aankondiging Opwekking")}
    >
      <Link
        to="/aanmeldenopwekking2026"
        className="flex items-center justify-center gap-2 px-12 py-2.5 text-sm md:text-base font-semibold text-neutral-900 hover:bg-black/5 transition-colors text-center"
      >
        <Megaphone className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>
          {t("Laat je getuigenis opnemen tijdens Opwekking,")}{" "}
          <span className="underline underline-offset-2">{t("meld je aan")}</span>
        </span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("Aankondiging sluiten")}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-black/10 transition-colors text-neutral-900"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default AlertBar;