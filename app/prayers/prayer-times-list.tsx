'use client';

import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import type { RegularService } from '@/types/church';

const tones = [
  { bg: 'bg-indigo/10', text: 'text-indigo' },
  { bg: 'bg-sage-soft', text: 'text-sage' },
  { bg: 'bg-[#F3DFCF]', text: 'text-[#9C5B3C]' },
  { bg: 'bg-[#E9D9EC]', text: 'text-[#7A4F87]' },
  { bg: 'bg-gold-pale', text: 'text-gold-deep' }
];

function Card({ title, start_time, end_time, description, remote, remote_link, tone }: RegularService & { tone: { bg: string; text: string } }) {
  return (
    <div className="bg-paper border border-ink/10 rounded-md p-7 flex flex-col">
      <div className={`w-11 h-11 rounded-full ${tone.bg} ${tone.text} flex items-center justify-center mb-5`}>
        <Clock size={19} />
      </div>
      <h3 className="font-display text-xl mb-3">{title}</h3>
      <div className="flex items-center gap-2 text-ink-soft text-[13.5px] mb-3">
        <Clock size={15} className="shrink-0" />
        {start_time} – {end_time}
      </div>
      {description && <p className="text-[14px] text-ink-soft mb-4">{description}</p>}
      {remote && remote_link && (
        <Button href={remote_link} className="mt-auto self-start">
          Join online
        </Button>
      )}
    </div>
  );
}

export function PrayerTimesList() {
  const { prayerTimes } = usePrayerTimes();

  if (prayerTimes.length === 0) return null;

  if (prayerTimes.length === 1) {
    return (
      <section className="bg-paper px-8 py-14">
        <div className="max-w-[360px] mx-auto">
          <Card {...prayerTimes[0]} tone={tones[0]} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper px-8 py-14">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prayerTimes.map((meeting, i) => (
          <Card key={meeting._id ?? i} {...meeting} tone={tones[i % tones.length]} />
        ))}
      </div>
    </section>
  );
}
