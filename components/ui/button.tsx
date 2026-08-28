import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
  href: string;
  variant?: 'gold' | 'outline-dark' | 'outline-light' | 'sage';
  className?: string;
  children: React.ReactNode;
};

const variants = {
  gold: 'bg-gold text-indigo-deep hover:bg-[#c8933a]',
  'outline-dark': 'border border-white/35 text-white hover:border-white hover:bg-white/5',
  'outline-light': 'border border-ink/15 text-ink hover:bg-black/[0.03]',
  sage: 'bg-sage text-white hover:bg-sage/90'
};

export function Button({ href, variant = 'gold', className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold px-[22px] py-[11px] rounded-[3px] transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
