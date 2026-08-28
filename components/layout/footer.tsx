'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { useRegularServices } from '@/hooks/use-regular-services';
import { hasFeature } from '@/lib/features';
import { churchConfig } from '@/church.config';

export function Footer() {
  const { settings } = useSettings();
  const { services } = useRegularServices();

  const address = settings?.address;
  const addressLines = address
    ? [address.addressLine1, [address.town, address.postcode].filter(Boolean).join(', ')].filter(Boolean)
    : [churchConfig.address.line1, churchConfig.address.line2];

  const socials = [
    { Icon: Facebook, label: 'Facebook', href: settings?.facebook_url },
    { Icon: Instagram, label: 'Instagram', href: settings?.instagram_url },
    { Icon: Youtube, label: 'YouTube', href: settings?.youtube_url }
  ];

  return (
    <footer className="bg-indigo-deep text-[#B7BBD1] pt-[70px] px-8 pb-7">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-[50px] pb-[50px] border-b border-white/[0.08]">
        <div className="md:col-span-1">
          {churchConfig.logoPath ? (
            <Image src={churchConfig.logoPath} alt={churchConfig.name} width={38} height={28} className="object-contain mb-3" />
          ) : (
            <svg width="34" height="25" viewBox="0 0 34 34" fill="none" className="mb-3">
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
          <div className="font-display text-lg text-white mb-3.5">
            {churchConfig.shortName}
          </div>
          <p className="text-[13.5px] leading-7 max-w-[280px]">
            {churchConfig.tagline}
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href || '#'}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-[34px] h-[34px] border border-white/15 rounded-full flex items-center justify-center"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#7B8199] mb-[18px] font-medium">Quick links</h4>
          <ul className="space-y-[11px] text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/give" className="hover:text-white">
                Give
              </Link>
            </li>
            {hasFeature('freeTransport') && (
              <li>
                <Link href="/free-transport" className="hover:text-white">
                  Free transport
                </Link>
              </li>
            )}
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#7B8199] mb-[18px] font-medium">Service times</h4>
          <ul className="space-y-[11px] text-sm">
            {services.length > 0 ? (
              services.map((service, i) => (
                <li key={service._id ?? i}>
                  {service.title} · {service.start_time}
                </li>
              ))
            ) : (
              <>
                <li>Sunday · 09:00 &amp; 11:00</li>
                <li>Wednesday · 19:00</li>
                <li>Friday prayer · 19:00</li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#7B8199] mb-[18px] font-medium">Contact</h4>
          <ul className="space-y-[11px] text-sm">
            <li>
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </li>
            {settings?.mobile && <li>{settings.mobile}</li>}
            <li>{settings?.email || 'hello@yourchurch.org'}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto flex flex-col sm:flex-row gap-3 justify-between items-center pt-[26px] text-[12.5px] text-[#6A6F87]">
        <span>© {new Date().getFullYear()} {churchConfig.name}</span>
        <span className="flex gap-5">
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
