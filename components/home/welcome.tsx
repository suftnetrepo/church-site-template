'use client';

import Image from 'next/image';
import { useSettings } from '@/hooks/use-settings';
import { churchConfig } from '@/church.config';

export function Welcome() {
  const { settings } = useSettings();
  const pastor = settings?.pastor_section;

  const text =
    pastor?.description ??
    "Whatever season you're walking through, you don't have to walk through it alone. Come as you are — we'll believe with you for what's next.";
  const attribution = pastor ? `${pastor.first_name} ${pastor.last_name}` : `The ${churchConfig.shortName} Pastoral Team`;
  const role = pastor?.title;

  return (
    <section className="px-8 pb-[100px]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[70px] items-center">
        <div className="aspect-[4/5] rounded-md relative overflow-hidden bg-gradient-to-br from-sage-soft via-paper-alt to-gold-pale">
          {pastor?.secure_url ? (
            <Image src={pastor.secure_url} alt={attribution} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.5),transparent_45%)]" />
          )}
        </div>
        <div>
          <div className="eyebrow text-gold-deep mb-4">A word of welcome</div>
          <h2 className="text-[32px] mb-[22px] max-w-[480px]">You have a place here.</h2>
          <blockquote className="font-display italic text-xl leading-[1.55] text-ink border-l-2 border-gold pl-6 mb-5">
            &ldquo;{text}&rdquo;
          </blockquote>
          <div className="text-[13.5px] text-ink-soft font-medium">
            — {attribution}
            {role && `, ${role}`}
          </div>
        </div>
      </div>
    </section>
  );
}
