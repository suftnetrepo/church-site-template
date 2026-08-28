import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { SwrProvider } from '@/components/providers/swr-provider';
import { EventsList } from './events-list';
import { getEvents } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Events',
  description: "Conferences, prayer nights, and community days — see what's coming up."
};

export const revalidate = 300;

export default async function EventsPage() {
  const events = await getEvents();
  const fallback: Record<string, unknown> = {};
  if (events) fallback['/api/events'] = events;

  return (
    <main>
      <PageHeader eyebrow="Events" title="What's coming up" description="Conferences, prayer nights, and community days — see what's on." />
      <section className="px-8 py-16">
        <SwrProvider fallback={fallback}>
          <EventsList />
        </SwrProvider>
      </section>
    </main>
  );
}
