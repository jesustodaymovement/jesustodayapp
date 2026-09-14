import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { detectSpam } from '@/lib/spam-guard';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

export const NewsletterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const showSuccess = (description?: string) => {
    setDone(true);
    toast({
      title: t('Bedankt voor je aanmelding'),
      description: description ?? t('Je ontvangt voortaan updates van JesusToday.'),
    });
    setEmail('');
    setFirstName('');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const elapsedMs = Date.now() - openedAt.current;
    // Spam stil weigeren: dezelfde succesmelding, geen aanmelding.
    if (detectSpam({ name: firstName, email, message: firstName, honeypot, elapsedMs })) {
      showSuccess();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mailchimp-subscribe', {
        body: { email, firstName, honeypot, elapsedMs },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      showSuccess(
        (data as any)?.alreadySubscribed
          ? t('Je was al ingeschreven, fijn dat je erbij bent.')
          : undefined,
      );
    } catch (err: any) {
      toast({
        title: t('Aanmelden mislukt'),
        description: err?.message ?? t('Probeer het later opnieuw.'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t('Voornaam')}
          aria-label={t('Voornaam')}
          maxLength={100}
          className="flex-1 min-w-0 h-11 rounded-lg bg-warm-white/10 border border-warm-white/20 px-3 text-warm-white placeholder:text-warm-white/70 focus:outline-none focus:ring-2 focus:ring-[#fad150]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('jouw@email.nl')}
          aria-label={t('E-mailadres')}
          maxLength={255}
          className="flex-[1.5] min-w-0 h-11 rounded-lg bg-warm-white/10 border border-warm-white/20 px-3 text-warm-white placeholder:text-warm-white/70 focus:outline-none focus:ring-2 focus:ring-[#fad150]"
        />
        <button
          type="submit"
          disabled={loading || done}
          className="h-11 px-5 rounded-lg bg-[#fad150] text-anthracite font-semibold inline-flex items-center justify-center gap-2 hover:brightness-95 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : done ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {done ? t('Aangemeld') : t('Aanmelden')}
        </button>
      </div>

      {/* Honeypot: buiten beeld, alleen bots vullen dit in */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
    </form>
  );
};
