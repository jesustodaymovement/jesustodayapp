import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mailchimp-subscribe', {
        body: { email, firstName },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setDone(true);
      toast({
        title: 'Bedankt voor je aanmelding',
        description: (data as any)?.alreadySubscribed
          ? 'Je was al ingeschreven, fijn dat je erbij bent.'
          : 'Je ontvangt voortaan updates van JesusToday.',
      });
      setEmail('');
      setFirstName('');
    } catch (err: any) {
      toast({
        title: 'Aanmelden mislukt',
        description: err?.message ?? 'Probeer het later opnieuw.',
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
          placeholder="Voornaam"
          aria-label="Voornaam"
          maxLength={100}
          className="flex-1 min-w-0 h-11 rounded-lg bg-warm-white/10 border border-warm-white/20 px-3 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:ring-2 focus:ring-[#fad150]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          aria-label="E-mailadres"
          maxLength={255}
          className="flex-[1.5] min-w-0 h-11 rounded-lg bg-warm-white/10 border border-warm-white/20 px-3 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:ring-2 focus:ring-[#fad150]"
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
          {done ? 'Aangemeld' : 'Aanmelden'}
        </button>
      </div>
      <p className="text-warm-white/40 text-xs mt-2">
        Geen spam, alleen bemoediging. Je kunt je altijd uitschrijven.
      </p>
    </form>
  );
};