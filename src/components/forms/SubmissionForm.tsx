import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createSubmission, type SubmissionType } from '@/lib/submissions';

const CORE_FIELDS = ['name', 'email', 'phone', 'organization', 'subject', 'message'] as const;

export interface SubmissionFieldDef {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
  /** Full width on desktop, default true for textarea */
  full?: boolean;
}

interface SubmissionFormProps {
  type: SubmissionType;
  formName: string;
  fields?: SubmissionFieldDef[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  confirmationIntro?: string;
  metadata?: Record<string, unknown>;
  className?: string;
}

const defaultFields: SubmissionFieldDef[] = [
  { name: 'name', label: 'Je naam', required: true, placeholder: 'Voornaam Achternaam' },
  { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'jij@voorbeeld.nl' },
  { name: 'subject', label: 'Onderwerp', placeholder: 'Waar gaat het over?' },
  { name: 'message', label: 'Bericht', type: 'textarea', required: true, rows: 5, placeholder: 'Schrijf hier je bericht...' },
];

export const SubmissionForm = ({
  type,
  formName,
  fields = defaultFields,
  submitLabel,
  successTitle,
  successText,
  confirmationIntro,
  metadata,
  className,
}: SubmissionFormProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const openedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot en snelheidscontrole tegen spam
    if (String(data.get('website') ?? '') !== '' || Date.now() - openedAt.current < 1500) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      const core: Record<string, string> = {};
      const extraFields: { label: string; value?: string }[] = [];
      const extraMeta: Record<string, unknown> = {};

      fields.forEach((f) => {
        const value = String(data.get(f.name) ?? '').trim();
        if ((CORE_FIELDS as readonly string[]).includes(f.name)) {
          core[f.name] = value;
        } else if (value) {
          extraFields.push({ label: f.label, value });
          extraMeta[f.name] = value;
        }
      });

      if (!core.message) {
        core.message = extraFields.map((f) => `${f.label}: ${f.value}`).join('\n') || '-';
      }

      await createSubmission({
        type,
        formName,
        name: core.name ?? '',
        email: core.email ?? '',
        phone: core.phone,
        organization: core.organization,
        subject: core.subject,
        message: core.message,
        metadata: { ...(metadata ?? {}), ...extraMeta },
        extraFields,
        confirmationIntro,
      });

      setSubmitted(true);
      form.reset();
      toast({
        title: t(successTitle ?? 'Bericht verstuurd'),
        description: t(successText ?? 'Dankjewel, we reageren persoonlijk zodra het kan.'),
      });
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message ?? err?.message ?? t('Er ging iets mis. Probeer het opnieuw.');
      toast({ title: t('Verzenden mislukt'), description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl border border-border/60 bg-background p-8 text-center ${className ?? ''}`}>
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
          <CheckCircle2 className="h-7 w-7 text-gold" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-anthracite">
          {successTitle ?? t('Bericht verstuurd')}
        </h3>
        <p className="text-muted-foreground">
          {successText ?? t('Dankjewel, we reageren persoonlijk zodra het kan.')}
        </p>
      </div>
    );
  }

  const renderField = (f: SubmissionFieldDef) => {
    const id = `${type}-${f.name}`;
    const isFull = f.full ?? f.type === 'textarea';
    return (
      <div key={f.name} className={`space-y-2 ${isFull ? 'sm:col-span-2' : ''}`}>
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {t(f.label)}
          {f.required ? ' *' : ''}
        </label>
        {f.type === 'textarea' ? (
          <Textarea
            id={id}
            name={f.name}
            required={f.required}
            rows={f.rows ?? 5}
            maxLength={2000}
            placeholder={f.placeholder ? t(f.placeholder) : undefined}
          />
        ) : f.type === 'select' ? (
          <select
            id={id}
            name={f.name}
            required={f.required}
            defaultValue=""
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              {t('Maak een keuze')}
            </option>
            {(f.options ?? []).map((o) => (
              <option key={o} value={o}>
                {t(o)}
              </option>
            ))}
          </select>
        ) : (
          <Input
            id={id}
            name={f.name}
            type={f.type ?? 'text'}
            required={f.required}
            maxLength={f.name === 'email' ? 255 : 150}
            placeholder={f.placeholder ? t(f.placeholder) : undefined}
          />
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-2xl border border-border/50 bg-background p-6 shadow-card md:p-8 ${className ?? ''}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">{fields.map(renderField)}</div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {loading ? t('Versturen...') : t(submitLabel ?? 'Verstuur bericht')}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {t('We behandelen je gegevens vertrouwelijk en sturen je een bevestiging per e-mail.')}
      </p>
    </form>
  );
};
