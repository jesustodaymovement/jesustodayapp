import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createSubmission, submissionSchema } from '@/lib/submissions';

export const ContactForm = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const prefillSubject = searchParams.get('subject') ?? '';
  const prefillMessage = searchParams.get('message') ?? '';
  const prefillVimeoId = searchParams.get('vimeoId') ?? '';
  const prefillTestimonyName = searchParams.get('testimonyName') ?? '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      const parsed = submissionSchema.parse({
        type: 'contact',
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
        metadata: prefillVimeoId
          ? {
              vimeoId: prefillVimeoId,
              testimonyName: prefillTestimonyName || undefined,
              testimonyUrl: `${window.location.origin}/verhalen-over-jezus/${prefillVimeoId}`,
            }
          : undefined,
      });
      await createSubmission(parsed);
      setSubmitted(true);
      form.reset();
      toast({ title: t('Bericht verstuurd'), description: t('Dankjewel, we reageren persoonlijk zodra het kan.') });
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message ?? err?.message ?? t('Er ging iets mis. Probeer het opnieuw.');
      toast({ title: t('Verzenden mislukt'), description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="c-name" className="text-sm font-medium text-foreground">{t('Je naam')}</label>
          <Input id="c-name" name="name" required placeholder={t('Voornaam Achternaam')} />
        </div>
        <div className="space-y-2">
          <label htmlFor="c-email" className="text-sm font-medium text-foreground">{t('E-mail')}</label>
          <Input id="c-email" name="email" type="email" required placeholder={t('jij@voorbeeld.nl')} />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="c-subject" className="text-sm font-medium text-foreground">{t('Onderwerp')}</label>
        <Input id="c-subject" name="subject" placeholder={t('Waar gaat het over?')} defaultValue={prefillSubject} key={`subj-${prefillSubject}`} />
      </div>
      <div className="space-y-2">
        <label htmlFor="c-message" className="text-sm font-medium text-foreground">{t('Bericht')}</label>
        <Textarea id="c-message" name="message" required rows={5} placeholder={t('Schrijf hier je bericht...')} defaultValue={prefillMessage} key={`msg-${prefillMessage}`} />
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
        {submitted ? <><CheckCircle2 className="w-5 h-5" /> {t('Verzonden')}</> : <><Send className="w-5 h-5" /> {loading ? t('Versturen...') : t('Verstuur bericht')}</>}
      </Button>
      {prefillVimeoId && (
        <p className="text-xs text-center text-muted-foreground">
          {prefillTestimonyName
            ? t('Gekoppeld aan getuigenis van {{name}} (video {{id}}).', { name: prefillTestimonyName, id: prefillVimeoId })
            : t('Gekoppeld aan getuigenis (video {{id}}).', { id: prefillVimeoId })}
        </p>
      )}
      <p className="text-xs text-center text-muted-foreground">{t('We behandelen je bericht vertrouwelijk.')}</p>
    </form>
  );
};