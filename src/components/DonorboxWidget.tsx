import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://donorbox.org/widgets.js';
const CAMPAIGN = 'donatie-voor-jesus-today-en';

/** Donorbox donatieformulier via het officiele dbox-widget element. */
export const DonorboxWidget = ({ className }: { className?: string }) => {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.type = 'module';
      s.async = true;
      document.body.appendChild(s);
    }
    if (holder.current && !holder.current.firstChild) {
      const el = document.createElement('dbox-widget');
      el.setAttribute('campaign', CAMPAIGN);
      el.setAttribute('type', 'donation_form');
      el.setAttribute('enable-auto-scroll', 'true');
      holder.current.appendChild(el);
    }
  }, []);

  return (
    <div className={`flex justify-center ${className ?? ''}`}>
      <div ref={holder} className="w-full" style={{ maxWidth: 500, minWidth: 250 }} />
    </div>
  );
};
