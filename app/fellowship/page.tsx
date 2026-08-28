import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { SwrProvider } from '@/components/providers/swr-provider';
import { FellowshipList } from './fellowship-list';
import { getFellowshipGroups } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Fellowship',
  description: 'Small groups meeting through the week for prayer, Bible study, and friendship.'
};

export const revalidate = 300;

export default async function FellowshipPage() {
  const groups = await getFellowshipGroups();
  const fallback: Record<string, unknown> = {};
  if (groups) fallback['/api/fellowship'] = groups;

  return (
    <main>
      <PageHeader
        eyebrow="Fellowship"
        title="Find your people"
        description="Small groups meeting through the week for prayer, Bible study, and friendship."
      />
      <section className="px-8 py-16">
        <SwrProvider fallback={fallback}>
          <FellowshipList />
        </SwrProvider>
      </section>
    </main>
  );
}
