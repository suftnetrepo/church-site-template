'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[720px] mx-auto">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="border-b border-ink/10">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-5 py-6 px-1 text-left font-display text-lg text-ink"
            >
              <span>{item.question}</span>
              <span
                className={cn(
                  'shrink-0 w-[26px] h-[26px] rounded-full border border-ink/10 flex items-center justify-center transition-colors',
                  isOpen && 'bg-gold-pale border-gold'
                )}
              >
                <Plus size={13} className={cn('transition-transform text-ink-soft', isOpen && 'rotate-45')} />
              </span>
            </button>
            {isOpen && <p className="px-1 pb-6 text-[15px] text-ink-soft max-w-[600px]">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
