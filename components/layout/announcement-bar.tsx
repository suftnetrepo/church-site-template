'use client';

import { useRegularServices } from '@/hooks/use-regular-services';

export function AnnouncementBar() {
  const { services } = useRegularServices();

  const sundayServices = services.filter((s) => /sun/i.test(s.title));
  const times = sundayServices.length > 0 ? sundayServices.map((s) => s.start_time).join(' & ') : '9:00 & 11:00';

  return (
    <div className="bg-indigo-deep text-gold-pale text-sm text-center py-2.5 px-5">
      Sunday worship at {times} —{' '}
      <a href="/service-times" className="text-gold font-medium">
        join us in person or watch live
      </a>
    </div>
  );
}
