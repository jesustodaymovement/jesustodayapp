import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createSubmission, submissionSchema } from '@/lib/submissions';

const REQUEST_TYPES = [
  { value: 'partnership', label: 'Partnership met onze kerk of organisatie' },
  { value: 'spreker', label: 'Spreker over getuigen en verhalen delen' },
  { value: 'draaidag', label: 'Draaidag om verhalen op te nemen' },
  { value: 'event', label: 'Samenwerking op een event of festival' },
  { value: 'anders', label: 'Iets anders' },
];

const ORG_TYPES = [
  { value: '', label: 'Kies een type (optioneel)' },
  { value: 'kerk', label: 'Kerk' },
  { value: 'stichting', label: 'Christelijke organisatie of stichting' },
  { value: 'jongerenwerk', label: 'Jeugd, of jongerenwerk' },
  { value: 'event', label: 'Festival of event' },
  { value: 'school', label: 'School of onderwijs' },
  { value: 'bedrijf', label: 'Bedrijf' },
  { value: 'anders', label: 'Anders' },
];

export const PartnerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      const requestType = String(data.get('requestType') ?? 'partnership');
      const organizationType = String(data.get('organizationType') ?? '');
      const parsed = submissionSchema.parse({
        type: 'partner',
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        organization: String(data.get('organization') ?? ''),
        subject: REQUEST_TYPES.find((r) => r.value === requestType)?.label ?? requestType,
        message: String(data.get('message') ?? ''),
        metadata: { requestType, organizationType },
      });
      await createSubmission(parsed);
      setSubmitted(true);
      form.reset();
      toast({ title: 'Aanvraag verstuurd', description: 'We nemen zo snel mogelijk contact met je op.' });
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message ?? err?.message ?? 'Er ging iets mis. Probeer het opnieuw.';
      toast({ title: 'Verzenden mislukt', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="p-org" className="text-sm font-medium text-foreground">Kerk of organisatie</label>
          <Input id="p-org" name="organization" required placeholder="Bijv. Stadskerk Groningen of Stichting Hoop" />
        </div>
        <div className="space-y-2">
          <label htmlFor="p-name" className="text-sm font-medium text-foreground">Contactpersoon</label>
          <Input id="p-name" name="name" required placeholder="Voornaam Achternaam" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="p-email" className="text-sm font-medium text-foreground">E-mail</label>
          <Input id="p-email" name="email" type="email" required placeholder="jij@organisatie.nl" />
        </div>
        <div className="space-y-2">
          <label htmlFor="p-phone" className="text-sm font-medium text-foreground">Telefoon (optioneel)</label>
          <Input id="p-phone" name="phone" type="tel" placeholder="06 12345678" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="p-orgtype" className="text-sm font-medium text-foreground">Type organisatie (optioneel)</label>
        <select
          id="p-orgtype"
          name="organizationType"
          defaultValue=""
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {ORG_TYPES.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="p-type" className="text-sm font-medium text-foreground">Waar willen jullie over praten?</label>
        <select
          id="p-type"
          name="requestType"
          required
          defaultValue="partnership"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {REQUEST_TYPES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="p-message" className="text-sm font-medium text-foreground">Vertel ons meer</label>
        <Textarea id="p-message" name="message" required rows={5} placeholder="Wat hopen jullie te bereiken? Wat is jullie context?" />
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
        {submitted ? <><CheckCircle2 className="w-5 h-5" /> Verzonden</> : <><Send className="w-5 h-5" /> {loading ? 'Versturen...' : 'Verstuur aanvraag'}</>}
      </Button>
      <p className="text-xs text-center text-muted-foreground">We nemen binnen enkele werkdagen contact op.</p>
    </form>
  );
};