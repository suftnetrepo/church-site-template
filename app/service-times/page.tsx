import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { ServiceTimesList } from './service-times-list';

export const metadata: Metadata = {
  title: 'Service Times',
  description: "Come and be refreshed in God's presence during our uplifting service times."
};

export const revalidate = 300;

export default async function ServiceTimesPage() {
  // The layout provides fallback for regular-services via its SwrProvider,
  // so we don't need a nested provider here. This eliminates cache context conflicts.
  return (
    <main>
      <PageHeader
        eyebrow="Service times"
        title="Worship with us"
        description="Come and be refreshed in God's presence during our uplifting service times."
      />
      <section className="px-8 py-16">
        <ServiceTimesList />
      </section>
    </main>
  );
}
