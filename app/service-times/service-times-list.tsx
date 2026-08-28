'use client';

import { Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRegularServices } from '@/hooks/use-regular-services';
import { churchConfig } from '@/church.config';

const tones = [
  { bg: 'bg-[#DCE6EF]', text: 'text-[#3E5C74]' }, // steel blue
  { bg: 'bg-[#EAD9DC]', text: 'text-[#7C3B45]' }, // wine
  { bg: 'bg-[#E1E8D3]', text: 'text-[#55692F]' }, // olive
  { bg: 'bg-gold-pale', text: 'text-gold-deep' } // gold
];

export function ServiceTimesList() {
  const { services } = useRegularServices();

  if (services.length === 0) {
    return <p className="text-ink-soft text-center">Service times are being updated — please check back shortly.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
      {services.map((service, i) => {
        const tone = tones[i % tones.length];
        return (
          <div key={service._id ?? i} className="bg-paper border border-ink/10 rounded-md p-7 flex flex-col">
            <div className={`w-11 h-11 rounded-full ${tone.bg} ${tone.text} flex items-center justify-center mb-5`}>
              <Clock size={19} />
            </div>
            <h3 className="font-display text-xl mb-3">{service.title}</h3>
            <div className="flex items-center gap-2 text-ink-soft text-[13.5px] mb-2">
              <Clock size={15} className="shrink-0" />
              {service.start_time} – {service.end_time}
            </div>
            {!service.remote && (
              <div className="flex items-start gap-2 text-ink-soft text-[13.5px] mb-3">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                <span>{churchConfig.address.line1}, {churchConfig.address.line2}</span>
              </div>
            )}
            {service.description && <p className="text-[14px] text-ink-soft mb-5">{service.description}</p>}
            {service.remote && service.remote_link && (
              <Button href={service.remote_link} className="mt-auto self-start">
                Join online
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
