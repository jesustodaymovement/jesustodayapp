import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const AskQuestionSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const question = data.get('question') as string;

    const subject = encodeURIComponent(`Vraag van ${name || 'een bezoeker'}`);
    const body = encodeURIComponent(`Naam: ${name}\nE-mail: ${email}\n\nVraag:\n${question}`);
    window.location.href = `mailto:hallo@jesustoday.nl?subject=${subject}&body=${body}`;

    setSubmitted(true);
    toast({ title: 'Bedankt voor je vraag', description: 'Je e-mailprogramma is geopend.' });
  };

  return (
    <section className="py-24 bg-cream" id="stel-je-vraag">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-gold/15 items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anthracite mb-4">
                Heb je een vraag over geloof?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We luisteren. Stel je vraag, hoe groot of klein ook, en iemand neemt persoonlijk contact met je op.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Je naam
                  </label>
                  <Input id="name" name="name" required placeholder="Voornaam" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="jij@voorbeeld.nl" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium text-foreground">
                  Je vraag
                </label>
                <Textarea
                  id="question"
                  name="question"
                  required
                  rows={5}
                  placeholder="Schrijf hier waar je over nadenkt..."
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Verzonden
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Verstuur mijn vraag
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We behandelen je vraag vertrouwelijk. Geen spam, beloofd.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};