import anbiLogo from '@/assets/anbi-logo.png';
import { cn } from '@/lib/utils';

interface AnbiStampProps {
  className?: string;
  size?: number;
  rotate?: number;
}

export const AnbiStamp = ({ className, size = 96, rotate = -8 }: AnbiStampProps) => (
  <a
    href="https://www.belastingdienst.nl/rekenhulpen/anbi_zoeken/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="ANBI-status, bekijk op website van de Belastingdienst"
    className={cn(
      'inline-block transition-transform duration-300 hover:scale-105 hover:rotate-0 drop-shadow-lg',
      className
    )}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <img
      src={anbiLogo}
      alt="ANBI, Algemeen Nut Beogende Instelling"
      width={size}
      height={size}
      loading="lazy"
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  </a>
);
