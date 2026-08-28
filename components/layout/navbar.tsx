'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hasFeature } from '@/lib/features';
import { churchConfig } from '@/church.config';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/fellowship', label: 'Fellowship' },
 
];

const allResourceLinks = [
  { href: '/resources/bfc', label: 'Believers Foundation Class (BFC)', feature: 'bfc' as const },
  { href: '/resources/wofbi', label: 'Word of Faith Bible Institute (WOFBI)', feature: 'wofbi' as const }
];

// Filtered once at module scope, not per-render — church.config.ts doesn't
// change at runtime, so there's no reason to recompute this on every
// Navbar render.
const resourceLinks = allResourceLinks.filter((link) => hasFeature(link.feature));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <nav className="bg-paper border-b border-ink/10 relative z-50">
      <div className="max-w-[1160px] mx-auto flex items-center justify-between  py-1">
        <Link href="/" className="flex items-center">
          {churchConfig.logoPath ? (
            <Image src={churchConfig.logoPath} alt={churchConfig.name} width={40} height={40} className="object-contain" priority />
          ) : (
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0">
              <circle cx="17" cy="17" r="16" stroke={churchConfig.theme.gold} strokeWidth="1.4" />
              <path
                d="M17 6 L17 28 M6 17 L28 17 M9.5 9.5 L24.5 24.5 M24.5 9.5 L9.5 24.5"
                stroke={churchConfig.theme.gold}
                strokeWidth="1"
                opacity="0.55"
              />
              <circle cx="17" cy="17" r="4.5" fill={churchConfig.theme.gold} />
            </svg>
          )}
          <div className="font-display text-[19px] font-medium leading-tight">
            {churchConfig.shortName}
            <span className="block font-mono text-[10px] tracking-[0.12em] text-ink-soft font-medium mt-0.5">
              {churchConfig.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}

          {resourceLinks.length > 0 && (
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
              <button className="flex items-center gap-1 text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors">
                Resources <ChevronDown size={14} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 pt-3 w-64">
                  <div className="bg-paper border border-ink/10 rounded-md shadow-lg py-2">
                    {resourceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-[13.5px] text-ink-soft hover:text-ink hover:bg-paper-alt">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
            <Link href={'/contact'} className="text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors">
              Contact
            </Link>

        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/10 px-8 py-6 flex flex-col gap-5 bg-paper">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[15px] font-medium text-ink" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {resourceLinks.length > 0 && (
            <div className="pt-1 border-t border-ink/10">
              <div className="text-[11px] font-mono uppercase tracking-wide text-ink-soft mb-3 mt-4">Resources</div>
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[15px] font-medium text-ink py-1.5" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <Button href="/give" className="self-start mt-2">
            Give
          </Button>
        </div>
      )}
    </nav>
  );
}
