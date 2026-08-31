import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <Helmet>
        <title>{t('Pagina niet gevonden, JesusToday')}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t('Oops! Page not found')}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 font-semibold text-anthracite transition-opacity hover:opacity-90"
          >
            {t('Return to Home')}
          </Link>
          <Link
            to="/verhalen-over-jezus"
            className="inline-flex items-center justify-center rounded-full border border-anthracite/20 px-6 py-3 font-semibold text-anthracite transition-colors hover:border-gold"
          >
            {t('Verhalen over Jezus')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
