'use client';

import { Phone } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';

const avatarTones = [
  'from-gold-pale to-gold',
  'from-sage-soft to-sage',
  'from-indigo/15 to-indigo',
  'from-gold-pale to-sage'
];

function initials(first: string, last: string) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

export function TeamGrid() {
  const { settings } = useSettings();
  const team = (settings?.contacts ?? []).filter((c) => c.status !== false);

  if (team.length === 0) {
    return <p className="text-ink-soft text-center">Our team details will appear here soon.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((person, i) => (
        <div key={person._id ?? i} className="bg-paper border border-ink/10 rounded-md p-7 text-center">
          <div
            className={`w-20 h-20 rounded-full mx-auto mb-5 bg-gradient-to-br ${avatarTones[i % avatarTones.length]} flex items-center justify-center`}
          >
            <span className="font-display text-xl text-ink">{initials(person.first_name, person.last_name)}</span>
          </div>
          <h3 className="font-semibold text-base mb-1">
            {person.first_name} {person.last_name}
          </h3>
          <p className="text-[13px] text-gold-deep font-medium mb-3">{person.title}</p>
          {person.phone && (
            <a href={`tel:${person.phone}`} className="text-[13.5px] text-ink-soft flex items-center justify-center gap-1.5">
              <Phone size={13} /> {person.phone}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
