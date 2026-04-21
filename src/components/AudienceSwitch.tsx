import { useAudience, AudienceMode } from '@/contexts/AudienceContext';
import { Sparkles, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienceSwitchProps {
  variant?: 'hero' | 'floating';
  className?: string;
}

const options: { value: AudienceMode; label: string; sub: string; icon: typeof Sparkles }[] = [
  { value: 'share', label: 'Vertel over God', sub: 'Ik wil mijn verhaal delen', icon: Sparkles },
  { value: 'discover', label: 'Ontdek God', sub: 'Ik wil geïnspireerd worden', icon: Compass },
];

export const AudienceSwitch = ({ variant = 'hero', className }: AudienceSwitchProps) => {
  const { mode, setMode } = useAudience();

  if (variant === 'floating') {
    return (
      <div
        className={cn(
          'fixed bottom-6 right-6 z-40 flex items-center gap-1 rounded-full bg-anthracite/90 backdrop-blur-md p-1 shadow-2xl border border-warm-white/10',
          className,
        )}
      >
        {options.map((opt) => {
          const active = mode === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                active
                  ? 'bg-gold text-anthracite shadow-md'
                  : 'text-warm-white/80 hover:text-warm-white',
              )}
              aria-pressed={active}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <p className="text-center text-warm-white/80 text-sm font-medium mb-3 tracking-wide uppercase">
        Ik wil...
      </p>
      <div className="grid grid-cols-2 gap-2 p-2 rounded-2xl bg-warm-white/10 backdrop-blur-md border border-warm-white/20 shadow-2xl">
        {options.map((opt) => {
          const active = mode === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl transition-all duration-300',
                active
                  ? 'bg-gold text-anthracite shadow-gold scale-[1.02]'
                  : 'text-warm-white hover:bg-warm-white/10',
              )}
              aria-pressed={active}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span className="text-base md:text-lg font-bold">{opt.label}</span>
              </div>
              <span className={cn('text-xs', active ? 'text-anthracite/70' : 'text-warm-white/60')}>
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};