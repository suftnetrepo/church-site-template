import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { SwrProvider } from '@/components/providers/swr-provider';
import { PrayerTimesList } from './prayer-times-list';
import { PrayerRequestSection } from './prayer-request-section';
import { getPrayerTimes } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Prayer',
  description: "We believe in the power of prayer. Whatever you're facing, you're not alone."
};

export const revalidate = 300;

export default async function PrayersPage() {
  const prayerTimes = await getPrayerTimes();
  const fallback: Record<string, unknown> = {};
  if (prayerTimes) fallback['/api/prayer-times'] = prayerTimes;

  return (
    <main>
      <PageHeader
        eyebrow="Prayer"
        title="We believe in the power of prayer"
        description="Whatever you're facing, you're not alone. Let us stand with you in prayer."
      />

      <SwrProvider fallback={fallback}>
        <PrayerTimesList />
      </SwrProvider>

      <section className={`px-8 ${prayerTimes?.data && prayerTimes.data.length > 0 ? 'py-8' : 'py-[70px]'}`}>
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <h2 className="text-2xl mb-2">We&apos;re praying with you</h2>
          <p className="text-[15px] text-ink-soft">
            Share your heart, your struggles, or your praise. Our prayer team is committed to interceding on your behalf.
          </p>
        </div>
        <PrayerRequestSection />
      </section>
    </main>
  );
}
