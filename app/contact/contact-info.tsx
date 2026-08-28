'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { churchConfig } from '@/church.config';

export function ContactInfo() {
  const { settings } = useSettings();
  const address = settings?.address;

  return (
    <div>
      <h2 className="text-2xl mb-8">Visit or reach us</h2>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <MapPin className="text-gold-deep shrink-0 mt-0.5" size={22} />
          <div>
            <h5 className="font-semibold text-sm mb-1">Address</h5>
            <address className="not-italic text-[14.5px] text-ink-soft">
              {address?.addressLine1 || churchConfig.address.line1}
              <br />
              {address ? [address.town, address.postcode].filter(Boolean).join(', ') : churchConfig.address.line2}
            </address>
          </div>
        </div>
        <div className="flex gap-4">
          <Phone className="text-gold-deep shrink-0 mt-0.5" size={22} />
          <div>
            <h5 className="font-semibold text-sm mb-1">Phone</h5>
            <p className="text-[14.5px] text-ink-soft">{settings?.mobile || '[phone number]'}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Mail className="text-gold-deep shrink-0 mt-0.5" size={22} />
          <div>
            <h5 className="font-semibold text-sm mb-1">Email</h5>
            <a
              href={`mailto:${settings?.email || 'hello@yourchurch.org'}`}
              className="text-[14.5px] text-ink-soft hover:text-ink"
            >
              {settings?.email || 'hello@yourchurch.org'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
