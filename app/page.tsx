import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { QuickAccess } from '@/components/home/quick-access';
import { Welcome } from '@/components/home/welcome';
import { GetInvolved } from '@/components/home/get-involved';
import { TestimonyBand } from '@/components/home/testimony-band';
import { churchConfig } from '@/church.config';

export const metadata: Metadata = {
  title: 'Home',
  description: `${churchConfig.tagline} Join us this Sunday for worship, teaching, and real community.`
};

export const revalidate = 300; // re-fetch church data every 5 minutes

export default async function Home() {
  // The layout provides fallback for settings and services via its SwrProvider,
  // so we don't need a nested provider here. This eliminates cache context conflicts.
  return (
    <main>
      <Hero />
      <QuickAccess />
      <Welcome />
      <GetInvolved />
      <TestimonyBand />
    </main>
  );
}
