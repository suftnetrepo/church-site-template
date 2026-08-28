'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/use-events';

function formatDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function EventsList() {
  const { events } = useEvents();
  const publishedEvents = events.filter((e) => e.status !== false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  function handleImgError(id: string) {
    setImgErrors((prev) => new Set(prev).add(id));
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-5">
      {publishedEvents.length === 0 && <p className="text-ink-soft text-center">No upcoming events right now — check back soon.</p>}
      {publishedEvents.map((event, i) => {
        const id = event._id ?? String(i);
        const isOpen = expanded.has(id);
        const address = [event.addressLine1, event.town, event.county, event.postcode].filter(Boolean).join(', ');
        const dateRange =
          event.end_date && event.end_date !== event.start_date
            ? `${formatDate(event.start_date)} – ${formatDate(event.end_date)}`
            : formatDate(event.start_date);
        const isLongDescription = (event.description?.length ?? 0) > 140;

        return (
          <div key={id} className="bg-paper border border-ink/10 rounded-md overflow-hidden flex flex-col sm:flex-row">
            {event.secure_url && (
              <div className="relative w-full sm:w-[220px] h-[160px] sm:h-auto shrink-0">
                {imgErrors.has(id) ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
                ) : (
                  <Image
                    src={event.secure_url}
                    alt={event.title}
                    fill
                    sizes="220px"
                    className="object-cover"
                    onError={() => handleImgError(id)}
                  />
                )}
              </div>
            )}
            <div className="p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-1">
              <div className="min-w-0">
                <h3 className="font-display text-xl mb-3">{event.title}</h3>
                <div className="flex flex-col gap-1.5 text-[13.5px] text-ink-soft mb-3">
                  {dateRange && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} className="shrink-0" /> {dateRange}
                    </span>
                  )}
                  {address && (
                    <span className="flex items-start gap-1.5">
                      <MapPin size={15} className="shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </span>
                  )}
                </div>
                {event.description && (
                  <div className="max-w-[480px]">
                    <p className={`text-[14.5px] text-ink-soft ${!isOpen && isLongDescription ? 'line-clamp-2' : ''}`}>
                      {event.description}
                    </p>
                    {isLongDescription && (
                      <button
                        onClick={() => toggle(id)}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-gold-deep mt-1.5"
                      >
                        {isOpen ? 'Show less' : 'Show more'}
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                )}
              </div>
              {event.can_register && (
                <Button href={`/events/register?event=${event._id ?? ''}`} className="shrink-0 self-start">
                  Register
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
