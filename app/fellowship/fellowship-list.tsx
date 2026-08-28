'use client';

import { useMemo, useState } from 'react';
import { Search, MapPin, Phone } from 'lucide-react';
import { useFellowship } from '@/hooks/use-fellowship';

export function FellowshipList() {
  const { groups } = useFellowship();
  const [query, setQuery] = useState('');
  const [town, setTown] = useState('');

  const activeGroups = useMemo(() => groups.filter((g) => g.status !== false), [groups]);

  const towns = useMemo(
    () => Array.from(new Set(activeGroups.map((g) => g.town).filter(Boolean))).sort() as string[],
    [activeGroups]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activeGroups.filter((g) => {
      const matchesQuery = !q || g.name.toLowerCase().includes(q) || g.postcode?.toLowerCase().includes(q);
      const matchesTown = !town || g.town === town;
      return matchesQuery && matchesTown;
    });
  }, [activeGroups, query, town]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or postcode"
            className="w-full border border-ink/15 rounded-md pl-10 pr-3.5 py-2.5 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <select
          value={town}
          onChange={(e) => setTown(e.target.value)}
          className="border border-ink/15 rounded-md px-3.5 py-2.5 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-gold/40 sm:w-52"
        >
          <option value="">All towns</option>
          {towns.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <p className="text-[13px] text-ink-soft mb-5">
        {filtered.length} fellowship{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-ink-soft col-span-full text-center py-8">No fellowship groups match your search.</p>
        )}
        {filtered.map((group, i) => (
          <div key={group._id ?? i} className="bg-paper border border-ink/10 rounded-md p-6">
            <div className="w-10 h-10 rounded-full bg-gold-pale text-gold-deep flex items-center justify-center mb-4">
              <MapPin size={18} />
            </div>
            <h3 className="font-semibold text-base mb-1.5">{group.name}</h3>
            {group.town && <p className="text-[13px] text-gold-deep font-medium mb-2">{group.town}</p>}
            {(group.addressLine1 || group.postcode) && (
              <p className="text-[14px] text-ink-soft mb-2">
                {group.addressLine1}
                {group.addressLine1 && group.postcode && ', '}
                {group.postcode}
              </p>
            )}
            {group.mobile && (
              <p className="text-[13.5px] text-ink-soft flex items-center gap-1.5">
                <Phone size={14} /> {group.mobile}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
