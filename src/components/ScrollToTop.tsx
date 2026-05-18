import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll naar de bovenkant van de pagina bij elke route-wijziging.
 * Respecteert hash-links (bv. /pagina#sectie) zodat anchors blijven werken.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};